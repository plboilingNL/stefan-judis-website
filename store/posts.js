export const state = () => ({
  list: []
})

export const mutations = {
  setList (state, posts) {
    state.list.push(...posts)
  }
}
