const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser')
const path = require('path')
const dotenv = require('dotenv')
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
        index = newIndex.replace('<head></head>', `
          <head>
            ${meta.text()}
            ${title.text()}
            ${link.text()}
            ${style.text()}
            ${script.text()}
            ${noscript.text()}
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.10/semantic.min.css">
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
