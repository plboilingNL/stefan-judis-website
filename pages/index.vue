<template>
  <div class="t-container">
    <Container>
      <h1 slot="headline" class="o-headline-1" tabindex="-1">Hey, I'm Stefan. I develop digital services and products.</h1>
      <Person :person="me"></Person>
    </Container>
    <Container>
      <h2 slot="headline">Blog</h2>
      <ul class="o-list-thirds">
        <li v-for="post in posts" :key="post.sys.id">
          <Post :post="post" :level="3" :show-date="true" />
        </li>
      </ul>
      <nuxt-link slot="footerLine" to="/blog/" class="o-btn">See all posts</nuxt-link>
    </Container>
    <Container>
      <h2 slot="headline">Talks</h2>
      <ul class="o-list-thirds">
        <li v-for="talk in talks" :key="talk.sys.id">
          <Talk :talk="talk"/>
        </li>
      </ul>
      <nuxt-link slot="footerLine" to="/talks/"  class="o-btn">See my past and upcoming talks</nuxt-link>
    </Container>
    <Container>
      <h2 slot="headline">Developer Smalltalk</h2>
      <ul class="o-list-thirds">
        <li v-for="screencast in screencasts" :key="screencast.sys.id">
          <Screen-cast :screencast="screencast" />
        </li>
      </ul>

      <nuxt-link slot="footerLine" to="/smalltalk/" class="o-btn">See all episodes</nuxt-link>
    </Container>
  </div>
</template>

<script>
import Container from '~/components/Container.vue';
import Person from '~/components/Person.vue';
import ScreenCast from '~/components/ScreenCast.vue';
import Post from '~/components/Post.vue';
import Talk from '~/components/Talk.vue';
import { createPage } from '~/lib/basepage.js';

export default createPage({
  async fetch({ app }) {
    const { getMe, getPosts, getScreencasts, getTalks } = app.contentful;

    await Promise.all([getMe(), getPosts(), getTalks(), getScreencasts()]);
  },
  computed: {
    me() {
      return this.$store.state.me.entry;
    },
    posts() {
      return this.$store.state.posts.list.slice(0, 3);
    },
    talks() {
      return this.$store.state.talks.list.slice(0, 3);
    },
    screencasts() {
      return this.$store.state.screencasts.list.slice(0, 3);
    }
  },
  head() {
    return {
      title: `Stefan's web dev journey`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'My personal website dealing with daily web development things.'
        },
        {
          property: 'og:description',
          content:
            'My personal website dealing with daily web development things.'
        }
      ]
    };
  },
  components: {
    Post,
    Container,
    Person,
    Talk,
    ScreenCast
  }
});
</script>
