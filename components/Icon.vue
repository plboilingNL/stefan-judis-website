<template>
  <span v-html="icons[name]" :class="'icon-' + name"></span>
</template>
<script>
import Home from '~/assets/icons/home.svg'
import Write from '~/assets/icons/write.svg'
import Code from '~/assets/icons/code.svg'
import Speak from '~/assets/icons/speak.svg'
import Learn from '~/assets/icons/learn.svg'
import GitHub from '~/assets/icons/github.svg'
import Twitter from '~/assets/icons/twitter.svg'

const addAriaHiddenToSvg = (svg) => {
  return svg.replace('<svg', '<svg aria-hidden="true"')
}

export default {
  data () {
    return {
      icons: {
        Home: addAriaHiddenToSvg(Home),
        Write: addAriaHiddenToSvg(Write),
        Code: addAriaHiddenToSvg(Code),
        Speak: addAriaHiddenToSvg(Speak),
        Learn: addAriaHiddenToSvg(Learn),
        GitHub: addAriaHiddenToSvg(GitHub),
        Twitter: addAriaHiddenToSvg(Twitter)
      }
    }
  },

  props: ['name']
}
</script>
