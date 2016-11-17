<!DOCTYPE html>
<html>

<head> 
	<meta charset="UTF-8"/>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Ingredients</title>
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
	<link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/themes/hot-sneaks/jquery-ui.css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.7/css/materialize.min.css">
	<link rel="stylesheet" href="assets/stylesheets/style.css">
	<script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular-route.js"></script>
	<script src="assets/js/app.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.7/js/materialize.min.js"></script>
</head>

<body ng-app="recipes">
	<div class="container" ng-controller="ingredientsController">
		<div ng-view></div>
		<h4> How many recipes do you have? </h4>
		<div class="input-field">
			<input type="text"id="numRecipes" ng-model="numRecipes">
			<label for="numRecipes">How many recipes do you have?</label>
		</div>
		<a ng-click="addUrls()" class="btn waves-effect waves-light center-align">Submit</a>
		<form ng-submit="get()">
			<div id="siteEntry">
			</div>
			<button class="btn waves-effect waves-light center-align" type="submit">Crawl It</button>
		</form>
	</div>
</body>

</html>