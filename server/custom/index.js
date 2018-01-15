var cloudinary = require('cloudinary')
var algoliasearch = require('algoliasearch')
var customEmails = require('./emails')
var moment = require('moment')

var sengrid = require('@sendgrid/mail')
sengrid.setApiKey('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')
var algolia = algoliasearch('ENDTXRMXJ8', 'c9e07f4492ce146a0e9d16a45c24f54f')

cloudinary.config({
  cloud_name: 'makertap',
  api_key: '692474461884365',
  api_secret: 'oad5-Tra5epp3DFkZLdggL_7LW4'
})

// const msg = {
//   from: 'no-reply@makertap.com',
//   substitutions: {
//     name: 'Kolawole Alade',
//     link: 'http://localhost:2000'
//   },
//   subject: 'Testing',
//   html: customEmails['goLive']
// }

function uploadFile (file, options, cb) {
  return cloudinary.v2.uploader.upload(file, options, cb)
}

function sendMail (emails, msg, type) {
  msg.html = customEmails[type]
  for (var i = 0; i < emails.length; i++) {
    msg.to = emails[i]
    sengrid.send(msg)
  }
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
