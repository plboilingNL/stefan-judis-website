/* global PerformanceObserver, ga */
if (window.PerformanceObserver && window.ga) {
  (new PerformanceObserver(list => {
    list
      .getEntries()
      .filter(entry => {
        return /https:\/\/cdn.contentful.com/.test(entry.name)
      })
      .forEach(entry => {
        console.log('API TRACKING:' + entry.name, entry.duration)
        ga('send', {
          hitType: 'timing',
          timingCategory: 'CDA CALL',
          timingVar: entry.name,
          timingValue: entry.duration
        })
      })
  })).observe({
    entryTypes: ['resource']
  })
}
