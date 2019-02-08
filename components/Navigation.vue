<template>
  <nav :class="['c-navigation', mainNavIsVisible ? 'main-nav-visible' : '']">
    <transition-group
      name="staggered-item"
      tag="ul"
      class="c-navigation__complete"
      v-on:before-enter="beforeEnter"
      :inert="!mainNavIsVisible && !showFullNav"
    >
      <li v-for="(item, index) in menu" :key="item.label" :data-index="index">
        <nuxt-link :to="item.url">
          <Icon v-if="item.icon" :name="item.icon"></Icon>
          {{ item.label }}
        </nuxt-link>
      </li>
    </transition-group>
    <ul class="c-navigation__reduced" :inert="mainNavIsVisible">
      <li v-for="item in reducedNav" :key="item.url">
        <nuxt-link :to="item.url">{{ item.label }}</nuxt-link>
      </li>
    </ul>
    <button
      type="button"
      class="c-navigation__toggle"
      @click="toggleNav()"
      :aria-label="mainNavIsVisible ? 'Close navigation' : 'Open navigation'"
    >{{ mainNavIsVisible ? 'Close' : 'Menu' }}</button>
  </nav>
</template>
<script>
import Container from '~/components/Container.vue';

export default {
  mounted() {
    this.$router.afterEach(_ => this.toggleNav({ isOpen: false }));

    const mql = window.matchMedia('(min-width:38em)');
    this.showFullNav = mql.matches;

    mql.addListener(mql => {
      this.showFullNav = mql.matches;
    });
  },
  data() {
    return {
      mainNavIsVisible: false,
      mainNav: [
        { label: 'Home', url: '/', icon: 'Home' },
        { label: 'Blog', url: '/blog/', icon: 'Blog' },
        { label: 'Resources', url: '/resources/', icon: 'Resources' },
        { label: 'Talks', url: '/talks/', icon: 'Talk' },
        { label: 'Smalltalk', url: '/smalltalk/', icon: 'Smalltalk' },
        { label: 'Today I learned', url: '/today-i-learned/', icon: 'Learn' }
      ],
      reducedNav: [
        { label: 'Home', url: '/' },
        { label: 'Blog', url: '/blog/' },
        { label: 'Resources', url: '/resources' }
      ],
      showFullNav: true
    };
  },
  computed: {
    menu() {
      return this.mainNavIsVisible || this.showFullNav ? this.mainNav : [];
    }
  },
  methods: {
    toggleNav(options = {}) {
      // todo focus the first element
      this.mainNavIsVisible =
        typeof options.isOpen !== 'undefined'
          ? options.isOpen
          : !this.mainNavIsVisible;
    },
    beforeEnter(el) {
      el.style.transitionDelay = `${0.05 *
        (this.menu.length / 2 - (el.dataset.index % 3))}s`;
    }
  },
  components: {
    Container,
    Icon: () => import('~/components/Icon.vue')
  }
};
</script>

<style lang="postcss">
.c-navigation {
  position: fixed;
  width: 100%;
  bottom: 0;
  padding: 0;
  z-index: 2;
  background: var(--c-navigation-background);
  transform: translateZ(0);

  @media (min-width: 50em) {
    position: static;
  }

  &__complete,
  &__reduced {
    list-style: none;
    margin: 0;
    padding: 0;

    display: grid;
    grid-template-rows: 1fr;
    grid-gap: 0.5em;

    > li {
      margin: 0;
      padding: 0;
      text-align: center;
      align-self: stretch;
      justify-self: stretch;
    }

    a {
      display: block;
      text-decoration: none;

      &:hover {
        border-bottom-color: currentColor;
        outline: none;
      }

      &:focus {
        outline-color: var(--c-highlight);
      }

      &.is-active {
        color: var(--c-highlight);

        path {
          fill: currentColor;
        }
      }
    }

    svg {
      display: block;
      width: 1.5em;
      margin: 0 auto 0.5em;

      path {
        fill: #666;
      }

      @media (min-width: 38em) {
        display: none;
      }
    }
  }

  &__complete {
    position: absolute;
    width: 100%;
    min-height: 12em;
    z-index: 2;
    bottom: 0;
    padding: 2em 0.75em 4em;
    background: var(--c-navigation-background);
    box-shadow: 0 0 2em var(--c-shadow-color);
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 4em);

    transform: scale(0.2, 0.2) translate(0, 0);
    transform-origin: bottom right;
    transition: transform 0.225s ease-in-out;

    .main-nav-visible & {
      transform: scale(1) translate(0, 0);
    }

    @media (min-width: 38em) {
      position: static;
      display: flex;
      justify-content: space-between;
      transform: scale(1) translate(0);
      min-height: 0;
      padding: 0 2em;

      a {
        padding: 0.25em 0;
        margin: 0.5em 0;
        border-bottom: 0.125em solid transparent;
        &.is-active {
          border-bottom-color: currentColor;
        }
      }
    }

    @media (min-width: 50em) {
      justify-content: flex-end;

      > li {
        margin-left: 2.5em;
      }

      a {
        margin: 0.75em 0;
        border-bottom: 0.125em solid transparent;

        &.is-active {
          border-top-color: transparent;
          border-bottom-color: currentColor;
        }
      }
    }
  }

  &__reduced {
    padding-right: 20%;
    grid-template-columns: repeat(3, auto);
    transition: opacity 0.25s ease-in-out;

    .main-nav-visible & {
      opacity: 0;
    }

    a {
      padding: 0.5em 0;
      margin: 0.25em 0;

      &.is-active {
        box-shadow: 0 0.675em 0 0 currentColor;
      }
    }

    @media (min-width: 38em) {
      display: none;
    }
  }

  &__toggle {
    position: absolute;
    z-index: 3;
    right: 0;
    bottom: 0;
    display: block;
    width: 20%;
    height: 100%;
    font-size: 1em;
    font-weight: 800;
    background: var(--c-navigation-background);
    border: none;
    color: currentColor;

    &::before {
      content: '';
      position: absolute;
      top: 30%;
      bottom: 30%;
      left: 0;
      width: 2px;
      background: var(--grey);
    }

    @media (min-width: 38em) {
      display: none;
    }
  }
}

.staggered-item,
.staggered-item-leave {
  opacity: 1;
  transform: translate(0);
}

.staggered-item-leave {
  transition-delay: 0.25s;
}

.staggered-item-enter-active,
.staggered-item-leave-active {
  transition: all 0.25s;
}

.staggered-item-enter,
.staggered-item-leave-to {
  opacity: 0;
}

.staggered-item-enter {
  transform: translateY(1em);
}
</style>
