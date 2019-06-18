require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const {registerUser, loginUser, getUser, logout} = require('./controllers/authController')
const {createArtist} = require('./controllers/artistController')

const app = express()

let {SERVER_PORT, SESSION_SECRET}= process.env

app.use(express.json())

app.use(
    session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialization: true,
        cookies: {
            maxAge: 1000 * 60 * 60 * 24 * 7
        }
    })
)

// Authentication
app.post('/artist/register', registerUser)
app.post('/artist/login', loginUser )
app.get('/artist/user', getUser)
app.post('/artist/logout', logout)

// Artist
app.post('/artist/form', createArtist )

massive(process.env.CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log('Database Connected')
})

app.listen(SERVER_PORT, () => {
    console.log(`Server listening on port ${SERVER_PORT}`)
})