var dotenv = require('dotenv')
dotenv.config()

module.exports = {
  NODE_ENV: '"production"',
  API_URL: process.env.NODE_ENV === 'production' ? JSON.stringify('https://makertap.com') : 'http://makertap.staging:3000'
}
