<template>
  <Container class="t-container" accessible-line-length="true">
    <DynamicHeadline slot="headline" :level="1" :id="page.fields.title | idAlize" class="p-name">{{ page.fields.title }}</DynamicHeadline>
    <div class="c-tile">
      <Marked :markdown="page.fields.body" class="e-content"></Marked>
      <SharingLine v-if="page.fields.slug !== '404'" :item="page"></SharingLine>
    </div>
  </Container>
</template>

<script>
  import Container from '~/components/Container.vue'
  import DynamicHeadline from '~/components/DynamicHeadline.vue'
  import SharingLine from '~/components/SharingLine.vue'
  import getTransition from '~/plugins/transition.js'
  import Marked from '~/components/Marked.vue'

  export default {
    async fetch ({ app, store, params, redirect }) {
      await app.contentful.getLandingpages()
      store.commit('landingpages/setActiveWithSlug', params.slug)

      if (!store.state.landingpages.active) {
        return redirect('/404/')
      }
    },
    computed: {
      page () {
        return this.$store.state.landingpages.active
      }
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
