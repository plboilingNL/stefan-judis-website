<template>
  <ul v-if="topics" class="o-list-inline">
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

<style>
.c-topic {
  display: flex;
  align-items: center;
  font-size: 0.875em;
  text-decoration: none;
  padding: 0.375em 0.875em;
  margin-right: 0.75em;
  margin-bottom: 0.5em;
  background: var(--c-tile-background);

  box-shadow: 0 0.062em 0.5em var(--c-shadow-color);
  border-radius: 0.375em;

  transition: transform 0.125s ease-in-out;

  &:hover {
    transform: translateY(-1px);
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
