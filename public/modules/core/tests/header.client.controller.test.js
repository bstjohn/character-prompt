/**
	Copyright (c) 2015 Brady St. John
	This program is released under The MIT License (MIT).
	Please see the file COPYING in this distribution for
	license terms.
*/
'use strict';

(function() {
	describe('HeaderController', function() {
		//Initialize global variables
		var scope,
			HeaderController;

		// Load the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		beforeEach(inject(function($controller, $rootScope) {
			scope = $rootScope.$new();

			HeaderController = $controller('HeaderController', {
				$scope: scope
			});
		}));

		it('should expose the authentication service', function() {
			expect(scope.authentication).toBeTruthy();
		});
	});
})();