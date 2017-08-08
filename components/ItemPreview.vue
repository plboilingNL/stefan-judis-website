<template>
  <!-- aria-label -->
  <div class="c-preview">
    <PrettyDate v-if="item.fields.date && showDate" :date="item.fields.date"></PrettyDate>

    <DynamicHeadline v-if="includeLink" :level="level" :url="`/${linkPrefix}/${item.fields.slug}`">{{ item.fields.title }}</DynamicHeadline>
    <DynamicHeadline v-if="!includeLink" :level="level">{{ item.fields.title }}</DynamicHeadline>

    <p v-if="showDescription">{{ item.fields.description }}</p>
    <Marked v-if="showExcerpt" :markdown="item.fields.excerpt"></Marked>
    <Marked v-if="showBody" :markdown="item.fields.body"></Marked>

    <div v-if="item.sys.contentType.sys.id === '2wKn6yEnZewu2SCCkus4as'" class="u-marginTopAuto">
      <p v-if="item.fields.externalUrl"><a :href="item.fields.externalUrl" class="o-btn">Read on {{ item.fields.externalUrl | externalUrl }}</a></p>
      <p v-if="!item.fields.externalUrl"><nuxt-link :to="`/${linkPrefix}/${item.fields.slug}`" class="o-btn">Read more</nuxt-link></p>
    </div>

    <div v-if="item.sys.contentType.sys.id === 'talk'" class="u-marginTopAuto">
      <p><a :href="item.fields.slideUrl" class="o-btn">Check the slides</a></p>
    </div>

    <div v-if="item.sys.contentType.sys.id === 'project'" class="u-marginTopAuto">
      <p><a :href="item.fields.url" class="o-btn">Check the project</a></p>
    </div>

    <div v-if="showVideo && (item.fields.video || item.fields.videoWebm)">
      <video autoplay muted loop playsinline preload="metadata" :class="{ 'is-mobile-video': item.fields.isMobileVideo }">
        <source v-if="item.fields.videoWebm" :src="item.fields.videoWebm.fields.file.url" type="video/webm">
        <source v-if="item.fields.video" :src="item.fields.video.fields.file.url" type="video/mp4">
      </video>
    </div>
  </div>
</template>

<script>
  import PrettyDate from '~/components/PrettyDate.vue'
  import Marked from '~/components/Marked.vue'
  import DynamicHeadline from '~/components/DynamicHeadline.vue'

  export default {
    props: ['item', 'includeLink', 'showDescription', 'showExcerpt', 'showBody', 'showVideo', 'showDate', 'level'],
    computed: {
      headingLevel () {
        return this.level || 2
      },
      linkPrefix () {
        // TODO put this somewhere else
        const PREFIXES = {
          '2wKn6yEnZewu2SCCkus4as': 'blog',
          'talk': 'talks',
          'project': 'projects',
          'tilPost': 'today-i-learned'
        }
        return PREFIXES[this.item.sys.contentType.sys.id]
      }
    },
    components: {
      DynamicHeadline,
      PrettyDate,
      Marked
    }
  }
</script>

<style>
  .c-preview {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
</style>
