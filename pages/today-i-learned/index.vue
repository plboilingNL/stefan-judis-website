<template>
  <Container animate="true">
    <h1 slot="headline" tabindex="-1" id="main-headline">TIL - Today I learned</h1>
    <ul class="o-list-grid">
      <li v-for="topic in Object.keys(topics).sort()" :key="topic" :class="`area-${topic}`">
        <h2 class="o-headline-2 o-headline__highlighted">
          <nuxt-link :to="`/topics/${ topics[topic].slug }/`">
            <svg-icon :name="topics[topic].slug" />
            {{ topics[topic].name }}
          </nuxt-link>
        </h2>
        <ul class="o-list-reset">
          <li v-for="post in topics[topic].items" class="u-marginBottomSmall" :key="post._id">
            <nuxt-link :to="`/today-i-learned/${ post.slug }/`">{{ post.title }}</nuxt-link>
          </li>
        </ul>
      </li>
    </ul>
  </Container>
</template>

<script>
import Container from '~/components/Container.vue';
import { getTopicNameWithSlug } from '~/lib/topics.js';
import { createPage } from '~/lib/basepage.js';

export default createPage({
  async fetch({ app }) {
    await app.contentful.getTil();
  },
  computed: {
    topics() {
      return this.$store.state.til.list.reduce((acc, post) => {
        if (post.topics) {
          post.topics.forEach(topic => {
            if (!acc[topic.slug]) {
              acc[topic.slug] = {
                items: [],
                slug: topic.slug,
                title: topic.title,
                name: getTopicNameWithSlug(topic.slug)
              };
            }

            acc[topic.slug].items.push(post);

            return acc;
          });
        }

        return acc;
      }, {});
    }
  },
  head() {
    const title = 'Today I learned | Stefan Judis Web Development';
    const desc = `My documented web development learnings`;

    return {
      title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: desc
        },
        { hid: 'og:title', property: 'og:title', content: title },
        {
          hid: 'og:description',
          property: 'og:description',
          content: desc
        }
      ]
    };
  },
  components: {
    Container
  }
});
</script>

<style lang="postcss">
.area-javascript {
  @media (min-width: 70em) {
    grid-column: 2;
    grid-row: 2 / 5;
  }
}

.area-css {
  @media (min-width: 70em) {
    grid-column: 3;
    grid-row: 1 / 3;
  }
}
</style>
