<template>
  <Container class="t-container">
    <h1 slot="headline" tabindex="-1">Developer Smalltalk</h1>
    <ul class="o-list-grid">
      <li v-for="cast in screenCasts" :key="cast.sys.id">
        <div class="c-tile c-tile--noHighlight">
          <!-- this is container is needed because of a FF bug -->
          <div class="c-tile__image">
            <lazy-image :asset="cast.fields.coverImage" :ratio="0.5625"></lazy-image>
          </div>
          <pretty-date :date="cast.fields.publishDate"></pretty-date>
          <h3 class="u-noMarginTop" :id="cast.fields.title | idAlize">{{ cast.fields.title }}</h3>
          <p class="c-tile__footer"><a :href="cast.fields.url" :aria-labelledby="cast.fields.title | idAlize">Watch on YouTube</a></p>
        </div>
      </li>
    </ul>
  </Container>
</template>

<script>
  import Container from '~/components/Container.vue'
  import LazyImage from '~/components/LazyImage.vue'
  import PrettyDate from '~/components/PrettyDate.vue'
  import {createPage} from '~/lib/basepage.js'

  export default createPage({
    async fetch ({ app, store, env }) {
      const { getScreencasts } = app.contentful

      await Promise.all([
        getScreencasts()
      ])
    },
    computed: {
      screenCasts () {
        return this.$store.state.screencasts.list
      }
    },
    head () {
      return {
        title: `Projects | Stefan Judis Web Development`,
        meta: [
          { hid: 'description', name: 'description', content: `Listing of my current side projects.` }
        ]
      }
    },
    components: {
      Container,
      LazyImage,
      PrettyDate
    }
  })
</script>

<style lang="scss">
  .c-project {
    img {
      display: block;
      max-height: 6em;
      margin: 0 auto 1em;
    }
  }
</style>
