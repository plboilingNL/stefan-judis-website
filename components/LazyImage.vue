<template>
  <figure role="group" class="c-lazyImage" :style="{ paddingTop: `${ratio * 100}%` }">
    <img v-if="preview" :src="preview" class="c-lazyImage--sqip" alt aria-hidden="true">
    <img v-if="ready" :src="imageSrc" :alt="asset.title">
  </figure>
</template>

<script>
import { supportsWebp } from '~/plugins/feature-detects.js';

export default {
  mounted() {
    import(/* webpackMode: "eager" */ `~/sqip/${this.asset._id}-${
      this.asset._revision
    }.svg`).then(svgPath => {
      console.log(svgPath);
      this.preview = svgPath.default;
    });

    supportsWebp().then(supportsWebp => {
      const neededImageWidth = Math.floor(
        this.$el.getBoundingClientRect().width * window.devicePixelRatio
      );
      const saveDataIsEnabled =
        window.navigator.connection && navigator.connection.saveData === true;

      this.imageSrc = `${
        this.asset.file.url
      }?w=${neededImageWidth}&h=${Math.round(
        neededImageWidth * this.ratio
      )}&fit=fill${supportsWebp ? '&fm=webp' : ''}${
        saveDataIsEnabled ? '&q=10' : ''
      }`;

      if (window.IntersectionObserver && !this.load) {
        const observer = new IntersectionObserver(
          entries => {
            entries.forEach(entry => {
              if (entry.intersectionRatio > 0) {
                const image = document.createElement('img');

                image.onload = () => {
                  this.ready = true;
                };

                image.src = this.imageSrc;
                observer.unobserve(this.$el);
              }
            });
          },
          { threshold: 0 }
        );

        observer.observe(this.$el);
      } else {
        this.ready = true;
      }
    });
  },

  data() {
    return {
      ready: false,
      imageSrc: null,
      preview: null
    };
  },

  props: ['asset', 'ratio']
};
</script>

<style lang="postcss">
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.c-lazyImage {
  position: relative;
  margin: 0;
  padding: 0;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: #f4f4f4;
    filter: blur(10px);
  }

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    animation: 0.75s fadeIn;
  }

  &--bg {
    position: absolute;
    text-align: center;
    font-size: 0.875em;
    color: #595959;

    > p {
      margin: 0.25em;
    }

    > svg {
      width: 2.5em;
      height: 2.5em;
      fill: currentColor;
    }

    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);
  }

  &--sqip {
    filter: blur(10px);
  }
}
</style>
