<template>
  <div :class="[ !isOnline ? 'is-offline' : '', 'u-overflowHidden' ]">
    <offline-notice v-if="!isOnline"/>
    <navigation/>
    <main aria-labelledby="main-headline" class="u-marginBottomLarge">
      <nuxt/>
    </main>
    <closing/>
  </div>
</template>

<script>
import Closing from '~/components/Closing.vue';
import Navigation from '~/components/Navigation.vue';
import OfflineNotice from '~/components/OfflineNotice.vue';
import Container from '~/components/Container.vue';

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
    }
  },
  mounted() {
    window.addEventListener('load', () => {
      this.isOnline = navigator.connectiontype !== 'none';
      window.addEventListener('online', () => {
        this.isOnline = true;
      });
      window.addEventListener('offline', () => {
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
@import '../assets/styles/objects/emoji.css';
@import '../assets/styles/objects/grid.css';
@import '../assets/styles/objects/headline.css';
@import '../assets/styles/objects/highlight-box.css';
@import '../assets/styles/objects/list.css';
@import '../assets/styles/objects/magazine-grid.css';
@import '../assets/styles/transitions.css';
@import '../assets/styles/util.css';

body {
  --blue-brighter: #90d0fa;
  --blue-bright: #54b2ea;
  --blue: #1d7cbb;
  --blue-dark: #1f87c3;
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

  --grid-gap: 3em;

  --grid-outer-padding: 1em;
  @media (min-width: 38em) {
    --grid-outer-padding: 2em;
  }

  /* --c-shadow-color: #bbb;
  --shadow-tile: 0 1em 4em -0.75em var(--c-shadow-color);
  --shadow-btn: 0 0.25em 1.5em var(--c-shadow-color);
  --shadow-person: var(--shadow-tile);
  --shadow-floating-thing: 0 0.375em 1.5em -0.25em var(--c-shadow-color); */

  /* --c-tile-background: var(--white);
  --c-tile-contrast: var(--grey-bright); */

  --c-navigation-background: var(--white);

  /* @media (prefers-color-scheme: dark) {
    --c-background: var(--grey-darker);
    --c-background-contrast: var(--grey-very-dark);
    --c-text: #eee;
    --c-text-contrast: #fff;
    --c-text-hover-background: var(--grey-very-dark);
    --c-shadow-color: #1a1a1a;
    --c-highlight: var(--blue-bright);
    --c-tile-background: var(--c-background);
    --c-tile-contrast: var(--c-background-contrast);
    --c-navigation-background: var(--c-background);
  } */

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

  @media (min-width: 47em) {
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

  background: linear-gradient(var(--blue-brighter), var(--blue-brighter));
  background-size: 100% 4px;
  background-repeat: no-repeat;
  background-position: left 0 bottom 0;
}
</style>
