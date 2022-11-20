import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import mongoose from 'mongoose'
import { ExpressHandlebars, engine } from 'express-handlebars'
import index from './routes/index.js'
import auth from './routes/auth.js'
import path from 'path'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import passport from 'passport'

dotenv.config({ path: './config/config.env' })

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

import passportConfig from './config/passport.js'

passportConfig(passport)
// connect to the database
connectDB()

// request logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// handle bars config
app.engine('.hbs', engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', './views')
// app.use()

// static folders
const __dirname = path.resolve()
app.use(express.static(path.join(__dirname, 'public')))

// express session
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  })
)
app.use(passport.initialize())
app.use(passport.session())

// routes
app.use('/', index)
app.use('/auth', auth)

const PORT = process.env.PORT || 7070

app.listen(
  PORT,
  console.log('listening in' + process.env.NODE_ENV + 'mode on port ' + PORT)
)
