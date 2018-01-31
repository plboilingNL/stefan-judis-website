import marked from 'marked'
import Prism from 'prismjs'

const renderer = new marked.Renderer()

renderer.code = (code, language) => {
  return `<pre class="o-code o-code-${language || 'whatevs'}"><code>${
    language ? Prism.highlight(code, Prism.languages[language]) : code
  }</code></pre>`
}

renderer.heading = function (text, level) {
  const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-')

  return `
    <div class="o-anchorContainer">
      <a href="#${escapedText}" aria-label="Anchor link for '${text}'">#</a>
      <h${level} id="${escapedText}">${text}</h${level}>
    </div>
  `
}

renderer.image = (href, title, text) => {
  if (/\.mp4$/.test(href)) {
    return `
      <video controls preload="metadata">
        <source src="${href}" type="video/mp4">
      </video>
    `
  }

  return `<img src="${href}" alt="${text}">`
}

export default function (text) {
  return text
    ? marked(text, { renderer })
    : ''
}
