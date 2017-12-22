<template>
  <Container class="t-container">
    <h1 slot="headline" tabindex="-1">Coding Projects</h1>
    <ul class="o-list-thirds">
      <li v-for="project in projects">
        <div class="c-tile c-project">
          <picture v-if="project.fields.logo">
            <source :srcset="`${project.fields.logo.fields.file.url}?fm=webp&w=500`" type='image/webp'>
            <img :src="`${project.fields.logo.fields.file.url}?w=500`" :alt="project.fields.title">
          </picture>
          <h2 :id="project.fields.title | idAlize" class="o-headline-2">{{ project.fields.title }}</h2>
          <p>{{ project.fields.description }}</p>
          <p class="c-tile__footer"><a :href="project.fields.url" :aria-labelledby="project.fields.title | idAlize">Check the project</a></p>
        </div>
      </li>
    </ul>
  </Container>
</template>

<script>
  import Container from '~/components/Container.vue'
  import {createClient} from '~/plugins/contentful.js'
  import getTransition from '~/plugins/transition.js'

  const client = createClient()

  export default {
    asyncData ({ env }) {
      return client.getEntries({
        content_type: env.CTF_PROJECT_ID,
        limit: 3
      }).then(projects => {
        return {
          projects: projects.items
        }
      })
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
      Container
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
