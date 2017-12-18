var jwt = require('jsonwebtoken')
var UserSchema = require('../models/user.model')

function auth (req, res, next) {
  const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : undefined
  if (token) {
    return jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          status: 401,
          message: 'Failed to authenicate token'
        })
      }
      UserSchema.findOne({
        email: decoded.email,
        username: decoded.username
      }).then(user => {
        if (user) {
          req.decoded = decoded
          return next()
        }
        return res.status(401).json({
          status: 401,
          message: 'You do not have an access token'
        })
      })
    })
  }
  return res.status(401).json({
    status: 401,
    message: 'You do not have an access token'
  })
}

module.exports = auth
