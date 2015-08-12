/**
	Copyright (c) 2015 Brady St. John
	This program is released under The MIT License (MIT).
	Please see the file COPYING in this distribution for
	license terms.
*/
'use strict';

/**
 * The categories route
 */
angular.module('categories').config(['$stateProvider',
	function($stateProvider) {
		// Categories state routing
		$stateProvider.
			state('listCategories', {
				url: '/categories',
				templateUrl: 'modules/categories/views/categories.client.view.html'
			}).
			state('createCategory', {
				url: '/categories/create',
				templateUrl: 'modules/categories/views/create-category.client.view.html'
			}).
			state('viewCategory', {
				url: '/categories/:categoryId',
				templateUrl: 'modules/categories/views/view-category.client.view.html'
			}).
			state('editCategory', {
				url: '/categories/:categoryId/edit',
				templateUrl: 'modules/categories/views/edit-character.client.view.html'
			});
	}
]);
