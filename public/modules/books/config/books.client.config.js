/**
	Copyright (c) 2015 Brady St. John
	This program is released under The MIT License (MIT).
	Please see the file COPYING in this distribution for
	license terms.
*/
'use strict';

// Books module config
angular.module('books').run(['Menus',
	function(Menus) {
        Menus.addMenuItem('topbar', 'Books', 'books', '/books(/create)?');
	}
]);
