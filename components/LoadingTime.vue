<template>
  <div class="c-loadingTime">
    <script>
      // shamelessly stolen from Tim Kadlec
      // TODO give credits
      window.onload = function () {
        setTimeout(function () {
          window.performance = window.performance || window.mozPerformance || window.msPerformance || window.webkitPerformance || {}
          var t = performance.timing || {}

          if (!t) {
            return
          }
          var start = t.navigationStart
          var end = t.loadEventEnd
          var loadTime = (end - start) / 1000
          var container = document.querySelector('.c-loadingTime')
          container.innerHTML += 'Loadtime: ' + loadTime + 's.'
          container.classList.add('is-loaded')
        }, 0)
      }
    </script>
  </div>
</template>

<style lang="scss">
.c-loadingTime {
  display: none;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;

  @media (min-width: 47em) {
    right: 1em;
    left: auto;
    bottom: 3em;
    width: 11em;
    padding: .5em 1em;
    box-shadow: var(--shadow-tile);
  }

  &.is-loaded {
    display: block;
  }
}
</style>
