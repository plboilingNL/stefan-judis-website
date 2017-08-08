<script>
  export default {
    props: ['level', 'url'],
    render: function (h) {
      return h(
        'h' + this.level,
        { class: `o-headline-${this.level}` },
        [
          this.url
            ? h('nuxt-link', { props: { 'to': this.url } }, this.$slots.default)
            : this.$slots.default
        ]
      )
    }
  }
</script>
