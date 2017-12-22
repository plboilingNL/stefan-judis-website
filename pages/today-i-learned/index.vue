<template>
  <div>
    <Container class="t-container" :full-width="true">
      <h1 slot="headline" tabindex="-1">TIL - Today I learned</h1>
      <ul class="o-list-grid">
        <li v-for="categoryName in categoryKeys">
          <div class="c-tile">
            <h2 class="o-headline-2">{{ `#${categoryName}` }}</h2>
            <ul class="o-list-reset">
              <li v-for="post in categories[categoryName]" class="u-marginBottomSmall">
                <nuxt-link :to="`/today-i-learned/${post.fields.slug}/`">{{ post.fields.title }}</nuxt-link>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </Container>
  </div>
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
      return client.getEntries({
        content_type: env.CTF_TIL_ID,
        order: '-fields.date'
      }).then(posts => {
        const categories = posts.items.reduce((acc, post) => {
          if (post.fields.categories) {
            post.fields.categories.forEach(category => {
              if (!acc[category]) {
                acc[category] = []
              }
              acc[category].push(post)

              return acc
            })
          }

          return acc
        }, {})

        return {
          categories,
          categoryKeys: Object.keys(categories).sort(),
          posts: posts.items
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
