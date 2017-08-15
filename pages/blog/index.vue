<template>
  <Container>
    <h1 slot="headline" tabindex="-1">Blog</h1>
    <ul class="o-list-reset">
      <li v-for="post in posts" class="u-marginBottomLarge">
        <ItemPreview :item="post" :show-excerpt="true" :show-date="true" :level="2"></ItemPreview>
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

  const client = createClient()

  export default {
    asyncData ({ env }) {
      return Promise.all([
        client.getEntries({
          content_type: env.CTF_POST_ID,
          order: '-fields.date',
          limit: 5
        })
      ]).then(([posts]) => {
        return {
          posts: posts.items,
          nextPage: posts.total > 5 ? '/blog/page/2' : null
        }
      }).catch(console.error)
    },
    head () {
      return {
        title: 'Blog | Stefan Judis Web Development',
        meta: [
          { hid: 'description', name: 'description', content: `Writings on web development including mainly JavaScript, web performance and accessibility.` }
        ]
      }
    },
    components: {
      Container,
      ItemPreview,
      PaginationActions
    }
  }
</script>

<style></style>
