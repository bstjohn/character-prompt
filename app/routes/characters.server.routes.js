'use strict';

module.exports = function(app) {
    var characters = require('../../app/controllers/characters.server.controller.js');
    var books = require('../../app/controllers/books.server.controller.js');
    var users = require('../../app/controllers/users.server.controller');

    app.route('/characters')
        .get(characters.list)
        .post(users.requiresLogin, characters.create);

    app.route('/characters/:characterId')
        .get(characters.read)
        .put(users.requiresLogin, characters.update)
        .delete(users.requiresLogin, characters.delete);

    app.param('characterId', characters.characterById);
};
