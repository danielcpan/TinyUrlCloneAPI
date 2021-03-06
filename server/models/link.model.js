const mongoose = require('mongoose');

const URL_REGEX = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
const SAME_URL_REGEX = /^https?:\/\/tiny-url-clone-api.herokuapp\.com/;

const manyValidators = [
  { validator: (v) => URL_REGEX.test(v), msg: 'Invalid Url' },
  { validator: (v) => !SAME_URL_REGEX.test(v), msg: 'That is already a tiny-url-clone-api.herokuapp.com link!' },
];

const LinkSchema = new mongoose.Schema({
  index: {
    type: Number,
    unique: true,
    index: true,
  },
  tinyUrlId: {
    type: String,
    unique: true,
  },
  tinyUrl: {
    type: String,
  },
  originalUrl: {
    type: String,
    required: true,
    validate: manyValidators,
  },
  uniqueClicks: {
    type: Number,
    default: 0,
  },
  totalClicks: {
    type: Number,
    default: 0,
  },
  visits: [{
    type: mongoose.Types.ObjectId,
    ref: 'Visit',
  }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Link', LinkSchema);
