<template>
  <main class="t-container">
    <Container accessible-line-length="true">
      <PrettyDate slot="date" :date="post.fields.date" :is-article-head="true"></PrettyDate>
      <h1 slot="headline" tabindex="-1">{{ post.fields.title }}</h1>
      <span slot="readingTime">{{ post.fields.readingTime }} min read</span>
      <div class="c-tile">
        <Marked :markdown="post.fields.body"></Marked>
        <div v-if="(post.fields.video || post.fields.videoWebm)">
          <video autoplay muted loop playsinline preload="metadata" :class="{ 'is-mobile-video': post.fields.isMobileVideo }">
            <source v-if="post.fields.videoWebm" :src="post.fields.videoWebm.fields.file.url" type="video/webm">
            <source v-if="post.fields.video" :src="post.fields.video.fields.file.url" type="video/mp4">
          </video>
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
  import Marked from '~/components/Marked.vue'
  import PrettyDate from '~/components/PrettyDate.vue'
  import SharingLine from '~/components/SharingLine.vue'
  import {createClient} from '~/plugins/contentful.js'
  import getTransition from '~/plugins/transition.js'

  const client = createClient()

  export default {
    async fetch ({ store, params, env, redirect }) {
      if (!store.state.til.list.length) {
        let {items} = await client.getEntries({
          'content_type': env.CTF_TIL_ID,
          order: '-fields.date'
        })

        store.commit('til/setList', items)
      }
      store.commit('til/setActiveWithSlug', params.slug)

      if (!store.state.til.active) {
        return redirect('/404/')
      }
    },
    head () {
      return {
        title: this.post.fields.title,
        meta: [
          { hid: 'description', name: 'description', content: this.post.fields.description }
        ]
      }
    },
    beforeDestroy () {
      this.$store.commit('til/setActive', null)
    },
    computed: {
      post () {
        return this.$store.state.til.active
      }
    },
    transition (to, from) {
      return getTransition(from, to)
    },
    components: {
      Container,
      Disqus,
      DynamicHeadline,
      Marked,
      PrettyDate,
      SharingLine
    }
  }
</script>

<style>

</style>
