<template>
  <footer class="c-footer">
    <div class="c-footer__light">
      <Container :accessible-line-length="true">
        <svg
          class="c-newsletter__icon"
          width="66"
          height="43"
          viewBox="0 0 66 43"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="none" fill-rule="evenodd">
            <path
              d="M27.5 13.7c-3.1 0-5.6 2.5-5.6 5.6 0 1 .3 2 .8 2.9l.3.5 10 12.7 10-12.9c.7-1 1.1-2.1 1.1-3.3 0-3.1-2.5-5.6-5.6-5.6-2.2 0-4.1 1.2-5 3.2-.1.2-.2.3-.4.3s-.4-.1-.4-.3c-1.1-1.9-3-3.1-5.2-3.1z"
              fill="#4AA9E8"
              fill-rule="nonzero"
            ></path>
            <path
              d="M38.8 13.7c3.3 0 6 2.5 6 5.6 0 1-.3 2-.9 2.9l-.3.5-10.8 12.6-.8-1c11.8-14.7 6.8-20.6 6.8-20.6z"
              fill="#1D7CBB"
              fill-rule="nonzero"
            ></path>
            <path
              d="M27.5 13.7c-3.1 0-5.6 2.5-5.6 5.6 0 1 .3 2 .8 2.9l.3.5 10 12.7 10-12.9c.7-1 1.1-2.1 1.1-3.3 0-3.1-2.5-5.6-5.6-5.6-2.2 0-4.1 1.2-5 3.2-.1.2-.2.3-.4.3s-.4-.1-.4-.3c-1.1-1.9-3-3.1-5.2-3.1z"
              stroke="#444"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M62.1 41.5H3.9c-1.6 0-2.9-1.3-2.9-2.9V3.2C1 2 2 1 3.2 1h59.4c1.3 0 2.3 1 2.3 2.3v35.3c.1 1.6-1.2 2.9-2.8 2.9z"
              stroke="#5A5A5A"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </g>
          <path d="M2 2l15 16M64 2L49 18" stroke="#5A5A5A" stroke-width="2" stroke-linecap="round"></path>
        </svg>
        <h4 class="c-footer__headline">Get the latest content right in your inbox ...</h4>
        <span>(
          <nuxt-link to="/newsletter/">View past newsletters</nuxt-link>&nbsp;)
        </span>
        <newsletter-form/>
      </Container>
    </div>
    <div class="c-footer__dark">
      <div class="c-footer__divider">or</div>
      <p class="u-marginBottomMedium">... say Hi somewhere in the internet!</p>
      <ul class="c-footer__social o-list-reset u-marginTopMedium u-marginBottomMedium">
        <li>
          <a href="https://twitter.com/stefanjudis" rel="me">
            <svg-icon name="twitter" aria-hidden="true"/>Twitter
          </a>
        </li>
        <li>
          <a href="https://github.com/stefanjudis" rel="me">
            <svg-icon name="github" aria-hidden="true"/>GitHub
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/stefans_little_planet/" rel="me">
            <svg-icon name="instagram" aria-hidden="true"/>Instagram
          </a>
        </li>
      </ul>
      <Container :no-padding="true">
        <finish-line/>
      </Container>
    </div>
  </footer>
</template>

<script>
import Container from '~/components/Container.vue';
import FinishLine from '~/components/FinishLine.vue';
import NewsletterForm from '~/components/NewsletterForm.vue';

export default {
  components: {
    Container,
    NewsletterForm,
    FinishLine
  }
};
</script>


<style lang="postcss">
.c-footer {
  &__light,
  &__dark {
    text-align: center;
  }

  &__light {
    padding: 1em 0 2em;
    background: var(--grey-brighter);
  }

  &__dark {
    position: relative;
    padding: 2.5em 0 1em;
    background: var(--grey-darker);
    color: var(--white);

    h4 {
      color: #fff;
    }

    a {
      &:hover {
        color: var(--blue-bright);
      }
    }
  }

  &__divider,
  &__headline {
    margin: 0;
    font-family: 'Oswald', sans-serif;
  }

  &__headline {
    font-size: 1.875em;
  }

  &__divider {
    position: absolute;
    top: 0;
    left: 50%;
    padding: 0.125em 0.5em;
    transform: translate(-50%, -50%);
    font-size: 1em;
    background: #fff;
    color: #444;
    border-radius: 0.125em;
    text-transform: uppercase;
  }

  &__social {
    display: flex;
    flex-direction: row;
    list-style: none;
    justify-content: center;
    font-size: 0.875em;

    > li {
      margin: 0 1em;
    }

    span {
      display: block;
    }

    a {
      &:hover,
      &:focus {
        color: var(--blue-bright);
        svg {
          fill: var(--blue-bright);
        }
      }
    }

    svg {
      display: block;
      margin: 0 auto 0.5em;
      height: 2em;
      width: 2em;
      fill: #fff;
    }
  }
}
</style>
