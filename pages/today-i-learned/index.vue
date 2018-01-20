<template>
  <Container class="t-container" :full-width="true">
    <h1 slot="headline" tabindex="-1">TIL - Today I learned</h1>
    <ul class="o-list-grid">
      <li v-for="categoryName in Object.keys(categories).sort()">
        <div :id="categoryName | idAlize" class="c-tile">
          <h2 class="o-headline-2">
            <a class="o-anchorHeadline" :href="categoryName | idAlize({prependHash: true})">{{ categoryName }}</a>
          </h2>
          <ul class="o-list-reset">
            <li v-for="post in categories[categoryName]" class="u-marginBottomSmall">
              <nuxt-link :to="`/today-i-learned/${post.fields.slug}/`">{{ post.fields.title }}</nuxt-link>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </Container>
</template>

<script>
  import Container from '~/components/Container.vue'
  import ItemPreview from '~/components/ItemPreview.vue'
  import PaginationActions from '~/components/PaginationActions.vue'
  import getTransition from '~/plugins/transition.js'

  export default {
    async fetch ({ app }) {
      await app.contentful.getTil()
    },
    computed: {
      categories () {
        return this.$store.state.til.list.reduce((acc, post) => {
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
      }
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
