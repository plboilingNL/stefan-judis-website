<template>
  <div class="t-container">
    <Container additional-class="c-newsletter">
      <h1 slot="headline" tabindex="-1">Monthly Newsletter</h1>
      <div class="c-tile c-tile--bigHighlight u-heightAuto u-marginBottomMedium">
        <div class="c-tile__container">
          <Icon name="Newsletter" />
          <form style="text-align:center;" action="https://tinyletter.com/stefanjudis" method="post" target="popupwindow" onsubmit="window.open('https://tinyletter.com/stefanjudis', 'popupwindow', 'scrollbars=yes,width=800,height=600');return true">
            <p class="u-marginBottomMedium u-noMarginTop">
              <nuxt-link to="/blog/">New posts</nuxt-link> and <nuxt-link to="/today-i-learned">new learnings</nuxt-link> directly to your inbox.
            </p>
            <label for="tlemail">Email address</label>
            <p class="u-marginBottomMedium c-newsletter__formContainer">
              <input type="email" name="email" id="tlemail" placeholder="janedoe@example.com" required/>
              <input type="hidden" value="1" name="embed"/>
              <button type="submit" class="o-btn">Subscribe</button>
            </p>
          </form>
        </div>
      </div>
      <a href="https://tinyletter.com">powered by TinyLetter</a>
    </Container>
    <Container>
      <h2 slot="headline">Past editions</h2>
      <ul class="o-list-thirds">
        <li v-for="newsletter in newsletters" :key="newsletter.sys.id">
          <Post :post="newsletter" :level="3" :show-date="true" />
        </li>
      </ul>
    </Container>
  </div>
</template>

<script>
import Container from '~/components/Container.vue';
import Post from '~/components/Post.vue';
import { createPage } from '~/lib/basepage.js';

export default createPage({
  async fetch({ app }) {
    const { getPosts } = app.contentful;

    await getPosts();
  },
  computed: {
    newsletters() {
      return this.$store.state.posts.list.filter(
        ({ fields }) =>
          fields.topics &&
          fields.topics.some(topic => topic.fields.title === 'Newsletter')
      );
    }
  },
  head() {
    return {
      title: `Stefan Judis Web Development - Newsletter`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `Subscribe to my monthly newsletter`
        }
      ]
    };
  },
  components: {
    Container,
    Icon: () => import('~/components/Icon.vue'),
    Post
  }
});
</script>

<style>
.c-newsletter {
  text-align: center;

  @media (min-width: 38em) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .c-tile {
      width: 32em;
    }
  }

  .icon-Newsletter {
    display: block;
    margin: 2em auto;
  }

  &__formContainer {
    position: relative;
    padding: 0.5em;
    margin: 1em 1em;
    box-shadow: var(--shadow-btn);
    border: none;
    border: 1px solid var(--grey);

    button {
      position: absolute;
      right: 0.625em;
      top: 0.625em;
    }
  }

  input {
    display: block;
    width: 100%;

    line-height: 2;
    font-size: 1em;
    padding: 0.25em 0.5em;
    text-align: left;
    color: currentColor;
    border: none;
  }
}
</style>
