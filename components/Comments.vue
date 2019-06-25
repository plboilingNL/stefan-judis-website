<template>
  <div :class="{'c-comments': true, 'comments-loaded': this.commentCount !== null}">
    <div class="u-textAlignCenter">
      <div class="fancy-font u-marginBottomMedium">
        <div
          class="c-comments__teaser"
        >{{this.commentCount === 0 ? "Be the first to comment!" : `See ${this.commentCount} comment${ this.commentCount > 1 ? 's' : ''}.`}}</div>
      </div>
      <button
        class="o-btn u-marginBottomMedium"
        type="button"
        :disabled="commentsAreLoaded"
        @click="loadComments"
      >Load comments</button>
    </div>
    <div
      class="just-comments"
      data-allowguests="true"
      data-hidecommentheader="true"
      data-hidenocommentstext="true"
      data-apikey="04cc7e14-5182-4838-94a6-fe6c84ffa546"
    ></div>
  </div>
</template>

<script>
import fetch from 'isomorphic-unfetch';

export default {
  async mounted() {
    const response = await fetch(
      `https://service.just-comments.com/prod/v2/counts?pageId=${window.location.href.replace(
        'https://',
        ''
      )}&apiKey=04cc7e14-5182-4838-94a6-fe6c84ffa546`
    );
    const result = await response.json();
    this.commentCount = result.counts[0].count;
  },
  data() {
    return {
      commentsAreLoaded: false,
      commentCount: null
    };
  },
  methods: {
    loadComments() {
      if (!this.commentsAreLoaded) {
        this.commentsAreLoaded = true;
        const s = document.createElement('script');
        // TODO put this into config
        s.src = '//just-comments.com/w2.js';
        s.setAttribute('data-timestamp', +new Date());
        this.$el.appendChild(s);
      }
    }
  }
};
</script>

<style lang="postcss">
.c-comments {
  img {
    border-radius: 50% !important;
  }

  &__teaser {
    opacity: 0;
    font-size: 1.875em;
  }

  &.comments-loaded {
    .c-comments__teaser {
      opacity: 1;
    }
  }

  .just-comments {
    --primary-color: var(--c-highlight);
    --primary-button-bg-color: var(--grey-dark);
  }
}
</style>
