<template>
  <div class="c-tile">
    <div class="c-tile__container">
      <PrettyDate v-if="post.fields.date && showDate" :date="post.fields.date" class="dt-published"></PrettyDate>

      <DynamicHeadline
        :level="level"
        :url="`/${linkPrefix}/${post.fields.slug}/`"
        class="p-name"
        :id="post.fields.title | idAlize"
      >{{ post.fields.title }}</DynamicHeadline>

      <p v-if="showDescription">{{ post.fields.description }}</p>
      <Marked v-if="showExcerpt" :markdown="post.fields.excerpt"></Marked>

      <div class="u-marginTopAuto u-paddingTopMedium">
        <Topics :topics="post.fields.topics"/>
      </div>
    </div>
  </div>
</template>

<script>
import PrettyDate from '~/components/PrettyDate.vue';
import LazyImage from '~/components/LazyImage.vue';
import DynamicHeadline from '~/components/DynamicHeadline.vue';
import Topics from '~/components/Topics.vue';

export default {
  props: ['post', 'showDescription', 'showExcerpt', 'showDate', 'level'],
  computed: {
    contentTypeId() {
      return this.post.sys.contentType.sys.id;
    },
    headingLevel() {
      return this.level || 2;
    },
    linkPrefix() {
      // TODO put this somewhere else
      const PREFIXES = {
        '2wKn6yEnZewu2SCCkus4as': 'blog',
        tilPost: 'today-i-learned'
      };
      return PREFIXES[this.contentTypeId];
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
