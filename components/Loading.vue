<template>
  <div>
    <div
      class="nuxt-progress"
      :style="{
      'width': percent+'%',
      'opacity': show ? 1 : 0
    }"
    ></div>
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
</style>
