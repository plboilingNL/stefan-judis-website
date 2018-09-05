export const getSharingUrl = (title, path) => {
  return encodeURI(
    `https://twitter.com/intent/tweet?text=${title}&url=https://www.stefanjudis.com${path}&via=stefanjudis`
  );
};
