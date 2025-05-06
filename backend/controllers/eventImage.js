const { cloudinary } = require('../config/cloudinary')
const Event = require('../modelos/Event')

const updateEventImage = async (req, res) => {
  try {
    const { id } = req.params
    if (!req.file) {
      return res.status(400).json({ message: 'no image provided' })
    }
    const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
      folder: 'event-media'
    })
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { image: uploadedImage.secure_url },
      { new: true }
    )
    return res
      .status(200)
      .json({ message: 'Event image OK updated:', event: updatedEvent })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error updating event iMAGE', error: error.message })
  }
}
module.exports = { updateEventImage }
