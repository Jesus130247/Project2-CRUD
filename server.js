require('dotenv').config()

const express = require('express')
const app = express()
const port = 8080
const expressLayouts = require('express-ejs-layouts')
const requestLogger = require('./middlewares/request_logger.js')
const methodOverride = require('method-override')
const session = require('express-session')

const ensureLoggedIn = require('./middlewares/ensure_loggedIn.js')
const sessionRouter = require('./routes/session_router.js')
const homeRouter = require('./routes/home_router.js')
const serverRouter = require('./routes/server_router.js')
const editRouter = require('./routes/edit_router.js')
const setCurrentUser = require('./middlewares/set_current_user.js')

app.set('view engine', 'ejs')

app.use(expressLayouts)
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(requestLogger)
app.use(session({
    cookie: {maxAge: 1000*60*60*24*3},
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUnitialzed: true
}))
app.use(setCurrentUser)
app.use(homeRouter)
app.use(sessionRouter)
app.use(serverRouter)
app.use(ensureLoggedIn)
app.use(editRouter)


app.listen(port, (req, res) => {
  console.log(`listening on port ${port}`)
})