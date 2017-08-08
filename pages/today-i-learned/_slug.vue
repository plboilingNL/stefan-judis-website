<template>
  <main>
    <article>
      <Container>
        <ItemPreview :item="post" :show-body="true" :show-video="true" :show-date="true" :level="1"></ItemPreview>
        <Disqus></Disqus>
      </Container>
    </article>
    <SharingLine :item="post"></SharingLine>
  </main>
</template>

<script>
  import Container from '~/components/Container.vue'
  import Disqus from '~/components/Disqus.vue'
  import Marked from '~/components/Marked.vue'
  import PrettyDate from '~/components/PrettyDate.vue'
  import SharingLine from '~/components/SharingLine.vue'
  import ItemPreview from '~/components/ItemPreview.vue'
  import {createClient} from '~/plugins/contentful.js'

  const client = createClient()

  export default {
    asyncData ({ params, env }) {
      return client.getEntries({
        'content_type': env.CTF_TIL_ID,
        'fields.slug': params.slug
      }).then(entries => {
        return {
          post: entries.items[0]
        }
      }).catch(console.error)
    },
    head () {
      return {
        title: this.post.title,
        meta: [
          { hid: 'description', name: 'description', content: this.post.fields.description }
        ]
      }
    },
    components: {
      Container,
      Disqus,
      Marked,
      PrettyDate,
      SharingLine,
      ItemPreview
    }
  }
</script>

<style>

</style>
