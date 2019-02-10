
<template>
  <div class="u-flex-column u-height-100">
    <DynamicHeadline :url="project.url" :level="level" :style-level="styleLevel">{{ project.title }}</DynamicHeadline>
    <Marked :markdown="project.description"></Marked>

    <Topics :topics="project.topics" class="u-marginTopAuto"/>
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

