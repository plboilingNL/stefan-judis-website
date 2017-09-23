<template>
  <Container class="t-container" accessible-line-length="true">
    <h1 slot="headline" tabindex="-1">TIL - Today I learned</h1>
    <ul class="o-list-reset">
      <li v-for="post in posts" class="u-marginBottomLarge">
        <ItemPreview :item="post" :include-link="true" :show-body="true" :show-video="true" :show-date="true" :level="2"></ItemPreview>
      </li>
    </ul>
    <PaginationActions :next-page="nextPage"></PaginationActions>
  </Container>
</template>

<script>
  import Container from '~/components/Container.vue'
  import ItemPreview from '~/components/ItemPreview.vue'
  import PaginationActions from '~/components/PaginationActions.vue'
  import {createClient} from '~/plugins/contentful.js'
  import getTransition from '~/plugins/transition.js'

  const client = createClient()

  export default {
    asyncData ({ env }) {
      return Promise.all([
        client.getEntries({
          content_type: env.CTF_TIL_ID,
          order: '-fields.date',
          limit: 5
        })
      ]).then(([posts]) => {
        return {
          posts: posts.items,
          nextPage: posts.total > 5 ? '/today-i-learned/page/2' : null
        }
      }).catch(console.error)
    },
    head () {
      return {
        title: 'Today I learned | Stefan Judis Web Development',
        meta: [
          { hid: 'description', name: 'description', content: `My daily Web Development learnings` }
        ]
      }
    },
    transition (to, from) {
      return getTransition(from, to)
    },
    components: {
      Container,
      ItemPreview,
      PaginationActions
    }
  }
</script>
