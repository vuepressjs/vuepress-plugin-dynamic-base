const { join } = require('path')

module.exports = (options = {}, ctx) => {
  const { routeBash } = options
  const publicPath = ctx.isProd && typeof options.publicPath === 'string'
    ? options.publicPath
    : false

  return {
    define: {
      PUBLIC_PATH: publicPath,
      ROUTE_BASE: routeBash,
    },

    enhanceAppFiles: [
      join(__dirname, 'enhance-app.js'),
    ],

    chainWebpack(config) {
      config
        .entry('app')
        .prepend(join(__dirname, 'prepended-entry.js'))
        .end()

      /**
       * Only apply publicPath at production.
       */
      if (publicPath) {
        config.output.publicPath(publicPath)
      }
    },
  }
}
