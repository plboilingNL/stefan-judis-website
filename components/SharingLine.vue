<template>
  <div class="c-sharingLine">
    <p>If you like this post <a :href="sharingUrl" target="_blank" rel="noopener noreferrer">share it</a> or <nuxt-link to="/newsletter/">subscribe to my monthly newsletter</nuxt-link>.</p>
  </div>
</template>

<script>
export default {
  props: ['item'],
  computed: {
    sharingUrl() {
      return encodeURI(
        `https://twitter.com/intent/tweet?text=${
          this.item.fields.title
        }&url=https://www.stefanjudis.com${
          this.$route.fullPath
        }&via=stefanjudis`
      );
    }
  }
};
</script>

<style lang="scss">
.c-sharingLine {
  background: var(--c-highlight);
  background: var(--c-highlight-gradient);
  color: #fff;
  padding: 1em;
  margin: 0 -1em -1em;

  a:hover, a:active, a:focus {
    color: currentColor;
  }

  p {
    margin: 0;
  }
}
</style>
