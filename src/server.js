require('dotenv').config()

const express = require('express')
const session = require('express-session')
const flash = require('connect-flash')
const FileStore = require('session-file-store')(session)
const nunjucks = require('nunjucks')
const dateFilter = require('nunjucks-date-filter')
const path = require('path')

class App {
  constructor () {
    this.express = express()
    this.isDev = process.env.NODE_ENV !== 'production'

    this.middlewares()
    this.views()
    this.routes()
  }

  middlewares () {
    this.express.use(express.urlencoded({ extended: false }))
    this.express.use(
      session({
        name: process.env.SESSION_NAME,
        secret: process.env.SESSION_SECRET,
        resave: true,
        store: new FileStore({
          path: path.resolve(__dirname, '..', 'tmp', 'sessions')
        }),
        saveUninitialized: true
      })
    )
    this.express.use(flash())
  }

  views () {
    const nunjucksEnv = nunjucks.configure(path.resolve(__dirname, 'app', 'views'), {
      watch: this.isDev,
      express: this.express,
      autoescape: true
    })

    nunjucksEnv.addFilter('date', dateFilter)

    this.express.use(express.static(path.resolve(__dirname, 'public')))
    this.express.set('view engine', 'njk')
  }

  routes () {
    this.express.use(require('./routes'))
  }
}

module.exports = new App().express
