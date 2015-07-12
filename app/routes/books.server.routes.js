'use strict';

module.exports = function(app) {
	var books = require('../../app/controllers/books.server.controller.js');
    var users = require('../../app/controllers/users.server.controller');

    app.route('/books')
        .get(books.list)
        .post(users.requiresLogin, books.create);

    app.route('/books/:bookId')
        .get(books.read)
        .put(users.requiresLogin, books.update)
        .delete(users.requiresLogin, books.delete);

    app.param('bookId', books.bookById);
};
