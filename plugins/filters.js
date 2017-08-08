import Vue from 'vue'
import url from 'url'

Vue.filter('externalUrl', function (value) {
  return url.parse(value).host
})
