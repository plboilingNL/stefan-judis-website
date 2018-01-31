<template>
  <span v-html="icons[name]" :class="'icon-' + name"></span>
</template>
<script>

import Instagram from '~/assets/icons/instagram.svg'
import GitHub from '~/assets/icons/github.svg'
import Twitter from '~/assets/icons/twitter.svg'
import Close from '~/assets/icons/close.svg'

const addAriaHiddenToSvg = (svg) => {
  return svg.replace('<svg', '<svg aria-hidden="true"')
}

export default {
  data () {
    return {
      icons: {
        Close: addAriaHiddenToSvg(Close),
        GitHub: addAriaHiddenToSvg(GitHub),
        Twitter: addAriaHiddenToSvg(Twitter),
        Instagram: addAriaHiddenToSvg(Instagram)
      }
    }
  },

  props: ['name']
}
</script>
