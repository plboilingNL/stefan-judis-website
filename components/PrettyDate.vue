<template>
  <time :datetime="date" class="c-prettyDate">{{ readableDate }}</time>
</template>
<script>
const THIS_YEAR = new Date().getUTCFullYear();

export default {
  props: ['date'],
  computed: {
    readableDate() {
      const [, year, month, day] = this.date.match(/(\d{4})-(\d{2})-(\d{2})/);

      const prettyDate = new Date(year, +month - 1, day)
        .toDateString()
        .substring(4);

      if (+year === THIS_YEAR) {
        return prettyDate.substring(0, prettyDate.length - 5);
      }

      return prettyDate;
    }
  }
};
</script>

<style lang="postcss" scoped>
.c-prettyDate {
  text-transform: uppercase;
}
</style>

