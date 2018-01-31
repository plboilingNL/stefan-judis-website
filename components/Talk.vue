<template>
  <div class="c-tile c-tile--noHighlight h-entry">
    <!-- this is container is needed because of a FF bug -->
    <div class="c-tile__image">
      <lazy-image :asset="talk.fields.thumbnail" :ratio="0.5625"></lazy-image>
    </div>
    <button v-if="talk.fields.info" type="button" @click="toggleOverlay" class="c-tile__overlayToggle o-btn o-btn--tiny u-noShadow" aria-label="Show information">
      Details
    </button>
    <h3>{{ talk.fields.title }}</h3>
    <p class="u-marginTopAuto u-noMarginBottom u-flex">
      <a v-if="talk.fields.slideUrl" :href="talk.fields.slideUrl" class="o-btn o-btn--small u-marginRightSmall">Slides</a>
      <a v-if="talk.fields.videoUrl" :href="talk.fields.videoUrl" class="o-btn o-btn--small">Recording</a>
    </p>

    <transition name="t-tileOverlay">
      <div v-if="showOverlay" class="c-tile__overlay">
        <button type="button" @click="toggleOverlay" class="c-tile__overlayToggle o-btn--icon" aria-label="Close talk information">
          <Icon name="Close"></Icon>
        </button>
        <p>{{ talk.fields.info }}</p>
      </div>
    </transition>
  </div>
</template>

<script>
  import Icon from '~/components/Icon.vue'
  import LazyImage from '~/components/LazyImage.vue'

  export default {
    props: ['talk'],
    data () {
      return {
        showOverlay: false
      }
    },
    methods: {
      toggleOverlay () {
        this.showOverlay = !this.showOverlay
      }
    },
    components: {
      Icon,
      LazyImage
    }
  }
</script>

