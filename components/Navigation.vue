<template>
  <nav class="c-navigation">
    <Container no-padding="true">
      <ul class="c-navigation__list">
        <li>
          <nuxt-link to="/">
            <Icon name="Home"></Icon>
            Home
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/blog/">
            <Icon name="Write"></Icon>
            Write
          </nuxt-link>
        <li>
          <nuxt-link to="/projects/">
            <Icon name="Code"></Icon>
            Code
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/talks/">
            <Icon name="Speak"></Icon>
            Speak
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/today-i-learned/">
            <Icon name="Learn"></Icon>
            Learn
          </nuxt-link>
        </li>
      </ul>
    </Container>
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
    padding : 0;
    z-index : 2;
    border-top : .125em solid var(--yellow-bright);

    background-color: var(--c-theme);
    color: var(--c-theme-text);

    a {
      display: inline-block;
      padding: .5em .125em .25em;
      margin: .5em 0 .75em;
      position: relative;
      text-align: center;
      color: #fefff4;
      box-shadow: none;
      border-bottom: 2px solid transparent;
      text-decoration: none;

      &:hover {
        color: currentColor !important;
        border-bottom-color: currentColor;
        outline: none;
      }

      &:focus {
        outline-color: var(--c-theme-text);
      }

      &.is-active::before, &.is-almost-active:not([href="/"])::before {
        position: absolute;
        content: '';
        top: -.5em;
        left: calc(50% - 6px);
        width: 0;
        height: 0;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 6px solid #fefff4;

        @media (min-width: 30em) {
          border-bottom: 6px solid #fefff4;
          border-top: none;
          top: calc(100% + .525em);
        }
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

    @media (min-width: 30em) {
      position : static;
      border-top: none;
    }

    &__list {
      display : flex;
      justify-content: space-around;

      list-style : none;
      text-align : center;
      margin  : 0 0 0 -.175em;
      padding : 0;
    }
  }

  @supports (display: grid) {
    .c-navigation__list {
      display: grid;
      grid-template-columns: repeat(5, 20%);
    }
  }
</style>
