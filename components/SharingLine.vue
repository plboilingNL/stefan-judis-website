<template>
  <div class="c-sharingLine">
    If you like this post <a :href="sharingUrl" target="_blank" rel="noopener noreferrer">share it</a> or <a :href="followUrl" target="_blank" rel="noopener noreferrer">follow me on Twitter</a>.
  </div>
</template>

<script>
  import Container from '~/components/Container.vue'
  export default {
    props: ['item'],
    computed: {
      sharingUrl () {
        return encodeURI(`https://twitter.com/intent/tweet?text=${this.item.fields.title}&url=https://www.stefanjudis.de/blog/${this.item.fields.slug}&via=stefanjudis`)
      },
      followUrl () {
        return encodeURI('https://twitter.com/intent/follow?screen_name=stefanjudis')
      }
    },
    components: {
      Container
    }
  }
</script>

<style lang="scss">
  .c-sharingLine {
    background: var(--c-highlight);
    color: #fff;
    padding: 1em;
    margin: 0 -1em -1em;

    a:hover {
      color: currentColor;
    }

    a:focus {
      outline-color: var(--c-theme-text);
    }
  }
</style>
