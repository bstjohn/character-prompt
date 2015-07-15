'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Ensure the length of the input is not too long.
 * @param v     The input.
 * @returns {boolean}   True if validation was successful (length is accepted)
 */
function validateLength (v) {
	return v.length <= 40;
}

/**
 * Ensure the length of the input is not too long.
 * @param v     The input.
 * @returns {boolean}   True if validation was successful (length is accepted)
 */
function validateDescriptionLength (v) {
	return v.length <= 140;
}

/**
 * Character Schema
 */
var CharacterSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	firstName: {
		type: String,
		default: '',
        lowercase: true,
		trim: true,
		unique: false,
		required: 'First name cannot be blank',
        validate: [validateLength, 'first name must be 30 characters or less']
	},
	middleName: {
		type: String,
		default: '',
        lowercase: true,
		trim: true,
		unique: false,
		validate: [validateLength, 'middle name must be 30 characters or less']
	},
	lastName: {
		type: String,
		default: '',
        lowercase: true,
		trim: true,
		unique: false,
		validate: [validateLength, 'last name must be 30 characters or less']
	},
	description: {
		type: String,
		default: '',
        lowercase: true,
		trim: true,
		unique: false,
		required: 'Description cannot be blank',
		validate: [validateDescriptionLength, 'description must be 140 characters or less']
	},
	bio: {
		type: String,
		default: '',
        lowercase: true,
		trim: true,
		unique: false
	}
});

mongoose.model('Character', CharacterSchema);
