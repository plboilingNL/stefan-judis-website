<template functional>
  <div class="c-paginationActions">
    <nuxt-link v-if="props.prevPage" :to="props.prevPage" class="o-btn">Previous Page</nuxt-link>
    <nuxt-link v-if="props.nextPage" :to="props.nextPage" class="o-btn u-marginLeftAuto">Next Page</nuxt-link>
  </div>
</template>

<style>
  .c-paginationActions {
    padding: 1em 0;
    display: flex;
  }
</style>
