const EventMedia = require('../modelos/EventMedia')
const Event = require('../modelos/Event')
const { cloudinary } = require('../config/cloudinary')

const uploadEventMedia = async (req, res) => {
  try {
    const { eventId } = req.params
    const description = req.body.description

    if (!req.file) {
      return res.status(400).json({ message: 'No image to upload' })
    }
    //subo a cloud
    const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
      folder: 'event-media'
    })

    // ver existencia y saco los asistentes
    const event = await Event.findById(eventId).populate('eventMedia')
    if (!event)
      return res
        .status(404)
        .json({ message: 'Cant upload an image to a non existing event' })

    // verifico asistencia de user y

    // le cambio el .includes por .some, ya que tengo que pasar los attendes a string para realizar la comparacion de role.
    // porque? en la bbdd los IDs de los asistentrs los guardo como objectId y req.user.id es string, comparar con includes puede fallar porque ObjectId != string
    if (!event.attendees.some((att) => att.toString() === req.user.id)) {
      return res
        .status(403)
        .json({ message: "You should've attended the event to post an image" })
    }

    const newMedia = new EventMedia({
      event: eventId,
      uploadedBy: req.user.id,
      imageUrl: uploadedImage.secure_url,
      description
    })
    await newMedia.save()
    res.json({ message: 'succes upload', media: newMedia })
  } catch (error) {
    console.error('error uploading image:', error)
    res
      .status(500)
      .json({ message: 'Error uploading image', error: error.message })
  }
}

// todas imagenes de evento

const getEventMedia = async (req, res) => {
  try {
    const { eventId } = req.params
    const media = await EventMedia.find({ event: eventId }).populate(
      'uploadedBy',
      'name'
    )
    res.json(media)
  } catch (error) {
    res.status(500).json({
      message: 'error getting all media of that event',
      error: error.message
    })
  }
}
//get all event media sin id

const getAllEventMedia = async (req, res) => {
  try {
    // le aplicao un populate a event, para que asi, cada objeto media tenga el campo event y sus datos,( necesito la fecha para filtrar el swiper de gallery)
    const mediaItems = await EventMedia.find().populate('event')
    res.json(mediaItems)
  } catch (error) {
    res.status(500).json({ message: 'Error showing Event Media' })
  }
}

const deleteEventMedia = async (req, res) => {
  try {
    const { id } = req.params
    const media = await EventMedia.findById(id)
    if (!media) return res.status(403).json({ message: 'media not found' })

    if (
      req.user.id !== media.uploadedBy.toString() &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({ message: 'permision denied, only admin' })
    }

    //elimino de cloud

    const imageId = media.imageUrl.split('/').pop().split('.')[0]
    await cloudinary.uploader.destroy(`event-media/${imageId}`)

    await EventMedia.findByIdAndDelete(id)

    return res.status(201).json({ message: 'Ok deleted media' })
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ message: 'cannot delete media file', error: error.message })
  }
}

module.exports = {
  uploadEventMedia,
  getEventMedia,
  getAllEventMedia,
  deleteEventMedia
}
