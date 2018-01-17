var jwt = require('jsonwebtoken')
var crypto = require('crypto-js')
var dotenv = require('dotenv')
dotenv.config()
var UserSchema = require('../models/user.model')
var ChannelSchema = require('../models/channel.model')
var custom = require('../custom')
// var VideoSchema = require('../models/video.model')

var channelIndex = custom.algolia.initIndex('channel_index')

function verifyPassword (hashedPassword) {
  return crypto.AES.decrypt(hashedPassword, process.env.SECRET).toString(crypto.enc.Utf8)
}

/**
 * signup
 * @param {object} req
 * @param {object} res
 */
function signup (req, res) {
  const body = req.body
  if (body.fullName && body.username && body.email && body.password) {
    return UserSchema.findOne({
      email: body.email,
      username: body.username
    }, (err, user) => {
      if (err) {
        return res.status(500).json({
          status: 409,
          message: 'Server error while creating user.'
        })
      }
      if (user) {
        return res.status(409).json({
          status: 409,
          message: 'This user already exists.'
        })
      } else {
        body.verified = false
        body.password = crypto.AES.encrypt(body.password, process.env.SECRET)
        body.emailToken = crypto.HmacSHA1(body.email, process.env.SECRET)
        return UserSchema
          .create(body, (err, user) => {
            if (err) {
              return res.status(409).json({
                err: err,
                message: 'Something went wrong'
              })
            }
            const token = jwt.sign({
              username: body.username,
              _id: user._id
            },
            process.env.SECRET)
            const nameArr = body.fullName.split(' ')
            if (nameArr.length >= 2) {
              req.io.emit('snackbar', {
                action: 'joined',
                picture: `https://avatar.tobi.sh/241.svg?text=${nameArr[0][0]}${nameArr[1][0]}`,
                name: nameArr[0],
                time: Date.now()
              })
            }
            custom.sendMail([body.email], {
              from: 'no-reply@makertap.com',
              name: 'Makertap',
              subject: 'Email verification - Makertap',
              substitutions: {
                name: body.fullName,
                link: process.env.NODE_ENV === 'development' ? `http://makertap.staging:3000/verify-email?i=${body.emailToken}`
                : `https://makertap.com/verify-email?i=${body.emailToken}`,
                email: body.email,
                username: body.username
              }
            }, 'emailVerify')
            return res.status(201).json({
              status: 201,
              message: 'Successfully registered',
              token,
              username: user.username
            })
          })
      }
    })
  } else {
    return res.status(400).json({
      status: 400,
      message: 'Fill in the required fields'
    })
  }
}

function verifyEmail (req, res) {
  const token = req.body.i
  console.log(token, 'token')
  if (token) {
    return UserSchema.findOneAndUpdate({
      emailToken: token
    }, { emailToken: '', verified: true }, (err, user) => {
      if (err) {
        return res.status(500).json({
          message: 'Server error'
        })
      }
      if (user) {
        user.emailToken = ''
        user.verified = true
        user.update()
        return res.status(200).json({
          message: 'Email verified'
        })
      }
      return res.status(400).json({
        message: 'Bad request'
      })
    })
  } else {
    return res.status(400).json({
      message: 'Bad request'
    })
  }
}

/**
 * login
 * @param {object} req
 * @param {object} res
 */
function login (req, res) {
  const body = req.body
  if (body.username && body.password) {
    UserSchema
      .findOne({
        username: body.username
      }, (err, user) => {
        if (err) {
          return res.status(500).json({
            message: 'Something went wrong'
          })
        }
        if (user) {
          if (body.password !== verifyPassword(user.password)) {
            return res.status(400).json({
              status: 400,
              message: 'Authenication failed. Username or password is incorrect'
            })
          }
          const token = jwt.sign({
            username: user.username,
            _id: user._id
          }, process.env.SECRET)
          if (!user.verified) {
            custom.sendMail([user.email], {
              from: 'no-reply@makertap.com',
              name: 'Makertap',
              subject: 'Email verification - Makertap',
              substitutions: {
                name: user.fullName,
                link: process.env.NODE_ENV === 'development' ? `https://makertap.com/verify-email?i=${user.emailToken}`
                : `https://makertap.com/verify-email?i=${user.emailToken}`,
                email: user.email,
                username: user.username
              }
            }, 'emailVerify')
          }
          return res.status(200).json({
            status: 200,
            message: 'Successfully logged In',
            userId: user._id,
            email: user.email,
            username: user.username,
            emailVerified: user.verified,
            token
          })
        }
        return res.status(401).json({
          status: 400,
          message: 'Authenication failed. Username or password is incorrect'
        })
      })
  } else {
    return res.status(401).json({
      status: 400,
      message: 'Fill in the required fields'
    })
  }
}

