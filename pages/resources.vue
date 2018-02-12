<template>
  <Container class="t-container" accessible-line-length="true">
    <h1 slot="headline" tabindex="-1">Resources</h1>
    <p>Work in progress...</p>
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
