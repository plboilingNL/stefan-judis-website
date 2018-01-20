<template>
  <div :class="classes">
    <PrettyDate v-if="item.fields.date && showDate" :date="item.fields.date" class="dt-published"></PrettyDate>

    <DynamicHeadline v-if="includeLink" :level="level" :url="`/${linkPrefix}/${item.fields.slug}/`" class="p-name">{{ item.fields.title }}</DynamicHeadline>
    <DynamicHeadline v-if="!includeLink" :level="level" :id="item.fields.title | idAlize" class="p-name">{{ item.fields.title }}</DynamicHeadline>

    <p v-if="showDescription">{{ item.fields.description }}</p>
    <Marked v-if="showExcerpt" :markdown="item.fields.excerpt"></Marked>

    <div v-if="item.sys.contentType.sys.id === '2wKn6yEnZewu2SCCkus4as'" class="u-marginTopAuto">
      <ul class="o-list-inline">
        <li v-for="tag in item.fields.tags">
          <nuxt-link class="o-tag u-marginRightSmall u-marginBottomSmall" :to="`/blog/tag/${tag}`">{{ tag }}</nuxt-link>
        </li>
      </ul>
      <div class="c-tile__footer">
        <a v-if="item.fields.externalUrl" :href="item.fields.externalUrl" :aria-labelledby="item.fields.title | idAlize">Read on {{ item.fields.externalUrl | externalUrl }}</a>
        <nuxt-link v-if="!item.fields.externalUrl" :to="`/${linkPrefix}/${item.fields.slug}/`" :aria-labelledby="item.fields.title | idAlize">Read more</nuxt-link>
      </div>
    </div>

    <div v-if="item.sys.contentType.sys.id === 'talk'" class="c-tile__footer">
      <a :href="item.fields.slideUrl" :aria-labelledby="item.fields.title | idAlize">Check out the slides</a>
    </div>

    <div v-if="item.sys.contentType.sys.id === 'project'" class="c-tile__footer">
      <a :href="item.fields.url" :aria-labelledby="item.fields.title | idAlize">Check out the project</a>
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
    props: ['item', 'includeLink', 'showDescription', 'showExcerpt', 'showVideo', 'showDate', 'level', 'color'],
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
      },
      classes () {
        return [
          'c-tile',
          `c-tile__${this.color || 'red'}`,
          'h-entry',
          this.item.fields.isDraft ? 'is-draft' : null
        ]
      }
    },
    components: {
      DynamicHeadline,
      PrettyDate,
      Marked
    }
  }
</script>