/**
 * getUser
 * @param {*} req
 * @param {*} res
 */
function getUser (req, res) {
  const username = req.params.username
  return UserSchema.findOne({
    username: username
  }, (err, user) => {
    if (err) {
      return res.status(500).json({
        error: err,
        status: 500
      })
    }
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: 'User not found'
      })
    }
    return ChannelSchema.findOne({
      'userId': user._id
    }, (err, channel) => {
      if (err) {
        return res.status(500).json({
          error: err,
          status: 500
        })
      }
      if (channel) {
        return res.status(200).json({
          user: {
            fullName: user.fullName,
            username: user.username,
            email: user.email,
            verified: user.verified,
            welcome: user.welcome,
            channel: channel,
            _id: user._id
          },
          status: 200
        })
      }
    })
  })
}

/**
 * createChannel
 * @param {*} req
 * @param {*} res
 */
function createChannel (req, res) {
  let body = req.body
  const userId = req.decoded._id
  return ChannelSchema.findOne({ 'userId': userId }, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: 'Something went wrong'
      })
    }
    if (result) {
      return res.status(409).json({
        message: 'A channel has been created under this user.'
      })
    }
    return UserSchema.findById(userId, (err, user) => {
      if (err) {
        return res.status(500).json({
          message: 'Something went wrong'
        })
      }
      body.userId = userId
      body.user = {
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        verified: user.verified,
        welcome: user.welcome,
        channel: user.channel
      }
      return ChannelSchema.create(body, (err, channel) => {
        if (err) {
          return res.status(500).json({
            message: 'Something went wrong'
          })
        }
        if (err) {
          return res.status(500).json({
            message: 'Something went wrong'
          })
        }
        channel.objectID = channel._id
        return channelIndex.addObject(channel, (err, content) => {
          if (err) {
            console.log('Error: New channel not indexed -- ' + channel._id)
          }
          user.channel = channel
          user.save()
          return res.status(200).json({
            message: 'Channel created successfully'
          })
        })
      })
    })
  })
}

/**
 * updateChannel
 * @param {*} req
 * @param {*} res
 */
function updateChannel (req, res) {
  const body = req.body
  const channelId = req.params.channelId
  const userId = req.decoded._id

  return UserSchema.findById(userId, (err, user) => {
    if (err) {
      return res.status(500).json({
        message: 'Something went wrong'
      })
    }
    if (body && body.channelPicture) {
      return custom.uploadFile(body.channelPicture, {}, (err, image) => { // eslint-disable-line
        if (err) {
          return res.status(500).json({
            err: err,
            message: 'Something wrong with the upload'
          })
        }
        body.channelPicture = image.secure_url
        return ChannelSchema.findByIdAndUpdate(channelId, body, (err, channel) => {
          if (err) {
            return res.status(500).json({
              message: 'Something went wrong'
            })
          }
          body.objectID = channelId
          return channelIndex.partialUpdateObject(body, (err, content) => {
            if (err) {
              console.log('Error: Channel not updated on algolia -- ' + channelId)
            }
            user.welcome = true
            user.save()
            return res.status(202).json({
              message: 'Channel successfully updated.'
            })
          })
        })
      })
    }
    return ChannelSchema.findByIdAndUpdate(channelId, body, (err, channel) => {
      if (err) {
        return res.status(500).json({
          message: 'Something went wrong'
        })
      }
      body.objectID = channelId
      channelIndex.partialUpdateObject(body, (err, content) => {
        if (err) {
          console.log('Error: Channel not updated on algolia -- ' + channelId)
        }
        user.welcome = true
        user.save()
        return res.status(202).json({
          message: 'Channel successfully updated.'
        })
      })
    })
  })
}

