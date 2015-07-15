'use strict';

/**
 * Returns the full name as a single string.
 * @param first The first name.
 * @param middle    The middle name.
 * @param last  The last name.
 * @returns {*}
 */
var getFullName = function(first, middle, last) {
    var fullName = first;

    if (middle !== '' || middle !== null) {
        fullName = fullName.concat(' ', middle);
    }

    if (last !== '' || last !== null) {
        fullName = fullName.concat(' ', last);
    }

    return fullName;
};

angular.module('characters').controller('CharactersController', ['$scope',
	function($scope, $stateParams, $location, Authentication, Characters) {
		$scope.authentication = Authentication;
		$scope.currentPage = 1;
		$scope.pageSize = 10;
		$scope.offset = 0;

		// Page changed handler
		$scope.pageChanged = function() {
			$scope.offset = ($scope.currentPage - 1) * $scope.pageSize;
		};

		// Create new Character
		$scope.create = function() {
			var character = new Characters ({
                book: this.book,
                title: this.title,
                firstName: this.firstName,
                middleName: this.middleName,
                lastName: this.lastName,
                fullName: getFullName(this.firstName, this.middleName, this.lastName),
                description: this.description,
                bio: this.bio
            });

            character.$save(function(response) {
               $location.path('characters/ + response.id');

                // Clear form fields
                //$scope.book = '';
                $scope.title = '';
                $scope.firstName = '';
                $scope.middleName = '';
                $scope.lastName = '';
                $scope.description = '';
                $scope.bio = '';
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
		};

		// Remove existing Character
		$scope.remove = function(character) {
			if ( character ) {
				character.$remove();

				for (var i in $scope.characters) {
					if ($scope.characters [i] === character) {
						$scope.characters.splice(i, 1);
					}
				}
			} else {
				$scope.character.$remove(function() {
					$location.path('characters');
				});
			}
		};

		// Update existing Character
		$scope.update = function() {
			var character = $scope.character;

			character.$update(function() {
				$location.path('characters/' + character._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Characters
		$scope.find = function() {
			$scope.characters = Characters.query();
		};

		// Find existing Character
		$scope.findOne = function() {
			$scope.character = Characters.get({
				characterId: $stateParams.characterId
			});
		};

		// Search for a character
		$scope.characterSearch = function(product) {
			$location.path('characters/' + product._id);
		};
	}
]);
