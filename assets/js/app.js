var app = angular.module('recipes', ['ngRoute']);
app.config(function($httpProvider, $routeProvider){
	$routeProvider
		.when("/show_ingredients", {
			templateUrl: "/public/partials/show_ingredients.html"
		})
	$httpProvider.defaults.transformRequest = function(data) {        
       	if (data === undefined) { return data; } 
       	return $.param(data);
    	};
    	$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
})
app.factory("ingredientFactory", function($http){
	var factory = {};
	factory.index = function(callback){
		$http.get('/crawl').then(function(data){
			callback(data);
		})
	}
	factory.retrieveIngredients = function(urls, callback){
		$http.post('/crawl', urls).then(function(data){
			console.log(data.data);
			callback(data.data);
		})
	}
	return factory;
})
app.controller("ingredientsController", function($scope, $compile, ingredientFactory){
	console.log("this is where the controller starts");
	$scope.ingredients = [];

	$scope.addUrls = function() {
		for (var i = $scope.numRecipes; i > 0; i--) {
			var $html = $('<div class="input-field">\n' + 
						  `<input class="fields" type="text" ng-model="urls[${i}]">\n` + 
						  `<label for="test">Recipe #${i}</label>\n` +
						  '</div>').prependTo('#siteEntry');
			$compile($html)($scope);
		}
	}

	$scope.get = function(){
		ingredientFactory.retrieveIngredients($scope.urls, function(data){
			 
			$scope.ingredients = data;
			console.log("inside of get function", $scope.ingredients);
		})
		console.log("outside of get function", $scope.ingredients);
	}

})
