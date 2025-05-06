const express = require('express')
const { isAuth } = require('../middlewares/auth')
const { isAdmin } = require('../middlewares/admin')
const { upload } = require('../config/cloudinary')

const {
  uploadEventMedia,
  getEventMedia,
  deleteEventMedia,
  getAllEventMedia
} = require('../controllers/EventMedia')

const routerEventMedia = express.Router()

// rutweo

routerEventMedia.get('/', isAuth, getAllEventMedia)
routerEventMedia.post(
  '/:eventId',
  isAuth,
  upload.single('img'),
  uploadEventMedia
)
routerEventMedia.get('/:eventId', isAuth, getEventMedia)
routerEventMedia.delete('/:id', isAuth, isAdmin, deleteEventMedia)

module.exports = routerEventMedia
