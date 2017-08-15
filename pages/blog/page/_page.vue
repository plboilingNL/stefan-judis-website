<template>
  <Container class="t-container">
    <h1 slot="headline" tabindex="-1">Blog - Page {{ page }}</h1>

    <ul class="o-list-reset">
      <li v-for="post in posts" class="u-marginBottomLarge">
        <ItemPreview :item="post" :show-excerpt="true" :show-date="true" :level="2"></ItemPreview>
      </li>
    </ul>
    <PaginationActions :prev-page="prevPage" :next-page="nextPage"></PaginationActions>
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
    asyncData ({ params, env }) {
      return Promise.all([
        client.getEntries({
          content_type: env.CTF_POST_ID,
          order: '-fields.date',
          limit: 5,
          skip: (params.page - 1) * 5
        })
      ]).then(([posts]) => {
        return {
          posts: posts.items,
          prevPage: params.page > 1 ? `/blog/page/${+params.page - 1}` : null,
          nextPage: posts.total > params.page * 5 ? `/blog/page/${+params.page + 1}` : null,
          page: params.page
        }
      }).catch(console.error)
    },
    head () {
      return {
        title: `Blog - Page ${this.page} | Stefan Judis Web Development`,
        meta: [
          { hid: 'description', name: 'description', content: `Writings on web development including mainly JavaScript, web performance and accessibility - Page ${this.page}` }
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

<style></style>
