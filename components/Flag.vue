<template functional>
  <span
    class="flag"
  >{{ String.fromCodePoint(...[0, 1].map(i => props.code.codePointAt(i) + '🇦'.codePointAt(0) - 'A'.codePointAt(0) )) }}</span>
</template>

<style>
.flag {
  font-size: 1.5em;
  margin: 0 0.25em -0.25em 0;
}
</style>
