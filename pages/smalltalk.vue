<template>
  <Container animate="true">
    <h1 slot="headline" tabindex="-1" id="main-headline">Developer Smalltalk</h1>
    <ul class="o-list-grid">
      <li v-for="screencast in screenCasts" :key="screencast.sys.id">
        <Screen-cast :screencast="screencast"/>
      </li>
    </ul>
  </Container>
</template>

<script>
import Container from '~/components/Container.vue';
import ScreenCast from '~/components/ScreenCast.vue';
import { createPage } from '~/lib/basepage.js';

export default createPage({
  async fetch({ app, store, env }) {
    const { getScreencasts } = app.contentful;

    await Promise.all([getScreencasts()]);
  },
  computed: {
    screenCasts() {
      return this.$store.state.screencasts.list;
    }
  },
  head() {
    return {
      title: `Smalltalk | Stefan Judis Web Development`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `Listing short developer interviews.`
        }
      ]
    };
  },
  components: {
    Container,
    ScreenCast
  }
});
</script>

<style>
.c-project {
  img {
    display: block;
    max-height: 6em;
    margin: 0 auto 1em;
  }
}
</style>
