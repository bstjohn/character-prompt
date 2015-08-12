/**
	Copyright (c) 2015 Brady St. John
	This program is released under The MIT License (MIT).
	Please see the file COPYING in this distribution for
	license terms.
*/
'use strict';

/**
 * Characters route.
 */
angular.module('characters').config(['$stateProvider',
	function($stateProvider) {
		// Characters state routing
		$stateProvider.
			state('listCharacters', {
				url: '/characters',
				templateUrl: 'modules/characters/views/characters.client.view.html'
			}).
			state('createCharacter', {
				url: '/characters/create',
				templateUrl: 'modules/characters/views/create-character.client.view.html'
			}).
			state('viewCharacter', {
				url: '/characters/:characterId',
				templateUrl: 'modules/characters/views/view-character.client.view.html'
			}).
			state('editCharacter', {
				url: '/characters/:characterId/edit',
				templateUrl: 'modules/characters/views/edit-character.client.view.html'
			});
	}
]);
