const marked = require( 'marked' )
const hl = require('highlight.js')
const renderer = new marked.Renderer();

renderer.code = ( code, language ) => {
  return `<pre class="code-${ language }"><code>${ hl.highlightAuto( code ).value }</code></pre>`;
};

module.exports = function (text) {
  return marked(text, { renderer } );
};
