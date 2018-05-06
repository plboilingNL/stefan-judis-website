<template>
  <div :class="{ 'c-tile': true, 'c-tile--noHighlight': true, 'c-tile--layerOpen': showAbstract }" :style="{ height: tileHeight }">
    <div class="c-tile__container">
      <!-- this is container is needed because of a FF bug -->
      <transition name="t-slide-up">
        <div v-show="!showAbstract" class="c-tile__image">
          <lazy-image :asset="talk.fields.thumbnail" :ratio="0.5625"></lazy-image>
          <div class="c-tile__imageActions">
            <a v-if="talk.fields.slideUrl" :href="talk.fields.slideUrl" class="o-btn o-btn--floating u-marginHorizontalSmall">Slides</a>
            <a v-if="talk.fields.videoUrl" :href="talk.fields.videoUrl" class="o-btn o-btn--floating u-marginHorizontalSmall">Recording</a>
          </div>
        </div>
      </transition>
      <transition name="t-slide-down">
        <h3 v-show="!showAbstract" class="c-tile__headline o-headline-3">{{ talk.fields.title }}</h3>
      </transition>

      <div v-if="talk.fields.elevatorPitch && showPitch" class="c-tile__footer">
        <button type="button" @click="toggleAbstract">{{ showAbstract ? 'Hide elevator pitch' : 'Show elevator pitch'}}</button>
      </div>
      <transition name="t-overlay-fade">
        <div v-if="showAbstract" class="c-tile__overlay">
          <Marked :markdown="talk.fields.elevatorPitch" />
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  import LazyImage from '~/components/LazyImage.vue'
  import Marked from '~/components/Marked.vue'

  export default {
    props: ['talk', 'showPitch'],
    methods: {
      toggleAbstract () {
        this.showAbstract = !this.showAbstract

        // make sure that the tile is not get smaller
        this.tileHeight = this.showAbstract
          ? Math.floor(this.$el.getBoundingClientRect().height) + 'px'
          : ''
      }
    },
    data () {
      return {
        showAbstract: false,
        tileHeight: null
      }
    },
    components: {
      LazyImage,
      Marked
    }
  }
</script>

