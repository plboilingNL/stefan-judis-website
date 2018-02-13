<template>
  <Container class="t-container" accessible-line-length="true">
    <PrettyDate slot="date" :date="post.fields.date"></PrettyDate>
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
      <div v-if="relatedPosts.length">
        <h3>Related learnings</h3>
        <ul>
          <li v-for="related in relatedPosts" :key="related.sys.id">
            <nuxt-link :to="`/today-i-learned/${ related.fields.slug }/`">{{ related.fields.title }}</nuxt-link>
          </li>
        </ul>
      </div>
      <Comments class="u-marginBottomMedium" />
      <SharingLine :item="post"></SharingLine>
    </div>
  </Container>
</template>

<script>
  import Container from '~/components/Container.vue'
  import Comments from '~/components/Comments.vue'
  import DynamicHeadline from '~/components/DynamicHeadline.vue'
  import Marked from '~/components/Marked.vue'
  import PrettyDate from '~/components/PrettyDate.vue'
  import SharingLine from '~/components/SharingLine.vue'
  import {createPage, getHeadForPost} from '~/lib/basepage.js'

  export default createPage({
    async fetch ({ app, params, store, redirect }) {
      await app.contentful.getTil()

      store.commit('til/setActiveWithSlug', params.slug)

      if (!store.state.til.active) {
        return redirect('/404/')
      }
    },
    computed: {
      post () {
        return this.$store.state.til.active
      },
      relatedPosts () {
        if (this.post) {
          return this.$store.state.til.list.filter(item => {
            return item.fields.tags.some(tag => {
              return this.post.fields.tags.some(
                activeCat => activeCat === tag
              )
            }) && item.sys.id !== this.post.sys.id
          }).slice(0, 3)
        }
      }
    },
    head () {
      return getHeadForPost(this.post)
    },
    components: {
      Container,
      Comments,
      DynamicHeadline,
      Marked,
      PrettyDate,
      SharingLine
    }
  })
</script>
