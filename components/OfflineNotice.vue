<template functional>
  <div class="c-offlineNotice" role="alert">You're offline...</div>
</template>

<style lang="postcss">
.c-offlineNotice {
  position: absolute;
  display: grid;
  place-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 3.5em;
  text-align: center;
  padding: 0.5em;
  background: var(--grey-bright);

  @media (min-width: 52em) {
    top: 4em;
  }
}
</style>
