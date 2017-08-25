<template>
  <div :class="[ $route.name, !isOnline ? 'is-offline' : '', 'u-overflowHidden' ]">
    <offline-notice v-if="!isOnline"/>
    <Logo/>
    <navigation/>
    <nuxt/>
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
  @import '../assets/styles/transitions.scss';
  @import '../assets/styles/util.scss';

  body {
    --blue: #1d7cbb;
    --blue-dark: #1a79b8;
    --green: #10967a;
    --green-dark: #09795c;
    --red: #d73f34;
    --red-dark: #c52d22;
    --yellow-bright: #fefff4;
    --grey-bright: #eee;
    --grey-dark: #444;

    --c-theme: var(--green-dark);
    --c-theme-text: var(--yellow-bright);

    margin: 0;
    padding: 0;

    font-size: 110%;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-weight: 400;
    line-height: 1.375;

    background: var(--yellow-bright);
    color: var(--grey-dark);

    padding-bottom: 5em;
  }

  @media (min-width: 30em) {
    body {
      padding-bottom: 0;
    }
  }

  h1, h2, h3 {
    font-weight: normal;
  }

  video {
    max-width: 100%;
    display: block;
    border: .5em solid #fff;
    box-shadow: 0 0.05em 0.0625em #888;
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

  }

  :focus {
    outline-style: dashed;
    outline-width: 3px;
    outline-offset: 2px;
    outline-color: var(--c-theme);

    .js-focus-ring &:not(.focus-ring) {
      outline: none;
    }
  }

  img {
    max-width: 100%;
  }

  ::selection {
    background: var(--c-theme);
    color: #fff;
    text-shadow: none;
  }


  /*
  ** Controls on body element
  */
  .index { --c-theme: var(--green-dark); }
  .blog, .blog-slug, .blog-page-page, .blog-tag-tag, .share { --c-theme: var(--blue-dark); }
  .projects, .today-i-learned, .today-i-learned-page-page, .today-i-learned-slug { --c-theme: var(--red-dark); }
  .is-offline { --c-theme: var(--grey-dark); }

  /*
  ** overwrite progress color
  */
  .progress {
    background: var(--c-theme) !important;
  }

  @media (min-width: 30em) {
    .progress {
      background:  #fff !important;
    }
  }
</style>
