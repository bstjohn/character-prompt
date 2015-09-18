/**
	Copyright (c) 2015 Brady St. John
	This program is released under The MIT License (MIT).
	Please see the file COPYING in this distribution for
	license terms.
*/
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

angular.module('characters').controller('CharactersController', ['$scope', '$stateParams', '$location', '$filter', 'Authentication','Characters', 'Books',
	function($scope, $stateParams, $location, $filter, Authentication, Characters, Books) {
		$scope.authentication = Authentication;
        $scope.books = Books.query();
		$scope.currentPage = 1;
		$scope.offset = 0;
		$scope.pageSize = 10;

		// Character description variables
		$scope.currentDesc = '';
		$scope.descCharsRemaining = 140;
		$scope.maxDescLength = 140;

		// Character bio variables
		$scope.currentBio = '';
		$scope.bioCharsRemaining = 1000;
		$scope.maxBioLength = 1000;

		// Update the current length of a text input
		$scope.updateInputLength = function(input) {
			if (angular.equals(input, $scope.currentDesc)) {
				if (angular.isUndefined($scope.currentDesc)) {
					$scope.currentDesc = '';
				}
				$scope.descCharsRemaining = $scope.maxDescLength - $scope.currentDesc.length;
			} else if (angular.equals(input, $scope.currentBio)) {
				$scope.bioCharsRemaining = $scope.maxBioLength - $scope.currentBio.length;
			}
		};

		// Update the book data
		$scope.updateCharacterData = function() {
			$scope.character.$promise.then(function (character) {
				$scope.currentBook = character.book;

				$scope.currentBio = character.bio;
				$scope.updateInputLength($scope.currentBio);

				$scope.currentDesc = character.description;
				$scope.updateInputLength($scope.currentDesc);
			});
		};

		// Page changed handler
		$scope.pageChanged = function() {
			$scope.offset = ($scope.currentPage - 1) * $scope.pageSize;
		};

		// Create new Character
		$scope.create = function() {
			var character = new Characters ({
                book: this.book,
                introChapter: this.introChapter,
                title: this.title,
                firstName: this.firstName,
                middleName: this.middleName,
                lastName: this.lastName,
                fullName: getFullName(this.firstName, this.middleName, this.lastName),
                description: $scope.currentDesc,
                bio: $scope.currentBio
            });

            character.$save(function(response) {
               $location.path('characters/' + response._id);
                // Clear form fields
                $scope.book = '';
                $scope.introChapter = 1;
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
			
			character.book = $scope.currentBook._id;
			character.description = $scope.currentDesc;
			character.bio = $scope.currentBio;

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
