<template>
  <div class="t-container">
    <Container additional-class="c-newsletter">
      <h1 slot="headline" tabindex="-1" id="main-headline">Past newsletter editions</h1>
      <ul class="o-list-grid">
        <li v-for="newsletter in newsletters" :key="newsletter.sys.id">
          <Post :post="newsletter" :level="2" :show-date="true"/>
        </li>
      </ul>
    </Container>
  </div>
</template>

<script>
import Container from '~/components/Container.vue';
import NewsletterForm from '~/components/NewsletterForm.vue';
import Post from '~/components/Post.vue';
import { createPage } from '~/lib/basepage.js';

export default createPage({
  async fetch({ app }) {
    const { getPosts } = app.contentful;

    await getPosts();
  },
  computed: {
    newsletters() {
      return this.$store.state.posts.list.filter(
        ({ fields }) =>
          fields.topics &&
          fields.topics.some(topic => topic.fields.title === 'Newsletter')
      );
    }
  },
  head() {
    return {
      title: `Stefan Judis Web Development - Newsletter`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `Subscribe to my monthly newsletter`
        }
      ]
    };
  },
  components: {
    Container,
    Post,
    NewsletterForm
  }
});
</script>
