'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    Character = mongoose.model('Character'),
    _ = require('lodash');

/**
 * Create a Character
 */
exports.create = function(req, res) {
    var character = new Character(req.body);
    
    character.save(function(err) {
       if (err) {
           return res.status(400).send({
               message: errorHandler.getErrorMessage(err)
           });
       }  else {
           res.status(201).json(character);
       }
    });
};

/**
 * Update a Character
 */
exports.update = function(req, res) {
    var character = req.character;

    character = _.extend(character, req.body);

    character.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(character);
        }
    });
};

/**
 * Delete an Character
 */
exports.delete = function(req, res) {
    var character = req.character;

    character.remove(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(character);
        }
    });
};

/**
 * List of Characters
 */
exports.list = function(req, res) {
    Character.find().exec(function(err, characters) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(characters);
        }
    });
};

/**
 * Character middleware
 */
exports.characterById = function(req, res, next, id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Character is invalid'
        });
    }

    Character.findById(id).exec(function(err, character) {
        if (err) {
            return next(err);
        }

        if (!character) {
            return res.status(404).send({
                message: 'Character not found'
            });
        }

        req.character = character;
        next();
    });
};
