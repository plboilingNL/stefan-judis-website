<template>
  <Container animate="true">
    <h1 slot="headline" tabindex="-1" id="main-headline">Developer Smalltalk</h1>
    <h2>Tools, tools, tools</h2>
    <ul class="o-list-grid">
      <li v-for="screencast in tools" :key="screencast._id">
        <Screen-cast :screencast="screencast" :show-image="true" />
      </li>
    </ul>
    <h2 class="u-marginTopLarge">Learning emacs</h2>
    <ul class="o-list-grid">
      <li v-for="screencast in emacs" :key="screencast._id">
        <Screen-cast :screencast="screencast" :show-image="true" />
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
    emacs() {
      return this.$store.state.screencasts.list.filter(
        entry => entry.list === 'emacs'
      );
    },
    tools() {
      return this.$store.state.screencasts.list.filter(
        entry => entry.list === 'tools'
      );
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

<style lang="postcss">
.c-project {
  img {
    display: block;
    max-height: 6em;
    margin: 0 auto 1em;
  }
}
</style>
