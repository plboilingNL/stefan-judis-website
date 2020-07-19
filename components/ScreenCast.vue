<template>
  <div class="c-screencast u-flex-column u-height-100">
    <div class="u-marginBottomMedium" v-if="showImage">
      <lazy-image :asset="screencast.coverImage" :ratio="0.5625" />
      <div class="c-screencast__date c-screencast__Imagedate">
        <pretty-date :date="screencast.date"></pretty-date>
      </div>
    </div>

    <pretty-date v-if="!showImage" class="c-screencast__date" :date="screencast.date"></pretty-date>
    <DynamicHeadline
      :level="3"
      :url="screencast.url"
      :id="screencast.title | idAlize"
    >{{ screencast.title }}</DynamicHeadline>
    <div class="u-marginTopAuto">
      <Topics :topics="screencast.topics" />
    </div>
  </div>
</template>

<script>
import DynamicHeadline from '~/components/DynamicHeadline.vue';
import LazyImage from '~/components/LazyImage.vue';
import PrettyDate from '~/components/PrettyDate.vue';
import Topics from '~/components/Topics.vue';

export default {
  props: ['screencast', 'showImage'],
  components: {
    DynamicHeadline,
    LazyImage,
    PrettyDate,
    Topics
  }
};
</script>

<style lang="postcss">
.c-screencast {
  position: relative;

  &__date {
    font-size: 0.875em;
  }

  &__Imagedate {
    position: absolute;
    top: 0.5em;
    left: 0.5em;
    padding: 0.125em 0.375em;
    background: var(--white);
    border-radius: 0.125em;
  }
}
</style>

