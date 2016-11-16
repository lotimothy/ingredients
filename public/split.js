

// Does not account for fluid ounces
var dictionary = ["gallon", "gallons", "pounds", "pound", "quarts", "quart", "cups", "cup", "pints", "pint", 
"tablespoon", "tablespoons", "ounces", "ounce"];
// var strings = "1 bay leaf"
// var strings = "1 bay leaf, with things after"

// var strings = "2 1/2 pounds golden creamer potatoes, peeled and cut into quarters";
// var strings = "2 1/2 pounds golden creamer potatoes";
// var strings = "3 tablespoons unsalted butter"
var strings = "Kosher salt and freshly ground black pepper, with notes";

var ingredients = [
	"1 cup bay leaf",
	"1 quart bay leaf, with things after",
	"2 1/2 pounds golden creamer potatoes",
	"14 ounces golden creamer potatoes",
	"Kosher salt and freshly ground black pepper, with notes",
	"Kosher salt and freshly ground black pepper"
];


function parseIngredient(ingredients) {
	var parsed = [];
	ingredients.forEach(function(strings){
		var objecta = {};
		if (!strings.match(/[0-9]/)) { // no number (or unit)
			objecta["num"] = 1;
			if(strings.includes(",")){ // has comment
				var item = strings.split(",");
				objecta["item"] = item[0];
				objecta["notes"] = item[1].trim();
			} else {
				objecta["item"] = strings; // no comment
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
					objecta["item"] = item[0];
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

// [ { num: 1, unit: "pound" item: "potato"} ]

// {
// 	potato: {}

// }

var prepped = parseIngredient(ingredients);
function combineIngredients(ingredients){
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
	console.log(result);


}
var first = { num: 4, unit: "cups"}
var second = { num: 10, unit: "quarts"}

function combineUnits(first, second){
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

// console.log(combineUnits(first, second));

combineIngredients(prepped);



// console.log("pounds".slice(0, 3))
