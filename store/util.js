import popularPosts from '~/data/popular-posts.js';

export const enrichItemWithGA = item => {
  popularPosts.forEach(({ path, count }) => {
    if (item.slug === path.split('/')[2]) {
      item.gaCount = +count;
    }
  });

  return item;
};
