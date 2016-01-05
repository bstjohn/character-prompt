/**
	Copyright (c) 2015 Brady St. John
	This program is released under The MIT License (MIT).
	Please see the file COPYING in this distribution for
	license terms.
*/
'use strict';

// Books controller
angular.module('books').controller('BooksController', ['$scope', '$stateParams', '$location', 'Authentication', 'Users', 'Books', 'Characters', '$filter',
	function ($scope, $stateParams, $location, Authentication, Users, Books, Characters, $filter) {
		$scope.authentication = Authentication;
		$scope.currentPage = 1;
		$scope.pageSize = 10;
		$scope.offset = 0;

		// Character description display limit
		$scope.descLimit = 60;

		// Description variables
		$scope.showFullDesc = false;
		$scope.maxDisplayDescLength = 500;
		$scope.maxDescLength = 2000;
		$scope.charactersRemaining = 2000;
		$scope.currentDesc = '';

		// Update the current description length
		$scope.updateDescLength = function ($event) {
			$scope.charactersRemaining = $scope.maxDescLength - $scope.currentDesc.length;
		};

		// Update the displayed description
		$scope.updateDesc = function ($event) {
			$scope.book.$promise.then(function (book) {
				$scope.currentDesc = book.description + book.descriptionTwo;
				$scope.updateDescLength();
			});
		};

		// Page changed handler
		$scope.pageChanged = function () {
			$scope.offset = ($scope.currentPage - 1) * $scope.pageSize;
		};

		// Split the description into two parts if it's too long for Mongoose
		$scope.splitDescription = function (desc) {
			var description = createDescObject(desc);
			var maxMongooseStrLength = 1000;
			if (description.desc.length > maxMongooseStrLength) {
				description.descTwo = description.desc.substring(maxMongooseStrLength, description.desc.length);
				description.desc = description.desc.substring(0, maxMongooseStrLength);
			}

			return description;
		};

		// Create description object
		var createDescObject = function (desc) {
			return {
				desc: desc,
				descTwo: ''
			};
		};

		// Toggle the state of the description
		$scope.toggleFullDesc = function () {
			this.showFullDesc = !this.showFullDesc;
		};

		// Create new Book
		$scope.create = function () {
			// Split description up in case it's too long
			var description = this.splitDescription($scope.currentDesc);
			this.description = description.desc;
			this.descriptionTwo = description.descTwo;

			// Create new Book object
			var book = new Books ({
				user: $scope.authentication.user._id,
				shared: this.shared,
				title: this.title,
                author: this.author,
				description: this.description,
				descriptionTwo: this.descriptionTwo
			});

			// Redirect after save
			book.$save(function (response) {
				$location.path('books/' + response._id);

				// Clear form fields
				$scope.title = '';
                $scope.author = '';
                $scope.description = '';
			}, function (errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.validateDeletion = function () {
			$scope.deleteBook = false;
			$scope.$watch('validateDeleteInput', function(newInput) {
				var title = angular.lowercase($scope.book.title);
				var titleInput = newInput === undefined ? '' : angular.lowercase(newInput);
				$scope.validateDeleteSuccess = angular.equals(title, titleInput);
			});	
		};
		
		// Remove existing Book
		$scope.remove = function () {
			if (!angular.equals($scope.validateDeleteSuccess, true)) {
				return;
			}

			angular.forEach($scope.bookCharacters, function (character, key) {
				if(angular.equals($scope.book._id, character.book)) {
					character.$remove();
				}
			});

			$scope.book.$remove(function () {
				$location.path('books');
			});
		};

		// Update existing Book
		$scope.update = function () {
			var book = $scope.book;

			var description = this.splitDescription($scope.currentDesc);
			book.description = description.desc;
			book.descriptionTwo = description.descTwo; 

			book.$update(function () {
				$location.path('books/' + book._id);
			}, function (errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Set the show add to book shelf variable
		$scope.getShelfStatus = function () {
			$scope.showAddToShelf = angular.equals($scope.authentication.user.bookShelf.indexOf($scope.book._id), -1);
			
			console.log($scope.showAddToShelf);
		};

		// Toggle whether the books should appear in the user's shelf
		$scope.toggleAddToShelf = function () {
			var user = $scope.authentication.user;
			var bookId = $scope.book._id;

			var index = user.bookShelf.indexOf(bookId);
			console.log(user.bookShelf);
			if (!angular.equals(index, -1)) {
				$scope.showAddToShelf = true;
				user.bookShelf.splice(index, 1);
				$scope.updateUser();
				console.log('splicing');
				return;
			}
			
			$scope.showAddToShelf = false;
			user.bookShelf.push($scope.book._id);
			$scope.updateUser();
			console.log('pushing');
		};

		// Update the current user
		$scope.updateUser = function () {
			var user = Users.update($scope.user);

			user.$update(function() {
				
			}, function(response) {
				$scope.error = response.data.message;
			});
		};

		// Find a list of Books
		$scope.find = function () {
			$scope.books = Books.query();
		};

		// Find existing Book
		$scope.findOne = function () {
			$scope.book = Books.get({
				bookId: $stateParams.bookId
			});
		};

		// Search for a book
		$scope.bookSearch = function (book) {
			$location.path('books/' + book._id);
		};

        /**
         * Define data that will be used in a table.
         */
        $scope.initTable = function () {
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

        $scope.viewCharacter = function (characterId) {
        	$location.path('characters/' + characterId);
        };
	}
]);
