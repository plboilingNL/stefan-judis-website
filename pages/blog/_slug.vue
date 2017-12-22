<template>
  <main class="t-container">
    <Container accessible-line-length="true">
      <PrettyDate slot="date" :date="post.fields.date"></PrettyDate>
      <h1 slot="headline" tabindex="-1">{{ post.fields.title }}</h1>
      <span slot="readingTime">{{ readingTime }} min read</span>
      <div class="c-tile">
        <Marked :markdown="post.fields.body"></Marked>
        <div v-if="post.fields.isTmil">
          <ul class="o-list-reset u-marginBottomLarge">
            <li v-for="tilPost in post.fields.tilPosts">
              <DynamicHeadline :level="2" :id="tilPost.fields.title | idAlize" class="p-name">{{ tilPost.fields.title }}</DynamicHeadline>
              <Marked :markdown="tilPost.fields.body"></Marked>
              <div v-if="(tilPost.fields.video || tilPost.fields.videoWebm)">
                <video autoplay muted loop playsinline preload="metadata" :class="{ 'is-mobile-video': tilPost.fields.isMobileVideo }">
                  <source v-if="tilPost.fields.videoWebm" :src="tilPost.fields.videoWebm.fields.file.url" type="video/webm">
                  <source v-if="tilPost.fields.video" :src="tilPost.fields.video.fields.file.url" type="video/mp4">
                </video>
              </div>
            </li>
          </ul>
        </div>
        <div v-if="post.fields.tags && post.fields.tags.length" class="u-marginBottomMedium">
          <h3>Tags for this post</h3>
          <ul class="o-list-inline">
            <li v-for="tag in post.fields.tags">
              <nuxt-link class="o-tag u-marginRightSmall u-marginBottomSmall" :to="`/blog/tag/${tag}`">{{ tag }}</nuxt-link>
            </li>
          </ul>
        </div>
        <Disqus class="u-marginBottomMedium"></Disqus>
        <SharingLine :item="post"></SharingLine>
      </div>
    </Container>
  </main>
</template>

<script>
  import Container from '~/components/Container.vue'
  import Disqus from '~/components/Disqus.vue'
  import DynamicHeadline from '~/components/DynamicHeadline.vue'
  import PrettyDate from '~/components/PrettyDate.vue'
  import Marked from '~/components/Marked.vue'
  import ItemPreview from '~/components/ItemPreview.vue'
  import SharingLine from '~/components/SharingLine.vue'
  import ReadingTime from '~/plugins/reading-time.js'
  import {createClient} from '~/plugins/contentful.js'
  import getTransition from '~/plugins/transition.js'

  const client = createClient()

  export default {
    asyncData ({ params, env }) {
      return client.getEntries({
        'content_type': env.CTF_POST_ID,
        'fields.slug': params.slug
      }).then(entries => {
        const post = entries.items[0]
        return {
          post,
          readingTime: ReadingTime(post)
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
      DynamicHeadline,
      PrettyDate,
      Marked,
      SharingLine,
      ItemPreview
    }
}
</script>
