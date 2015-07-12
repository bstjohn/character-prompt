'use strict';

//Setting up route
angular.module('books').config(['$stateProvider',
	function($stateProvider) {
		// Books state routing
		$stateProvider.
		state('books', {
			url: '/books',
			templateUrl: 'modules/books/views/books.client.view.html'
		});
	}
]);