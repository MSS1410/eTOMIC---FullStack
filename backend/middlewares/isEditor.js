function isEditor(req, res, next) {
  if (req.user && req.user.role === 'editor') {
    return next()
  }
  return res.status(403).json({ message: 'Permission denied:Editor required' })
}

module.exports = { isEditor }
