'use strict';

// Characters module config
angular.module('characters').run(['Menus',
	function(Menus) {
		Menus.addMenuItem('topbar', 'Characters', 'characters', '/characters(/create)?');
	}
]);
