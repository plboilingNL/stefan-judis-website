<template>
  <Container animate="true" accessible-line-length="true">
    <h1 slot="headline" tabindex="-1">Hey there Conference people!</h1>
  </Container>
</template>

<script>
import Container from '~/components/Container.vue';
import { createPage } from '~/lib/basepage.js';

export default createPage({
  mounted() {
    if (window.opener) {
      window.opener.location =
        'https://s3.amazonaws.com/ceblog/wp-content/uploads/2016/04/22110359/youve-been-hacked.png';
    } else {
      console.log('no opener');
    }
  },

  head() {
    return {
      title: `Stefan Judis Web Development - Talk rel noopener hack example`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `Talk example – nothing to see here`
        }
      ]
    };
  },
  components: {
    Container
  }
});
</script>

<style scoped lang="postcss"></style>
