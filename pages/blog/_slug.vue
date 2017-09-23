<template>
  <main class="t-container">
    <article>
      <Container accessible-line-length="true">
        <PrettyDate slot="date" :date="post.fields.date"></PrettyDate>
        <h1 slot="headline" tabindex="-1">{{ post.fields.title }}</h1>
        <Marked :markdown="post.fields.body"></Marked>
        <div v-if="post.fields.isTmil">
          <ul class="o-list-reset u-marginBottomLarge">
            <li v-for="tilPost in post.fields.tilPosts">
              <ItemPreview :item="tilPost" :show-body="true" :show-video="true" :level="2"></ItemPreview>
            </li>
          </ul>
        </div>
        <div v-if="post.fields.tags && post.fields.tags.length" class="u-marginBottomLarge">
          <h3>Tags for this post</h3>
          <ul class="o-list-inline">
            <li v-for="tag in post.fields.tags">
              <nuxt-link class="o-btn o-btn--small u-marginRightSmall" :to="`/blog/tag/${tag}`">{{ tag }}</nuxt-link>
            </li>
          </ul>
        </div>
        <Disqus></Disqus>
      </Container>
    </article>
    <SharingLine :item="post"></SharingLine>
  </main>
</template>

<script>
  import Container from '~/components/Container.vue'
  import Disqus from '~/components/Disqus.vue'
  import PrettyDate from '~/components/PrettyDate.vue'
  import Marked from '~/components/Marked.vue'
  import ItemPreview from '~/components/ItemPreview.vue'
  import SharingLine from '~/components/SharingLine.vue'
  import {createClient} from '~/plugins/contentful.js'
  import getTransition from '~/plugins/transition.js'

  const client = createClient()

  export default {
    asyncData ({ params, env }) {
      return client.getEntries({
        'content_type': env.CTF_POST_ID,
        'fields.slug': params.slug
      }).then(entries => {
        return {
          post: entries.items[0]
        }
      }).catch(console.error)
    },
    head () {
      return {
        title: `${this.post.fields.title} | Stefan Judis Web Development`,
        meta: [
          { hid: 'description', name: 'description', content: this.post.fields.description }
        ]
      }
    },
    transition (to, from) {
      return getTransition(from, to)
    },
    components: {
      Container,
      Disqus,
      PrettyDate,
      Marked,
      SharingLine,
      ItemPreview
    }
}
</script>
