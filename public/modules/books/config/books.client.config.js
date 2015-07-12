'use strict';

// Books module config
angular.module('books').run(['Menus',
	function(Menus) {
        Menus.addMenuItem('topbar', 'Books', 'books', 'dropdown', '/books(/create)?');
        Menus.addSubMenuItem('topbar', 'books', 'List Books', 'books');
        Menus.addSubMenuItem('topbar', 'books', 'New Book', 'books/create');
	}
]);
