import Vue from 'vue';

Vue.filter('externalUrl', value => {
  return value.match(/^(?:(?:http[s]?|ftp):\/)?\/?([^:\/\s]+)\/.*$/)[1];
});

Vue.filter('idAlize', (title, options = {}) => {
  return (
    (options.prependHash ? '#' : '') + title.replace(/[\s]/g, '-').toLowerCase()
  );
});
