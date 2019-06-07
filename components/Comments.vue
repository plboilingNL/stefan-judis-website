<template>
  <div class="c-comments">
    <div class="u-textAlignCenter">
      <div class="fancy-font u-marginBottomMedium">
        <div
          class="c-comments__teaser"
        >{{this.commentCount === 0 ? "Be the first to comment!" : `See ${this.commentCount} comment(s).`}}</div>
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
      data-apikey="04cc7e14-5182-4838-94a6-fe6c84ffa546"
    ></div>
  </div>
</template>

<script>
import fetch from 'cross-fetch';

export default {
  async mounted() {
    const response = await fetch(
      `https://service.just-comments.com/prod/v2/counts?pageId=${
        window.location.href
      }&apiKey=04cc7e14-5182-4838-94a6-fe6c84ffa546`
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
        s.src = '//just-comments.com/w.js';
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

  [class^='src-ui-Comments__comments__credit'] {
    color: inherit;
  }

  [class^='src-ui-Comment__comment__button-'],
  [class^='src-ui-CommentsForm__comments__form__send'] {
    background: var(--grey-dark);
    padding: 0.25em 0.5em;
    color: #fff;
    border-radius: 0.125em;

    &:hover {
      background: var(--c-highlight);
      color: #fff;
      text-shadow: 0 1px 2px var(--grey-dark);

      transform: translate(0, -0.0625em);
    }

    &:active {
      filter: brightness(0.75);
    }
  }

  &__teaser {
    font-size: 1.875em;
  }

  [class^='src-ui-Comments__comments__header-'] h3 {
    font-size: 1.5em !important;
  }

  .jcCommentsHeader {
    display: none;
  }
}
</style>
