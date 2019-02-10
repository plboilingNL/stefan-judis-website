const WORDS_PER_MIN = 275;

export default entry => {
  let count = 0;

  if (entry.body) {
    count = entry.body.match(/\w+/g).length;
  }

  if (entry.tilPosts && entry.tilPosts.length) {
    count += entry.tilPosts.reduce((acc, post) => {
      return acc + post.body.match(/\w+/g).length;
    }, count);
  }

  return Math.ceil(count / WORDS_PER_MIN);
};