function subscribe (req, res) {
  const userId = req.body.userId
  const channelId = req.params.channelId
  return UserSchema.findById(userId, (err, user) => {
    if (err) {
      return res.status(500).json({
        message: 'This user is not available'
      })
    }
    return ChannelSchema.findById(channelId, (err, channel) => {
      if (err) {
        return res.status(500).json({
          message: 'Channel does not exist'
        })
      }
      let found = channel.analytics
      if (channel.analytics.subscribers.indexOf(userId) === -1) {
        return ChannelSchema.findByIdAndUpdate(channelId, {
          $push: {
            'analytics.subscribers': userId
          }
        }, (err, channel) => {
          if (err || channel) {
            return res.status(500).json({
              message: 'Channel was not updated'
            })
          }
          channel.objectID = channel._id
          found.subscribers.push(userId)
          // found.subscribers = found.subscribers
          return channelIndex.partialUpdateObject({
            objectID: channelId,
            analytics: found
          }, (err, content) => {
            if (err) {
              console.log('Error: channel subsribe not updated on algolia')
            }
            return res.status(202).json({
              message: 'User is subscribed'
            })
          })
        })
      }
      return res.status(200).json({
        message: 'User is already subscribed'
      })
    })
  })
}

function unSubscribe (req, res) {
  const channelId = req.params.channelId
  const userId = req.decoded._id

  return UserSchema.findById(userId, (err, user) => {
    if (err || !user) {
      return res.status(500).json({
        message: 'User not found'
      })
    }
    return ChannelSchema.findById(channelId, (err, channel) => {
      if (err || !channel) {
        return res.status(500).json({
          message: 'Channel not found'
        })
      }
      channel.analytics.subscribers = channel.analytics.subscribers.filter(sub => {
        return sub !== userId
      })
      const updated = channel.analytics
      return ChannelSchema.findByIdAndUpdate(channelId, {
        'analytics.subscribers': channel.analytics.subscribers
      }, (err, result) => {
        if (err || !result) {
          return res.status(500).json({
            message: 'Channel not found'
          })
        }
        return channelIndex.partialUpdateObject({
          objectID: channelId,
          analytics: updated
        }, (err, content) => {
          if (err) {
            console.log('Not update on algolia -- ' + channelId)
          }
          return res.status(200).json({
            message: 'Unsubscribed'
          })
        })
      })
    })
  })
}

function updateChannelViews (req, res) {
  const channelId = req.params.channelId
  const userId = req.decoded._id
  // let lastSession
  // let diff
  return UserSchema.findById(userId, (err, user) => {
    if (err || !user) {
      return res.status('User not found')
    }
    return ChannelSchema.findByIdAndUpdate(channelId, {
      $push: {
        'analytics.totalViews': userId
      }
    }, (err, channel) => {
      if (err || !channel) {
        return res.status(500).json({
          message: 'Channel not found'
        })
      }
      channel.objectID = channelId
      return channelIndex.partialUpdateObject({
        objectID: channelId,
        analytics: channel.analytics
      }, (err, content) => {
        if (err) {
          console.log(`${err} Error: channel views not updated`)
        }
        return res.status(200).json({
          message: 'Views updated'
        })
      })
      // check if user has viewed recently - less then 30 mins
      // const view = channel.analytics.totalViews.filter(client => {
      //   return client.ip === clientIp
      // })
      // if (view.length) {
      //   lastSession = view[view.length - 1]
      //   diff = custom.timeDiff(Date.now(), lastSession.time, 'minutes')
      //   if (diff && diff >= 30) {
      //     return Channel.findByIdAndUpdate(channelId, {
      //       $push: {
      //         'analytics.totalViews': {
      //           ip: clientIp,
      //           time: Date.now()
      //         }
      //       }
      //     })
      //   }
      // }
    })
  })
}

module.exports = {
  signup,
  login,
  getUser,
  updateChannel,
  verifyEmail,
  createChannel,
  unSubscribe,
  updateChannelViews,
  subscribe
}
