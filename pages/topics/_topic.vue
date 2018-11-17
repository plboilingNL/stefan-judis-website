<template>
  <Container animate="true">
    <h1 slot="headline" tabindex="-1">
      <Icon class="c-topic__icon" :name="topicName.replace(' ', '')" />
      {{ topicName }}
    </h1>
    <div v-if="items.articles.length">
      <div class="c-container__headline">
        <h2>Articles</h2>
      </div>
      <ul class="o-list-grid">
        <li v-for="item in items.articles" :key="item.sys.id">
          <Talk v-if="item.sys.contentType.sys.id === 'talk'" :talk="item" />
          <ScreenCast v-if="item.sys.contentType.sys.id === 'screenCast'" :screencast="item" />
          <Post
            v-if="item.sys.contentType.sys.id === '2wKn6yEnZewu2SCCkus4as' || item.sys.contentType.sys.id === 'tilPost'"
            :post="item" :show-excerpt="false" :show-date="true" :level="2" />
        </li>
      </ul>
    </div>

    <div v-if="items.others.length">
      <div class="c-container__headline">
        <h2>Talks and Screencasts</h2>
      </div>
      <ul class="o-list-grid">
        <li v-for="item in items.others" :key="item.sys.id">
          <Talk v-if="item.sys.contentType.sys.id === 'talk'" :talk="item" />
          <ScreenCast v-if="item.sys.contentType.sys.id === 'screenCast'" :screencast="item" />
          <Post
            v-if="item.sys.contentType.sys.id === '2wKn6yEnZewu2SCCkus4as' || item.sys.contentType.sys.id === 'tilPost'"
            :post="item" :show-excerpt="false" :show-date="true" :level="2" />
        </li>
      </ul>
    </div>
  </Container>
</template>

<script>
import Container from '~/components/Container.vue';
import Post from '~/components/Post.vue';
import Talk from '~/components/Talk.vue';
import ScreenCast from '~/components/ScreenCast.vue';
import { getTopicNameWithSlug } from '~/lib/topics.js';
import { createPage } from '~/lib/basepage.js';

export default createPage({
  async fetch({ app, params, store }) {
    const { getPosts, getTalks, getScreencasts, getTil } = app.contentful;
    await Promise.all([getPosts(), getTalks(), getScreencasts(), getTil()]);
  },
  computed: {
    items() {
      const { posts, talks, screencasts, til } = this.$store.state;
      const getMatchingItems = (items, topic) =>
        items.filter(item => {
          if (item.fields.topics) {
            return item.fields.topics.some(
              itemTopic => itemTopic.fields.slug === topic
            );
          }

          return false;
        });

      return {
        articles: getMatchingItems(
          [...posts.list, ...til.list],
          this.topic
        ).sort(
          (itemA, itemB) => (itemA.fields.date > itemB.fields.date ? -1 : 1)
        ),
        others: getMatchingItems(
          [...talks.list, ...screencasts.list],
          this.topic
        )
      };
    },
    topic() {
      return this.$route.params.topic;
    },
    topicName() {
      return getTopicNameWithSlug(this.$route.params.topic);
    }
  },
  head() {
    return {
      title: `Topics - #${this.topic} | Stefan Judis Web Development`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `Writings on web development including mainly JavaScript, web performance and accessibility - #${
            this.page
          }`
        }
      ]
    };
  },
  components: {
    Container,
    Icon: () => import('~/components/Icon.vue'),
    Talk,
    ScreenCast,
    Post
  }
});
</script>
