<template>
  <section class="c-newsletter">
    <svg
      class="c-newsletter__icon"
      width="66"
      height="43"
      viewBox="0 0 66 43"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" fill-rule="evenodd">
        <path
          d="M27.5 13.7c-3.1 0-5.6 2.5-5.6 5.6 0 1 .3 2 .8 2.9l.3.5 10 12.7 10-12.9c.7-1 1.1-2.1 1.1-3.3 0-3.1-2.5-5.6-5.6-5.6-2.2 0-4.1 1.2-5 3.2-.1.2-.2.3-.4.3s-.4-.1-.4-.3c-1.1-1.9-3-3.1-5.2-3.1z"
          fill="#4AA9E8"
          fill-rule="nonzero"
        ></path>
        <path
          d="M38.8 13.7c3.3 0 6 2.5 6 5.6 0 1-.3 2-.9 2.9l-.3.5-10.8 12.6-.8-1c11.8-14.7 6.8-20.6 6.8-20.6z"
          fill="#1D7CBB"
          fill-rule="nonzero"
        ></path>
        <path
          d="M27.5 13.7c-3.1 0-5.6 2.5-5.6 5.6 0 1 .3 2 .8 2.9l.3.5 10 12.7 10-12.9c.7-1 1.1-2.1 1.1-3.3 0-3.1-2.5-5.6-5.6-5.6-2.2 0-4.1 1.2-5 3.2-.1.2-.2.3-.4.3s-.4-.1-.4-.3c-1.1-1.9-3-3.1-5.2-3.1z"
          stroke="#444"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="svg-stroke-text-color"
        ></path>
        <path
          d="M62.1 41.5H3.9c-1.6 0-2.9-1.3-2.9-2.9V3.2C1 2 2 1 3.2 1h59.4c1.3 0 2.3 1 2.3 2.3v35.3c.1 1.6-1.2 2.9-2.8 2.9z"
          stroke="#5A5A5A"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="svg-stroke-text-color"
        ></path>
      </g>
      <path
        d="M2 2l15 16M64 2L49 18"
        stroke="#5A5A5A"
        stroke-width="2"
        stroke-linecap="round"
        class="svg-stroke-text-color"
      ></path>
    </svg>
    <div class="c-newsletter__container">
      <h4 class="c-newsletter__headline">Join the newsletter and subscribe to the latest content!</h4>
      <form
        action="https://tinyletter.com/stefanjudis"
        method="post"
        target="popupwindow"
        onsubmit="window.open('https://tinyletter.com/stefanjudis', 'popupwindow', 'scrollbars=yes,width=800,height=600');return true"
      >
        <label class="c-newsletter__label" for="tlemail">Email address</label>
        <p class="c-newsletter__controls">
          <input type="email" name="email" id="tlemail" placeholder="janedoe@example.com" required>
          <input type="hidden" value="1" name="embed">
          <button type="submit" class="o-btn o-btn--small">Subscribe</button>
        </p>
      </form>
    </div>
  </section>
</template>

<style>
.c-newsletter {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 2em 1em;

  &__container {
    flex: 1 0 75%;
  }

  &__controls {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 0;

    input {
      padding: 0.25em;
      font-size: 1em;
      width: calc(80% - 1em);
      border: 2px solid var(--grey);
      border-radius: 0.25em;
      background: transparent;
    }

    * {
      margin: 0.25em 0;
    }
  }

  &__headline {
    margin: 0;
  }

  &__label {
    font-size: 0.75em;
  }

  &__icon {
    width: 4em;
    height: auto;
    margin: 1em 2em 1em 0;
  }
}

.svg-stroke-text-color {
  stroke: var(--c-text);
}
</style>
