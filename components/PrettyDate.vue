<template>
  <time :datetime="date" class="c-prettyDate">{{ readableDate }}</time>
</template>
<script>
export default {
  props: ['date'],
  computed: {
    readableDate() {
      const [, year, month, day] = this.date.match(/(\d{4})-(\d{2})-(\d{2})/);
      return new Date(year, +month - 1, day).toDateString();
    }
  }
};
</script>

<style>
.c-prettyDate {
  display: block;
  font-size: 0.875em;
  font-weight: 500;
}
</style>
