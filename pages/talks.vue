<template>
  <div class="t-container">
    <Container>
      <h2 slot="headline" tabindex="-1">Upcoming events</h2>
      <ul class="o-list-grid">
        <li v-for="event in events" :key="event.sys.id">
          <div class="c-tile">
            <div class="c-tile__container">
              <pretty-date :date="event.fields.start" class="dt-start"></pretty-date>
              <DynamicHeadline :level="3" :url="event.fields.website" class="o-headline-3 u-marginBottomTiny" :id="event.fields.name | idAlize">{{ event.fields.name }}</DynamicHeadline>
              <p class="u-inline-block u-marginTopAuto p-location">
                <flag :code="event.fields.conference.fields.country"/>
                {{ event.fields.conference.fields.city }}
              </p>
              <span class="u-marginBottomMedium u-fontStyleItalic">({{event.fields.state === 'accepted' ? 'speaking' : 'attending'}})</span>
            </div>
          </div>
        </li>
      </ul>
      <nuxt-link slot="footerLine" to="/i-would-love-to-speak/"  class="o-btn u-marginTopLarge">Invite me to your event</nuxt-link>
    </Container>
    <Container>
      <h1 slot="headline" class="o-headline-1">Talks</h1>
      <ul class="o-list-grid">
        <li v-for="talk in talks" class="u-marginBottomLarge" :key="talk.sys.id">
          <Talk :talk="talk"/>
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
