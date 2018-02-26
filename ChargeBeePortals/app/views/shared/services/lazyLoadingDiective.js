/**
 *  To acheive lazy loading by monitoring element scroll stlyes
 *  @diretive whenScrolled
 *  @params null 
 */
cbPortal.directive("whenScrolled", function () {
    return{
        restrict: 'A',
        link: function (scope, elem, attrs) {
            raw = elem[0];
			angular.element(raw).bind('scroll', function() {
			if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
				if(scope.loaded)return;
				scope.$apply(attrs.whenScrolled); // Calling callback function passed as attribute
			}
		});
	
     }	
	};
});

