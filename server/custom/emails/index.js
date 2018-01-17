const fs = require('fs')
const path = require('path')

const goLive = fs.readFileSync(path.join(__dirname, './go-live.html'), 'utf8')

const emailVerify = fs.readFileSync(path.join(__dirname, './email-verify.html'), 'utf8')

module.exports = {
  goLive,
  emailVerify
}
