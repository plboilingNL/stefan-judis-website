<template>
  <div class="c-comments">
    <h3>Comments</h3>
    <p>Disqus loads a ton of sh** and I'd like to save this. If you want to comment hit the button below.</p>
    <button v-if="!disqusIsLoaded" class="o-btn" type="button" @click="loadDisqus">Load comments</button>
    <div id="disqus_thread"></div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        disqusIsLoaded: false
      }
    },
    methods: {
      loadDisqus () {
        this.$el.querySelector('button').disabled = true

        const s = document.createElement('script')
        // TODO put this into config
        s.src = '//stefanjudis-web.disqus.com/embed.js'
        s.setAttribute('data-timestamp', +new Date())
        s.onload = () => {
          this.disqusIsLoaded = true
        }

        this.$el.appendChild(s)
      }
    }
  }
</script>
