<template>
  <Container class="t-container">
    <h1 slot="headline" tabindex="-1">Blog - #{{ tag }}</h1>

    <ul class="o-list-reset">
      <li v-for="post in posts" class="u-marginBottomLarge">
        <ItemPreview :item="post" :show-excerpt="true" :show-date="true" :level="2"></ItemPreview>
      </li>
    </ul>
  </Container>
</template>

<script>
  import Container from '~/components/Container.vue'
  import ItemPreview from '~/components/ItemPreview.vue'
  import {createClient} from '~/plugins/contentful.js'
  import getTransition from '~/plugins/transition.js'

  const client = createClient()

  export default {
    asyncData ({ params, env }) {
      return Promise.all([
        client.getEntries({
          content_type: env.CTF_POST_ID,
          order: '-fields.date',
          'fields.tags[in]': params.tag
        })
      ]).then(([posts]) => {
        return {
          posts: posts.items,
          tag: params.tag
        }
      }).catch(console.error)
    },
    head () {
      return {
        title: `Blog - #${this.tag} | Stefan Judis Web Development`,
        meta: [
          { hid: 'description', name: 'description', content: `Writings on web development including mainly JavaScript, web performance and accessibility - #${this.page}` }
        ]
      }
    },
    transition (to, from) {
      return getTransition(from, to)
    },
    components: {
      Container,
      ItemPreview
    }
  }
</script>

<style></style>
