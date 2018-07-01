export function getTopicNameWithSlug (slug) {
  const map = {
    'accessibility': 'Accessibility',
    'contentful': 'Contentful',
    'static-sites': 'Static Sites',
    'javascript': 'JavaScript',
    'pwa': 'PWA',
    'graphql': 'GraphQL',
    'serverless': 'Serverless',
    'testing': 'Testing',
    'css': 'CSS',
    'bash': 'Bash',
    'html': 'HTML',
    'nodejs': 'Node.js',
    'performance': 'Performance',
    'regular-expressions': 'Regular Expressions',
    'unicode': 'Unicode',
    'macos': 'MacOS',
    'productivity': 'Productivity',
    'git': 'git',
    'tools': 'Tools',
    'web': 'Web',
    'newsletter': 'Newsletter'
  }

  if (map[slug]) {
    return map[slug];
  } else {
    console.warn(`Name for slug not defined - ${slug}`);
    return slug;
  }
}