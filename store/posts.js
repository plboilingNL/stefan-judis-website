import ReadingTime from '~/plugins/reading-time.js';

export const state = () => ({
  list: [],
  activePageNumber: null,
  active: null,
  allFetched: false
});

export const mutations = {
  setActivePageNumber(state, page) {
    state.activePageNumber = page;
  },
  setActiveTopic(state, topic) {
    state.activeTopic = topic;
  },
  setActiveWithSlug(state, slug) {
    const item = state.list.find(entry => entry.fields.slug === slug);
    state.active = item;
  },
  setAllFetched(state, allFetched) {
    state.allFetched = allFetched;
  },
  setItem(state, item) {
    const post = state.list.find(post => post.sys.id === item.sys.id);
    item.fields.readingTime = ReadingTime(item);
    if (post) {
      Object.assign(post, item);
    } else {
      state.list.push(item);
    }
  },
  setList(state, posts) {
    state.list.length = 0;
    state.list.push(
      ...posts.map(entry => {
        entry.fields.readingTime = ReadingTime(entry);
        return entry;
      })
    );
  }
};
