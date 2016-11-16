<!DOCTYPE html>
<html>
<head> 
	<meta charset="UTF-8"/>
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<title></title>
	<!-- Google Icons -->
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

	<!-- Jquery Theme -->
	<link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/themes/hot-sneaks/jquery-ui.css">
	<!-- Materialize CSS -->
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.7/css/materialize.min.css">
	<!-- Personal CSS -->
	<link rel="stylesheet" href="assets/stylesheets/style.css">
 

	<!-- Jquery --> 
    <script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
         <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular-route.js"></script>
	<script src="assets/js/app.js"></script>

    <!-- Materialize JS -->
	<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.7/js/materialize.min.js"></script>

 
</head>
<body ng-app="recipes">
<div class="container" ng-controller="ingredientsController">
<ul>
	<li ng-repeat="thing in ingredients">
	{{thing.title}}
	<ul>
		<li ng-repeat="ingredient in thing.ingredients">{{ingredient}} </li>
	</ul>
	</li>
</ul>
	<a href="#/show_ingredients">Show Ingredients</a>
	<div ng-view></div>
<h4> How many recipes do you have? </h4>
<div class="input-field">
	<input type="text"id="numRecipes" ng-model="numRecipes">
	<label for="numRecipes">How many recipes do you have?</label>
</div>
<a ng-click="addUrls()" class="btn waves-effect waves-light center-align">Submit</a>
<form id="siteEntry" ng-submit="get()">
	<div class="input-field">
	</div>
	<button class="btn waves-effect waves-light center-align" type="submit">Crawl It</button>
</form>
</div>


	<script>
			// $('a').click(function(){
			// 	var numRecipes = $('#numRecipes').val();
			// 	for (var i = numRecipes; i > 0; i--) {
			// 		$('#siteEntry').prepend('<div class="input-field">\n' + 
			// 									'<input class="fields" type="text" ng-model="urls">\n' + 
			// 									'<label for="test">Recipe #' + i + '</label>\n' +
			// 									'</div>');
			// 	}
			// })

	</script>
</body>

</html>