/**
	Copyright (c) 2015 Brady St. John
	This program is released under The MIT License (MIT).
	Please see the file COPYING in this distribution for
	license terms.
*/
'use strict';

// Categories module config
angular.module('categories').run(['Menus',
	function(Menus) {
		//Menus.addMenuItem('topbar', 'Categories', 'categories', 'dropdown', '/categories(/create)?');
		//Menus.addSubMenuItem('topbar', 'categories', 'List Categories', 'categories');
		//Menus.addSubMenuItem('topbar', 'categories', 'New Category', 'categories/create');
	}
]);
