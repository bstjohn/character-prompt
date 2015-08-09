'use strict';

// Books module config
angular.module('books').run(['Menus',
	function(Menus) {
        Menus.addMenuItem('topbar', 'Books', 'books', '/books(/create)?');
	}
]);
