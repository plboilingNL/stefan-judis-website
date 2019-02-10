<template>
  <section class="c-newsletter">
    <div class="c-newsletter__container">
      <form
        action="https://tinyletter.com/stefanjudis"
        method="post"
        target="popupwindow"
        onsubmit="window.open('https://tinyletter.com/stefanjudis', 'popupwindow', 'scrollbars=yes,width=800,height=600');return true"
        class="u-textAlignLeft"
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

<style lang="postcss">
.c-newsletter {
  &__container {
    flex: 1 0 75%;
  }

  &__controls {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 0 0 1em;

    input {
      padding: 0.25em 0.5em;
      font-size: 1em;
      width: 80%;
      border: 2px solid var(--grey);
      border-radius: 0.25em;
      background: transparent;
    }

    * {
      margin: 0.25em 0;
    }
  }

  &__label {
    display: block;
    margin: 0.5em 0 0 0.5em;
  }

  &__icon {
    display: block;
    width: 4em;
    height: auto;
    margin: 1em auto 1em;
  }
}
</style>
