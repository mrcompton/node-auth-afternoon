const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const massive = require('massive')
require('dotenv').config()
const ac = require('./controller/authController')
const tc = require('./controller/treasureController')
const auth = require('./middleware/authMiddleware')

const app = express()

const { CONNECTION_STRING, SESSION_SECRET } = process.env

massive(CONNECTION_STRING).then(db => {
    app.set('db',db)
    console.log('Database connection verified')
})

app.use(bodyParser.json())
app.use(session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: false
}))

app.post('/auth/login',ac.login)
app.post('/auth/register',ac.register)
app.get('/auth/logout',ac.logout)
app.get('/api/treasure/dragon', tc.dragonTreasure)
app.get('/api/treasure/user',auth.usersOnly,tc.getMyTreasure)
app.get('/api/treasure/all',auth.usersOnly, auth.adminsOnly,tc.getAllTreasure)
app.post('/api/treasure/user', auth.usersOnly, tc.addMyTreasure);

const PORT = 4000
app.listen(PORT, () => {
    console.log('Clear signal at',PORT)
})