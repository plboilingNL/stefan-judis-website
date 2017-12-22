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
          'c-prettyDate': true
        }
      }
    }
  }
</script>

<style lang="scss">
  .c-prettyDate {
    display: block;
    font-size: .875em;
  }
</style>
