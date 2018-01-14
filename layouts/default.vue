<template>
  <div :class="[ $route.name, !isOnline ? 'is-offline' : '', 'u-overflowHidden' ]">
    <offline-notice v-if="!isOnline"/>
    <navigation/>
    <main>
      <nuxt/>
    </main>
    <closing/>
  </div>
</template>

<script>
  import Closing from '~/components/Closing.vue'
  import Logo from '~/components/Logo.vue'
  import Navigation from '~/components/Navigation.vue'
  import OfflineNotice from '~/components/OfflineNotice.vue'

  export default {
    components: {
      Closing,
      Logo,
      Navigation,
      OfflineNotice
    },
    data () {
      return {
        isOnline: true
      }
    },
    mounted () {
      window.addEventListener('load', () => {
        window.addEventListener('online', () => { this.isOnline = true })
        window.addEventListener('offline', () => { this.isOnline = false })
      })
    }
  }
</script>

<style lang="scss">
  @import '../assets/styles/objects/button.scss';
  @import '../assets/styles/objects/code.scss';
  @import '../assets/styles/objects/headline.scss';
  @import '../assets/styles/objects/grid.scss';
  @import '../assets/styles/objects/list.scss';
  @import '../assets/styles/objects/tile.scss';
  @import '../assets/styles/objects/tag.scss';
  @import '../assets/styles/transitions.scss';
  @import '../assets/styles/util.scss';

  body {
    --blue: #1d7cbb;
    --blue-dark: #1a79b8;
    --blue-bright: #3a99d8;
    --green: #10967a;
    --green-dark: #09795c;
    --green-bright: #39b97c;
    --red: #d73f34;
    --red-dark: #c52d22;
    --red-bright: #f55d52;
    --yellow-bright: #fefff4;
    --grey-bright: #eee;
    --grey-dark: #5a5a5a;
    --grey-very-dark: #3a3a3a;

    --c-highlight: var(--green-dark);

    --shadow-tile: 0 .25em 2.5em #e1e1e1;
    --shadow-btn: 0 .125em .375em #e1e1e1;
    --shadow-person: var(--shadow-tile);

    --navigation-break: 30em;

    margin: 0;
    padding: 0;

    font-size: 110%;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-weight: 400;
    line-height: 1.5;

    background: #f9f9f9;
    color: var(--grey-dark);

    padding-bottom: 5em;
  }

  @media (min-width: 38em) {
    body {
      padding-bottom: 0;
    }
  }

  h1, h2, h3 {
    font-weight: normal;
  }

  main {
    min-height: 100vh;
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

  *, *::before, *::after {
    box-sizing: border-box;
  }

  a {
    color: currentColor;
    text-decoration: underline;
    text-decoration-skip: ink;

    &:hover {
      color: var(--c-highlight);
    }

    &:active {
      filter: brightness(.875)
    }
  }

  :focus {
    outline-style: dashed;
    outline-width: 3px;
    outline-offset: 2px;
    outline-color: var(--c-highlight);

    .js-focus-ring &:not(.focus-ring) {
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


  /*
  ** Controls on body element
  */
  .index { --c-highlight: var(--green-dark); }
  .blog, .blog-slug, .blog-page-page, .blog-tag-tag, .share { --c-highlight: var(--blue-dark); }
  .projects, .today-i-learned, .today-i-learned-page-page, .today-i-learned-slug { --c-highlight: var(--red-dark); }
  .is-offline { --c-highlight: var(--grey-dark); }
</style>
