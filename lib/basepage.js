import getTransition from '~/plugins/transition.js'

const basePage = {
  transition (to, from) {
    return getTransition(from, to)
  }
}

export function createPage (page) {
  return Object.assign({}, basePage, page)
}
