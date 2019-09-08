<template>
  <Container v-if="page" animate="true" :additional-class="page.slug" accessible-line-length="true">
    <DynamicHeadline slot="headline" :level="1" id="main-headline">{{ page.title }}</DynamicHeadline>
    <p slot="subHeadline" v-if="page.isResource">
      <strong class="u-color-catchy">
        Last updated at:
        <PrettyDate v-if="page.isResource" slot="date" :date="page._updatedAt"></PrettyDate>
      </strong>
    </p>
    <div class="c-tile">
      <div class="c-tile__container">
        <Marked :markdown="page.body" class="e-content"></Marked>
      </div>
    </div>
  </Container>
</template>

<script>
import Container from '~/components/Container.vue';
import DynamicHeadline from '~/components/DynamicHeadline.vue';
import PrettyDate from '~/components/PrettyDate.vue';
import { createPage, getHeadForPost } from '~/lib/basepage.js';

export default createPage({
  async fetch({ app, store, params, redirect }) {
    await app.contentful.getLandingpages();
    store.commit('landingpages/setActiveWithSlug', params.slug);

    if (!store.state.landingpages.active) {
      return redirect('/404/');
    }
  },
  computed: {
    page() {
      return this.$store.state.landingpages.active;
    }
  },
  head() {
    return this.page ? getHeadForPost(this.page) : {};
  },
  components: {
    Container,
    DynamicHeadline,
    Marked: () => import('~/components/Marked.vue'),
    PrettyDate
  }
});
</script>

<style lang="postcss">
.useful-talk-quotes {
  blockquote {
    font-weight: bold;

    + p {
      margin: -0.5em 0 2em;
    }
  }
}
</style>
