/**
	Copyright (c) 2015 Brady St. John
	This program is released under The MIT License (MIT).
	Please see the file COPYING in this distribution for
	license terms.
*/

'use strict';

/**
 * Books service used to communicate Books REST endpoints
 */
angular.module('books').factory('Books', ['$resource',
	function($resource) {
		return $resource('books/:bookId', { bookId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
