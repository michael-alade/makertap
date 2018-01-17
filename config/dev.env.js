var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

console.log(process.env.NODE_ENV, 'environment')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_URL: process.env.NODE_ENV === 'development' ? JSON.stringify('http://makertap.staging:8080') : ''
})
