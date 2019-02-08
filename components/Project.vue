
<template>
  <div class="u-flex-column u-height-100">
    <DynamicHeadline
      :url="project.fields.url"
      :level="level"
      :style-level="styleLevel"
    >{{ project.fields.title }}</DynamicHeadline>
    <Marked :markdown="project.fields.description"></Marked>

    <Topics :topics="project.fields.topics" class="u-marginTopAuto"/>
  </div>
</template>

<script>
import DynamicHeadline from '~/components/DynamicHeadline.vue';
import Topics from '~/components/Topics.vue';

export default {
  props: ['project', 'level', 'style-level'],
  components: {
    DynamicHeadline,
    Marked: () => import('~/components/Marked.vue'),
    Topics
  }
};
</script>

