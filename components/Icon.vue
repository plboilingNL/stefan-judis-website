<template>
  <span v-html="icons[name]" :class="'icon-' + name" aria-hidden="true"></span>
</template>
<script>
import Home from '~/assets/icons/home.svg'
import Write from '~/assets/icons/write.svg'
import Code from '~/assets/icons/code.svg'
import Speak from '~/assets/icons/speak.svg'
import Learn from '~/assets/icons/learn.svg'
import GitHub from '~/assets/icons/github.svg'
import Twitter from '~/assets/icons/twitter.svg'

export default {
  data () {
    return {
      icons: {
        Home,
        Write,
        Code,
        Speak,
        Learn,
        GitHub,
        Twitter
      }
    }
  },

  props: ['name']
}
</script>
