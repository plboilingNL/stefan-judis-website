export const state = () => ({
  entry: {}
});

export const mutations = {
  setPuppies(state, puppyEntry) {
    state.entry = puppyEntry;
  }
};
