<template>
  <div>
    <Container>
      <h1 slot="headline" tabindex="-1">{{ me.fields.welcomeMessage }}</h1>
      <Person :person="me"></Person>
    </Container>
    <Container color="blue">
      <h2 slot="headline">Blog</h2>
      <ul class="o-list-thirds">
        <li v-for="post in posts">
          <ItemPreview :item="post" :level="3" :show-date="true"></itemPreview>
        </li>
      </ul>
      <nuxt-link slot="footerLine" to="/blog/" class="u-font-size-1-5">Discover more at the Blog section <span aria-hidden="true">⟶</span></nuxt-link>
    </Container>
    <Container color="grey">
      <h2 slot="headline">Talks</h2>
      <ul class="o-list-thirds">
        <li v-for="talk in talks">
          <ItemPreview :item="talk" :level="3"></itemPreview>
        </li>
      </ul>
      <nuxt-link slot="footerLine" to="/talks/" class="u-font-size-1-5">See my past and upcoming talks <span aria-hidden="true">⟶</span></nuxt-link>
    </Container>
    <Container color="red">
      <h2 slot="headline">Side Projects</h2>
      <ul class="o-list-thirds">
        <li v-for="project in projects">
          <ItemPreview :item="project" :show-description="true" :level="3"></itemPreview>
        </li>
      </ul>
      <nuxt-link  to="/projects/" class="u-font-size-1-5">Check my ongoing side projects <span aria-hidden="true">⟶</span></nuxt-link>
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

  const client = createClient()

  export default {
    asyncData ({ env }) {
      return Promise.all([
        client.getEntries({
          'sys.id': env.CTF_ME_ID
        }),
        client.getEntries({
          content_type: env.CTF_POST_ID,
          order: '-fields.date',
          limit: 3
        }),
        client.getEntries({
          content_type: env.CTF_TALK_ID,
          order: '-fields.date',
          limit: 3
        }),
        client.getEntries({
          content_type: env.CTF_PROJECT_ID,
          limit: 3
        })
      ]).then(([me, posts, talks, projects]) => {
        return {
          me: me.items[0],
          posts: posts.items,
          talks: talks.items,
          projects: projects.items
        }
      }).catch(console.error)
    },
    head () {
      return {
        title: `Stefan Judis Web Development`,
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
  }
</script>
