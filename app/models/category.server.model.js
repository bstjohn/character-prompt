'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Validation function
 */
function validateLength (v) {
	// A custom validation function for checking string length to be used by the model
	return v.length <= 15;
}

/**
 * Category Schema
 */
var CategorySchema = new Schema({
	// The property name
	created: {
		type: Date,
		default: Date.now
	},
	description: {
		type: String,
		default: '',
		trim: true
	},
	name: {
		type: String,
		default: '',
		trim: true,
		unique: true,
		// TODO: Place these into CONSTANTS file.
		required: 'name cannot be blank',
		validate: [validateLength, 'name must be 15 characters or less in length']
	}
});

// Exposes the model to other objects (kind of like a 'public' setter)
mongoose.model('Category', CategorySchema);
