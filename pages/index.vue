<template>
  <div class="t-container">
    <Container>
      <h1
        slot="headline"
        class="o-headline-1"
        tabindex="-1"
        id="main-headline"
      >Heyo, I'm Stefan! I write and speak about web technology.</h1>
      <div class="magazine-grid">
        <div class="magazine-grid__column">
          <h2 class="o-headline-4 o-headline__highlighted">
            <nuxt-link to="/blog">Blog</nuxt-link>
          </h2>
          <ul class="o-list-reset magazine-grid__list">
            <li v-for="post in posts" :key="post._id">
              <Post
                :post="post"
                :level="3"
                :style-level="2"
                :show-date="true"
                :show-excerpt="true"
              />
            </li>
          </ul>
        </div>

        <div class="magazine-grid__column">
          <h2 class="o-headline-4 o-headline__highlighted">
            <nuxt-link to="/today-i-learned/">Today I learned</nuxt-link>
          </h2>
          <ul class="o-list-reset magazine-grid__list">
            <li v-for="post in til" :key="post._id">
              <Post :post="post" :level="3" :show-date="true" :show-excerpt="false"/>
            </li>
          </ul>
        </div>

        <div class="magazine-grid__column">
          <h2 class="o-headline-4 o-headline__highlighted">Popular posts</h2>
          <ul class="o-list-reset magazine-grid__list">
            <li v-for="post in popularPosts" :key="post._id">
              <Post :post="post" :level="3" :style-level="3" :show-date="true"/>
            </li>
          </ul>
        </div>

        <div class="magazine-grid__column">
          <h2 class="o-headline-4 o-headline__highlighted">
            <nuxt-link to="/projects/">Projects</nuxt-link>
          </h2>
          <ul class="o-list-reset magazine-grid__list">
            <li v-for="project in projects" :key="project._id">
              <Project :project="project" :level="3" :style-level="2"/>
            </li>
          </ul>
        </div>

        <div class="magazine-grid__column">
          <h2 class="o-headline-4 o-headline__highlighted">
            <nuxt-link to="/smalltalk/">Developer Smalltalk</nuxt-link>
          </h2>
          <ul class="o-list-reset magazine-grid__list">
            <li v-for="screencast in screencasts" :key="screencast._id">
              <Screen-cast :screencast="screencast"/>
            </li>
          </ul>
        </div>

        <div class="magazine-grid__column">
          <h2 class="o-headline-4 o-headline__highlighted">
            <nuxt-link to="/talks/">Latest talks</nuxt-link>
          </h2>
          <ul class="o-list-reset magazine-grid__list">
            <li v-for="talk in talks" :key="talk._id">
              <Talk :talk="talk"/>
            </li>
          </ul>
        </div>
      </div>
    </Container>
  </div>
</template>

<script>
import Container from '~/components/Container.vue';
import ScreenCast from '~/components/ScreenCast.vue';
import Post from '~/components/Post.vue';
import Project from '~/components/Project.vue';
import Talk from '~/components/Talk.vue';
import { createPage } from '~/lib/basepage.js';

export default createPage({
  async fetch({ app }) {
    const {
      getPosts,
      getProjects,
      getTil,
      getScreencasts,
      getTalks
    } = app.contentful;

    await Promise.all([
      getPosts(),
      getProjects(),
      getTil(),
      getTalks(),
      getScreencasts()
    ]);
  },
  computed: {
    popularPosts() {
      return [...this.$store.state.posts.list, ...this.$store.state.til.list]
        .filter(({ gaCount }) => !!gaCount)
        .sort((itemA, itemB) => {
          return itemB.gaCount - itemA.gaCount;
        })
        .slice(0, 4);
    },
    posts() {
      return this.$store.state.posts.list.slice(0, 3);
    },
    projects() {
      return this.$store.state.projects.list.slice(0, 3);
    },
    til() {
      return this.$store.state.til.list.slice(0, 4);
    },
    talks() {
      return this.$store.state.talks.list.slice(0, 4);
    },
    screencasts() {
      return this.$store.state.screencasts.list.slice(0, 4);
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
    Project,
    Talk,
    ScreenCast
  }
});
</script>
