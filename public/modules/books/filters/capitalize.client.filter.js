'use strict';

angular.module('books').filter('capitalize', [
	function() {
		return function(input, allWords) {
			if (angular.isUndefined(input) || input === null) {
                return '';
			}

            if (allWords) {
                return input.replace(
                    /([^\W_]+[^\s-]*) */g,
                    function(txt) {
                        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                    }
                );
            }

            return input.charAt(0).toUpperCase() + input.substr(1).toLowerCase();
		};
	}
]).filter('properCase', [
    function() {
        return function(input) {
            if (angular.isUndefined(input) || input === null) {
                return '';
            }
            
            return input.replace(/([^\W_]+[^\s-]*) */g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
        };
    }
]);
