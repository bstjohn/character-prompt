'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    Category = mongoose.model('Category'),
    _ = require('lodash');

/**
 * Create a Book
 */
exports.create = function(req, res) {
    var book = new Book(req.body);

    book.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.status(201).json(category);
        }
    })
};

/**
 * Show the current Book
 */
exports.read = function(req, res) {
    res.json(req.category);
};

/**
 * Update a Book
 */
exports.update = function(req, res) {
    var book = new Book(req.body);

    book = _.extend(book, req.body);

    book.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(category);
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
    Book.find().excec(function(err, books) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage()
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
        return next(err);
    }

    Book.findById(id).exec(function(err, category) {
        if (err) {
            return next(err);
        }

        if (!category) {
            return res.status(404).send({
                message: "Book not found"
            });
        }

        req.category = category;
        next();
    });
};
