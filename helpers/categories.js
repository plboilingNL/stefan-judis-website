module.exports = function (categories) {
  return `
    <ul class="c-categories">
      ${ categories.map( c => `<li class="c-categories__item">#${ c }` ).join('') }
    </ul>
  `
}
