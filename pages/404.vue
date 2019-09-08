<template>
  <Container animate="true" accessible-line-length="true">
    <h1 slot="headline" tabindex="-1">Hmm... Nothing here...</h1>
    <div>
      <p>Looks like what you're looking for is not there anymore. 😢 But you can have a look at some puppies. 😊</p>
      <div class="u-textAlignCenter">
        <nuxt-link
          to="/puppies/"
          class="o-btn o-btn--small u-marginTopMedium u-marginBottomMedium"
        >Alright, show me some puppies!</nuxt-link>
      </div>
    </div>
  </Container>
</template>

<script>
import Container from '~/components/Container.vue';
import { createPage } from '~/lib/basepage.js';

export default createPage({
  head() {
    return {
      title: `Stefan Judis Web Development - Not found`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `404 - Not found`
        }
      ]
    };
  },
  components: {
    Container
  }
});
</script>
