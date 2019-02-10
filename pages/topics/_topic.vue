<template>
  <Container animate="true">
    <h1 slot="headline" tabindex="-1">
      <Icon class="c-topic__icon" :name="topicName.replace(' ', '')"/>
      {{ topicName }}
    </h1>
    <div v-if="items.articles.length" class="u-marginBottomLarge">
      <h2 class="o-headline-2 o-headline__highlighted">Articles</h2>
      <ul class="o-list-grid">
        <li v-for="item in items.articles" :key="item._id">
          <Talk v-if="item._ctId === 'talk'" :talk="item"/>
          <ScreenCast v-if="item._ctId === 'screenCast'" :screencast="item"/>
          <Post
            v-if="item._ctId === '2wKn6yEnZewu2SCCkus4as' || item._ctId === 'tilPost'"
            :post="item"
            :show-excerpt="false"
            :show-date="true"
            :level="3"
          />
        </li>
      </ul>
    </div>

    <div v-if="items.others.length">
      <h2 class="o-headline-2 o-headline__highlighted">Talks and Screencasts</h2>
      <ul class="o-list-grid">
        <li v-for="item in items.others" :key="item._id">
          <Talk v-if="item._ctId === 'talk'" :talk="item"/>
          <ScreenCast v-if="item._ctId === 'screenCast'" :screencast="item"/>
          <Post
            v-if="item._ctId === '2wKn6yEnZewu2SCCkus4as' || item._ctId === 'tilPost'"
            :post="item"
            :show-excerpt="false"
            :show-date="true"
            :level="3"
          />
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
          if (item.topics) {
            return item.topics.some(itemTopic => itemTopic.slug === topic);
          }

          return false;
        });

      return {
        articles: getMatchingItems(
          [...posts.list, ...til.list],
          this.topic
        ).sort((itemA, itemB) => (itemA.date > itemB.date ? -1 : 1)),
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
