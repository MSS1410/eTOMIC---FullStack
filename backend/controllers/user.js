const User = require('../modelos/user')
const bcrypt = require('bcrypt')
const { generateToken } = require('../util/jwt')
const jwt = require('jsonwebtoken')
const Event = require('../modelos/Event')
const { cloudinary } = require('../config/cloudinary')

const attendedEvent = async (req, res) => {
  try {
    const { eventId } = req.params
    const userId = req.user.id

    const event = await Event.findById(eventId)
    if (!event) {
      return res.status(404).json({ message: 'cannot find event' })
    }
    // si ya asistio no se vuelve a agregar

    if (req.user.attendedEvents.includes(eventId)) {
      return res
        .status(400)
        .json({ message: 'You already attended this event' })
    }

    //acyualizo user con el evento al que ha asistido

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { attendedEvents: eventId } },
      { new: true }
    )
    //agrego user a lista de attendees
    await Event.findByIdAndUpdate(
      eventId,
      { $push: { attendees: userId } },
      { new: true }
    )

    return res.status(200).json({
      message: 'You are or have participated on this event',
      user: updatedUser
    })
  } catch (error) {
    console.error('error attending you to the event', error)
    return res
      .status(500)
      .json({ message: 'Error atendind event', error: error.message })
  }
}
const getUsers = async (req, res) => {
  try {
    console.log('datos user auth:', req.user)
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'only admin' })
    }
    const users = await User.find().select('-password')
    res.json(users)
  } catch (error) {
    return res.status(500).json({ message: 'Error geting users' })
  }
}

const getUserById = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById(id).select('-password')

    if (!user) return res.status(400).json({ message: 'Cant find user by id' })
    if (req.user.id !== user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admin or owner' })
    }
    return res.status(201).json(user)
  } catch (error) {
    return res.status(500).json({ message: 'Error geting user By Id' })
  }
}

const register = async (req, res) => {
  try {
    const { name, email, password, role, attendedEvents, createdAt } = req.body

    const userExist = await User.findOne({ email })
    if (userExist) {
      return res.status(400).json({ message: 'User already registered' })
    }

    const newUser = new User({
      name,
      email,
      password,
      role,
      attendedEvents,
      createdAt
    })
    const savedUser = await newUser.save()
    const token = generateToken({
      id: savedUser._id,
      role: savedUser.role,
      attendedEvents: savedUser.attendedEvents,
      createdAt: savedUser.createdAt
    })
    return res.status(201).json({
      message: 'user success register',
      user: {
        id: savedUser._id,
        name: savedUser.name,
        attendedEvents: savedUser.attendedEvents,
        createdAt: savedUser.createdAt
      },
      token
    })
  } catch (error) {
    console.error('❌ Error en el registro:', error)
    return res
      .status(500)
      .json({ message: 'Registration failed', error: error.message })
  }
}

const login = async (req, res) => {
  try {
    console.log('📩 Body recibido:', req.body)
    const { email, password } = req.body

    console.log('Email recibido:', email)
    console.log('Password recibido:', password)

    if (!password) {
      console.log('error:password undefined or null')
      return res.status(400).json({ message: 'password required' })
    }
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json('Cant find user by this email')
    }
    //

    //

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'wrong email // password' })
    }

    const token = generateToken({
      id: user._id,
      role: user.role,
      attendedEvents: user.attendedEvents,
      createdAt: user.createdAt
    })
    return res.status(200).json({ token, user })
  } catch (error) {
    console.error('Error login', error)
    return res
      .status(500)
      .json({ message: 'Error on login', error: error.message })
  }
}
// editar perfil

const updatedUser = async (req, res) => {
  try {
    console.log('user ID', req.params.id)
    console.log('received data for update:', req.body)
    console.log('auth user:', req.user)

    if (req.user.id.toString() !== req.params.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admin or owner' })
    }

    const { id } = req.params
    const updates = req.body

    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10)
    }
    const updatedUser = await User.findByIdAndUpdate(id, updates, {
      new: true
    }).select('-password')

    if (!updatedUser) {
      return res.status(400).json({ message: 'issue updating' })
    }

    return res.status(200).json({ message: 'user update success', updatedUser })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'cannot update user', error })
  }
}

const roleChange = async (req, res) => {
  try {
    const { id } = req.params
    const { role } = req.body
    if (req.user.role !== 'admin') {
      return res
        .status(403)
        .json({ message: 'dont have permission to change roles' })
    }
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true }
    )
    if (!updatedUser) {
      return res.status(400).json({ message: 'User not found' })
    }

    return res
      .status(200)
      .json({ message: 'User role success updated ', user: updatedUser })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'error updating role' })
  }
}

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params

    if (req.user.id !== id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Permision denied' })
    }
    const deletedUser = await User.findByIdAndDelete(id)
    if (!deletedUser) {
      return res.status(400).json({ message: 'cant find user by id' })
    }
    return res.status(200).json({ message: 'user deleted', deletedUser })
  } catch (error) {
    return res.status(500).json({ message: 'issue deleting user' })
  }
}

// funcion para mi perfil, par ano tenerr que pasar el id en la app

const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    if (!user) {
      return res.status(404).json({ message: 'User not found...' })
    }
    return res.status(200).json(user)
  } catch (error) {
    return res.status(500).json({
      message: 'Error while accessing your profile',
      error: error.message
    })
  }
}

// actualizar foto perfil

const updateProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'no image provided to update' })
    }

    //subo a cloud
    const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
      folder: 'profile-images'
    })

    //actualizo el campo de profileimage de el user
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { profileImage: uploadedImage.secure_url },
      { new: true }
    ).select('-password')
    return res
      .status(200)
      .json({ message: 'Profile image updated OK', user: updatedUser })
  } catch (error) {
    console.error('Error updating profile img:', error)
    return res
      .status(500)
      .json({ message: 'Error updating profile img:', error: error.message })
  }
}

module.exports = {
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
}
