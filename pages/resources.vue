<template>
  <Container animate="true">
    <h1 slot="headline" tabindex="-1" id="main-headline">Resources</h1>
    <ul class="o-list-grid">
      <li v-for="resource in resources" :key="resource._id">
        <div class="c-tile">
          <div class="c-tile__container">
            <DynamicHeadline
              :level="2"
              :url="`/${resource.slug}/`"
              class="o-headline-2"
              :id="resource.title | idAlize"
            >{{ resource.title }}</DynamicHeadline>
            <p class="u-marginTopAuto">{{ resource.description }}</p>
          </div>
        </div>
      </li>
    </ul>
  </Container>
</template>

<script>
import Container from '~/components/Container.vue';
import DynamicHeadline from '~/components/DynamicHeadline.vue';
import { createPage } from '~/lib/basepage.js';

export default createPage({
  async fetch({ app, store, env }) {
    const { getResources } = app.contentful;

    await getResources();
  },
  computed: {
    resources() {
      return this.$store.state.resources.list;
    }
  },
  head() {
    return {
      title: 'Resources | Stefan Judis Web Development',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `A collection of resources I think are valuable.`
        }
      ]
    };
  },
  components: {
    Container,
    DynamicHeadline
  }
});
</script>
