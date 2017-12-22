<template>
  <div class="c-logo">
    <nuxt-link :to="'/'" aria-label="Home">
      <svg aria-hidden="true" width="872" height="872" viewBox="0 0 872 872" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><title>heart circle</title><defs><path id="a" d="M164 112h558v587.42H164z"/><linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="b"><stop stop-color="#3A99D8" offset="0%"/><stop stop-color="#3A99D8" offset="31.766%"/><stop stop-color="#29BB9C" offset="32.091%"/><stop stop-color="#29BB9C" offset="69.99%"/><stop stop-color="#E54D42" offset="70%"/><stop stop-color="#E54D42" offset="100%"/></linearGradient></defs><g fill="none" fill-rule="evenodd"><use fill="#FFF" xlink:href="#a"/><path stroke="#979797" d="M164.5 112.5h557v586.42h-557z"/><g fill-rule="nonzero" fill="url(#b)"><path d="M436 0C195.582 0 0 195.582 0 436c0 240.381 195.582 436 436 436 240.381 0 436-195.619 436-436C872 195.582 676.381 0 436 0zm10.682 653.419c-6.504 4.687-15.042 4.578-21.4 0C416.852 647.279 218 501.327 218 385.75c0-80.442 59.55-128.511 117.102-128.511 34.553 0 75.21 17.876 100.898 64.819 25.615-46.943 66.308-64.819 100.861-64.819C594.45 257.24 654 305.309 654 385.751c0 115.576-198.889 261.527-207.318 267.668z"/></g></g></svg>
    </nuxt-link>
  </div>
</template>

<style lang="scss">
  .c-logo {
    display: flex;
    align-items: center;
    justify-content: center;

    margin : 0 2em;

    background: linear-gradient(
      to bottom,
      transparent 48.5%,
      var(--c-theme) 48.5%,
      var(--c-theme) 51%,
      transparent 51%
    );
  }

  @media (min-width: 38em) {
    .c-logo {
      position: absolute;
      left: 2em;
      top: 0.75em;
      margin: 0;
    }
  }

  .is-offline .c-logo {
    filter: grayscale(100%);
  }

  .c-logo a {
    display: block;
    margin: 1em .5em 0;
    width: 4em;
    height: 4em;

    @media (min-width: 38em) {
      width: 2.25em;
      height: 2.25em;
      margin: 0;
    }
  }

  .c-logo svg {
    width: 100%;
    height: 100%;
  }
</style>
