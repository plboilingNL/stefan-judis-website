<template>
  <nav class="c-navigation">
    <ul class="c-navigation__list">
      <li>
        <nuxt-link to="/">
          Home
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/blog/">
          Blog
        </nuxt-link>
      <li>
        <nuxt-link to="/projects/">
          Projects
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/talks/">
          Talks
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/today-i-learned/">
          TIL
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>
<script>
  import Icon from '~/components/Icon.vue'
  import Container from '~/components/Container.vue'

  export default {
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
    padding : 0 2em;
    z-index : 2;

    background: #fff;
    color: var(--c-highlight);
    box-shadow: 0 -.25em 2.5em #e6e6e6;

    a {
      display: inline-block;
      padding: .5em .125em .25em;
      margin: .5em 0 .75em;
      position: relative;
      text-align: center;
      color: var(--grey-dark);
      box-shadow: none;
      border-bottom: 2px solid transparent;
      text-decoration: none;

      &:hover {
        color: currentColor !important;
        border-bottom-color: currentColor;
        outline: none;
      }

      &:focus {
        outline-color: var(--c-highlight);
      }

      &.is-active {
        color: var(--c-highlight);
        border-bottom: .125em solid currentColor;
      }
    }

    svg {
      display : block;
      width : 1.25em;
      fill : currentColor;

      margin : -.125em auto .125em;

      @media (min-width: 30em) {
        display: inline-block;
        vertical-align : middle;

        margin-right : .25em;
        margin-left  : 0;
      }
    }

    @media (min-width: 38em) {
      position : static;
      border-top: none;
      box-shadow: 0 .25em 2.5em #e6e6e6;
    }

    &__list {
      display : flex;
      justify-content: space-between;
      list-style : none;
      text-align : center;
      margin  : 0 0 0 -.175em;
      padding : 0;

      @media (min-width: 38em) {
        justify-content: flex-end;
      }

      > li {
        @media (min-width: 38em) {
          margin-left: 3em;
        }
      }
    }
  }
</style>
