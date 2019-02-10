<template>
  <div class="u-flex-column u-height-100">
    <div class="u-marginBottomSmall" v-if="showImage">
      <lazy-image :asset="talk.thumbnail" :ratio="0.5625"></lazy-image>
    </div>

    <div class="u-marginBottomSmall">
      <h3 :id="talk.title | idAlize" class="o-headline-3 o-headline__inline">{{ talk.title }}</h3>
      <span class="u-noWrap">
        <span>
          (
          <a
            v-if="talk.slideUrl"
            :href="talk.slideUrl"
            class="fancy-link"
            :aria-describedby="talk.title | idAlize"
          >Slides</a>
          <span v-if="talk.videoUrl">
            /
            <a
              :href="talk.videoUrl"
              class="fancy-link"
              :aria-describedby="talk.title | idAlize"
            >Recording</a>
          </span>
          )
        </span>
      </span>
    </div>

    <div class="u-marginTopAuto">
      <Topics :topics="talk.topics"/>
    </div>
  </div>
</template>

<script>
import LazyImage from '~/components/LazyImage.vue';
import Topics from '~/components/Topics.vue';

export default {
  props: ['talk', 'showImage'],
  components: {
    LazyImage,
    Marked: () => import('~/components/Marked.vue'),
    Topics
  }
};
</script>

