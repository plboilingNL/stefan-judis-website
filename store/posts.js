import ReadingTime from '~/plugins/reading-time.js';
import { enrichItemWithGA } from './util.js';

export const state = () => ({
  list: [],
  activePageNumber: null,
  active: null,
  fullyLoaded: false
});

export const mutations = {
  setActivePageNumber(state, page) {
    state.activePageNumber = page;
  },
  setActiveTopic(state, topic) {
    state.activeTopic = topic;
  },
  setActiveWithSlug(state, slug) {
    const item = state.list.find(entry => entry.slug === slug);
    state.active = item;
  },
  setFullyLoaded(state, loaded) {
    state.fullyLoaded = loaded;
  },
  setItem(state, item) {
    const post = state.list.find(post => post._id === item._id);
    item.readingTime = ReadingTime(item);
    enrichItemWithGA(item);

    if (post) {
      Object.assign(post, item);
    } else {
      state.list.push(item);
    }
  },
  setList(state, posts) {
    state.list.length = 0;
    state.list.push(
      ...posts.map(item => {
        item.readingTime = ReadingTime(item);
        enrichItemWithGA(item);
        return item;
      })
    );
  }
};
