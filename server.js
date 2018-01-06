const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser')
const path = require('path')
const dotenv = require('dotenv')
const cors = require('cors')
const routes = require('./server/routes')
const code = fs.readFileSync(path.join(__dirname, './dist/server.js'), 'utf8')
const renderer = require('vue-server-renderer').createBundleRenderer(code)
let index = fs.readFileSync(path.join(__dirname, './dist/index.html'), 'utf8')
const app = express()
const router = express.Router()
const port = process.env.PORT || 3000

dotenv.config()

const getCurrentUser = () => {
  return Promise.resolve({
    username: 'acoshift',
    id: 1
  })
}

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// API
routes(router)
app.use('/api', router)

app.use('/static', express.static(path.join(__dirname, './dist/static')))

app.get('/me', (req, res) => {
  getCurrentUser().then((currentUser) => {
    res.json(currentUser)
  }, (err) => {
    console.error(err)
    res.sendStatus(500)
  })
})

app.get('*', (req, res) => {
  if (req.url === '/favicon.ico') {
    return res.sendStatus(500)
  }
  getCurrentUser().then((currentUser) => {
    let context = { url: req.url, state: { currentUser } }
    renderer.renderToString(
      context,
      (err, html) => {
        if (err) {
          console.log(err, 'err')
          return res.sendStatus(500)
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
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
            <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
            <link rel="stylesheet" href="/static/css/uikit.min.css" />
            <link rel="stylesheet" href="/static/css/custom-style.css" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/simplebar/2.5.1/simplebar.css" />
            <script src="https://cdnjs.cloudflare.com/ajax/libs/simplebar/2.5.1/simplebar.js"></script>
          </head>
        `)
        html = index.replace('<div id=app></div>', html)
        html = html.replace('"init_state"', newStoreState)
        return res.send(html)
      }
    )
  })
})

app.listen(port, () => {
  console.log(`App Listening to ${port}`)
})
