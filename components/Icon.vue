<template>
  <span v-html="icons[name]" :class="'icon-' + name"></span>
</template>
<script>
import Attention from '~/assets/icons/attention.svg';
import Blog from '~/assets/icons/blog.svg';
import GitHub from '~/assets/icons/github.svg';
import Home from '~/assets/icons/home.svg';
import Instagram from '~/assets/icons/instagram.svg';
import Learn from '~/assets/icons/learn.svg';
import Megaphone from '~/assets/icons/megaphone.svg';
import Project from '~/assets/icons/project.svg';
import Talk from '~/assets/icons/talk.svg';
import Twitter from '~/assets/icons/twitter.svg';
import Resources from '~/assets/icons/resources.svg';
import Share from '~/assets/icons/share.svg';
import Snippet from '~/assets/icons/snippet.svg';
import Smalltalk from '~/assets/icons/smalltalk.svg';
import Stopwatch from '~/assets/icons/stopwatch.svg';

// Topics
import Accessibility from '~/assets/icons/accessibility.svg';
import Bash from '~/assets/icons/bash.svg';
import CSS from '~/assets/icons/css.svg';
import Contentful from '~/assets/icons/contentful.svg';
import Electron from '~/assets/icons/electron.svg';
import git from '~/assets/icons/git.svg';
import GraphQL from '~/assets/icons/graphql.svg';
import HTML from '~/assets/icons/html.svg';
import JavaScript from '~/assets/icons/javascript.svg';
import MacOS from '~/assets/icons/macos.svg';
import Newsletter from '~/assets/icons/newsletter.svg';
import NodeJS from '~/assets/icons/nodejs.svg';
import Productivity from '~/assets/icons/productivity.svg';
import PWA from '~/assets/icons/pwa.svg';
import RegularExpressions from '~/assets/icons/regex.svg';
import Serverless from '~/assets/icons/serverless.svg';
import StaticSites from '~/assets/icons/static-sites.svg';
import SVG from '~/assets/icons/svg.svg';
import Testing from '~/assets/icons/testing.svg';
import Tools from '~/assets/icons/tools.svg';
import Unicode from '~/assets/icons/unicode.svg';
import Web from '~/assets/icons/web.svg';

const addAriaHiddenToSvg = svg => {
  return svg.replace('<svg', '<svg aria-hidden="true"');
};

export default {
  data() {
    return {
      icons: {
        GitHub: addAriaHiddenToSvg(GitHub),
        Twitter: addAriaHiddenToSvg(Twitter),
        Instagram: addAriaHiddenToSvg(Instagram),

        Attention: addAriaHiddenToSvg(Attention),
        Home: addAriaHiddenToSvg(Home),
        Blog: addAriaHiddenToSvg(Blog),
        Resources: addAriaHiddenToSvg(Resources),
        Smalltalk: addAriaHiddenToSvg(Smalltalk),
        Learn: addAriaHiddenToSvg(Learn),
        Project: addAriaHiddenToSvg(Project),
        Talk: addAriaHiddenToSvg(Talk),
        Share: addAriaHiddenToSvg(Share),
        Snippet: addAriaHiddenToSvg(Snippet),
        Megaphone: addAriaHiddenToSvg(Megaphone),

        Accessibility: addAriaHiddenToSvg(Accessibility),
        Bash: addAriaHiddenToSvg(Bash),
        Contentful: addAriaHiddenToSvg(Contentful),
        CSS: addAriaHiddenToSvg(CSS),
        Electron: addAriaHiddenToSvg(Electron),
        git: addAriaHiddenToSvg(git),
        GraphQL: addAriaHiddenToSvg(GraphQL),
        HTML: addAriaHiddenToSvg(HTML),
        JavaScript: addAriaHiddenToSvg(JavaScript),
        PWA: addAriaHiddenToSvg(PWA),
        MacOS: addAriaHiddenToSvg(MacOS),
        Newsletter: addAriaHiddenToSvg(Newsletter),
        NodeJS: addAriaHiddenToSvg(NodeJS),
        Performance: addAriaHiddenToSvg(Stopwatch),
        Productivity: addAriaHiddenToSvg(Productivity),
        RegularExpressions: addAriaHiddenToSvg(RegularExpressions),
        Serverless: addAriaHiddenToSvg(Serverless),
        StaticSites: addAriaHiddenToSvg(StaticSites),
        SVG: addAriaHiddenToSvg(SVG),
        Testing: addAriaHiddenToSvg(Testing),
        Tools: addAriaHiddenToSvg(Tools),
        Unicode: addAriaHiddenToSvg(Unicode),
        Web: addAriaHiddenToSvg(Web)
      }
    };
  },

  props: ['name']
};
</script>
