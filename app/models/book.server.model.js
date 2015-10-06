/**
    Copyright (c) 2015 Brady St. John
    This program is released under The MIT License (MIT).
    Please see the file COPYING in this distribution for
    license terms.
*/
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
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    shared: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        default: '',
        lowercase: true,
        trim: true,
        unique: false,
        required: 'title cannot be blank',
        validate: [validateLength, 'Title must be 30 characters or less']
    },
    author: {
        type: String,
        default: '',
        lowercase: true,
        trim: true,
        unique: false,
        required: 'author cannot be blank',
        validate: [validateLength, 'Author cannot have a name longer than 40 characters']
    },
    description: {
        type: String,
        default: '',
        trim: true,
        unique: false,
        required: 'description cannot be blank',
        validate: [validateDescriptionLength, 'Description must be 1000 characters or less']
    },
    descriptionTwo: {
        type: String,
        default: '',
        trim: true,
        unique: false,
        validate: [validateDescriptionLength, 'Second part of description must be 1000 characters or less']
    },
    releaseDate: {
        type: Date,
        default: null
    }
});

mongoose.model('Book', BookSchema);
