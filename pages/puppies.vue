<template>
  <Container animate="true" accessible-line-length="true">
    <h1 slot="headline" tabindex="-1">Stefan's puppy collection</h1>
    <div class="u-textAlignCenter">
      <div>
        <p>You're here for some doggos? Alrighty!</p>
      </div>
      <div>
        <button
          class="o-btn o-btn--small u-marginTopMedium u-marginBottomMedium"
          @click="togglePuppie"
          type="button"
        >{{ this.showPuppie ? 'Show me another puppy!' : 'Show me a puppy!'}}</button>
        <video v-if="showPuppie && puppyVideo" controls>
          <source :src="puppyVideo.file.url" type="video/mp4" />
        </video>
      </div>
    </div>
  </Container>
</template>

<script>
import Container from '~/components/Container.vue';
import { createPage } from '~/lib/basepage.js';

export default createPage({
  async fetch({ app }) {
    const { getPuppies } = app.contentful;
    await getPuppies();
  },
  computed: {
    puppyCollection() {
      return this.$store.state.puppies.entry.videos || [];
    }
  },
  data() {
    return {
      showPuppie: false,
      puppyVideo: null
    };
  },
  methods: {
    togglePuppie() {
      this.showPuppie = true;
      this.puppyVideo = null;

      setTimeout(
        () =>
          (this.puppyVideo = this.puppyCollection[
            Math.round(Math.random() * (this.puppyCollection.length - 1))
          ]),
        0
      );
    }
  },
  head() {
    return {
      title: `Stefan Judis Web Development - Puppy collection`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `Some puppies for sad times`
        }
      ]
    };
  },
  components: {
    Container
  }
});
</script>
