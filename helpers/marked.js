const marked = require( 'marked' )
const hl = require('highlight.js')
const renderer = new marked.Renderer();

renderer.code = ( code, language ) => {
  return `<pre class="code-${ language }"><code>${ hl.highlightAuto( code ).value }</code></pre>`;
};

renderer.image = ( href, title, text ) => {
  if( /\.mp4$/.test( href ) ) {
    return `
      <video controls preload="metadata">
        <source src="${ href }" type="video/mp4">
      </video>
    `;
  }

  return `<img src="${ href }" alt="${ text }">`;
};

module.exports = function (text) {
  return marked(text, { renderer } );
};
