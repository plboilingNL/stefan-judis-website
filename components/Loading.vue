<template>
  <div class="c-logo">
    <nuxt-link :to="'/'" aria-label="Home" :class="[loading ? 'is-loading': '']">
      <svg aria-hidden="true" width="36" height="36" viewbox="0 0 436 400" xmlns="http://www.w3.org/2000/svg"><path d="M228.682 396.419c-6.504 4.687-15.042 4.578-21.4 0C198.852 390.279 0 244.327 0 128.75 0 48.308 59.55.239 117.102.239c34.553 0 75.21 17.876 100.898 64.819C243.615 18.115 284.308.239 318.861.239 376.45.24 436 48.309 436 128.751c0 115.576-198.889 261.527-207.318 267.668z" fill="#fff"/></svg>
    </nuxt-link>
  </div>
</template>

<script>
  export default {
    data: () => ({
      loading: false
    }),
    methods: {
      start () {
        this.loading = true
      },
      finish () {
        this.loading = false
      }
    }
  }
</script>
<style lang="scss">
  .c-logo {
    --logo-size: 4em;

    width: var(--logo-size);
    height: var(--logo-size);
    margin : 1.5em auto 0;
  }

  @media (min-width: 38em) {
    .c-logo {
      --logo-size: 2.25em;

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
    width: 100%;
    height: 100%;
    padding: 1em;

    border-radius: 50%;
    overflow: hidden;
    background: linear-gradient(
      to bottom,
      var(--blue-bright) 0%,
      var(--blue-bright) 33.33%,
      var(--green-bright) 33.33%,
      var(--green-bright) 66.66%,
      var(--red-bright) 66.66%,
      var(--red-bright) 100%
    );
    background-repeat: repeat;
    background-size: 100% 100%;
    background-position: 0 0;
    animation: animatedBackground 2.5s linear infinite;
    animation-play-state: paused;
    box-shadow: 0 0 1em #fff;
    // TODO fix this
    transition: box-shadow 1.25s;


    &.is-loading {
      animation-play-state: running;
      box-shadow: 0 0 1em #888;
    }

    @media (min-width: 38em) {
      width: 2.25em;
      height: 2.25em;
      margin: 0;
      padding: .55em;
    }
  }

  .c-logo svg {
    width: 100%;
    height: 100%;
  }

  @keyframes animatedBackground {
    from {
      background-position-y: 0px; }

    to {
      background-position-y: var(--logo-size); }
  }
</style>
