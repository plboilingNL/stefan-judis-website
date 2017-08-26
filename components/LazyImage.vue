<template>
  <figure class="c-lazyImage" :style="{ paddingTop: `${ratio}%`}">
    <div class="c-lazyImage--bg">
      <svg width="872" height="872" viewBox="0 0 872 872" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M436 0C195.582 0 0 195.582 0 436c0 240.381 195.582 436 436 436 240.381 0 436-195.619 436-436C872 195.582 676.381 0 436 0zm10.682 653.419c-6.504 4.687-15.042 4.578-21.4 0C416.852 647.279 218 501.327 218 385.75c0-80.442 59.55-128.511 117.102-128.511 34.553 0 75.21 17.876 100.898 64.819 25.615-46.943 66.308-64.819 100.861-64.819C594.45 257.24 654 305.309 654 385.751c0 115.576-198.889 261.527-207.318 267.668z"></path></svg>
      <p>Loading ...</p>
    </div>

    <img v-if="ready" :src="imageSrc" :alt="asset.fields.title">
    <noscript>
      <img :src="asset.fields.file.url" :alt="asset.fields.title">
    </noscript>
  </figure>
</template>

<script>
  export default {
    mounted () {
      const neededImageWidth = Math.floor(this.$el.getBoundingClientRect().width * window.devicePixelRatio)

      this.ratio = this.asset.fields.file.details.image.height / this.asset.fields.file.details.image.width * 100
      this.imageSrc = `${this.asset.fields.file.url}?w=${neededImageWidth}`

      if (window.IntersectionObserver) {
        const observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (entry.intersectionRatio > 0) {
              const image = document.createElement('img')

              image.onload = () => {
                this.ready = true
              }

              image.src = this.imageSrc
              observer.unobserve(this.$el)
            }
          })
        }, {threshold: 0})

        observer.observe(this.$el)
      } else {
        this.ready = true
      }
    },

    data () {
      return {
        ready: false,
        imageSrc: null,
        ratio: 56.25
      }
    },

    props: ['asset']
  }
</script>

<style lang="scss">
  .c-lazyImage {
    position: relative;
    margin: 0;
    padding: 0;

    background: #fff;
    box-shadow: 0 0.05em 0.0625em #888;

    img {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }

    &--bg {
      position: absolute;
      text-align: center;
      font-size: .875em;
      color: #595959;

      > p {
        margin: .25em;
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
  }
</style>
