export function getTopicNameWithSlug(slug) {
  const map = {
    accessibility: 'Accessibility',
    bash: 'Bash',
    contentful: 'Contentful',
    'static-sites': 'Static Sites',
    css: 'CSS',
    electron: 'Electron',
    git: 'git',
    graphql: 'GraphQL',
    html: 'HTML',
    javascript: 'JavaScript',
    pwa: 'PWA',
    'regular-expressions': 'Regular Expressions',
    macos: 'macOS',
    newsletter: 'Newsletter',
    nodejs: 'Node.js',
    performance: 'Performance',
    productivity: 'Productivity',
    serverless: 'Serverless',
    svg: 'SVG',
    testing: 'Testing',
    typescript: 'TypeScript',
    tools: 'Tools',
    unicode: 'Unicode',
    web: 'Web'
  };

  if (map[slug]) {
    return map[slug];
  } else {
    console.warn(`Name for slug not defined - ${slug}`);
    return slug;
  }
}
