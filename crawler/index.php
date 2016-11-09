<?php session_start(); ?>

<!DOCTYPE html>
<html>
<head>
  <title>Crawl for Ingredients</title>
</head>
<style type="text/css">
  * {
    text-align:center;
    padding: 5px;
  }
</style>
<body>

  <a href="/">Clear</a>

  <h1>Get my ingredients!</h1>

  <form action="index.php" method="post">
    How many recipes do you have? <input type="text" name="recipesNum" style="width: 20px;">
    <button type="submit" value="submit">recipe(s)</button>
    <br>(currently works for recipes from Food Network or AllRecipes)
  </form>
  <br>
  <form action="crawl.php" method="post">
    <?php for ($i = 1; $i <= $_POST['recipesNum']; $i++) { ?>
    <input type="text" name="foodurl-<?= $i ?>" style="width: 700px;"><br>
    <?php } ?>

    <?php if ($_POST['recipesNum']) { ?>
    <p><button type="submit" value="submit">Crawl it</button></p>
  </form>

  <ul style="list-style-type: none;">
    <li>http://www.foodnetwork.com/recipes/ree-drummond/roasted-thanksgiving-turkey-recipe.html</li>
    <li>http://www.foodnetwork.com/recipes/tyler-florence/the-ultimate-potato-gratin-recipe2.html</li>
    <li>http://www.foodnetwork.com/recipes/patrick-and-gina-neely/neelys-holiday-cornbread-stuffing-recipe.html</li>
    <li>http://www.foodnetwork.com/recipes/patrick-and-gina-neely/green-beans-and-bacon-recipe.html</li>
    <li>http://www.foodnetwork.com/recipes/food-network-kitchens/apple-pie-cupcakes.html</li>
  </ul>
  <?php } ?>

</body>
</html>