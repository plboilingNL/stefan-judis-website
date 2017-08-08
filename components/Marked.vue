<template>
  <div class="c-markdown" v-if="renderedHtml" v-html="renderedHtml"></div>
</template>

<script>
  import marked from '~/plugins/marked.js'

  export default {
    props: ['markdown'],
    computed: {
      renderedHtml () {
        return marked(this.markdown)
      }
    }
  }
</script>

<style lang="scss">
  .c-markdown {
    blockquote {
      position: relative;
      margin: 0;
      padding: .5em .5em .5em 1.75em;
      font-style: italic;

      p {
        &::before {
          position: absolute;

          left: 0;
          top: 0;

          font-family: 'Georgia', serif;
          font-size: 3em;
          content: '“';
        }
      }
    }

    code {
      font-size: 1.125em;
      font-family: monospace;
      font-weight: 400;
      line-height: 1.5;
      padding: .125em;
      background: #fff;
      color: var(--c-theme);
      border-radius: .25em;
    }

    img {
      border: .25em solid #fff;
      box-shadow: 0 0.05em 0.0625em #888
    }
  }
</style>
