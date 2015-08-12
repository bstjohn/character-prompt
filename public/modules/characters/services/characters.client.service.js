/**
    Copyright (c) 2015 Brady St. John
    This program is released under The MIT License (MIT).
    Please see the file COPYING in this distribution for
    license terms.
*/
'use strict';

/**
 * Characters service used to communicate Characters REST endpoints
 */
angular.module('characters').factory('Characters', ['$resource',
	function($resource) {
		return $resource('characters/:characterId', { characterId: '@_id'
        }, {
            update: {
                method: 'PUT'
            },
            querySome: {
                method:'GET',
                params: {
                    book: 'bookId'
                },
                isArray:true
            }
        });
    }
]);
