<template>
  <div class="t-container">
    <Container>
      <h2 slot="headline" tabindex="-1">Upcoming events</h2>
      <ul class="o-list-thirds">
        <li v-for="event in events">
          <div class="c-tile h-event">
            <pretty-date :date="event.fields.start" class="dt-start"></pretty-date>
            <h3 class="o-headline-3 u-marginBottomTiny p-name">{{event.fields.name}}</h3>
            <p class="u-inline-block u-marginTopAuto p-location">
              <flag :code="event.fields.country"/>
              {{ event.fields.city }}
            </p>
            <span class="u-marginBottomMedium u-fontStyleItalic">({{event.fields.state === 'accepted' ? 'speaking' : 'attending'}})</span>
            <div class="c-tile__footer">
              <a :href="event.fields.website" :aria-labelledby="`Visit ${event.fields.name}`">Go to event</a>
            </div>
          </div>
        </li>
      </ul>
      <nuxt-link slot="footerLine" to="/i-would-love-to-speak/"  class="o-btn">Invite me to your event</nuxt-link>
    </Container>
    <Container>
      <h1 class="o-headline-1">Talks</h1>
      <ul class="o-list-thirds">
        <li v-for="talk in talks" class="u-marginBottomLarge">
          <div class="c-tile c-tile__noHighlight h-entry">
            <!-- this is container is needed because of a FF bug -->
            <div class="c-tile__image">
              <lazy-image :asset="talk.fields.thumbnail" :ratio="0.5625"></lazy-image>
            </div>
            <h3>{{ talk.fields.title }}</h3>
            <p class="u-marginTopAuto u-noMarginBottom">
              <a v-if="talk.fields.slideUrl" :href="talk.fields.slideUrl" class="o-btn o-btn--small u-marginRightSmall">Slides</a>
              <a v-if="talk.fields.videoUrl" :href="talk.fields.videoUrl" class="o-btn o-btn--small">Recording</a>
            </p>
          </div>
        </li>
      </ul>
    </Container>
  </div>
</template>

<script>
  import Container from '~/components/Container.vue'
  import Flag from '~/components/Flag.vue'
  import LazyImage from '~/components/LazyImage.vue'
  import PrettyDate from '~/components/PrettyDate.vue'
  import getTransition from '~/plugins/transition.js'

  export default {
    async fetch ({ app }) {
      const { getFutureEvents, getTalks } = app.contentful

      await Promise.all([
        getFutureEvents(),
        getTalks()
      ])
    },
    computed: {
      events () {
        return this.$store.state.events.futureList
      },
      talks () {
        return this.$store.state.talks.list
      }
    },
    head () {
      return {
        title: `Talks | Stefan Judis Web Development`,
        meta: [
          { hid: 'description', name: 'description', content: `Listing of my upcoming events and talks` }
        ]
      }
    },
    transition (to, from) {
      return getTransition(from, to)
    },
    components: {
      Container,
      Flag,
      LazyImage,
      PrettyDate
    }
  }
</script>
