<template>
  <div v-if="!cookiesAllowed && !bannerClosed && loaded" class="c-banner u-textAlignCenter">
    <p class="u-noMarginBottom">🍪 This website uses Cookies to analyze traffic via Google Analytics. 🍪</p>
    <small class="u-marginBottomMedium u-block">(Reads help me to stay motivated writing things)</small>
    <div>
      <button class="o-btn o-btn--small o-btn--red" type="button" @click="closeBanner">Please don't track me</button>
      <button class="o-btn o-btn--small o-btn--green" type="button" @click="enableCookies">Okay</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cookiesAllowed: false,
      bannerClosed: false,
      loaded: false
    };
  },
  methods: {
    closeBanner() {
      localStorage.setItem('gdpr_bannerClosed', true);
      this.bannerClosed = true;
    },
    enableCookies() {
      localStorage.setItem('gdpr_iLoveCookies', true);
      this.$ga.enable();
      this.$ga.page(this.$router);
      this.cookiesAllowed = true;
    }
  },
  mounted() {
    this.loaded = true;
    this.bannerClosed = localStorage.gdpr_bannerClosed;

    if (localStorage.gdpr_iLoveCookies) {
      this.$ga.enable();
      this.cookiesAllowed = true;
    }
  }
};
</script>

<style lang="scss">
.c-banner {
  position: fixed;
  z-index: 5;
  top: 0;
  right: 0;
  left: 0;
  background: #fff;

  padding: 1em;
  box-shadow: var(--shadow-tile);
}
</style>

