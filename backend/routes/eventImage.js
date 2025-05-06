const express = require('express')

const { isAuth } = require('../middlewares/auth')

const { isEditor } = require('../middlewares/isEditor')
const { upload } = require('../config/cloudinary')
const { updateEventImage } = require('../controllers/eventImage')

//actualizar img evento

const routerImg = express.Router()

routerImg.put(
  '/:id/image',
  isAuth,
  isEditor,
  upload.single('img'),
  updateEventImage
)

module.exports = routerImg
