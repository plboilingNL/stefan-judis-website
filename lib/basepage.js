import getTransition from '~/plugins/transition.js';

const basePage = {
  transition(to, from) {
    return getTransition(from, to);
  }
};

export function createPage(page) {
  return Object.assign({}, basePage, page);
}

export function getHeadForPost({ fields }) {
  return {
    title: fields.title,
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: fields.description
      },
      { property: 'og:title', content: fields.title },
      { property: 'og:description', content: fields.description },
      fields.externalUrl ? { name: 'robots', content: 'noindex,nofollow' } : ''
    ]
  };
}
