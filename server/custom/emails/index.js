const fs = require('fs')
const path = require('path')

let goLive = fs.readFileSync(path.join(__dirname, './go-live.html'), 'utf8')

module.exports = {
  goLive
}
