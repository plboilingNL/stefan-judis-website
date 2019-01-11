<template>
  <div class="c-tile">
    <div class="c-tile__container">
      <!-- this is container is needed because of a FF bug -->
      <div class="c-tile__image">
        <lazy-image :asset="talk.fields.thumbnail" :ratio="0.5625"></lazy-image>
        <div class="c-tile__imageActions">
          <a
            v-if="talk.fields.slideUrl"
            :href="talk.fields.slideUrl"
            class="o-btn o-btn--floating u-marginHorizontalSmall"
          >Slides</a>
          <a
            v-if="talk.fields.videoUrl"
            :href="talk.fields.videoUrl"
            class="o-btn o-btn--floating u-marginHorizontalSmall"
          >Recording</a>
        </div>
      </div>
      <h3 class="c-tile__headline o-headline-3">{{ talk.fields.title }}</h3>

      <div class="u-marginTopAuto u-paddingTopMedium">
        <Topics :topics="talk.fields.topics"/>
      </div>
    </div>
  </div>
</template>

<script>
import LazyImage from '~/components/LazyImage.vue';
import Topics from '~/components/Topics.vue';

export default {
  props: ['talk'],
  components: {
    LazyImage,
    Marked: () => import('~/components/Marked.vue'),
    Topics
  }
};
</script>

