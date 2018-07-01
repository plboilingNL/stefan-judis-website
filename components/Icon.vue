<template>
  <span v-html="icons[name]" :class="'icon-' + name"></span>
</template>
<script>
import Instagram from '~/assets/icons/instagram.svg';
import GitHub from '~/assets/icons/github.svg';
import Twitter from '~/assets/icons/twitter.svg';
import Close from '~/assets/icons/close.svg';
import Home from '~/assets/icons/home.svg';
import Blog from '~/assets/icons/blog.svg';
import Resources from '~/assets/icons/resources.svg';
import Smalltalk from '~/assets/icons/smalltalk.svg';
import Learn from '~/assets/icons/learn.svg';
import Project from '~/assets/icons/project.svg';
import Talk from '~/assets/icons/talk.svg';
import Snippet from '~/assets/icons/snippet.svg';
import Stopwatch from '~/assets/icons/stopwatch.svg';

// Topics
import Accessibility from '~/assets/icons/accessibility.svg';
import JavaScript from '~/assets/icons/javascript.svg';
import StaticSites from '~/assets/icons/static-sites.svg';
import Testing from '~/assets/icons/testing.svg';
import Contentful from '~/assets/icons/contentful.svg';
import Unicode from '~/assets/icons/unicode.svg';
import Serverless from '~/assets/icons/serverless.svg';
import GraphQL from '~/assets/icons/graphql.svg';
import PWA from '~/assets/icons/pwa.svg';
import CSS from '~/assets/icons/css.svg';
import Bash from '~/assets/icons/bash.svg';
import HTML from '~/assets/icons/html.svg';
import RegularExpressions from '~/assets/icons/regex.svg';
import NodeJS from '~/assets/icons/nodejs.svg';
import git from '~/assets/icons/git.svg';
import MacOS from '~/assets/icons/macos.svg';
import Productivity from '~/assets/icons/productivity.svg';
import Tools from '~/assets/icons/tools.svg';
import Web from '~/assets/icons/web.svg';

const addAriaHiddenToSvg = svg => {
  return svg.replace('<svg', '<svg aria-hidden="true"');
};

export default {
  data() {
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
        Stopwatch: addAriaHiddenToSvg(Stopwatch),

        Accessibility: addAriaHiddenToSvg(Accessibility),
        JavaScript: addAriaHiddenToSvg(JavaScript),
        StaticSites: addAriaHiddenToSvg(StaticSites),
        Testing: addAriaHiddenToSvg(Testing),
        Performance: addAriaHiddenToSvg(Stopwatch),
        Contentful: addAriaHiddenToSvg(Contentful),
        Unicode: addAriaHiddenToSvg(Unicode),
        Serverless: addAriaHiddenToSvg(Serverless),
        GraphQL: addAriaHiddenToSvg(GraphQL),
        PWA: addAriaHiddenToSvg(PWA),
        CSS: addAriaHiddenToSvg(CSS),
        Bash: addAriaHiddenToSvg(Bash),
        HTML: addAriaHiddenToSvg(HTML),
        RegularExpressions: addAriaHiddenToSvg(RegularExpressions),
        NodeJS: addAriaHiddenToSvg(NodeJS),
        git: addAriaHiddenToSvg(git),
        MacOS: addAriaHiddenToSvg(MacOS),
        Productivity: addAriaHiddenToSvg(Productivity),
        Tools: addAriaHiddenToSvg(Tools),
        Web: addAriaHiddenToSvg(Web)
        Newsletter: addAriaHiddenToSvg(Newsletter)
      }
    };
  },

  props: ['name']
};
</script>

<style>
  [class*=icon] {
    display: contents;
  }
</style>
