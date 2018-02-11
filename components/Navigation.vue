<template>
  <nav :class="['c-navigation', mainNavIsVisible ? 'main-nav-visible' : '']">
    <ul class="c-navigation__complete" :inert="!mainNavIsVisible">
      <li v-for="item in mainNav" :key="item.url">
        <nuxt-link :to="item.url">{{ item.label }}</nuxt-link>
      </li>
    </ul>
    <ul class="c-navigation__reduced">
      <li v-for="item in reducedNav" :key="item.url">
        <nuxt-link :to="item.url">{{ item.label }}</nuxt-link>
      </li>
    </ul>
    <button type="button" class="c-navigation__toggle" @click="toggleNav()">
      {{ mainNavIsVisible ? 'Close' : 'Menu' }}
    </button>
  </nav>
</template>
<script>
  import Icon from '~/components/Icon.vue'
  import Container from '~/components/Container.vue'

  export default {
    data () {
      return {
        mainNavIsVisible: false,
        mainNav: [
          { label: 'Home', url: '/' },
          { label: 'Blog', url: '/blog/' },
          { label: 'Resources', url: '/resources/' },
          { label: 'Developer Smalltalk', url: '/smalltalk/' },
          { label: 'Today I learned', url: '/today-i-learned/' },
          { label: 'Projects', url: '/projects/' },
          { label: 'Talks', url: '/talks/' },
          { label: 'Snippets', url: '/snippets/' }

        ],
        reducedNav: [
          { label: 'Home', url: '/' },
          { label: 'Blog', url: '/blog/' },
          { label: 'Resources', url: '/resources' }
        ]
      }
    },
    methods: {
      toggleNav () {
        this.mainNavIsVisible = !this.mainNavIsVisible
      }
    },
    components: {
      Container,
      Icon
    }
  }
</script>

<style lang="scss">
  .c-navigation {
    position : fixed;
    width  : 100%;
    bottom : 0;
    padding : 0;
    z-index : 2;
    background: #fff;
    box-shadow: 0 0 1em #d1d1d1;

    &__complete, &__reduced {
      list-style: none;
      margin: 0;
      padding: 0;
      font-size: .9em;

      display: grid;
      grid-template-rows: 1fr;
      grid-gap: .5em;

      > li {
        margin: 0;
        padding: 0;
        text-align: center;
        align-self: stretch;
        justify-self: stretch;
      }

      a {
        display: block;
        padding: .75em 0;
        border-top: .125em solid transparent;

        &:hover {
          border-bottom-color: currentColor;
          outline: none;
        }

        &:focus {
          outline-color: var(--c-highlight);
        }

        &.is-active {
          color: var(--c-highlight);
          border-top-color: currentColor;
        }
      }
    }

    &__complete {
      position: absolute;
      z-index: 2;
      bottom: 0;
      padding-bottom: 3em;
      // color: transparent;
      background: #fff;
      box-shadow: 0 0 2em #d1d1d1;
      grid-template-columns: repeat(4, 1fr);;

      transform: scale(0.2, .225);
      transform-origin: bottom right;
      transition: transform .225s ease-in-out;

      .main-nav-visible & {
        transform: scale(1) translate(0, 0);
      }
    }

    &__reduced {
      padding-right: 20%;
      grid-template-columns: repeat(3, auto);
      transition: opacity .25s ease-in-out;

      .main-nav-visible & {
        opacity: 0;
      }
    }

    &__toggle {
      position:absolute;
      z-index: 3;
      right: 0;
      bottom: 0;
      display: block;
      width: 20%;
      height: 100%;
      font-size: 1em;
      background: #fff;
      border: none;
      color: currentColor;
    }
  }




  // .c-navigation {
  //   position : fixed;
  //   width  : 100%;
  //   bottom : 0;
  //   padding : 0 6em 0 1.5em;
  //   z-index : 2;

  //   background: #fff;
  //   color: var(--c-highlight);
  //   box-shadow: 0 -.25em 2.5em #e6e6e6;

  //   a {
  //     display: inline-block;
  //     padding: .5em .125em .25em;
  //     margin: .5em 0 .75em;
  //     position: relative;
  //     text-align: center;
  //     color: var(--grey-dark);
  //     box-shadow: none;
  //     border-bottom: 2px solid transparent;
  //     text-decoration: none;

  //     &:hover {
  //       color: currentColor !important;
  //       border-bottom-color: currentColor;
  //       outline: none;
  //     }

  //     &:focus {
  //       outline-color: var(--c-highlight);
  //     }

  //     &.is-active {
  //       color: var(--c-highlight);
  //       border-bottom: .125em solid currentColor;
  //     }
  //   }

  //   @media (min-width: 38em) {
  //     position : static;
  //     border-top: none;
  //     box-shadow: 0 .25em 2.5em #e6e6e6;
  //   }

  //   &__list {
  //     display : flex;
  //     justify-content: space-between;
  //     list-style : none;
  //     text-align : center;
  //     margin  : 0 0 0 -.175em;
  //     padding : 0;

  //     @media (min-width: 38em) {
  //       justify-content: flex-end;
  //     }

  //     > li {
  //       @media (min-width: 38em) {
  //         margin-left: 3em;
  //       }
  //     }
  //   }
  // }
</style>
