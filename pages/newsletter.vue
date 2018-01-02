<template>
  <Container class="t-container" accessible-line-length="true">
    <h1 slot="headline" tabindex="-1">Stefan's monthly digest</h1>

    <div class="c-tile">
      <form style="text-align:center;" action="https://tinyletter.com/stefanjudis" method="post" target="popupwindow" onsubmit="window.open('https://tinyletter.com/stefanjudis', 'popupwindow', 'scrollbars=yes,width=800,height=600');return true">
        <p>
          If you're interested in new posts on my <nuxt-link to="/blog/">blog</nuxt-link> or new learnings that I share in my <nuxt-link to="/today-i-learned">"Today I learned" section</nuxt-link> this newsletter is for you.
        </p>
        <p>
          This newsletter is an experiment and is highly inspired by <a href="https://tinyletter.com/kentcdodds">Kent C. Dodds excellent newsletter</a>. I don't want to share my articles only but also things that I've been up to and articles, tools, videos, ... that I discovered in this month.
        </p>
        <p>
          Enjoy! 👋🏻
        </p>
        <p class="u-marginBottomMedium">
          <label for="tlemail">Email address:
            <input type="email" name="email" id="tlemail" placeholder="janedoe@example.com"/>
          </label>
        </p>
        <input type="hidden" value="1" name="embed"/>
        <button type="submit" class="o-btn">Subscribe</button>
        <p>
          <a href="https://tinyletter.com">powered by TinyLetter</a>
        </p>
      </form>
    </div>
  </Container>
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
  input {
    display: block;
    width: 100%;

    line-height: 1.75;
    font-size: 1em;
    padding: .25em .5em;
    margin: .5em 0;
    text-align: center;

    border: 1px solid #eee;
    box-shadow: 0 .125em .25em #e1e1e1;
  }
</style>
