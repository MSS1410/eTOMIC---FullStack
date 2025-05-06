const express = require('express')
const { isAuth } = require('../middlewares/auth')
const { isAdmin } = require('../middlewares/admin')

const {
  getUpcomingEvents,
  getAllEvents,
  getEventById,
  postEvent,
  updateEvent,
  deleteEvent,
  getAttendedEvents
} = require('../controllers/Event')

const routerEvent = express.Router()
//eventos futuros
routerEvent.get('/upcoming', getUpcomingEvents)

//rutas con admin o auth
routerEvent.get('/attended', isAuth, getAttendedEvents)
routerEvent.post('/', isAuth, isAdmin, postEvent)
routerEvent.put('/:id', isAuth, isAdmin, updateEvent)
routerEvent.delete('/:id', isAuth, isAdmin, deleteEvent)

routerEvent.get('/', getAllEvents), routerEvent.get('/:id', getEventById)

module.exports = routerEvent
