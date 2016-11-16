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

	var parseIngredient = function(ingredients) {
		var dictionary = ["gallon", "gallons", "pounds", "pound", "quarts", "quart", "cups", "cup", "pints", "pint", 
"tablespoon", "tablespoons", "teaspoon", "teaspoons", "ounces", "ounce"];
		var parsed = [];
		ingredients.forEach(function(strings){
			var objecta = {};
			if (!strings.match(/[0-9]/)) { // no number (or unit)
				objecta["num"] = 1;
				if(strings.includes(",")){ // has comment
					var item = strings.split(",");
					objecta["item"] = item[0].trim();
					objecta["notes"] = item[1].trim();
				} else {
					objecta["item"] = strings.trim(); // no comment
				}
			} else { // has number
				var stringArray = strings.split(/( \D.+)/)
				if (stringArray[0].includes("/")){
					var number = stringArray[0].split(" ");
					if (number.length == 2) {
						objecta["num"] = parseInt(number[0]) + eval(number[1]);
					} else {
						objecta["num"] = eval(number[0]);
					}
				} else {
					objecta["num"] = parseInt(stringArray[0]);
				}
				var unit = stringArray[1].trim().split(/( .+)/);
				if (dictionary.includes(unit[0])) { // has unit
					objecta["unit"] = unit[0];
					if (unit[1].includes(",")) { // has note
						var item = unit[1].trim().split(",");
						objecta["item"] = item[0];
						objecta["notes"] = item[1].trim();
					} else { // no note
						objecta["item"] = unit[1].trim();
					}
				} else { // no unit
					if (stringArray[1].includes(",")) { //has note
						var item = stringArray[1].trim().split(",")
						objecta["item"] = item[0].trim();
						objecta["notes"] = item[1].trim();
					} else { // no note
						objecta["item"] = stringArray[1].trim();
					}
				}
			}
			parsed.push(objecta);
		});
	// console.log(parsed);
	return parsed;
	}

	var combineIngredients = function(ingredients) {
		var result = {}
		ingredients.forEach(function(ingredient){
			if (!result.hasOwnProperty(ingredient["item"])) {
				result[ingredient["item"]] = ingredient;
			} else {
				if (result[ingredient["item"]]["unit"]) {
					if (result[ingredient["item"]]["unit"].slice(0, 3) == ingredient["unit"].slice(0, 3)) {
						result[ingredient["item"]]["num"]+=ingredient["num"];
					} else {

						var first = { num: result[ingredient["item"]]["num"], unit: result[ingredient["item"]]["unit"]}
						var second = {num: ingredient["num"], unit: ingredient["unit"]}
						var combined = combineUnits(first, second);
						result[ingredient["item"]]["num"] = combined["num"];
						result[ingredient["item"]]["unit"] = combined["unit"];

					}
				} else {
					result[ingredient["item"]]["num"]+=ingredient["num"]
				}
			}
		}) 
		return result;
	}
	
	var combineUnits = function(first, second) {
		// var volume = ["tea", "tab", "cup"];
		var liquids = ["tea", "tab", "cup", "pin", "qua", "gal"];
		var weight = ["pou", "oun"];

		if (weight.includes(first["unit"].slice(0,3))) {
			var firstNum = first["num"];
			var secondNum = second["num"];
			if (first["unit"].slice(0,3) == "oun") {
				firstNum = firstNum/16;
			} 
			if (second["unit"].slice(0,3) == "oun") {
				secondNum = secondNum/16;
			}
			return { num: firstNum + secondNum, unit: "pounds"}

		} else if (liquids.includes(first["unit"].slice(0,3))) {
			var firstNum = first["num"];
			var secondNum = second["num"];
			if (liquids.indexOf(first["unit"].slice(0,3)) > liquids.indexOf(second["unit"].slice(0,3))) {
				var convertingUnit = first["unit"].slice(0,3);
				var same = first;
				var toConvert = second;
			}  else {
				var convertingUnit = second["unit"].slice(0,3);
				var same = second;
				var toConvert = first;
			}

			if (convertingUnit == "gal") {
				if (toConvert["unit"].slice(0,3) == "qua") {
					toConvert["num"] = toConvert["num"]/4
				} else if (toConvert["unit"].slice(0,3) == "pin") {
					toConvert["num"] = toConvert["num"]/8
				}  else if (toConvert["unit"].slice(0,3) == "cup") {
					toConvert["num"] = toConvert["num"]/16
				} else if (toConvert["unit"].slice(0,3) == "tab") {
					toConvert["num"] = toConvert["num"]/256 
				} else if (toConvert["unit"].slice(0,3) == "tea") {
					toConvert["num"] = toConvert["num"]/768 
				} 
			} else if (convertingUnit == "qua") {
				if (toConvert["unit"].slice(0,3) == "pin") {
					toConvert["num"] = toConvert["num"]/2
				}  else if (toConvert["unit"].slice(0,3) == "cup") {
					toConvert["num"] = toConvert["num"]/4
				} else if (toConvert["unit"].slice(0,3) == "tab") {
					toConvert["num"] = toConvert["num"]/128 
				} else if (toConvert["unit"].slice(0,3) == "tea") {
					toConvert["num"] = toConvert["num"]/384 
				} 

			} else if (convertingUnit == "pin") {
				if (toConvert["unit"].slice(0,3) == "cup") {
					toConvert["num"] = toConvert["num"]/2
				} else if (toConvert["unit"].slice(0,3) == "tab") {
					toConvert["num"] = toConvert["num"]/32 
				} else if (toConvert["unit"].slice(0,3) == "tea") {
					toConvert["num"] = toConvert["num"]/96
				} 
			} else if (convertingUnit == "cup") {
				if (toConvert["unit"].slice(0,3) == "tab") {
					toConvert["num"] = toConvert["num"]/16 
				} else if (toConvert["unit"].slice(0,3) == "tea") {
					toConvert["num"] = toConvert["num"]/48 
				} 

			} else if (convertingUnit == "tab") {
				if (toConvert["unit"].slice(0,3) == "tea") {
					toConvert["num"] = toConvert["num"]/3 
				} 
			}
			return {num: same["num"] + toConvert["num"], unit: same["unit"]}
		} else {


		}

		// gallons, quarts, cups, pints

		// pounds ounces

		// tablespoons/teaspoons/cups

	}
	factory.index = function(callback){
		$http.get('/crawl').then(function(data){
			callback(data);
		})
	}
	factory.retrieveIngredients = function(urls, callback){
		$http.post('/crawl', urls).then(function(data){
			var allRecipes = data.data;
			var allIngredients = [];
			allRecipes.forEach(function(recipe){
				allIngredients.push(parseIngredient(recipe.ingredients))
			})
			allIngredients = [].concat.apply([], allIngredients);
			allIngredients = combineIngredients(allIngredients);
			console.log(allIngredients);






			callback(data.data);
		})
	}
	return factory;
})
app.controller("ingredientsController", function($scope, $compile, ingredientFactory){
	console.log("this is where the controller starts");
	$scope.ingredients = [];

	$scope.addUrls = function() {
		$('#siteEntry').html("");
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
