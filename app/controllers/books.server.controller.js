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
    errorHandler = require('./errors.server.controller'),
    Book = mongoose.model('Book'),
    _ = require('lodash');

/**
 * Create a Book
 */
exports.create = function(req, res) {
    var book = new Book(req.body);

    book.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.status(201).json(book);
        }
    });
};

/**
 * Show the current Book
 */
exports.read = function(req, res) {
    res.json(req.book);
};

/**
 * Update a Book
 */
exports.update = function(req, res) {
    var book = req.book;

    book = _.extend(book, req.body);

    book.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(book);
        }
    });
};

/**
 * Delete an Book
 */
exports.delete = function(req, res) {
    var book = req.book;

    book.remove(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(book);
        }
    });
};

/**
 * List of Books
 */
exports.list = function(req, res) {
    Book.find().exec(function(err, books) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(books);
        }
    });
};

/**
 * Book middleware
 */
exports.bookById = function(req, res, next, id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Book is invalid'
        });
    }

    Book.findById(id).exec(function(err, book) {
        if (err) {
            return next(err);
        }

        if (!book) {
            return res.status(404).send({
                message: 'Book not found'
            });
        }

        req.book = book;
        next();
    });
};
