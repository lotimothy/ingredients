<?php session_start(); ?>
<?php include_once("simple_html_dom.php"); ?>

<p><a href="/">Go back</a></p>

<?php
foreach ($_POST as $recipe) {
  $html = new simple_html_dom();
  $html->load_file($recipe);
  foreach($html->find('h1[itemprop="name"]') as $title) { echo "<a href=" . $recipe . " target='_blank'>" . $title. "</a><p>";}
  foreach($html->find('*[itemprop="ingredients"]') as $element) { echo $element. '<br>';}
}
?>