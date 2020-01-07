<template>
  <div>
    <div class="c-logo">
      <nuxt-link :to="'/'" aria-label="Home">
        <svg width="190" height="190" viewbox="0 0 190 190"><path fill="#52A7DD" d="M153.008 7.783C111.457 1.196 95.75 33.625 95.75 33.625S80.043 1.196 38.493 7.783C16.246 11.31 5.197 35.278 7.946 55.953c3.356 25.241 24.265 44.838 38.755 64.199 13.076 17.475 26.795 34.578 40.322 51.713 2.939 3.721 5.771 7.529 8.727 11.236 2.955-3.707 5.787-7.516 8.727-11.236 13.527-17.135 27.246-34.238 40.322-51.713 14.49-19.361 35.398-38.958 38.756-64.199 2.748-20.675-8.301-44.643-30.547-48.17z"/><path fill="#1D7CBA" d="M138.75 11.358s44.065 36.935-44.173 163.245c-.001.001 165.333-156.333 44.173-163.245z"/><path fill="none" stroke="#454546" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" d="M153.008 7.783C111.457 1.196 95.75 33.625 95.75 33.625S80.043 1.196 38.493 7.783C16.246 11.31 5.197 35.278 7.946 55.953c3.356 25.241 24.265 44.838 38.755 64.199 13.076 17.475 26.795 34.578 40.322 51.713 2.939 3.721 5.771 7.529 8.727 11.236 2.955-3.707 5.787-7.516 8.727-11.236 13.527-17.135 27.246-34.238 40.322-51.713 14.49-19.361 35.398-38.958 38.756-64.199 2.748-20.675-8.301-44.643-30.547-48.17z"/></svg>
      </nuxt-link>
    </div>
    <nav :class="['c-navigation', mainNavIsVisible ? 'main-nav-visible' : '']">
      <transition-group
        name="staggered-item"
        tag="ul"
        class="c-navigation__complete"
        v-on:before-enter="beforeEnter"
        :inert="!mainNavIsVisible && !showFullNav"
      >
        <li
          v-for="(item, index) in menu"
          :key="item.label"
          :data-index="index"
          :class="[item.showIconInCompleteNav ? 'showIcon' : '']"
        >
          <a v-if="item.navigateWithHTTP" :href="item.url">
            <svg-icon v-if="item.icon" :name="item.icon" />
            <span>{{ item.label }}</span>
          </a>

          <nuxt-link v-if="!item.navigateWithHTTP" :to="item.url">
            <svg-icon v-if="item.icon" :name="item.icon" />
            <span>{{ item.label }}</span>
          </nuxt-link>
        </li>
      </transition-group>
      <ul class="c-navigation__reduced" :inert="mainNavIsVisible">
        <li v-for="item in reducedNav" :key="item.url">
          <a v-if="item.navigateWithHTTP" :href="item.url">{{ item.label }}</a>
          <nuxt-link v-if="!item.navigateWithHTTP" :to="item.url">{{
            item.label
          }}</nuxt-link>
        </li>
      </ul>
      <button
        type="button"
        class="c-navigation__toggle"
        @click="toggleNav()"
        :aria-label="mainNavIsVisible ? 'Close navigation' : 'Open navigation'"
      >
        {{ mainNavIsVisible ? 'Close' : 'Menu' }}
      </button>
    </nav>
  </div>
</template>
<script>
import Container from '~/components/Container.vue';

