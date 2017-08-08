import marked from 'marked'
import Prism from 'prismjs'

const renderer = new marked.Renderer()

renderer.code = (code, language) => {
  return `<pre class="o-code o-code-${language}"><code>${language ? Prism.highlight(code, Prism.languages[language]) : code}</code></pre>`
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
  return marked(text, { renderer })
}
