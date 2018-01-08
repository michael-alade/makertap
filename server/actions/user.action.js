var jwt = require('jsonwebtoken')
var crypto = require('crypto-js')
var UserSchema = require('../models/user.model')
var VideoSchema = require('../models/video.model')

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
    UserSchema.findOne({
      email: body.email,
      username: body.username
    }).then((user) => {
      if (!user) {
        body.password = crypto.AES.encrypt(body.password, process.env.SECRET)
        UserSchema
          .create(body)
            .then((user) => {
              const token = jwt.sign({
                username: body.username,
                email: body.email,
                _id: user._id
              },
              process.env.SECRET)

              return res.status(201).json({
                status: 201,
                message: 'Successfully registered',
                token
              })
            })
      } else {
        return res.status(409).json({
          status: 409,
          message: 'This user already exists.'
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
      })
      .then((user) => {
        if (user) {
          if (body.password !== verifyPassword(user.password)) {
            return res.status(400).json({
              status: 400,
              message: 'Authenication failed. Username or password is incorrect'
            })
          }
          const token = jwt.sign({
            username: user.username,
            email: user.email,
            _id: user._id
          }, process.env.SECRET)
          return res.status(200).json({
            status: 200,
            message: 'Successfully logged In',
            userId: user._id,
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
  UserSchema.findOne({
    username: username
  }).then(user => {
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: 'User not found'
      })
    }
    VideoSchema.find({
      'creator.username': username
    }).then(videos => {
      if (videos) {
        return res.status(200).json({
          user: user,
          videos: videos,
          status: 200
        })
      }
    }).catch(err => {
      return res.status(500).json({
        error: err,
        status: 500
      })
    })
  }).catch(err => {
    return res.status(500).json({
      error: err,
      status: 500
    })
  })
}

module.exports = {
  signup,
  login,
  getUser
}
