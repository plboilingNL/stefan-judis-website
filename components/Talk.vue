<template>
  <div class="u-flex-column u-height-100">
    <div class="u-marginBottomSmall" v-if="showImage">
      <lazy-image :asset="talk.fields.thumbnail" :ratio="0.5625"></lazy-image>
    </div>

    <div class="u-marginBottomSmall">
      <h3
        :id="talk.fields.title | idAlize"
        class="o-headline-3 o-headline__inline"
      >{{ talk.fields.title }}</h3>
      <span class="u-noWrap">
        <span>
          (
          <a
            v-if="talk.fields.slideUrl"
            :href="talk.fields.slideUrl"
            class="fancy-link"
            :aria-describedby="talk.fields.title | idAlize"
          >Slides</a>
          <span v-if="talk.fields.videoUrl">
            /
            <a
              :href="talk.fields.videoUrl"
              class="fancy-link"
              :aria-describedby="talk.fields.title | idAlize"
            >Recording</a>
          </span>
          )
        </span>
      </span>
    </div>

    <div class="u-marginTopAuto">
      <Topics :topics="talk.fields.topics"/>
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

