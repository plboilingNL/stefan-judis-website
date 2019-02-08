import popularPosts from '~/data/popular-posts.js';

export const enrichItemWithGA = item => {
  popularPosts.forEach(({ path, count }) => {
    if (item.fields.slug === path.split('/')[2]) {
      item.fields.gaCount = +count;
    }
  });

  return item;
};
