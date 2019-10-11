<template>
  <footer class="c-footer">
    <div class="c-footer__light">
      <Container :accessible-line-length="true">
        <svg
          class="c-newsletter__icon"
          width="66"
          height="43"
          viewBox="0 0 66 43"
          aria-labelledby="newsletter-form-title newsletter-form-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="newsletter-form-title">Newsletter form</title>
          <desc id="newsletter-form-desc">An envelop with a heart on it</desc>
          <g fill="none" fill-rule="evenodd">
            <path
              d="M27.5 13.7c-3.1 0-5.6 2.5-5.6 5.6 0 1 .3 2 .8 2.9l.3.5 10 12.7 10-12.9c.7-1 1.1-2.1 1.1-3.3 0-3.1-2.5-5.6-5.6-5.6-2.2 0-4.1 1.2-5 3.2-.1.2-.2.3-.4.3s-.4-.1-.4-.3c-1.1-1.9-3-3.1-5.2-3.1z"
              fill="#4AA9E8"
              fill-rule="nonzero"
            />
            <path
              d="M38.8 13.7c3.3 0 6 2.5 6 5.6 0 1-.3 2-.9 2.9l-.3.5-10.8 12.6-.8-1c11.8-14.7 6.8-20.6 6.8-20.6z"
              fill="#1D7CBB"
              fill-rule="nonzero"
            />
            <path
              d="M27.5 13.7c-3.1 0-5.6 2.5-5.6 5.6 0 1 .3 2 .8 2.9l.3.5 10 12.7 10-12.9c.7-1 1.1-2.1 1.1-3.3 0-3.1-2.5-5.6-5.6-5.6-2.2 0-4.1 1.2-5 3.2-.1.2-.2.3-.4.3s-.4-.1-.4-.3c-1.1-1.9-3-3.1-5.2-3.1z"
              stroke="#444"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M62.1 41.5H3.9c-1.6 0-2.9-1.3-2.9-2.9V3.2C1 2 2 1 3.2 1h59.4c1.3 0 2.3 1 2.3 2.3v35.3c.1 1.6-1.2 2.9-2.8 2.9z"
              stroke="#5A5A5A"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
          <path d="M2 2l15 16M64 2L49 18" stroke="#5A5A5A" stroke-width="2" stroke-linecap="round" />
        </svg>
        <h4 class="c-footer__headline">Get the latest content right in your inbox ...</h4>
        <span>
          (
          <nuxt-link to="/newsletter/">View past newsletters</nuxt-link>&nbsp;)
        </span>
        <newsletter-form />
      </Container>
    </div>
    <div class="c-footer__dark">
      <div class="c-footer__divider">or</div>
      <p class="u-marginBottomMedium">... say Hi somewhere in the internet!</p>

      <div class="h-card">
        <!-- only here for indie web stuff -->
        <a class="u-email" href="mailto:stefanjudis@gmail.com" rel="me" hidden>stefanjudis@gmail.com</a>

        <ul class="c-footer__social o-list-reset u-marginTopMedium u-marginBottomMedium">
          <li>
            <a class="u-url" href="https://twitter.com/stefanjudis" rel="me">
              <svg-icon name="twitter" aria-hidden="true" />Twitter
            </a>
          </li>
          <li>
            <a class="u-url" href="https://github.com/stefanjudis" rel="me">
              <svg-icon name="github" aria-hidden="true" />GitHub
            </a>
          </li>
          <li>
            <a class="u-url" href="https://www.instagram.com/stefans_little_planet/" rel="me">
              <svg-icon name="instagram" aria-hidden="true" />Instagram
            </a>
          </li>
        </ul>
      </div>
      <Container :no-padding="true">
        <finish-line />
      </Container>
      <div class="c-footer__doggos">
        <nuxt-link to="/puppies/" aria-label="Go to puppy collection">
          <svg
            width="100px"
            height="100px"
            version="1.1"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <path
                d="m43.035 40.137h-22.363l-7.1016-7.1016c-1.9609-1.9609-5.1406-1.9609-7.1016 0-1.9609 1.9609-1.9609 5.1406 0 7.1016l7.5586 7.5586v28.504c0 2.7734 2.25 5.0195 5.0195 5.0195 2.7734 0 5.0195-2.2461 5.0195-5.0195l0.003906-12.324h32.684v12.324c0 2.7734 2.25 5.0195 5.0195 5.0195 2.7695 0 5.0195-2.2461 5.0195-5.0195v-18.961c0-2.0742 0.4375-3.7148 1.0469-4.9922l-16.371-16.375c-2.7383 2.4531-5.5898 4.2656-8.4336 4.2656z"
              />
              <path
                d="m74.438 30.238c3.2969 0 5.9805-3.8633 5.9805-8.6133 0-0.66406-0.050781-1.3125-0.15234-1.9336-1.668-0.59375-3.375-0.82422-4.8633-0.89062-2.5195-0.11328-4.7852 0.42969-6.8633 1.3945-0.054687 0.46484-0.082031 0.94531-0.082031 1.4336 0.003907 4.7422 2.6875 8.6094 5.9805 8.6094z"
              />
              <path
                d="m92.562 30.77c-1.2422-0.91797-3.2969-1.3477-4.8203-1.2852-0.73047-4.9727-3.1445-7.6758-5.9258-9.1211 0.035156 0.41406 0.058594 0.83594 0.058594 1.2617 0 2.6484-0.74609 5.1445-2.1055 7.0352-1.4062 1.9609-3.3047 3.043-5.3398 3.043-2.0312 0-3.9297-1.082-5.3398-3.043-1.3555-1.8906-2.1016-4.3867-2.1016-7.0352 0-0.21094 0.007813-0.42188 0.015625-0.62891-3.2461 1.9062-6.0234 4.7891-8.6055 7.6289-1.375 1.5117-2.8203 3.1484-4.3203 4.7031l15.965 15.965c0.26562-0.23438 0.51172-0.42969 0.73047-0.58594 6.2148-4.5078 15.477 0.17969 21.223-5.0859 3.1914-2.9219 4.5078-9.9453 0.56641-12.852z"
              />
            </g>
          </svg>
        </nuxt-link>
      </div>
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
  position: relative;

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

  &__doggos {
    font-size: 0.75em;
    position: absolute;
    width: 7em;
    height: 7em;
    top: -3.5em;
    right: -3.5em;
    vertical-align: middle;
    border-radius: 50%;
    background: var(--c-text-contrast);
    padding: 3.75em 3.5em 1em 1em;

    a {
      fill: var(--grey-darker);
      &:hover,
      &:focus {
        fill: var(--c-highlight);
      }
    }

    svg {
      display: inline-block;

      width: 2.25em;
      height: 2.25em;
    }
  }
}
</style>
