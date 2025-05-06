const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  description: { type: String },
  category: {
    type: String,
    enum: [
      '24h Fest',
      '48h Fest',
      '12h Day Fest',
      'Night Party',
      'Meeting',
      'Workshop'
    ],
    required: true
  },
  image: { type: String },
  flyer: { type: String },
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: { type: Date, default: Date.now }
})

//necesitro un schema virrtual para el populate de las imagenes con cada evento

eventSchema.virtual('eventMedia', {
  ref: 'EventMedia',
  localField: '_id',
  foreignField: 'event',
  justOne: false
})

eventSchema.set('toJSON', { virtuals: true })
eventSchema.set('toObject', { virtuals: true })

module.exports = mongoose.model('Event', eventSchema)
