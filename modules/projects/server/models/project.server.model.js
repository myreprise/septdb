'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Project Schema
 */
var ProjectSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  type: {
    type: String,
    default: 'existing',
    trim: true,
    required: 'Type cannot be blank'
  },
  name: {
    type: String,
    default: '',
    trim: true,
    required: 'Name cannot be blank'
  },
  city: {
    type: String,
    default: '',
    trim: true
  },
  district: {
    type: String,
    default: '',
    trim: true
  },
  year: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: ''
  },
  latitude: {
    type: Number,
    default: ''
  },
  longitude: {
    type: Number,
    default: ''
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Project', ProjectSchema);
