<template>
  <Container animate="true" :full-width="true">
    <h1 slot="headline" tabindex="-1">TIL - Today I learned</h1>
    <ul class="o-list-grid">
      <li v-for="topic in Object.keys(topics).sort()" :key="topic" :class="`area-${topic}`">
        <div class="c-tile">
          <div class="c-tile__container">
            <h2 class="o-headline-2">
              <nuxt-link :to="`/topics/${ topics[topic].slug }`">
                <Icon :name="topics[topic].title" />
                {{ topics[topic].name }}
              </nuxt-link>
            </h2>
            <ul class="o-list-reset">
              <li v-for="post in topics[topic].items" class="u-marginBottomSmall" :key="post.sys.id">
                <nuxt-link :to="`/today-i-learned/${ post.fields.slug }`">post.fields.title</nuxt-link>
              </li>
            </ul>
          </div>
        </div>
      </li>
    </ul>
  </Container>
</template>

<script>
import Container from '~/components/Container.vue';
import Icon from '~/components/Icon.vue';
import { getTopicNameWithSlug } from '~/lib/topics.js';
import { createPage } from '~/lib/basepage.js';

export default createPage({
  async fetch({ app }) {
    await app.contentful.getTil();
  },
  computed: {
    topics() {
      return this.$store.state.til.list.reduce((acc, post) => {
        if (post.fields.topics) {
          post.fields.topics.forEach(topic => {
            if (!acc[topic.fields.slug]) {
              acc[topic.fields.slug] = {
                items: [],
                slug: topic.fields.slug,
                title: topic.fields.title,
                name: getTopicNameWithSlug(topic.fields.slug)
              };
            }

            acc[topic.fields.slug].items.push(post);

            return acc;
          });
        }

        return acc;
      }, {});
    }
  },
  head() {
    return {
      title: 'Today I learned | Stefan Judis Web Development',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `My daily Web Development learnings`
        }
      ]
    };
  },
  components: {
    Container,
    Icon
  }
});
</script>

<style lang="scss">
.area-javascript {
  @media (min-width: 70em) {
    grid-row: 2 / 5;
  }
}
</style>
