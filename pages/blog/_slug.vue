<template>
  <Container animate="true" accessible-line-length="true" additional-class="h-entry">
    <h1 slot="headline" tabindex="-1" id="main-headline">{{ post.title }}</h1>
    <span slot="subHeadline">
      <PageDetails :post="post" />
      <p v-if="post.externalUrl" class="o-highlightBox">
        <svg-icon class="o-highlightBox__icon" name="attention" />
        <span>
          This article was initially posted on
          <a
            :href="post.externalUrl"
            :aria-labelledby="post.title | idAlize"
            class="fancy-link"
          >{{ post.externalUrl | externalUrl }}</a>.
        </span>
      </p>
    </span>

    <Marked :markdown="post.body"></Marked>

    <div class="u-marginTopLarge u-marginBottomLarge u-textAlignCenter">
      <a :href="sharingUrl" class="o-btn" target="_blank" rel="noopener noreferrer">
        <svg-icon name="share" aria-hidden="true" />Share article on Twitter
      </a>
      <a
        href="https://twitter.com/stefanjudis"
        class="fancy-link u-marginLeftMedium u-noWrap"
      >... or say Hi! 👋</a>
    </div>

    <div v-if="post.topics && post.topics.length" class="u-marginBottomSmall">
      <h3>Related Topics</h3>
      <Topics :topics="post.topics" />
    </div>

    <RelatedItems :items="posts" :item="post" slug="blog" class="u-marginBottomSmall" />

    <Comments class="u-marginTopLarge u-marginBottomMedium" />
  </Container>
</template>

<script>
import Container from '~/components/Container.vue';
import Comments from '~/components/Comments.vue';
import DynamicHeadline from '~/components/DynamicHeadline.vue';
import RelatedItems from '~/components/RelatedItems.vue';
import Topics from '~/components/Topics.vue';
import { createPage, getHeadForPost } from '~/lib/basepage.js';
import { getSharingUrl } from '~/lib/util.js';
import PageDetails from '~/components/PageDetails.vue';

export default createPage({
  async fetch({ app, params, store, redirect }) {
    await app.contentful.getPost(params.slug);

    if (!store.state.posts.active) {
      return redirect('/404/');
    }
  },
  computed: {
    post() {
      return this.$store.state.posts.active;
    },
    posts() {
      return this.$store.state.posts.list;
    },
    sharingUrl() {
      return getSharingUrl(this.post.title, this.$route.fullPath);
    }
  },
  head() {
    return getHeadForPost(this.post);
  },
  components: {
    Container,
    Comments,
    DynamicHeadline,
    PageDetails,
    Marked: () => import('~/components/Marked.vue'),
    RelatedItems,
    Topics
  }
});
</script>
