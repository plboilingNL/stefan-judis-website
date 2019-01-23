<template>
  <Container animate="true" accessible-line-length="true">
    <PrettyDate slot="date" :date="post.fields.date"></PrettyDate>
    <h1 slot="headline" tabindex="-1" id="main-headline">{{ post.fields.title }}</h1>
    <span slot="subHeadline">{{ post.fields.readingTime }} min read</span>
    <div class="c-tile">
      <div class="c-tile__container">
        <p class="c-tile__header" v-if="post.fields.externalUrl">
          This article was initially posted on
          <a
            :href="post.fields.externalUrl"
            :aria-labelledby="post.fields.title | idAlize"
          >{{ post.fields.externalUrl | externalUrl }}</a>
        </p>

        <Marked :markdown="post.fields.body"></Marked>
        <div v-if="post.fields.isTmil">
          <ul class="o-list-reset u-marginBottomLarge">
            <li v-for="tilPost in post.fields.tilPosts" :key="tilPost.sys.id">
              <DynamicHeadline
                :level="2"
                :id="tilPost.fields.title | idAlize"
                class="p-name"
              >{{ tilPost.fields.title }}</DynamicHeadline>
              <Marked :markdown="tilPost.fields.body"></Marked>
              <div v-if="(tilPost.fields.video || tilPost.fields.videoWebm)">
                <video
                  autoplay
                  muted
                  loop
                  playsinline
                  preload="metadata"
                  :class="{ 'is-mobile-video': tilPost.fields.isMobileVideo }"
                >
                  <source
                    v-if="tilPost.fields.videoWebm"
                    :src="tilPost.fields.videoWebm.fields.file.url"
                    type="video/webm"
                  >
                  <source
                    v-if="tilPost.fields.video"
                    :src="tilPost.fields.video.fields.file.url"
                    type="video/mp4"
                  >
                </video>
              </div>
            </li>
          </ul>
        </div>
        <div v-if="post.fields.topics && post.fields.topics.length" class="u-marginBottomMedium">
          <h3>Tags</h3>
          <Topics :topics="post.fields.topics"/>
        </div>
        <RelatedItems :items="posts" :item="post" slug="blog"/>
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
    await app.contentful.getPost(params.slug);

    if (!store.state.posts.active) {
      return redirect('/404/');
    }
  },
  data() {
    return {
      showComments: false
    };
  },
  computed: {
    post() {
      return this.$store.state.posts.active;
    },
    posts() {
      return this.$store.state.posts.list;
    },
    sharingUrl() {
      return getSharingUrl(this.post.fields.title, this.$route.fullPath);
    }
  },
  head() {
    return getHeadForPost(this.post);
  },
  methods: {
    loadComments() {
      this.showComments = true;
    }
  },
  components: {
    Container,
    Comments,
    DynamicHeadline,
    PrettyDate,
    Marked: () => import('~/components/Marked.vue'),
    NewsletterForm,
    RelatedItems,
    Topics
  }
});
</script>
