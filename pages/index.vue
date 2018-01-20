<template>
  <div class="t-container">
    <Container>
      <h1 slot="headline" class="o-headline-1" tabindex="-1">{{ me.fields.welcomeMessage }}</h1>
      <Person :person="me"></Person>
    </Container>
    <Container class="u-highlight__blue">
      <h2 slot="headline">Blog</h2>
      <ul class="o-list-thirds">
        <li v-for="post in posts">
          <ItemPreview :item="post" :level="3" :show-date="true"></itemPreview>
        </li>
      </ul>
      <nuxt-link slot="footerLine" to="/blog/" class="o-btn">See all posts</nuxt-link>
    </Container>
    <Container class="u-highlight__green">
      <h2 slot="headline">Talks</h2>
      <ul class="o-list-thirds">
        <li v-for="talk in talks">
          <ItemPreview :item="talk" :level="3"></itemPreview>
        </li>
      </ul>
      <nuxt-link slot="footerLine" to="/talks/"  class="o-btn">See my past and upcoming talks</nuxt-link>
    </Container>
    <Container class="u-highlight__red" color="red">
      <h2 slot="headline">Coding Side Projects</h2>
      <ul class="o-list-thirds">
        <li v-for="project in projects">
          <ItemPreview :item="project" :show-description="true" :level="3"></itemPreview>
        </li>
      </ul>

      <nuxt-link slot="footerLine" to="/projects/" class="o-btn">See all side projects</nuxt-link>
    </Container>
  </div>
</template>

<script>
  import Container from '~/components/Container.vue'
  import Person from '~/components/Person.vue'
  import PrettyDate from '~/components/PrettyDate.vue'
  import ItemPreview from '~/components/ItemPreview.vue'
  import Icon from '~/components/Icon.vue'
  import {createPage} from '~/lib/basepage.js'

  export default createPage({
    async fetch ({ app, redirect }) {
      const { getMe, getPosts, getProjects, getTalks } = app.contentful

      await Promise.all([
        getMe(),
        getPosts(),
        getProjects(),
        getTalks()
      ])
    },
    computed: {
      me () {
        return this.$store.state.me.entry
      },
      posts () {
        return this.$store.state.posts.list.slice(0, 3)
      },
      projects () {
        return this.$store.state.projects.list.slice(0, 3)
      },
      talks () {
        return this.$store.state.talks.list.slice(0, 3)
      }
    },
    head () {
      return {
        title: `Stefan's web dev journey`,
        meta: [
          { hid: 'description', name: 'description', content: `Welcome to my personal website dealing with daily web development things.` }
        ]
      }
    },
    components: {
      ItemPreview,
      Container,
      Icon,
      Person,
      PrettyDate
    }
  })
</script>
