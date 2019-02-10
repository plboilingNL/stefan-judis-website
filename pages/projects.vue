<template>
  <Container animate="true">
    <h1 slot="headline" tabindex="-1" id="main-headline">Projects</h1>
    <ul class="o-list-grid">
      <li v-for="project in projects" :key="project._id">
        <Project :project="project" :level="2" :style-level="2"/>
      </li>
    </ul>
  </Container>
</template>

<script>
import Container from '~/components/Container.vue';
import DynamicHeadline from '~/components/DynamicHeadline.vue';
import Project from '~/components/Project.vue';
import { createPage } from '~/lib/basepage.js';

export default createPage({
  async fetch({ app, store, env }) {
    const { getProjects } = app.contentful;

    await getProjects();
  },
  computed: {
    projects() {
      return this.$store.state.projects.list;
    }
  },
  head() {
    return {
      title: 'Projects | Stefan Judis Web Development',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `A collection of side projects that keep me busy.`
        }
      ]
    };
  },
  components: {
    Container,
    DynamicHeadline,
    Project
  }
});
</script>
