<template>
  <Container>
    <h1 slot="headline">Side Projects</h1>
    <ul class="o-list-thirds">
      <li class="c-project" v-for="project in projects">
        <picture v-if="project.fields.logo">
          <source :srcset="`${project.fields.logo.fields.file.url}?fm=webp&w=500`" type='image/webp'>
          <img :src="`${project.fields.logo.fields.file.url}?w=500`" :alt="project.fields.title">
        </picture>
        <h2 class="o-headline-2">{{ project.fields.title }}</h2>
        <p>{{ project.fields.description }}</p>
      </li>
    </ul>
  </Container>
</template>

<script>
  import Container from '~/components/Container.vue'
  import {createClient} from '~/plugins/contentful.js'

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
