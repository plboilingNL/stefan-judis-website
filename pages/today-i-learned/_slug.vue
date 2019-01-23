<template>
  <Container animate="true" accessible-line-length="true">
    <PrettyDate slot="date" :date="post.fields.date"></PrettyDate>
    <h1 slot="headline" tabindex="-1" id="main-headline">{{ post.fields.title }}</h1>
    <span slot="subHeadline">{{ post.fields.readingTime }} min read</span>
    <div class="c-tile">
      <div class="c-tile__container">
        <p class="c-tile__header">This post is part of my
          <nuxt-link to="/today-i-learned/">Today I learned</nuxt-link>
          {{' '}}series in which I share all my learnings regarding web development.
        </p>
        <Marked :markdown="post.fields.body"></Marked>
        <div v-if="(post.fields.video || post.fields.videoWebm)">
          <video
            autoplay
            muted
            loop
            playsinline
            preload="metadata"
            :class="{ 'is-mobile-video': post.fields.isMobileVideo }"
          >
            <source
              v-if="post.fields.videoWebm"
              :src="post.fields.videoWebm.fields.file.url"
              type="video/webm"
            >
            <source
              v-if="post.fields.video"
              :src="post.fields.video.fields.file.url"
              type="video/mp4"
            >
          </video>
        </div>

        <div v-if="post.fields.topics && post.fields.topics.length" class="u-marginBottomMedium">
          <h3>Tags</h3>
          <Topics :topics="post.fields.topics"/>
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
              >Share article</a>
            </li>
          </ul>
          <Comments v-if="showComments" class="u-marginBottomMedium"/>
        </div>
      </div>
    </div>
    <newsletter-form class="u-marginTopMedium"/>
  </Container>
</template>

<script>
import Container from '~/components/Container.vue';
import Comments from '~/components/Comments.vue';
import DynamicHeadline from '~/components/DynamicHeadline.vue';
import NewsletterForm from '~/components/NewsletterForm.vue';
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
      return getSharingUrl(this.post.fields.title, this.$route.fullPath);
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
    NewsletterForm,
    PrettyDate,
    RelatedItems,
    Topics
  }
});
</script>
