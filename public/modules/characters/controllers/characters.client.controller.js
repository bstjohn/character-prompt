'use strict';

/**
 * Returns the full name as a single string.
 * @param first The first name.
 * @param middle    The middle name.
 * @param last  The last name.
 * @returns {*}
 */
var getFullName = function(first, middle, last) {
    if (first === '' || angular.isUndefined(first)) {
        return '';
    }

    var fullName = first;

    if (angular.isDefined(middle)) {
        fullName = fullName.concat(' ', middle);
    }

    if (angular.isDefined(last)) {
        fullName = fullName.concat(' ', last);
    }

    return angular.lowercase(fullName);
};

angular.module('characters').controller('CharactersController', ['$scope', '$stateParams', '$location', '$filter', 'Authentication', 'Characters', 'Books',
	function($scope, $stateParams, $location, $filter, Authentication, Characters, Books) {
		$scope.authentication = Authentication;
        $scope.books = Books.query();
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

            console.log(character.fullName);

            character.$save(function(response) {
               $location.path('characters/ + response.id');

                // Clear form fields
                $scope.book = '';
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
            character.book = character.book._id;

			character.$update(function() {
				$location.path('characters/' + character._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

        var appendBook = function appendBook(character) {
            character.book = $filter('filter')($scope.books, {_id: character.book})[0];
        };

		// Find a list of Characters
		$scope.find = function() {
			//$scope.characters = Characters.query();
            Characters.query(function loadedCharacters(characters) {
                characters.forEach(appendBook);
                $scope.characters = characters;
            });
		};

		// Find existing Character
		$scope.findOne = function() {
			$scope.character = Characters.get({
				characterId: $stateParams.characterId
			}, appendBook);
		};

		// Search for a character
		$scope.characterSearch = function(character) {
			$location.path('characters/' + character._id);
		};
	}
]);
