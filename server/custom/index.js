var cloudinary = require('cloudinary')
var algoliasearch = require('algoliasearch')
var moment = require('moment')
var email = require('@sendgrid/mail')
email.setApiKey('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')
var algolia = algoliasearch('ENDTXRMXJ8', 'c9e07f4492ce146a0e9d16a45c24f54f')

cloudinary.config({
  cloud_name: 'makertap',
  api_key: '692474461884365',
  api_secret: 'oad5-Tra5epp3DFkZLdggL_7LW4'
})

// const msg = {
//   to: 'michaelkolafas15@gmail.com',
//   from: 'no-reply@makertap.com',
//   subject: 'Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// }

function uploadFile (file, options, cb) {
  return cloudinary.v2.uploader.upload(file, options, cb)
}

function sendMail (msg) {
  return email.send(msg).then(res => {
  }).catch()
}

function timeDiff (now, before, type) {
  var timeNow = moment(now)
  var timeBefore = moment(before)
  return timeNow.diff(timeBefore, type)
}

module.exports = {
  uploadFile,
  algolia,
  sendMail,
  timeDiff
}
