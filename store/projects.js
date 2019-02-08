export const state = () => ({
  list: []
});

export const mutations = {
  setList(state, posts) {
    state.list.length = 0;
    state.list.push(...posts);
  }
};
