<template>
  <div class="c-post">
    <PrettyDate v-if="post.date && showDate" :date="post.date" class="dt-published"></PrettyDate>

    <DynamicHeadline
      :level="level"
      :style-level="styleLevel"
      :url="`/${linkPrefix}/${post.slug}/`"
      :id="post.title | idAlize"
    >{{ post.title }}</DynamicHeadline>

    <Marked v-if="showExcerpt" :markdown="post.excerpt"></Marked>

    <Topics :topics="post.topics"/>
  </div>
</template>

<script>
import PrettyDate from '~/components/PrettyDate.vue';
import LazyImage from '~/components/LazyImage.vue';
import DynamicHeadline from '~/components/DynamicHeadline.vue';
import Topics from '~/components/Topics.vue';

export default {
  props: ['post', 'showExcerpt', 'showDate', 'level', 'styleLevel'],
  computed: {
    headingLevel() {
      return this.level || 2;
    },
    linkPrefix() {
      // TODO put this somewhere else
      const PREFIXES = {
        '2wKn6yEnZewu2SCCkus4as': 'blog',
        tilPost: 'today-i-learned'
      };
      return PREFIXES[this.post._ctId];
    }
  },
  components: {
    DynamicHeadline,
    PrettyDate,
    LazyImage,
    Marked: () => import('~/components/Marked.vue'),
    Topics
  }
};
</script>

<style lang="postcss">
.c-post {
  time {
    font-size: 0.875em;
    color: var(--grey);
  }
}
</style>
