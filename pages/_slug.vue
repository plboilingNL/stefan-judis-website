<template>
  <!-- the v-if is needed for 404 on ntlify -->
  <Container
    v-if="page"
    animate="true"
    :additional-class="page.slug"
    accessible-line-length="true"
  >
    <DynamicHeadline slot="headline" :level="1" id="main-headline">{{
      page.title
    }}</DynamicHeadline>
    <p slot="subHeadline" v-if="page.isResource">
      <strong class="u-color-catchy">
        Last updated at:
        <PrettyDate
          v-if="page.isResource"
          slot="date"
          :date="page._updatedAt"
        ></PrettyDate>
      </strong>
    </p>
    <CarbonAds :loadAd="IS_PRODUCTION" />
    <div class="c-tile">
      <div class="c-tile__container">
        <Marked :markdown="page.body" class="e-content"></Marked>
      </div>
    </div>
  </Container>
</template>

<script>
import CarbonAds from '~/components/CarbonAds.vue';
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
  data() {
    return {
      IS_PRODUCTION: process.env.IS_PRODUCTION
    };
  },
  head() {
    return this.page ? getHeadForPost(this.page) : {};
  },
  components: {
    CarbonAds,
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
