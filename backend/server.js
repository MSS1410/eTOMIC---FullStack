require('dotenv').config()

const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')

//rutas

const routerEvent = require('./routes/Event')
const routerUser = require('./routes/User')
const routerEventMedia = require('./routes/EventMedia')
const routerFlyer = require('./routes/eventFlyer')
const routerImg = require('./routes/eventImage')
const routerProfileImg = require('./routes/profileImg')

const app = express()

//middlewares
app.use(express.json())
app.use(cors()) // permite peticiones desde el front
app.options('*', cors())
//bd
connectDB()

//routers

app.use('/api/v1/events', routerEvent)
app.use('/api/v1/users', routerUser)
app.use('/api/v1/event-media', routerEventMedia)
app.use('/api/v1/flyer-media', routerFlyer)
app.use('/api/v1/event-img', routerImg)
app.use('/api/v1/users/profile', routerProfileImg)

//500
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ message: err.message, stack: err.stack })
})

const PORT = process.env.PORT || 3066
app.listen(PORT, () => {
  console.log(`🎧🎭 ETOMIC  en: http://localhost:${PORT}`)
})
