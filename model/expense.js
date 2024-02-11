const mongoose = require('mongoose');
const Schema = mongoose.Schema
const User = require('./user')


const productSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    validate: {
      validator: (val) => /^\d+$/.test(val),
      message: 'Price must be a positive integer.',
    },
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  company: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Product', productSchema);
