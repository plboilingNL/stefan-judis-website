<template>
  <div class="c-sharingLine">
    <Container :small-padding="true">
      If you like this post <a :href="sharingUrl" target="_blank" rel="noopener">share it on Twitter</a> or <a :href="followUrl" target="_blank" rel="noopener">follow me on Twitter</a>.
    </Container>
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
    background-color: var(--c-theme);
    color: var(--c-theme-text);

    a:hover {
      color: currentColor;
    }

    a:focus {
      outline-color: var(--c-theme-text);
    }
  }
</style>
