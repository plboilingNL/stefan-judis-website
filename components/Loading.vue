<template>
  <div>
    <div
      class="nuxt-progress"
      :style="{
      'width': percent+'%',
      'opacity': show ? 1 : 0
    }"
    ></div>
    <div class="c-logo">
      <nuxt-link :to="'/'" aria-label="Home" :class="[loading ? 'is-loading': '']">
        <svg width="26" height="25" viewBox="0 0 26 25" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" fill-rule="evenodd">
            <path
              d="M7.5 1.7c-3.1 0-5.6 2.5-5.6 5.6 0 1 .3 2 .8 2.9l.3.5 10 12.7 10-12.9c.7-1 1.1-2.1 1.1-3.3 0-3.1-2.5-5.6-5.6-5.6-2.2 0-4.1 1.2-5 3.2-.1.2-.2.3-.4.3s-.4-.1-.4-.3c-1.1-1.9-3-3.1-5.2-3.1z"
              fill="#4AA9E8"
              fill-rule="nonzero"
            ></path>
            <path
              d="M18.8 1.7c3.3 0 6 2.5 6 5.6 0 1-.3 2-.9 2.9l-.3.5-10.8 12.6-.8-1C23.8 7.6 18.8 1.7 18.8 1.7z"
              fill="#1D7CBB"
              fill-rule="nonzero"
            ></path>
            <path
              d="M7.5 1.7c-3.1 0-5.6 2.5-5.6 5.6 0 1 .3 2 .8 2.9l.3.5 10 12.7 10-12.9c.7-1 1.1-2.1 1.1-3.3 0-3.1-2.5-5.6-5.6-5.6-2.2 0-4.1 1.2-5 3.2-.1.2-.2.3-.4.3s-.4-.1-.4-.3c-1.1-1.9-3-3.1-5.2-3.1z"
              stroke="#444"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </g>
        </svg>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
export default {
  name: 'nuxt-loading',
  data() {
    return {
      percent: 0,
      show: false,
      loading: false,
      canSuccess: true,
      duration: 500
    };
  },
  methods: {
    start() {
      this.show = true;
      this.loading = true;
      this.canSuccess = true;
      if (this._timer) {
        clearInterval(this._timer);
        this.percent = 0;
      }
      this._cut = 10000 / Math.floor(this.duration);
      this._timer = setInterval(() => {
        this.increase(this._cut * Math.random());
        if (this.percent > 95) {
          this.finish();
        }
      }, 100);
      return this;
    },
    set(num) {
      this.show = true;
      this.canSuccess = true;
      this.percent = Math.floor(num);
      return this;
    },
    get() {
      return Math.floor(this.percent);
    },
    increase(num) {
      this.percent = this.percent + Math.floor(num);
      return this;
    },
    decrease(num) {
      this.percent = this.percent - Math.floor(num);
      return this;
    },
    finish() {
      this.percent = 100;
      this.hide();
      setTimeout(_ => {
        this.loading = false;
      }, 500);
      return this;
    },
    pause() {
      clearInterval(this._timer);
      return this;
    },
    hide() {
      clearInterval(this._timer);
      this._timer = null;
      setTimeout(() => {
        this.show = false;
        Vue.nextTick(() => {
          setTimeout(() => {
            this.percent = 0;
          }, 200);
        });
      }, 500);
      return this;
    },
    fail() {
      this.canSuccess = false;
      return this;
    }
  }
};
</script>

<style lang="postcss">
.nuxt-progress {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  width: 0%;
  transition: width 0.2s, opacity 0.4s;
  opacity: 1;
  background-color: #1a79b8;
  z-index: 999999;
}

.c-logo {
  position: absolute;
  top: 1em;
  left: var(--grid-outer-padding);
  display: block;
  z-index: 3;

  svg {
    height: 1.75em;
    width: auto;
  }
}
</style>
