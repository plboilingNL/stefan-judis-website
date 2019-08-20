<template functional>
  <section
    :class="{
      'c-container': true,
      'c-container--noPadding': props.noPadding,
      'c-container--smallPadding': props.smallPadding,
      'c-container--accessibleLineLength': props.accessibleLineLength,
      't-container': props.animate,
      [props.additionalClass]: props.additionalClass || false
    }"
  >
    <div>
      <header
        v-if="$slots.date || $slots.headline || $slots.subHeadline"
        class="c-container__headline"
      >
        <div class="fancy-font">
          <slot name="headline"></slot>
        </div>
        <slot name="subHeadline"></slot>
      </header>
      <slot />

      <div v-if="$slots.footerLine" class="c-container__footerLine">
        <slot name="footerLine"></slot>
      </div>
    </div>
  </section>
</template>

<style lang="postcss">
.c-container {
  & > div {
    max-width: 78em;
    margin: 0 auto;
    padding: 1em var(--grid-outer-padding);
  }
}

.c-container--noPadding > div {
  padding: 0 var(--grid-outer-padding);
}

.c-container--smallPadding > div {
  padding: 1em 2em;
}

.c-container--accessibleLineLength > div {
  max-width: 45em;
  max-width: 62ch;
}

.c-container--noPadding {
  padding: 0;
}

.c-container__headline {
  margin: 3em 0;

  > span {
    display: block;
  }

  span {
    margin-top: -0.125em;
  }

  h1,
  h2 {
    margin: 0 0 0.375em;
    color: var(--c-text-catchy);
    font-size: 2.75em;
    max-width: 12em;
    line-height: 1.2;

    @media (min-width: 38em) {
      font-size: 3.5em;
    }

    svg {
      display: inline-block;
      vertical-align: middle;
      height: 1em;
      width: auto;
      max-width: 1em;
      margin: -0.25em 0.125em 0 0;
    }
  }
}

.c-container__footerLine {
  text-align: center;
}
</style>
