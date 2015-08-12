/**
	Copyright (c) 2015 Brady St. John
	This program is released under The MIT License (MIT).
	Please see the file COPYING in this distribution for
	license terms.
*/
'use strict';

// Books controller
angular.module('books').controller('BooksController', ['$scope', '$stateParams', '$location', 'Authentication', 'Books', 'Characters', '$filter',
	function($scope, $stateParams, $location, Authentication, Books, Characters, $filter) {
		$scope.authentication = Authentication;
		$scope.currentPage = 1;
		$scope.pageSize = 10;
		$scope.offset = 0;
		$scope.descLimit = 50;

		// Page changed handler
		$scope.pageChanged = function() {
			$scope.offset = ($scope.currentPage - 1) * $scope.pageSize;
		};

		// Create new Book
		$scope.create = function() {
			// Create new Book object
			var book = new Books ({
				title: this.title,
                author: this.author,
				description: this.description
			});

			// Redirect after save
			book.$save(function(response) {
				$location.path('books/' + response._id);

				// Clear form fields
				$scope.title = '';
                $scope.author = '';
                $scope.description = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Book
		$scope.remove = function(book) {
			if ( book ) {
				book.$remove();

				for (var i in $scope.books) {
					if ($scope.books [i] === book) {
						$scope.books.splice(i, 1);
					}
				}
			} else {
				$scope.book.$remove(function() {
					$location.path('books');
				});
			}
		};

		// Update existing Book
		$scope.update = function() {
			var book = $scope.book;

			book.$update(function() {
				$location.path('books/' + book._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Books
		$scope.find = function() {
			$scope.books = Books.query();
		};

		// Find existing Book
		$scope.findOne = function() {
			$scope.book = Books.get({
				bookId: $stateParams.bookId
			});
		};

		// Search for a book
		$scope.bookSearch = function(book) {
			$location.path('books/' + book._id);
		};

        /**
         * Define data that will be used in a table.
         */
        $scope.initTable = function() {
            $scope.currentBook = $stateParams.bookId;
            $scope.characterCollection = Characters.querySome();
            $scope.characterCollection = Characters.query(function loadCharacters(characters) {
                $scope.displayedCharacters = $filter('filter')(characters, {book: $stateParams.bookId});
            });
            $scope.characterCollection.$promise.then(function () {
                var characters = [];
                for (var i = 0; i < $scope.characterCollection.length; i++) {
                    var currentCharacter =  $scope.characterCollection[i];
                    if (angular.equals(currentCharacter.book, $stateParams.bookId)) {
                        characters.push({
                            firstName: currentCharacter.firstName,
                            middleName: currentCharacter.middleName,
                            lastName: currentCharacter.lastName,
                            description: currentCharacter.description,
                            id: currentCharacter.id
                        });
                    }
                }
                $scope.bookCharacters = characters;
            });
        };
	}
]);
