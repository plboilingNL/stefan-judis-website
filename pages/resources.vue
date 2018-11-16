<template>
  <Container animate="true">
    <h1 slot="headline" tabindex="-1">Resources</h1>
    <ul class="o-list-grid">
      <li v-for="resource in resources" :key="resource.sys.id">
        <div class="c-tile">
          <div class="c-tile__container">
            <DynamicHeadline :level="2" :url="`/${resource.fields.slug}/`" class="o-headline-2" :id="resource.fields.title | idAlize">{{ resource.fields.title }}</DynamicHeadline>
            <p class="u-marginTopAuto">{{ resource.fields.description }}</p>
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

    await Promise.all([getResources()]);
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
          content: `A collection of resources I keep collecting.`
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
