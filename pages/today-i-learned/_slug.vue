<template>
  <Container animate="true" accessible-line-length="true">
    <h1 slot="headline" tabindex="-1" id="main-headline">{{ post.title }}</h1>
    <span slot="subHeadline">
      <PrettyDate :date="post.date"/>
      <span aria-hidden="true">•</span>
      {{ post.readingTime }} min read
    </span>
    <div>
      <p class="o-highlightBox">
        <svg-icon class="o-highlightBox__icon" name="megaphone"/>
        <span>This post is part of my
          <nuxt-link to="/today-i-learned/" class="fancy-link">Today I learned</nuxt-link>
          {{' '}}series in which I share all my learnings regarding web development.
        </span>
      </p>
      <Marked :markdown="post.body"></Marked>
      <div v-if="(post.video || post.videoWebm)">
        <video
          autoplay
          muted
          loop
          playsinline
          preload="metadata"
          :class="{ 'is-mobile-video': post.isMobileVideo }"
        >
          <source v-if="post.videoWebm" :src="post.videoWebm.file.url" type="video/webm">
          <source v-if="post.video" :src="post.video.file.url" type="video/mp4">
        </video>
      </div>

      <div v-if="post.topics && post.topics.length" class="u-marginBottomMedium">
        <h3>Topics</h3>
        <Topics :topics="post.topics"/>
      </div>

      <RelatedItems :items="posts" :item="post" slug="today-i-learned"/>
      <div class="u-marginTopMedium u-marginBottomMedium">
        <ul class="o-list-reset o-list-flex-end">
          <li class="u-marginTopSmall">
            <button
              class="o-btn"
              type="button"
              :disabled="showComments"
              @click="loadComments"
            >Load comments</button>
          </li>
          <li class="u-marginTopSmall u-marginLeftAuto">
            <a
              :href="sharingUrl"
              class="o-btn o-btn--ghost"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg-icon name="share" aria-hidden="true"/>Share article
            </a>
          </li>
        </ul>
        <Comments v-if="showComments" class="u-marginBottomMedium"/>
      </div>
    </div>
  </Container>
</template>

<script>
import Container from '~/components/Container.vue';
import Comments from '~/components/Comments.vue';
import DynamicHeadline from '~/components/DynamicHeadline.vue';
import PrettyDate from '~/components/PrettyDate.vue';
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
  data() {
    return {
      showComments: false
    };
  },
  methods: {
    loadComments() {
      this.showComments = true;
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
    PrettyDate,
    RelatedItems,
    Topics
  }
});
</script>
