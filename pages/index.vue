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
    <Container class="u-highlight__red">
      <h2 slot="headline">Side Projects</h2>
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
  import {createClient} from '~/plugins/contentful.js'
  import getTransition from '~/plugins/transition.js'

  const client = createClient()

  export default {
    async fetch ({ store, params, env, redirect }) {
      await Promise.all([
        store.state.me.entry.sys
          ? store.state.me.entry
          : client.getEntries({
            'sys.id': env.CTF_ME_ID
          }).then(res => {
            store.commit('me/setMe', res.items[0])
          }),

        store.state.posts.list.length
          ? store.state.posts.list
          : client.getEntries({
            content_type: env.CTF_POST_ID,
            order: '-fields.date'
          }).then(res => {
            store.commit('posts/setList', res.items)
          }),

        store.state.projects.list.length
          ? store.state.projects.list
          : client.getEntries({
            content_type: env.CTF_PROJECT_ID
          }).then(res => {
            store.commit('projects/setList', res.items)
          }),

        store.state.talks.list.length
          ? store.state.talks.list
          : client.getEntries({
            content_type: env.CTF_TALK_ID,
            order: '-fields.date'
          }).then(res => {
            store.commit('talks/setList', res.items)
          })
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
    transition (to, from) {
      return getTransition(from, to)
    },
    components: {
      ItemPreview,
      Container,
      Icon,
      Person,
      PrettyDate
    }
  }
</script>
