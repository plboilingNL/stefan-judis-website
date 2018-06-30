<template>
  <div :class="classes">
    <div class="c-tile__container">
      <div v-if="contentTypeId === 'screenCast'" class="c-tile__image">
        <lazy-image :asset="post.fields.coverImage" :ratio="0.5625"></lazy-image>
      </div>

      <PrettyDate v-if="post.fields.date && showDate" :date="post.fields.date" class="dt-published"></PrettyDate>

      <DynamicHeadline :level="level" :url="`/${linkPrefix}/${post.fields.slug}/`" class="p-name">{{ post.fields.title }}</DynamicHeadline>

      <p v-if="showDescription">{{ post.fields.description }}</p>
      <Marked v-if="showExcerpt" :markdown="post.fields.excerpt"></Marked>

      <div class="u-marginTopAuto u-paddingTopMedium">
        <Topics :topics="post.fields.topics" />
      </div>

      <div class="c-tile__footer">
        <nuxt-link :to="`/${linkPrefix}/${post.fields.slug}/`" :aria-labelledby="post.fields.title | idAlize">Read more</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import PrettyDate from '~/components/PrettyDate.vue';
import Marked from '~/components/Marked.vue';
import LazyImage from '~/components/LazyImage.vue';
import DynamicHeadline from '~/components/DynamicHeadline.vue';
import Topics from '~/components/Topics.vue';

export default {
  props: [
    'post',
    'showDescription',
    'showExcerpt',
    'showDate',
    'level',
    'color'
  ],
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
    },
    classes() {
      const isHighlighted =
        this.contentTypeId !== 'screenCast' && this.contentTypeId !== 'talk';

      return [
        'c-tile',
        `c-tile__${this.color || 'red'}`,
        isHighlighted ? '' : 'c-tile--noHighlight',
        this.post.fields.isDraft ? 'is-draft' : null
      ];
    }
  },
  components: {
    DynamicHeadline,
    PrettyDate,
    LazyImage,
    Marked,
    Topics
  }
};
</script>