export default {
  mounted() {
    this.$router.afterEach(_ => this.toggleNav({ isOpen: false }));

    const mql = window.matchMedia('(min-width:56em)');
    this.showFullNav = mql.matches;

    mql.addListener(mql => {
      this.showFullNav = mql.matches;
    });
  },
  data() {
    return {
      mainNavIsVisible: false,
      mainNav: [
        { label: 'Home', url: '/', icon: 'home' },
        { label: 'Blog', url: '/blog/', icon: 'blog' },
        { label: 'Resources', url: '/resources/', icon: 'resources' },
        { label: 'Talks', url: '/talks/', icon: 'talk' },
        { label: 'Smalltalk', url: '/smalltalk/', icon: 'smalltalk' },
        { label: 'Today I learned', url: '/today-i-learned/', icon: 'learn' },
        {
          label: 'Newsletter',
          url: '/newsletter',
          icon: 'letter',
          showIconInCompleteNav: true
        },
        {
          label: 'Twitter',
          url: 'https://twitter.com/stefanjudis',
          icon: 'twitter',
          showIconInCompleteNav: true,
          navigateWithHTTP: true
        },
        {
          label: 'RSS',
          url: '/rss.xml',
          icon: 'rss',
          showIconInCompleteNav: true,
          navigateWithHTTP: true
        }
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
    Container
  }
};
</script>

<style lang="postcss">
.c-logo {
  position: absolute;
  top: 1.25em;
  left: var(--grid-outer-padding);
  display: block;
  z-index: 3;

  svg {
    height: 1.5em;
    width: auto;
  }
}

.c-navigation {
  position: fixed;
  width: 100%;
  bottom: 0;
  padding: 0;
  z-index: 2;
  background: var(--c-navigation-background);
  transform: translateZ(0);

  @media (min-width: 65em) {
    position: static;
  }

  &__complete,
  &__reduced {
    list-style: none;
    margin: 0;
    padding: 0;

    display: grid;
    grid-template-rows: 1fr;
    grid-gap: 2em;

    @media (min-width: 65em) {
      grid-gap: .5em;
    }

    > li {
      margin: 0 0;
      padding: 0;
      padding-bottom: env(safe-area-inset-bottom);
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
      width: auto;
      max-width: 2.5em;
      height: 1.5em;
      margin: 0 auto 0.5em;
      fill: currentColor;

      @media (min-width: 56em) {
        max-width: 1.5em;
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
    border-top: 2px solid currentColor;
    background: var(--c-navigation-background);
    box-shadow: 0 0 2em var(--c-shadow-color);
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, auto);

    transform: scale(0.2, 0.2) translate(0, 0);
    transform-origin: bottom right;
    transition: transform 0.225s ease-in-out;

    .main-nav-visible & {
      transform: scale(1) translate(0, 0);
    }

    @media (min-width: 56em) {
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

    @media (min-width: 65em) {
      justify-content: flex-end;
      border-width: 4px;
      border-color: var(--c-highlight);

      > li {
        &:not(:last-child) {
          margin-right: 2.5em;
        }

        &.showIcon {
          &:not(:last-child) {
            margin-right: 0.75em;
          }

          svg {
            display: block;
            margin-bottom: 0;
          }

          span {
            position: absolute !important;
            height: 1px;
            width: 1px;
            overflow: hidden;
            clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
            clip: rect(1px, 1px, 1px, 1px);
            white-space: nowrap; /* added line */
          }
        }
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
    border-top: 2px solid currentColor;
    transition: opacity 0.25s ease-in-out;

    .main-nav-visible & {
      opacity: 0;
    }

    a {
      padding: 0.5em 0;
      margin: 0.25em 0;

      &.is-active {
        box-shadow: 0 0.375em 0 0 currentColor;
      }
    }

    @media (min-width: 56em) {
      display: none;
    }
  }

  &__toggle {
    position: absolute;
    z-index: 3;
    right: 0;
    bottom: 0;
    padding-bottom: env(safe-area-inset-bottom);
    display: block;
    width: 20%;
    height: calc(100% - 2px);
    font-size: 1em;
    font-weight: 800;
    background: var(--c-navigation-background);
    border: none;
    color: currentColor;

    &::before {
      content: '';
      position: absolute;
      top: 0.875em;
      bottom: calc(0.875em + env(safe-area-inset-bottom));
      left: 0;
      width: 2px;
      background: var(--grey);
    }

    @media (min-width: 56em) {
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
