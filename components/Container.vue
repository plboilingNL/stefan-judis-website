<template functional>
  <section
    :class="{
      'c-container': true,
      'c-container--noPadding': props.noPadding,
      'c-container--smallPadding': props.smallPadding,
      'c-container--accessibleLineLength': props.accessibleLineLength,
      'c-container--fullWidth': props.fullWidth,
      't-container': props.animate,
      [props.additionalClass]: props.additionalClass || false
    }"
  >
    <div>
      <header
        v-if="$slots.date || $slots.headline || $slots.subHeadline"
        class="c-container__headline"
      >
        <slot name="date"></slot>
        <slot name="headline"></slot>
        <slot name="subHeadline"></slot>
      </header>
      <slot/>

      <div v-if="$slots.footerLine" class="c-container__footerLine">
        <slot name="footerLine"></slot>
      </div>
    </div>
  </section>
</template>

<style>
.c-container {
  & > div {
    max-width: 65em;
    margin: 0 auto;
    padding: 1em;
  }
}

.c-container--noPadding > div {
  padding: 0;
}

.c-container--smallPadding > div {
  padding: 1em 2em;
}

.c-container--accessibleLineLength > div {
  max-width: 45em;
  max-width: 65ch;
}

.c-container--fullWidth > div {
  max-width: none;
}

.c-container--noPadding {
  padding: 0;
}

.c-container__headline {
  margin: 1em 0 2em;
  text-align: center;

  @media (min-width: 38em) {
    margin-top: 2em;
  }

  time,
  span {
    font-size: 0.875em;
    display: block;
  }

  span {
    margin-top: -0.125em;
  }

  h1,
  h2 {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    color: var(--c-text-contrast);
    font-family: 'Georgia', serif;
    font-size: 2em;
    letter-spacing: 1px;
    text-align: center;

    @media (min-width: 30em) {
      font-size: 2em;
    }
  }

  [class*='icon'] {
    display: inline-block;

    svg {
      display: block;
      height: 1.25em;
      width: auto;
      max-width: 1.5em;
      margin-right: 0.675em;
    }
  }
}

.c-container__footerLine {
  text-align: center;
}
</style>
