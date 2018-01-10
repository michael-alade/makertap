var UserSchema = require('../models/user.model')
var VideoSchema = require('../models/video.model')

/**
 * goLive
 * @param {*} req
 * @param {*} res
 */
function goLive (req, res) {
  let body = req.body
  const userId = req.decoded._id
  UserSchema
    .findById(userId)
    .then(user => {
      if (user) {
        body.creator = {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username
        }
        body.status = 'live'
        VideoSchema.create(body, (err, result) => {
          if (err) {
            return res.status(500).json({
              status: 500,
              err: err,
              message: 'Something went wrong.'
            })
          }
          UserSchema.findByIdAndUpdate(userId, { live: result }, (err, result) => {
            if (err) {
              return res.status(500).json({
                status: 500,
                message: 'Something went wrong.'
              })
            }
            return res.status(201).json({
              status: 201,
              message: 'Video created.'
            })
          })
        })
      }
    }).catch(err => {
      return res.status(500).json({
        status: 500,
        err: err,
        message: 'Something went wrong.'
      })
    })
}

/**
 * stopLive
 * @param {*} req
 * @param {*} res
 */
function stopLive (req, res) {
  const body = req.body
  const userId = req.decoded._id
  VideoSchema.findByIdAndUpdate(body._id, { status: 'offline' }, (err, result) => {
    if (err) {
      return res.status(404).json({
        status: 404,
        message: 'Video was not found'
      })
    }
    UserSchema.findByIdAndUpdate(userId, { 'live.status': 'offline' }, (err, result) => {
      if (err) {
        return res.status(500).json({
          status: 500,
          message: 'Something went wrong.'
        })
      }
      return res.status(200).json({
        status: 200,
        message: 'Live stream successfully stopped'
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
