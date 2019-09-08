
<template>
  <div style="text-align: center;">
    <button
      class="o-btn o-btn--small u-marginTopMedium u-marginBottomMedium"
      @click="togglePuppie"
      type="button"
    >{{ this.showPuppie ? 'Show me another puppie!' : 'Show me a puppie!'}}</button>
    <video v-if="showPuppie && showNextPuppie" controls>
      <source :key="puppie" :src="`/puppies/${this.puppie}`" type="video/mp4" />
    </video>
  </div>
</template>

<script>
import videos from '~/static/puppies/puppies.json';

export default {
  data() {
    return {
      showPuppie: false,
      showNextPuppie: false,
      puppie: null
    };
  },

  methods: {
    togglePuppie() {
      this.showPuppie = true;
      this.showNextPuppie = false;
      this.puppie = videos[Math.round(Math.random() * (videos.length - 1))];

      setTimeout(() => (this.showNextPuppie = true), 0);
    }
  }
};
</script>

