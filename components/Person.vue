<template>
  <div class="c-person">
    <img class="c-person__image"
        :src="image.src"
        :srcset="image.srcset"
        :alt="person.fields.name">
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

<style>
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
    width: 150px;
    height: 150px;
    flex: 0 0 150px;
    border-radius: 50%;
    overflow: hidden;
    margin: 1em 0;
    margin-right: 2em;
    border: .25em solid #fff;
    box-shadow: 0 0px 5px #555;
    align-self: flex-start;
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
