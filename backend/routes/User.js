const { isAdmin } = require('../middlewares/admin')
const { isAuth } = require('../middlewares/auth')

const {
  getMyProfile,
  getUsers,
  getUserById,
  register,
  login,
  updatedUser,
  roleChange,
  deleteUser,
  attendedEvent,
  updateProfileImage
} = require('../controllers/user')

const routerUser = require('express').Router()

routerUser.get('/me', isAuth, getMyProfile)

routerUser.get('/', isAuth, isAdmin, getUsers)
routerUser.get('/:id', isAuth, isAdmin, getUserById)
routerUser.post('/register', register)
routerUser.post('/login', login)
routerUser.put('/:id', isAuth, updatedUser)
routerUser.delete('/:id', isAuth, isAdmin, deleteUser)
routerUser.put('/:id/role', isAuth, isAdmin, roleChange),
  routerUser.post('/attend/:eventId', isAuth, attendedEvent)

module.exports = routerUser
