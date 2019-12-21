<template>
  <div>
    <div class="c-logo">
      <nuxt-link :to="'/'" aria-label="Home">
        <svg
          width="26"
          height="25"
          viewBox="0 0 26 25"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="none" fill-rule="evenodd">
            <path
              d="M7.5 1.7c-3.1 0-5.6 2.5-5.6 5.6 0 1 .3 2 .8 2.9l.3.5 10 12.7 10-12.9c.7-1 1.1-2.1 1.1-3.3 0-3.1-2.5-5.6-5.6-5.6-2.2 0-4.1 1.2-5 3.2-.1.2-.2.3-.4.3s-.4-.1-.4-.3c-1.1-1.9-3-3.1-5.2-3.1z"
              fill="#4AA9E8"
              fill-rule="nonzero"
            />
            <path
              d="M18.8 1.7c3.3 0 6 2.5 6 5.6 0 1-.3 2-.9 2.9l-.3.5-10.8 12.6-.8-1C23.8 7.6 18.8 1.7 18.8 1.7z"
              fill="#1D7CBB"
              fill-rule="nonzero"
            />
            <path
              d="M7.5 1.7c-3.1 0-5.6 2.5-5.6 5.6 0 1 .3 2 .8 2.9l.3.5 10 12.7 10-12.9c.7-1 1.1-2.1 1.1-3.3 0-3.1-2.5-5.6-5.6-5.6-2.2 0-4.1 1.2-5 3.2-.1.2-.2.3-.4.3s-.4-.1-.4-.3c-1.1-1.9-3-3.1-5.2-3.1z"
              stroke="#444"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
        </svg>
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
          <nuxt-link v-if="!item.navigateWithHTTP" :to="item.url">{{ item.label }}</nuxt-link>
        </li>
      </ul>
      <button
        type="button"
        class="c-navigation__toggle"
        @click="toggleNav()"
        :aria-label="mainNavIsVisible ? 'Close navigation' : 'Open navigation'"
      >{{ mainNavIsVisible ? 'Close' : 'Menu' }}</button>
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
          label: 'Twitter',
          url: 'https://twiter.com/stefanjudis',
          icon: 'twitter',
          showIconInCompleteNav: true,
          navigateWithHTTP: true
        },
        {
          label: 'Newsletter',
          url: '/newsletter',
          icon: 'letter',
          showIconInCompleteNav: true
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
  top: 1em;
  left: var(--grid-outer-padding);
  display: block;
  z-index: 3;

  svg {
    height: 1.75em;
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

  @media (min-width: 62em) {
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
      width: 1.5em;
      height: 1.5em;
      margin: 0 auto 0.5em;
      fill: currentColor;

      @media (min-width: 56em) {
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

    @media (min-width: 62em) {
      justify-content: flex-end;

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
    height: 100%;
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
