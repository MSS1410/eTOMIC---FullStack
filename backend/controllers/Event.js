const { cloudinary } = require('../config/cloudinary')
const Event = require('../modelos/Event')

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find()
    return res.status(200).json(events)
  } catch (error) {
    return res.status(403).json({ message: "cann't show all events", error })
  }
}

const getEventById = async (req, res) => {
  try {
    const { id } = req.params
    const event = await Event.findById(id)
    if (!event) {
      return res.status(400).json({ message: 'no coincidence event - ID' })
    }
    return res.status(200).json(event)
  } catch (error) {
    console.error('Error when relate event & Id ')
    return res
      .status(500)
      .json({ message: 'internal damage', error: error.message })
  }
}

const postEvent = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'only admin' })
  }
  try {
    console.log('data received:', req.body)

    const newEvent = new Event({
      ...req.body,
      createdBy: req.user.id
    })

    const event = await newEvent.save()
    return res.status(200).json({ message: 'success posting event', event })
  } catch (error) {
    console.error('error posting event:', error)
    return res
      .status(400)
      .json({ message: 'Error posting event', error: error.message })
  }
}

const updateEvent = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'only admin' })
    }
    const { id } = req.params
    const updatedEvent = await Event.findByIdAndUpdate(id, req.body, {
      new: true
    })

    return res.status(200).json(updatedEvent)
  } catch (error) {
    return res.status(400).json({ message: 'missing update', error })
  }
}

const deleteEvent = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'only admin' })
    }
    const { id } = req.params
    const event = await Event.findByIdAndDelete(id)
    return res.status(200).json({ message: 'Success deleting event', event })
  } catch (error) {
    return res.status(400).json({ message: "can't delete Event", error })
  }
}

const getAttendedEvents = async (req, res) => {
  try {
    console.log('Request received at getAttendedEvents')

    const userId = req.user.id
    console.log('User ID received:', userId)
    if (!userId) {
      console.log('no user ID found in request')
      return res.status(400).json({ message: 'No ID' })
    }

    const events = await Event.find({ attendees: userId }).lean()

    if (!events.length) {
      return res.status(404).json({ message: 'No attended events yet' })
    }
    return res.status(200).json(events)
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'error geting attended events', error: error.message })
  }
}

// filtrar eventos upcoming

const getUpcomingEvents = async (req, res) => {
  try {
    const now = new Date()

    const events = await Event.find({
      date: { $gte: now.toISOString() }
    }).lean()
    return res.status(200).json(events)
  } catch (error) {
    console.error('error getting upcoming events:', error)
    return res
      .status(500)
      .json({ message: 'internal damage', error: error.message })
  }
}

module.exports = {
  getUpcomingEvents,
  getAllEvents,
  getEventById,
  postEvent,
  updateEvent,
  deleteEvent,
  getAttendedEvents
}
