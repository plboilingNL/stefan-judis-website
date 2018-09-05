<template>
  <div class="c-comments">
    <div
      class="just-comments"
      data-allowguests="true"
      data-apikey="04cc7e14-5182-4838-94a6-fe6c84ffa546">
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    const s = document.createElement('script');
    // TODO put this into config
    s.src = '//just-comments.com/w.js';
    s.setAttribute('data-timestamp', +new Date());
    this.$el.appendChild(s);
  },
  data() {
    return {
      commentsAreLoaded: false
    };
  }
};
</script>

<style>
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

  [class^='src-ui-Comments__comments__header-'] h3 {
    font-size: 1.5em !important;
  }
}
</style>
