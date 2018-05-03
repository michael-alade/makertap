var cloudinary = require('cloudinary')
var algoliasearch = require('algoliasearch')
var customEmails = require('./emails')
var moment = require('moment')

var sengrid = require('@sendgrid/mail')
sengrid.setApiKey(process.env.sendgridApi)
var algolia = algoliasearch(process.env.algoliaKey, process.env.algoliaSecret)

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
