<template>
  <div class="c-person">
    <div class="c-person__image">
      <img
          :src="image.src"
          :srcset="image.srcset"
          :alt="person.fields.name"
          onload="this.classList.add('is-loaded')">
    </div>
    <div class="c-person__details">
      <div v-html="bio"></div>

      <p>I'm also <nuxt-link to="/staying-up-to-date/">reading a lot of newsletters and listen to a few podcasts</nuxt-link>.</p>

      <ul class="c-person__social">
        <li>
          <a href="https://twitter.com/stefanjudis" rel="me">
            <Icon name="Twitter"></Icon>
            Follow me on Twitter
          </a>
        </li>
        <li>
          <a href="https://github.com/stefanjudis" rel="me">
            <Icon name="GitHub"></Icon>
            Follow me on GitHub
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import marked from '~/plugins/marked.js'
  import Icon from '~/components/Icon.vue'

  export default {
    props: ['person'],
    computed: {
      image: function () {
        return {
          src: `${this.person.fields.profilePhoto.fields.file.url}?w=150`,
          srcset: `${this.person.fields.profilePhoto.fields.file.url}?w=150 1x, ${this.person.fields.profilePhoto.fields.file.url}?w=300 2x`
        }
      },
      bio: function () {
        return marked(this.person.fields.biography)
      }
    },
    components: {
      Icon
    }
  }
</script>

<style lang="scss">
  .c-person {
    display: flex;
    flex-direction: column;
    align-items: center
  }

  @media (min-width: 32em) {
    .c-person {
      flex-direction : row;
    }
  }

  .c-person__details {
    font-size: 1.125em;
  }

  .c-person__details p {
    margin-top: 0;
  }

  .c-person__image {
    position: relative;
    width: 150px;
    height: 150px;
    overflow: hidden;
    border-radius: 50%;
    flex: 0 0 150px;
    margin: 1em 0;
    margin-right: 2em;
    border: .25em solid #fff;
    box-shadow: 0 0px 5px #555;
    align-self: flex-start;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 256' clip-path='url(#clip)' width='300' height='300'><defs><clipPath id='clip' clipPathUnits='objectBoundingBox'><rect x='0' y='0' width='256' height='256'/></clipPath></defs><rect x='0' y='0' width='256' height='256' fill='rgb(146, 147, 152)'/><path d='M281,168L-30,380L163,130Z' fill='rgb(63, 57, 50)' fill-opacity='0.41'/><path d='M113,-3L91,154L-44,92Z' fill='rgb(213, 205, 201)' fill-opacity='0.83'/><path d='M112,36L169,28L170,-32Z' fill='rgb(231, 244, 252)' fill-opacity='0.60'/><path d='M172,40L190,62L186,34Z' fill='rgb(229, 242, 253)' fill-opacity='0.53'/><path d='M246,-27L175,-23L245,163Z' fill='rgb(202, 215, 228)' fill-opacity='0.58'/><path d='M57,55L1,147L-72,142Z' fill='rgb(238, 238, 235)' fill-opacity='0.59'/><path d='M151,181L99,178L156,157Z' fill='rgb(207, 186, 180)' fill-opacity='0.54'/><path d='M214,242L186,224L221,218Z' fill='rgb(254, 224, 202)' fill-opacity='0.54'/><path d='M223,69L178,141L204,49Z' fill='rgb(207, 221, 239)' fill-opacity='0.41'/><path d='M68,22L80,-50L46,43Z' fill='rgb(226, 243, 253)' fill-opacity='0.56'/><path d='M-4,90L-2,-25L31,30Z' fill='rgb(183, 184, 188)' fill-opacity='0.97'/><path d='M81,95L149,81L103,166Z' fill='rgb(219, 196, 181)' fill-opacity='0.58'/><path d='M133,72L101,64L184,-37Z' fill='rgb(255, 241, 218)' fill-opacity='0.34'/><path d='M235,304L215,153L328,119Z' fill='rgb(117, 115, 117)' fill-opacity='0.93'/><path d='M288,245L132,288L165,236Z' fill='rgb(109, 107, 107)' fill-opacity='0.92'/><path d='M166,129L225,147L182,96Z' fill='rgb(189, 187, 195)' fill-opacity='0.57'/><path d='M-8,110L8,143L28,138Z' fill='rgb(204, 218, 233)' fill-opacity='0.47'/><path d='M61,29L69,54L101,-15Z' fill='rgb(127, 139, 153)' fill-opacity='0.62'/><path d='M181,62L137,37L163,115Z' fill='rgb(109, 98, 95)' fill-opacity='0.52'/><path d='M132,-6L115,6L146,12Z' fill='rgb(219, 233, 242)' fill-opacity='0.58'/><path d='M125,138L145,129L138,112Z' fill='rgb(255, 237, 218)' fill-opacity='0.47'/><path d='M12,278L43,143L-89,151Z' fill='rgb(109, 106, 106)' fill-opacity='0.71'/><path d='M78,64L102,23L108,114Z' fill='rgb(134, 127, 124)' fill-opacity='0.41'/><path d='M125,138L127,78L94,113Z' fill='rgb(218, 201, 191)' fill-opacity='0.63'/><path d='M144,199L-61,362L48,210Z' fill='rgb(123, 119, 118)' fill-opacity='1.00'/></svg>");
    background-size: 100%;

    img {
      overflow: hidden;
      border-radius: 50%;
      opacity: 0;
      transition: opacity 0.75s ease-in-out;

      &.is-loaded {
        opacity: 1;
      }
    }
  }

  .c-person__social {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
  }

  @media (min-width: 52em) {
    .c-person__social {
      flex-direction: row;
    }
  }

  .c-person__social li {
    padding-left: 2em;
    margin-bottom: .5em;
    position: relative;
  }

  @media (min-width: 52em) {
    .c-person__social li {
      margin-right: 1em;
      margin-bottom: 0;
    }
  }

  .c-person__social svg {
    position: absolute;

    width: 1.5em;
    height: 1.5em;

    left: 0;
    top: -0.125em;

    fill: currentColor;
  }
</style>
