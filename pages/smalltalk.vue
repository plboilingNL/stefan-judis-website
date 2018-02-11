<template>
  <Container class="t-container" accessible-line-length="true">
    <h1 slot="headline" tabindex="-1">Developer Smalltalk</h1>
  </Container>
</template>

<script>
  import Container from '~/components/Container.vue'
  import {createPage} from '~/lib/basepage.js'

  export default createPage({
    components: {
      Container
    }
  })
</script>

<style scoped>
</style>
