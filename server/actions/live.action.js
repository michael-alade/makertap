var UserSchema = require('../models/user.model')
var VideoSchema = require('../models/video.model')
var ChannelSchema = require('../models/channel.model')
var custom = require('../custom')

var channelIndex = custom.algolia.initIndex('channel_index')

/**
 * goLive
 * @param {*} req
 * @param {*} res
 */
function goLive (req, res) {
  const channelId = req.params.channelId
  return ChannelSchema.findByIdAndUpdate(channelId, { status: 'live' }, (err, channel) => {
    if (err) {
      return res.status(500).json({
        message: 'Server error: could not go live.'
      })
    }
    const update = {
      status: 'live',
      objectID: channelId
    }
    return channelIndex.partialUpdateObject(update, (err, content) => {
      if (err) {
        console.log('Error: Channel not go live on algolia -- ' + channelId)
      }
      return res.status(200).json({
        message: 'Channel is live'
      })
    })
  })
}

/**
 * stopLive
 * @param {*} req
 * @param {*} res
 */
function stopLive (req, res) {
  const channelId = req.params.channelId
  return ChannelSchema.findByIdAndUpdate(channelId, { status: 'offline' }, (err, channel) => {
    if (err) {
      return res.status(500).json({
        message: 'Server error: could not stop live.'
      })
    }
    const update = {
      status: 'offline',
      objectID: channelId
    }
    return channelIndex.partialUpdateObject(update, (err, content) => {
      if (err) {
        console.log('Error: Channel could not stop live on algolia -- ' + channelId)
      }
      return res.status(200).json({
        message: 'Channel is offline'
      })
    })
  })
}

// /**
//  * search
//  * @param {*} req
//  * @param {*} res
//  */
// function search (req, res) {
//   const keyword = req.query.query
//   const categories = req.query.categories && req.query.categories.length
//     ? req.query.categories.split(',') : null
//   const limit = req.query.limit
//   const status = req.query.status
//   let query = {}
//   if (keyword) {
//     query = {
//       $text: {
//         $search: keyword
//       }
//     }
//   }
//   if (categories) {
//     Object.assign(query, {
//       tags: {
//         $in: categories
//       }
//     })
//   }
//   // if (limit) {
//   //   query.$limit = Number(limit)
//   // }
//   if (status) {
//     query.status = status
//   }
//   return VideoSchema
//     .find(query)
//     .sort({
//       createdDate: -1
//     })
//     .limit(limit)
//     .exec((err, videos) => {
//       if (err) {
//         return res.status(500).json({
//           status: 500,
//           error: err,
//           message: 'An error occurred.'
//         })
//       }
//       if (videos) {
//         return res.status(200).json({
//           data: videos,
//           limit: limit || null
//         })
//       }
//     })
// }

module.exports = {
  goLive,
  stopLive
}
