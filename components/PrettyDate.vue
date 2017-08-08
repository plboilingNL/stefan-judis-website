<template>
  <time :datetime="date" :class="classes">{{ readableDate }}</time>
</template>
<script>
  export default {
    props: ['date', 'isSmall'],
    computed: {
      readableDate () {
        return (new Date(this.date)).toDateString()
      },
      classes () {
        return {
          'c-prettyDate': true,
          'c-prettyDate__small': this.isSmall
        }
      }
    }
  }
</script>

<style>
  .c-prettyDate {
    display: block;
    margin-bottom: .5em;
    font-style: italic;
  }

  .c-prettyDate__small {
    margin-bottom: .25em;
  }
</style>
