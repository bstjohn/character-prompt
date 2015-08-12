/**
    Copyright (c) 2015 Brady St. John
    This program is released under The MIT License (MIT).
    Please see the file COPYING in this distribution for
    license terms.
*/
'use strict';

/**
 * The books route
 */
angular.module('books').config(['$stateProvider',
    function($stateProvider) {
        // Books state routing
        $stateProvider.
            state('listBooks', {
                url: '/books',
                templateUrl: 'modules/books/views/books.client.view.html'
            }).
            state('createBook', {
                url: '/books/create',
                templateUrl: 'modules/books/views/create-book.client.view.html'
            }).
            state('viewBook', {
                url: '/books/:bookId',
                templateUrl: 'modules/books/views/view-book.client.view.html'
            }).
            state('editBook', {
                url: '/books/:bookId/edit',
                templateUrl: 'modules/books/views/edit-book.client.view.html'
            });
    }
]);
