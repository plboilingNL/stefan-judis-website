<template>
  <div class="t-container">
    <Container>
      <h2 slot="headline" tabindex="-1">Upcoming events</h2>
      <ul class="o-list-grid">
        <li v-for="event in events" :key="event._id">
          <pretty-date :date="event.start" class="dt-start"></pretty-date>
          <DynamicHeadline
            :level="3"
            :url="event.website"
            class="o-headline-3 u-marginBottomTiny"
            :id="event.name | idAlize"
          >{{ event.name }}</DynamicHeadline>
          <p class="u-inline-block u-marginTopAuto p-location">
            <flag :code="event.conference.country"/>
            {{ event.conference.city }}
          </p>
          <span
            class="u-marginBottomMedium u-fontStyleItalic"
          >({{event.state === 'accepted' ? 'speaking' : event.state}})</span>
        </li>
      </ul>
      <nuxt-link
        slot="footerLine"
        to="/i-would-love-to-speak/"
        class="o-btn u-marginTopLarge"
      >Invite me to speak at your event</nuxt-link>
    </Container>
    <Container>
      <h1 slot="headline" class="o-headline-1" id="main-headline">Talks</h1>
      <ul class="o-list-grid">
        <li v-for="talk in talks" :key="talk._id">
          <Talk :talk="talk" :show-image="true"/>
        </li>
      </ul>
    </Container>
  </div>
</template>

<script>
import Container from '~/components/Container.vue';
import DynamicHeadline from '~/components/DynamicHeadline.vue';
import Flag from '~/components/Flag.vue';
import PrettyDate from '~/components/PrettyDate.vue';
import Talk from '~/components/Talk.vue';
import { createPage } from '~/lib/basepage.js';

export default createPage({
  async fetch({ app }) {
    const { getFutureEvents, getTalks } = app.contentful;

    await Promise.all([getFutureEvents(), getTalks()]);
  },
  computed: {
    events() {
      return this.$store.state.events.futureList;
    },
    talks() {
      return this.$store.state.talks.list;
    }
  },
  head() {
    return {
      title: `Talks | Stefan Judis Web Development`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `Listing of my upcoming events and talks`
        }
      ]
    };
  },
  components: {
    Container,
    DynamicHeadline,
    Flag,
    PrettyDate,
    Talk
  }
});
</script>
