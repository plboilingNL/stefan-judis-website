import marked from 'marked';
import Prism from 'prismjs';
import { makeEmojisAccessible } from './accessible-emojis.js';

const renderer = new marked.Renderer();

renderer.code = (code, language) => {
  return `<pre class="o-code o-code-${language || 'whatevs'}"><code>${
    language ? Prism.highlight(code, Prism.languages[language]) : code
  }</code></pre>`;
};

renderer.heading = function(text, level) {
  const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');

  return `
    <div class="o-anchorContainer o-anchorContainer--${level}" id="${escapedText}">
    <a href="#${escapedText}" aria-label="Anchor link for '${text}'">#</a>
    <h${level} class="o-headline-${level}">${makeEmojisAccessible(
    text
  )}</h${level}>
    </div>
  `;
};

renderer.image = (href, title, text) => {
  if (/\.mp4$/.test(href)) {
    return `
      <video controls preload="metadata">
        <source src="${href}" type="video/mp4">
      </video>
    `;
  }

  return `<a href="${href}">
    <picture>
      <source srcset="${href}?w=680&fm=webp, ${href}?w=1360&fm=webp 2x" type="image/webp">
      <source srcset="${href}?w=680, ${href}?w=1360 2x" type="image/jpeg">
      <img src="${href}" alt="${text}">
    </picture>
  </a>`;
};

renderer.link = (href, title, text) =>
  `<a href="${href}" class="fancy-link">${text}</a>`;

renderer.paragraph = text => `<p>${makeEmojisAccessible(text)}</p>\n`;

export default function(text) {
  return text ? marked(text, { renderer }) : '';
}
