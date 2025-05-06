const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const multer = require('multer')

// confi cl
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

// folder en cloud
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'event-media',
    allowed_formats: ['jpg', 'png', 'jpeg', 'gif']
  }
})

// multer
const upload = multer({ storage })

module.exports = { cloudinary, upload }
