const { isAdmin } = require('../middlewares/admin')
const { isAuth } = require('../middlewares/auth')
const { upload } = require('../config/cloudinary')
const { uploadFlyer, deleteFlyer } = require('../controllers/eventFlyer')

const routerFlyer = require('express').Router()

routerFlyer.post(
  '/:eventId',
  isAuth,
  isAdmin,
  upload.single('img'),
  uploadFlyer
)
routerFlyer.delete('/:id', isAuth, isAdmin, deleteFlyer)

module.exports = routerFlyer
