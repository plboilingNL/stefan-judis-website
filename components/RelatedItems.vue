<template>
  <div v-if="relatedItems.length">
    <h3>Related posts</h3>
    <ul>
      <li v-for="related in relatedItems" :key="related._id">
        <nuxt-link :to="`/${ slug }/${ related.slug }/`">{{ related.title }}</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['item', 'items', 'slug'],
  computed: {
    relatedItems() {
      const currentItem = this.item;

      return this.items
        .filter(item => {
          return (
            item.topics &&
            item.topics.some(topic => {
              return (
                currentItem.topics &&
                currentItem.topics.some(
                  activeTopic => activeTopic.title === topic.title
                )
              );
            }) &&
            item._id !== currentItem._id
          );
        })
        .slice(0, 3);
    }
  }
};
</script>

