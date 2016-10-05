module.exports = function (context, limit, options) {
  context = context || []

  var ret = ''
  var limitContext = context.slice( 0, limit )

  for (var i = 0, j = limitContext.length; i < j; i++) {
    ret = ret + options.fn(limitContext[i])
  }

  return ret
}
