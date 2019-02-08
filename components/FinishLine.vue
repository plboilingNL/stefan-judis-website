<template>
  <div class="c-finishLine">
    <div class="c-finishLine__text">
      <span class="c-finishLine__title">
        This page is built with the CNN stack (
        <a href="https://www.contentful.com">Contentful</a>,
        <a href="https://nuxtjs.org/">Nuxt</a> &amp;
        <a href="https://www.netlify.com">Netlify</a> )
      </span>
      <span class="c-finishLine__value">
        and loaded in
        <strong class="c-finishLine__number"></strong>
      </span>.
    </div>
    <div>© 2019 Copyright Stefan Judis. All rights reserved.</div>
    <script>
      // shamelessly stolen from Tim Kadlec
      // TODO give credits
      window.onload = function() {
        setTimeout(function() {
          window.performance =
            window.performance ||
            window.mozPerformance ||
            window.msPerformance ||
            window.webkitPerformance ||
            {};
          var t = performance.timing || {};

          if (!t) {
            return;
          }
          var start = t.navigationStart;
          var end = t.loadEventEnd;
          var loadTime = (end - start) / 1000;
          var numberContainer = document.querySelector('.c-finishLine__value');
          numberContainer.innerHTML += loadTime + 's';
          document.querySelector('.c-finishLine__value').classList.add('is-loaded');
        }, 0);
      };
    </script>
  </div>
</template>

<script>
export default {
  components: {
    Icon: () => import('~/components/Icon.vue')
  }
};
</script>


<style lang="postcss">
.c-finishLine {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  font-size: 0.75em;
  text-align: center;
  background: var(--c-background-contrast);
  color: var(--c-text-contrast);
  border-top: 1px solid var(--grey);

  > * {
    margin-top: 1em;
  }

  &__value {
    display: none;

    &.is-loaded {
      display: inline;
    }
  }
}
</style>
