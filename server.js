const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser')
const requestIp = require('request-ip')
const cookieParser = require('cookie-parser')
const path = require('path')
const UserModel = require('./server/models/user.model')
var jwt = require('jsonwebtoken')
var socket = require('socket.io')
const dotenv = require('dotenv')
const cors = require('cors')
const routes = require('./server/routes')
const code = fs.readFileSync(path.join(__dirname, './dist/server.js'), 'utf8')
const renderer = require('vue-server-renderer').createBundleRenderer(code)
let index = fs.readFileSync(path.join(__dirname, './dist/index.html'), 'utf8')
const app = express()
var server = require('http').Server(app)
socket = socket(server)
const router = express.Router()
const port = process.env.PORT || 3000

const dependencies = `
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
<link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
<link rel="stylesheet" href="/static/css/uikit.min.css" />
<link rel="stylesheet" href="/static/css/custom-style.css" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/simplebar/2.5.1/simplebar.css" />
<script src="https://embed.twitch.tv/embed/v1.js"></script>
<script async src="https://cdnjs.cloudflare.com/ajax/libs/simplebar/2.5.1/simplebar.js"></script>
<script src="/static/js/uikit.min.js"></script>
<script src="/static/js/uikit-icons.min.js"></script>
<script src="https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit" async defer>
</script>
`

dotenv.config()

const getCurrentUser = (cookies) => {
  var token = cookies.mktoken
  return new Promise((resolve, reject) => {
    if (token) {
      return jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
          return resolve({
            error: err,
            payload: null,
            notAuthenticated: true
          })
        }
        return UserModel.findById(decoded._id, (err, res) => {
          if (err) {
            return resolve({
              error: err,
              payload: null
            })
          }
          if (!res) {
            return resolve(null)
          }
          return resolve({
            error: null,
            payload: {
              username: res.username,
              fullName: res.fullName,
              _id: res._id
            }
          })
        })
      })
    }
    resolve(null)
  })
}

app.use(requestIp.mw())
app.use(cookieParser())
app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
// API
routes(router)
app.use((req, res, next) => {
  req.io = socket
  return next()
})
app.use('/api', router)

app.use('/static', express.static(path.join(__dirname, './dist/static')))

app.get('/logout', (req, res) => {
  res.clearCookie('mktoken')
  return res.redirect('/')
})

app.get('/user/:username', (req, res, next) => {
  return UserModel.findOne({
    username: req.params.username
  }, (err, user) => {
    if (err) {
      return next()
    }
    if (!user) {
      return res.redirect('/')
    }
    return next()
  })
})

app.get('*', (req, res) => {
  if (req.url === '/favicon.ico') {
    return res.sendStatus(500)
  }
  getCurrentUser(req.cookies).then((response) => {
    let context = { url: req.url, state: { currentUser: null, isAuthenticated: false } }
    renderer.renderToString(
      context,
      (err, html) => {
        if (err) {
          console.log(err, 'err')
          return res.sendStatus(500)
        }

        if (response && response.payload && response.payload._id) {
          context.state.currentUser = response.payload
          context.state.isAuthenticated = true
        } else {
          context.state.isAuthenticated = false
        }

        const {
          title, link, style, script, noscript, meta
        } = context.meta.inject()
        const newStoreState = JSON.stringify(context.state)
        let firstIndex = index.indexOf('<head>')
        let secondIndex = index.indexOf('</head>')
        let concat1 = index.slice(0, firstIndex + 6)
        let concat2 = index.slice(secondIndex)
        let newIndex = concat1.concat(concat2)
        index = newIndex.replace('<html>', '<html data-vue-meta-server-rendered>')
        index = newIndex.replace('<head></head>', `
          <head>
            ${meta.text()}
            ${title.text()}
            ${link.text()}
            ${style.text()}
            ${script.text()}
            ${noscript.text()}
            ${dependencies}
          </head>
        `)
        html = index.replace('<div id=app></div>', html)
        html = html.replace('"init_state"', newStoreState)
        return res.send(html)
      }
    )
  })
})

server.listen(port, () => {
  console.log(`App Listening to ${port}`)
})
