<template>
  <div class="c-markdown" v-if="renderedHtml" v-html="renderedHtml"></div>
</template>

<script>
import marked from '~/plugins/marked.js';

export default {
  props: ['markdown'],
  computed: {
    renderedHtml() {
      return marked(this.markdown);
    }
  }
};
</script>

<style lang="postcss">
.c-markdown {
  blockquote {
    position: relative;
    margin: 0;
    padding: 0.5em 0.5em 0.5em 2em;
    font-style: italic;

    p {
      &::before {
        position: absolute;

        left: -0.125em;
        top: -0.25em;

        font-family: 'Georgia', serif;
        font-size: 4em;
        font-weight: normal;
        content: '“';
      }
    }
  }

  p {
    &:only-child {
      margin: 0.5em 0;
    }
  }

  p > {
    code {
      font-size: 1.125em;
      font-family: monospace;
      font-weight: 400;
      line-height: 1.5;
      padding: 0.125em 0.5em;
      color: var(--grey-darker);
      background: var(--blue-brighter);
      border-radius: 0.75em 0.25em 0.25em 0.25em;
    }
  }

  img {
    display: block;
    margin: 0 auto;
  }

  hr {
    margin: 3em 4em;
    border: none;
    border-top: 2px solid var(--grey-bright);
  }

  ul {
    margin: 0.25em 0 1em;
  }

  .o-anchorContainer--2 {
    margin-top: 3em;
  }
}
</style>
