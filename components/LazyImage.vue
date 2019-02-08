<template>
  <figure role="group" class="c-lazyImage" :style="{ paddingTop: `${ratio * 100}%` }">
    <div class="c-lazyImage--sqip" v-html="preview"></div>
    <img v-if="ready && !load" :src="imageSrc" :alt="asset.fields.title">
    <picture v-if="load">
      <source type="image/webp" :srcset="`${asset.fields.file.url}?fm=webp`">
      <img :src="asset.fields.file.url" :alt="asset.fields.title">
    </picture>
  </figure>
</template>

<script>
import { supportsWebp } from '~/plugins/feature-detects.js';
import imageMap from '~/data/image-map.js';

export default {
  mounted() {
    supportsWebp().then(supportsWebp => {
      const neededImageWidth = Math.floor(
        this.$el.getBoundingClientRect().width * window.devicePixelRatio
      );
      this.imageSrc = `${
        this.asset.fields.file.url
      }?w=${neededImageWidth}&h=${Math.round(
        neededImageWidth * this.ratio
      )}&fit=fill${supportsWebp ? '&fm=webp' : ''}`;

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
      preview: imageMap[this.asset.sys.id] || null
    };
  },

  props: ['asset', 'ratio', 'load']
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

  background: #fff;

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
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;

    svg {
      position: absolute;
      top: -10px;
      left: -10px;
      width: calc(100% + 20px);
      height: calc(100% + 20px);
      filter: blur(10px);
    }
  }
}
</style>
