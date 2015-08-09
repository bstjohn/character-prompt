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
    return v.length <= 1000;
}

/**
 * Book Schema
 */
var BookSchema = new Schema({
	created: {
		type: Date,
        default: Date.now
	},
    title: {
        type: String,
        default: '',
        lowercase: true,
        trim: true,
        unique: true,
        required: 'title cannot be blank',
        validate: [validateLength, 'title must be 30 characters or less']
    },
    author: {
        type: String,
        default: '',
        lowercase: true,
        trim: true,
        unique: false,
        required: 'author cannot be blank',
        validate: [validateLength, 'author cannot have a name longer than 40 characters']
    },
    description: {
        type: String,
        default: '',
        lowercase: true,
        trim: true,
        unique: false,
        required: 'description cannot be blank',
        validate: [validateDescriptionLength, 'description must be 140 characters or less']
    },
    releaseDate: {
        type: Date,
        default: null
    }
});

mongoose.model('Book', BookSchema);
