<template>
  <time :datetime="date" class="c-bigDate">
    <span class="c-bigDate__day">{{parsedDate.day}}</span>
    <span class="c-bigDate__month">{{parsedDate.month}}</span>
    <!-- {{ parsedDate.prettyDate }} -->
  </time>
</template>
<script>
const THIS_YEAR = new Date().getUTCFullYear();

export default {
  props: ['date'],
  computed: {
    parsedDate() {
      const [, year, month, day] = this.date.match(/(\d{4})-(\d{2})-(\d{2})/);

      return {
        day,
        month: new Date(this.date).toDateString().slice(4, 7)
      };
    }
  }
};
</script>

<style lang="postcss" scoped>
.c-bigDate {
  text-align: center;
  color: var(--grey);

  &__day {
    display: block;
    max-width: 100%;
    font-size: 3em;
    font-weight: bold;
    line-height: 1;
  }

  &__month {
    font-size: 1.5em;
    font-weight: bold;
    letter-spacing: 2px;

    text-transform: uppercase;
  }
}
</style>

