<template>
  <span v-html="icons[name]" :class="'icon-' + name"></span>
</template>
<script>

import Instagram from '~/assets/icons/instagram.svg'
import GitHub from '~/assets/icons/github.svg'
import Twitter from '~/assets/icons/twitter.svg'
import Close from '~/assets/icons/close.svg'
import Home from '~/assets/icons/home.svg'
import Blog from '~/assets/icons/blog.svg'
import Resources from '~/assets/icons/resources.svg'
import Smalltalk from '~/assets/icons/smalltalk.svg'
import Learn from '~/assets/icons/learn.svg'
import Project from '~/assets/icons/project.svg'
import Talk from '~/assets/icons/talk.svg'
import Snippet from '~/assets/icons/snippet.svg'
import Stopwatch from '~/assets/icons/stopwatch.svg'

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
        Instagram: addAriaHiddenToSvg(Instagram),

        Home: addAriaHiddenToSvg(Home),
        Blog: addAriaHiddenToSvg(Blog),
        Resources: addAriaHiddenToSvg(Resources),
        Smalltalk: addAriaHiddenToSvg(Smalltalk),
        Learn: addAriaHiddenToSvg(Learn),
        Project: addAriaHiddenToSvg(Project),
        Talk: addAriaHiddenToSvg(Talk),
        Snippet: addAriaHiddenToSvg(Snippet),
        Stopwatch: addAriaHiddenToSvg(Stopwatch)
      }
    }
  },

  props: ['name']
}
</script>
