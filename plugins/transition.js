const generalOrder = [
  ['index'],
  ['blog', 'blog-tag-tag', 'blog-page-page', 'blog-slug', 'slug'],
  ['projects'],
  ['talks'],
  ['today-i-learned', 'today-i-learned-slug']
]

function getIndex (name) {
  for (let i = 0; i < generalOrder.length; i++) {
    for (let j = 0; j < generalOrder[i].length; j++) {
      if (generalOrder[i][j] === name) {
        return i * 10 + j
      }
    }
  }
}

export default (from, to) => {
  if (!from || !to) {
    return ''
  }

  const fromIndex = getIndex(from.name)
  const toIndex = getIndex(to.name)

  if (fromIndex === toIndex) {
    return from.path > to.path
      ? 't-slide-right'
      : 't-slide-left'
  }

  return fromIndex > toIndex
    ? 't-slide-right'
    : 't-slide-left'
}
