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
		$scope.descMaxLength = 2000;

		$scope.charactersRemaining = 2000;
		$scope.currDescLength = 0;
		$scope.currentDesc = '';
		$scope.updateDescLength = function($event) {
			$scope.charactersRemaining = $scope.descMaxLength - $scope.currentDesc.length;
		};

		$scope.updateDesc = function($event) {
			$scope.findOne();
			$scope.book.$promise.then(function (book) {
				$scope.currentDesc = book.description + book.descriptionTwo;
				$scope.updateDescLength();
			});
		};

		// Page changed handler
		$scope.pageChanged = function() {
			$scope.offset = ($scope.currentPage - 1) * $scope.pageSize;
		};

		// Split the description into two parts if it's too long for Mongoose
		$scope.splitDescription = function(desc, descTwo) {
			var description = createDescObject(desc, descTwo);
			var maxMongooseStrLength = 1000;
			if (description.desc.length > maxMongooseStrLength) {
				description.descTwo = description.desc.substring(maxMongooseStrLength, description.desc.length);
				description.desc = description.desc.substring(0, maxMongooseStrLength);
			}

			return description;
		};

		// Create description object
		var createDescObject = function (desc, descTwo) {
			return {
				desc: desc,
				descTwo: descTwo
			};
		};

		// Create new Book
		$scope.create = function() {
			// Split description up in case it's too long
			var description = this.splitDescription($scope.currentDesc, this.descriptionTwo);
			this.description = description.desc;
			this.descriptionTwo = description.descTwo;

			// Create new Book object
			var book = new Books ({
				title: this.title,
                author: this.author,
				description: this.description,
				descriptionTwo: this.descriptionTwo
			});

			console.log(this.description);
			console.log(this.descriptionTwo);

			// Redirect after save
			book.$save(function(response) {
				$location.path('books/' + response._id);

				// Clear form fields
				$scope.title = '';
                $scope.author = '';
                $scope.description = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
				console.log(errorResponse);
			});
		};

		// Remove existing Book
		$scope.remove = function(book) {
			if (book) {
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

			var description = this.splitDescription($scope.currentDesc, book.descriptionTwo);
			book.description = description.desc;
			book.descriptionTwo = description.descTwo; 

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
