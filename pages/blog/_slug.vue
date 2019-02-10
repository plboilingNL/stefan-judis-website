<template>
  <Container animate="true" accessible-line-length="true">
    <h1 slot="headline" tabindex="-1" id="main-headline">{{ post.title }}</h1>
    <span slot="subHeadline">
      <PrettyDate :date="post.date"/>
      <span aria-hidden="true">•</span>
      {{ post.readingTime }} min read
    </span>
    <p v-if="post.externalUrl" class="o-highlightBox">
      <Icon class="o-highlightBox__icon" name="Attention"/>
      <span>
        This article was initially posted on
        <a
          :href="post.externalUrl"
          :aria-labelledby="post.title | idAlize"
          class="fancy-link"
        >{{ post.externalUrl | externalUrl }}</a>.
      </span>
    </p>

    <Marked :markdown="post.body"></Marked>
    <div v-if="post.topics && post.topics.length" class="u-marginBottomMedium">
      <h3>Topics</h3>
      <Topics :topics="post.topics"/>
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
          >
            <Icon name="Share"/>Share article
          </a>
        </li>
      </ul>

      <Comments v-if="showComments" class="u-marginBottomMedium"/>
    </div>
  </Container>
</template>

<script>
import Container from '~/components/Container.vue';
import Comments from '~/components/Comments.vue';
import DynamicHeadline from '~/components/DynamicHeadline.vue';
import Icon from '~/components/Icon.vue';
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
      return getSharingUrl(this.post.title, this.$route.fullPath);
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
    Icon,
    PrettyDate,
    Marked: () => import('~/components/Marked.vue'),
    RelatedItems,
    Topics
  }
});
</script>
