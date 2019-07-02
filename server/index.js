require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const {registerUser, loginUser, getUser, logout} = require('./controllers/authController')
const {createArtist, getArtist, getGenre, getDash} = require('./controllers/artistController')
const {createEvent, getEvent, acceptedEvent, deleteEvent, getShow} = require('./controllers/eventController')

const app = express()

let {SERVER_PORT, SESSION_SECRET}= process.env

app.use(express.json())

massive(process.env.CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log('Database Connected')
})

app.use(
    session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialization: true,
        cookies: {
            maxAge: 1000 * 60 * 60 * 24 * 7
        },
        user: {}
    })
)

// Authentication
app.post('/artist/register', registerUser)
app.post('/artist/login', loginUser )
app.get('/artist/user', getUser)
app.post('/artist/logout', logout)

// Artist
app.post('/artist/form', createArtist )
app.get('/artist/:id', getArtist)
app.get('/artist/genre/:genre', getGenre)
app.get('/dashboard/:id', getDash)

// Event
app.post('/event/form', createEvent)
app.put('/event/accepted/:event_id', acceptedEvent)
app.delete('/event/delete/:id', deleteEvent)
app.get('/event/request/:id', getEvent)
app.get('/shows/:id', getShow)


app.listen(SERVER_PORT, () => {
    console.log(`Server listening on port ${SERVER_PORT}`)
})