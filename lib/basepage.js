import getTransition from '~/plugins/transition.js';

const basePage = {
  transition(to, from) {
    return getTransition(from, to);
  }
};

export function createPage(page) {
  return Object.assign({}, basePage, page);
}

export function getHeadForPost({ title, description, externalUrl }) {
  return {
    title: title,
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: description
      },
      { hid: 'og:title', property: 'og:title', content: title },
      {
        hid: 'og:description',
        property: 'og:description',
        content: description
      },
      externalUrl ? { name: 'robots', content: 'noindex,nofollow' } : ''
    ]
  };
}
