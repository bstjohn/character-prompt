/**
    Copyright (c) 2015 Brady St. John
    This program is released under The MIT License (MIT).
    Please see the file COPYING in this distribution for
    license terms.
*/
'use strict';

module.exports = function(app) {
    var characters = require('../../app/controllers/characters.server.controller.js');
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
