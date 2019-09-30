<template>
  <Container animate="true" accessible-line-length="true" additional-class="h-entry">
    <h1 slot="headline" tabindex="-1" id="main-headline">{{ post.title }}</h1>
    <span slot="subHeadline">
      <PageDetails :post="post" />
      <p class="o-highlightBox">
        <svg-icon class="o-highlightBox__icon" name="megaphone" />
        <span>
          This post is part of my
          <nuxt-link to="/today-i-learned/" class="fancy-link">Today I learned</nuxt-link>
          {{' '}}series in which I share all my learnings regarding web development.
        </span>
      </p>
    </span>
    <div>
      <Marked :markdown="post.body"></Marked>
      <div v-if="(post.video || post.videoWebm)">
        <video
          autoplay
          muted
          loop
          controls
          preload="metadata"
          :class="{ 'is-mobile-video': post.isMobileVideo }"
        >
          <source v-if="post.videoWebm" :src="post.videoWebm.file.url" type="video/webm" />
          <source v-if="post.video" :src="post.video.file.url" type="video/mp4" />
        </video>
      </div>

      <div v-if="post.topics && post.topics.length" class="u-marginBottomLarge">
        <h3>Related Topics</h3>
        <Topics :topics="post.topics" />
      </div>

      <div class="u-marginTopLarge u-marginBottomLarge u-textAlignCenter">
        <a :href="sharingUrl" class="o-btn" target="_blank" rel="noopener noreferrer">
          <svg-icon name="share" aria-hidden="true" />Share article on Twitter
        </a>
        <a
          href="https://twitter.com/stefanjudis"
          class="fancy-link u-marginLeftMedium u-noWrap"
        >... or say Hi! 👋</a>
      </div>

      <RelatedItems :items="posts" :item="post" slug="today-i-learned" class="u-marginBottomLarge" />

      <Comments class="u-marginTopLarge u-marginBottomMedium" />
    </div>
  </Container>
</template>

<script>
import Container from '~/components/Container.vue';
import Comments from '~/components/Comments.vue';
import DynamicHeadline from '~/components/DynamicHeadline.vue';
import PageDetails from '~/components/PageDetails.vue';
import RelatedItems from '~/components/RelatedItems.vue';
import Topics from '~/components/Topics.vue';
import { createPage, getHeadForPost } from '~/lib/basepage.js';
import { getSharingUrl } from '~/lib/util.js';

export default createPage({
  async fetch({ app, params, store, redirect }) {
    await app.contentful.getTil();

    store.commit('til/setActiveWithSlug', params.slug);

    if (!store.state.til.active) {
      return redirect('/404/');
    }
  },
  computed: {
    post() {
      return this.$store.state.til.active;
    },
    posts() {
      return this.$store.state.til.list;
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
    Marked: () => import('~/components/Marked.vue'),
    PageDetails,
    RelatedItems,
    Topics
  }
});
</script>
