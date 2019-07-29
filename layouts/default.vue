<template>
  <div class="u-overflowHidden">
    <a href="#main" class="skip-link o-btn">Skip to content</a>
    <offline-notice v-if="!isOnline" />
    <navigation />
    <main id="main" aria-labelledby="main-headline" class="u-marginBottomLarge">
      <nuxt />
    </main>
    <closing />
  </div>
</template>

<script>
import Closing from '~/components/Closing.vue';
import Navigation from '~/components/Navigation.vue';
import OfflineNotice from '~/components/OfflineNotice.vue';
import Container from '~/components/Container.vue';
import { loadCSS, onloadCSS } from '~/plugins/load-css.js';

export default {
  components: {
    Closing,
    Container,
    Navigation,
    OfflineNotice
  },
  data() {
    return {
      isOnline: true
    };
  },
  beforeCreate() {
    if (!this.$isServer) {
      import('inert-polyfill');
      import('focus-visible');

      const saveDataIsEnabled =
        navigator.connection && navigator.connection.saveData === true;
      if (!saveDataIsEnabled) {
        onloadCSS(loadCSS('/fancy.css'), () =>
          document.body.classList.add('wf-active')
        );
      }
    }
  },
  mounted() {
    window.addEventListener('load', () => {
      this.isOnline = navigator.connectiontype !== 'none';
      window.addEventListener('online', () => {
        document.body.classList.remove('is-offline');
        this.isOnline = true;
      });
      window.addEventListener('offline', () => {
        document.body.classList.add('is-offline');
        this.isOnline = false;
      });
    });
  }
};
</script>

<style lang="postcss">
@import '../assets/styles/objects/anchor.css';
@import '../assets/styles/objects/button.css';
@import '../assets/styles/objects/code.css';
@import '../assets/styles/objects/grid.css';
@import '../assets/styles/objects/headline.css';
@import '../assets/styles/objects/highlight-box.css';
@import '../assets/styles/objects/list.css';
@import '../assets/styles/objects/magazine-grid.css';
@import '../assets/styles/transitions.css';
@import '../assets/styles/util.css';

body {
  --blue-brighter: #e4f4ff;
  --blue-bright: #8cd1ff;
  --blue: #1d7cbb;
  --blue-dark: #1d5a88;
  --green-bright: #39b97c;
  --green: #10967a;
  --green-dark: #09795c;
  --red-bright: #ff7d72;
  --red: #d73f34;
  --red-dark: #c52d22;
  --white: #fff;
  --grey-brighter: #fafafa;
  --grey-bright: #e6e6e6;
  --grey: #767676;
  --grey-dark: #5a5a5a;
  --grey-darker: #444;
  --grey-very-dark: #343434;

  --c-background: var(--white);
  --c-background-contrast: var(--grey-darker);
  --c-text: var(--grey-dark);
  --c-text-contrast: var(--grey-brighter);
  --c-text-catchy: var(--grey-very-dark);
  --c-text-hover-background: var(--grey-bright);
  --c-highlight: var(--blue);
  --c-highlight-light: var(--blue-dark);
  --c-highlight-gradient: linear-gradient(
    125deg,
    var(--c-highlight-light) 0,
    var(--c-highlight)
  );

  --grid-gap: 4.5em;

  --grid-outer-padding: 1em;
  @media (min-width: 38em) {
    --grid-outer-padding: 2em;
  }

  --c-navigation-background: var(--white);

  margin: 0;
  padding: 0;

  font-size: 120%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
    Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  font-weight: 400;
  line-height: 1.5;

  background: var(--c-background);
  color: var(--c-text);

  padding-bottom: 3em;

  @media (min-width: 52em) {
    padding-bottom: 0;
  }
}

p {
  margin: 0 0 1.25em;
}

main {
  min-height: 70vh;
}

video {
  max-width: 100%;
  display: block;
  margin: 1em auto;
}

video.is-mobile-video {
  display: block;
  max-width: 20em;
  margin: 0 auto;
}

#__nuxt {
  position: relative;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

a {
  color: currentColor;

  &:hover,
  &:focus {
    color: var(--c-highlight);
  }

  &:active {
    filter: brightness(0.875);
  }
}

:focus {
  outline-style: dashed;
  outline-width: 3px;
  outline-offset: 2px;
  outline-color: var(--c-highlight);

  .js-focus-visible &:not(.focus-visible) {
    outline: none;
  }
}

img {
  max-width: 100%;
}

::selection {
  background: var(--c-highlight);
  color: #fff;
}

.is-offline {
  filter: grayscale(100%);
}

.is-offline {
  --c-highlight: var(--grey-dark);
}

.fancy-link {
  text-decoration: none;

  background: linear-gradient(90deg, var(--blue-bright), var(--blue-brighter));
  background-size: 100% 2px;
  background-repeat: no-repeat;
  background-position: left 0 bottom 0;
}

.fancy-font {
  > h1,
  > h2 {
    letter-spacing: -4.5px;
    word-spacing: 2px;
  }
}

.wf-active {
  .fancy-font {
    > * {
      letter-spacing: 0;
      font-family: 'Oswald', sans-serif;
      word-spacing: normal;
    }
  }
}

.skip-link {
  position: absolute;
  z-index: 20;
  left: 5em;
  right: 0;
  top: 1em;
  width: 10em;
  text-align: center;
  opacity: 1;

  &:not(:focus):not(:hover) {
    transform: translateY(-4em);
    opacity: 0;
  }
}
</style>
