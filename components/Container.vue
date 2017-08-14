<template>
  <section :class="classes">
    <div>
      <header class="c-container__headline">
        <slot name="date"></slot>
        <slot name="headline"></slot>
      </header>
      <slot/>

      <!-- TODO this is not working properly -->
      <slot name="footerLine" class="c-container__footerLine" ></slot>
    </div>
  </section>
</template>

<script>
  export default {
    computed: {
      classes () {
        return {
          'c-container': true,
          'c-container--noPadding': this.noPadding,
          'c-container--smallPadding': this.smallPadding,

          'c-container--blue': this.color === 'blue',
          'c-container--grey': this.color === 'grey',
          'c-container--red': this.color === 'red'
        }
      }
    },
    props: ['noPadding', 'smallPadding', 'color']
  }
</script>

<style lang="scss">
  .c-container {
    background-color: var(--c-container-bg);

    & > div {
      max-width: 50em;
      margin: 0 auto;
      padding: 2em;

      @media (min-width: 30em) {
        padding: 5em 2em;
      }
    }
  }

  .c-container a:hover {
    color: var(--c-theme);
  }

  .c-container--noPadding > div {
    padding: 0;
  }

  .c-container--smallPadding > div {
    padding: 1em 2em;
  }

  .c-container--blue {
    --c-container-bg: var(--blue-dark);
    --c-theme: #fff;
    color: var(--yellow-bright);
  }

  .c-container--grey {
    --c-container-bg: var(--grey-dark);
    --c-theme: #fff;
    color: var(--yellow-bright);
  }

  .c-container--red {
    --c-container-bg: var(--red-dark);
    --c-theme: #fff;
    color: var(--yellow-bright);
  }

  .c-container.c-container--red a:hover,
  .c-container.c-container--grey a:hover,
  .c-container.c-container--blue a:hover {
    color: currentColor;
  }

  .c-container--noPadding {
    padding: 0;
  }

  .c-container__headline h1, .c-container__headline h2 {
    font-family: 'Georgia', serif;
    font-size: 2em;
    letter-spacing: 1px;
    margin: 0 0 .5em 0;
  }

  @media (min-width: 30em) {
    .c-container__headline h1, .c-container__headline h2 {
      font-size: 2.5em;
    }
  }

  .c-container__footerLine {
    font-size: 2em;
    margin: 1em 0 1em;
  }

  /* TODO spread this across links */
  .c-container__footerLine {
    text-decoration: none;
    border-bottom: 1px solid currentColor;
    display: inline-block;
    line-height: 1;
    text-shadow:
      2px 2px var(--c-container-bg),
      2px -2px var(--c-container-bg),
      -2px 2px var(--c-container-bg),
      -2px -2px var(--c-container-bg);
  }
</style>
