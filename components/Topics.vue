<template>
  <ul v-if="topics" class="c-topics o-list-inline">
    <li v-for="topic in enrichedTopics" :key="topic.fields.title">
      <nuxt-link
        class="c-topic"
        :to="topic.fields.name === 'Newsletter' ? '/newsletter/' : `/topics/${ topic.fields.slug }`"
      >
        <Icon class="c-topic__icon" :name="topic.fields.title"/>
        {{ topic.fields.name }}
      </nuxt-link>
    </li>
  </ul>
</template>


<script>
import { getTopicNameWithSlug } from '~/lib/topics.js';

export default {
  props: ['topics'],
  computed: {
    enrichedTopics() {
      return this.topics.map(topic => {
        topic.fields.name = getTopicNameWithSlug(topic.fields.slug);
        return topic;
      });
    }
  },
  components: {
    Icon: () => import('~/components/Icon.vue')
  }
};
</script>

<style lang="postcss">
.c-topics {
  li {
    &:not(last-child) {
      margin-right: 0.75em;
    }
  }
}

.c-topic {
  display: flex;
  align-items: center;
  font-size: 0.875em;
  text-decoration: none;
  padding: 0.27em 0.75em;
  margin-bottom: 0.5em;
  border-radius: 0.125em;
  border: 2px solid var(--grey-brighter);
  background: var(--grey-brighter);

  &:hover {
    border-color: var(--c-highlight);
  }

  svg {
    display: block;
    height: 1.25em;
    width: auto;
    max-width: 1.5em;
    margin-right: 0.675em;
  }
}
</style>
