<template>
  <Container class="t-container">
    <h1 slot="headline" tabindex="-1">Free time fun projects</h1>
    <h2 class="o-headline-2 u-textAlignCenter u-marginBottomMedium">Small talking &amp; recording</h2>
    <ul class="o-list-thirds">
      <li v-for="cast in screenCasts">
        <div class="c-tile c-tile__noHighlight">
          <!-- this is container is needed because of a FF bug -->
          <div class="c-tile__image">
            <lazy-image :asset="cast.fields.coverImage" :ratio="0.5625"></lazy-image>
          </div>
          <pretty-date :date="cast.fields.publishDate" class="u-marginTopMedium"></pretty-date>
          <h3 class="u-noMarginTop">{{ cast.fields.title }}</h3>
          <p class="c-tile__footer"><a :href="cast.fields.url" :aria-labelledby="cast.fields.title | idAlize">Watch on YouTube</a></p>
        </div>
      </li>
    </ul>

    <h2 class="o-headline-2 u-textAlignCenter u-marginBottomMedium">Coding</h2>
    <ul class="o-list-thirds">
      <li v-for="project in projects">
        <div class="c-tile c-project">
          <picture v-if="project.fields.logo">
            <source :srcset="`${project.fields.logo.fields.file.url}?fm=webp&w=500`" type='image/webp'>
            <img :src="`${project.fields.logo.fields.file.url}?w=500`" :alt="project.fields.title">
          </picture>
          <h3 :id="project.fields.title | idAlize" class="o-headline-2">{{ project.fields.title }}</h3>
          <p>{{ project.fields.description }}</p>
          <p class="c-tile__footer"><a :href="project.fields.url" :aria-labelledby="project.fields.title | idAlize">Check the project</a></p>
        </div>
      </li>
    </ul>
  </Container>
</template>

<script>
  import Container from '~/components/Container.vue'
  import LazyImage from '~/components/LazyImage.vue'
  import PrettyDate from '~/components/PrettyDate.vue'
  import {createClient} from '~/plugins/contentful.js'
  import getTransition from '~/plugins/transition.js'

  const client = createClient()

  export default {
    async fetch ({ store, env }) {
      await Promise.all([
        store.state.projects.list.length
          ? store.state.projects.list
          : client.getEntries({
            content_type: env.CTF_PROJECT_ID
          }).then(res => {
            store.commit('projects/setList', res.items)
          }),

        store.state.screencasts.list.length
          ? store.state.screencasts.list
          : client.getEntries({
            content_type: env.CTF_SCREENCAST_ID,
            order: '-fields.publishDate'
          }).then(res => {
            store.commit('screencasts/setList', res.items)
          })
      ])
    },
    computed: {
      projects () {
        return this.$store.state.projects.list
      },
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
    transition (to, from) {
      return getTransition(from, to)
    },
    components: {
      Container,
      LazyImage,
      PrettyDate
    }
  }
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
