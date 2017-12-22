<template>
  <time :datetime="date" :class="classes">{{ readableDate }}</time>
</template>
<script>
  export default {
    props: ['date', 'isSmall', 'isArticleHead'],
    computed: {
      readableDate () {
        return (new Date(this.date)).toDateString()
      },
      classes () {
        return {
          'c-prettyDate': true,
          'c-prettyDate__isArticleHead': this.isArticleHead
        }
      }
    }
  }
</script>

<style lang="scss">
  .c-prettyDate {
    display: block;
    font-size: .875em;

    &__isArticleHead {
      text-align: center;
    }
  }
</style>
