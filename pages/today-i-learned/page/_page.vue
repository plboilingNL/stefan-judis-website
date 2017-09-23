<template>
  <Container class="t-container" accessible-line-length="true">
    <h1 slot="headline" tabindex="-1">TIL - Today I learned - Page {{ page }}</h1>
    <ul class="o-list-reset">
      <li v-for="post in posts" class="u-marginBottomLarge">
        <ItemPreview :item="post" :include-link="true" :show-body="true" :show-video="true" :show-date="true" :level="2"></ItemPreview>
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
          content_type: env.CTF_TIL_ID,
          order: '-fields.date',
          limit: 5,
          skip: (params.page - 1) * 5
        })
      ]).then(([posts]) => {
        return {
          posts: posts.items,
          prevPage: params.page > 1 ? `/today-i-learned/page/${+params.page - 1}` : null,
          nextPage: posts.total > params.page * 5 ? `/today-i-learned/page/${+params.page + 1}` : null,
          page: params.page
        }
      }).catch(console.error)
    },
    head () {
      return {
        title: `Today I learned - Page ${this.page} | Stefan Judis Web Development`,
        meta: [
          { hid: 'description', name: 'description', content: `My daily Web Development learnings - Page ${this.page}` }
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
