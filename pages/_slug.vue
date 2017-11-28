<template>
  <main class="t-container">
    <Container accessible-line-length="true">
      <DynamicHeadline :level="1" :id="page.fields.title | idAlize" class="p-name">{{ page.fields.title }}</DynamicHeadline>
      <Marked :markdown="page.fields.body" class="e-content"></Marked>
    </Container>
    <SharingLine v-if="page.fields.slug !== '404'" :item="page"></SharingLine>
  </main>
</template>

<script>
  import Container from '~/components/Container.vue'
  import DynamicHeadline from '~/components/DynamicHeadline.vue'
  import SharingLine from '~/components/SharingLine.vue'
  import {createClient} from '~/plugins/contentful.js'
  import getTransition from '~/plugins/transition.js'
  import Marked from '~/components/Marked.vue'

  const client = createClient()

  export default {
    asyncData ({ env, params }) {
      console.log(params.slug)
      return client.getEntries({
        content_type: env.CTF_LANDING_PAGE_ID,
        'fields.slug': params.slug
      }).then(entries => {
        return {
          page: entries.items[0]
        }
      }).catch(console.error)
    },
    head () {
      return {
        title: this.page.fields.title,
        meta: [
          { hid: 'description', name: 'description', content: 'You want me to stay up to date? Great - this is how I learn about new technologies' }
        ]
      }
    },
    transition (to, from) {
      return getTransition(from, to)
    },
    components: {
      Container,
      DynamicHeadline,
      Marked,
      SharingLine
    }
  }
</script>

<style scoped></style>
