const { cloudinary } = require('../config/cloudinary')
const EventMedia = require('../modelos/EventMedia')
const Event = require('../modelos/Event')

const uploadFlyer = async (req, res) => {
  try {
    const { eventId } = req.params
    const { description } = req.body
    //verifico si me llega el file
    if (!req.file) {
      return res.status(400).json({ message: 'no flyer image provided' })
    }
    //subo archivo cloudy
    const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
      folder: 'flyer-media'
    })
    // verifico evento existe
    const event = await Event.findById(eventId)
    if (!event) return res.status(404).json({ message: 'cant find event' })
    // solo admin para flyer
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'only adminn !' })
    }

    const newFlyer = new EventMedia({
      event: eventId,
      uploadedBy: req.user.id,
      imageUrl: uploadedImage.secure_url,
      description
    })

    await newFlyer.save()
    //actualizar el campo flyer de mi modelo event

    event.flyer = uploadedImage.secure_url
    await event.save()
    return res
      .status(200)
      .json({ message: 'Flyer uploaded success', flyerUrl: event.flyer })
  } catch (error) {
    console.error('error uploading flyer', error)
    return res
      .status(500)
      .json({ message: 'Error uploading flyer', error: error.message })
  }
}

const deleteFlyer = async (req, res) => {
  try {
    const { id } = req.params
    const flyer = await EventMedia.findById(id)
    if (!flyer) {
      return res.status(404).json({ message: 'Flyer not found' })
    }

    // solo admin

    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'only admin deleting files' })
    }

    //extraer publid id de cloud a partir de url
    const urlSections = flyer.imageUrl.split('/')
    const fileName = urlSections[urlSections.length - 1] // holahola.jps
    const publidId = fileName.split('.')[0] //holahola
    const completPublicId = `flyer-media/${publidId}`

    //eliminar imagen de cloud
    const deletedFromCloud = await cloudinary.uploader.destroy(completPublicId)
    console.log('eliminated flyer:', deletedFromCloud)

    //eliminar de bbb
    await EventMedia.findByIdAndDelete(id)
    return res.status(200).json({ message: 'flyer deleted success' })
  } catch (error) {
    console.error('error deleting flyer', error)
    return res
      .status(500)
      .json({ message: 'Error deleting flyer', error: error.message })
  }
}

module.exports = { uploadFlyer, deleteFlyer }
