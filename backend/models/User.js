// models/User.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
  bio: { type: String },
  interests: [String],
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number],  // Format: [longitude, latitude]
  },
  profilePictureUrl: { type: String },
  friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  questionnaire: { type: Array, default: [] } // Store questionnaire responses
});

module.exports = mongoose.model('User', UserSchema);
