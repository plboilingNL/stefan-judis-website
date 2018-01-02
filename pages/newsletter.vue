<template>
  <div class="t-container">
    <Container accessible-line-length="true">
      <h1 slot="headline" tabindex="-1">Stefan's monthly digest</h1>

      <div class="c-tile">
        <form style="text-align:center;" action="https://tinyletter.com/stefanjudis" method="post" target="popupwindow" onsubmit="window.open('https://tinyletter.com/stefanjudis', 'popupwindow', 'scrollbars=yes,width=800,height=600');return true">
          <p>
            If you're interested in new posts on my <nuxt-link to="/blog/">blog</nuxt-link> or new learnings that I share in my <nuxt-link to="/today-i-learned">"Today I learned" section</nuxt-link> this newsletter is for you.</p>
          </p>
          <p>
            This newsletter is an experiment and is highly inspired by <a href="https://tinyletter.com/kentcdodds">Kent C. Dodds excellent newsletter</a>. I don't want to share my articles only but also things that I've been up to and articles, tools, videos, ... that discovered in this month.
          </p>
          <p>
            Enjoy! 👋🏻
          </p>
          <p>
            <label for="tlemail">Email address</label>
          </p>
          <p>
            <input type="text" name="email" id="tlemail" />
          </p>
          <input type="hidden" value="1" name="embed"/>
          <button type="submit" class="o-btn">Subscribe</button>
          <p>
            <a href="https://tinyletter.com" target="_blank">powered by TinyLetter</a>
          </p>
        </form>
      </div>
    </Container>
  </div>
</template>

<script>
  import Container from '~/components/Container.vue'
  import getTransition from '~/plugins/transition.js'

  export default {
    head () {
      return {
        title: `Stefan Judis Web Development - Newsletter`,
        meta: [
          { hid: 'description', name: 'description', content: `Subscribe to my monthly newsletter` }
        ]
      }
    },
    transition (to, from) {
      return getTransition(from, to)
    },
    components: {
      Container
    }
  }
</script>

<style scoped>
  input[type="text"] {
    display: block;
    width: 100%;

    line-height: 1.75;
    font-size: 1em;
    padding: .25em .5em;
    text-align: center;
  }
</style>
