const path = require('path')

module.exports = {
  env: {
    NODE_ENV: '"production"',
  },
  defineConstants: {},
  mini: {},
  h5: {
    devServer: {
      port: 3000,
      proxy: {
        '/api': {
          target: 'http://localhost:4000',
          // pathRewrite: { '^/api': '' },
        },
      },
    },
  },
}
