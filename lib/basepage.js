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
      externalUrl ? { name: 'robots', content: 'noindex,nofollow' } : ''
    ]
  };
}
