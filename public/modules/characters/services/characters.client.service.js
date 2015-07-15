'use strict';

angular.module('characters').factory('Characters', [
	function(resource) {
		return $resource('characters/:characterId', { characterId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);
