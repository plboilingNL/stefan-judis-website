<script>
import PrettyDate from './PrettyDate.vue';

export default {
  functional: true,
  props: ['post'],
  render: function(h, context) {
    const { post } = context.props;

    return h('dl', { class: 'c-pageDetails' }, [
      h('div', {}, [
        h('dt', {}, ['Published at']),
        h('dd', { class: 'u-color-catchy' }, [
          h(PrettyDate, { props: { date: post.date } })
        ])
      ]),
      h('div', {}, [
        h('dt', {}, ['Updated at']),
        h('dd', { class: 'u-color-catchy' }, [
          h(PrettyDate, { props: { date: post._updatedAt } })
        ])
      ]),
      h('div', {}, [
        h('dt', {}, ['Reading time']),
        h('dd', { class: 'u-color-catchy' }, [`${post.readingTime} min`])
      ])
    ]);
  }
};
</script>

<style lang="postcss">
.c-pageDetails {
  padding: 1em 0 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(7.5em, 1fr));

  div {
    margin-bottom: 0.5em;
  }

  dt {
    color: var(--grey);
  }

  dd {
    font-weight: bold;
    margin: 0;
  }
}
</style>