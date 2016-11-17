<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Users extends CI_Controller {

	public function __construct() {
		parent::__construct();
	}

	public function index() {
		$this->load->view('users_index');
	}

	public function crawl() {
		ini_set('include_path', APPPATH.'libraries/');
		$this->load->library("simple_html_dom");
		$recipes = $this->input->post();
		$result = array();
		foreach($recipes as $recipe) {
			$html = new simple_html_dom();
			$html->load_file($recipe);
			$container = array();
			foreach($html->find('h1[itemprop="name"]') as $title) {
				$container["title"] = $title->innertext;
			}
			$ingredients = array();
			foreach($html->find('*[itemprop="ingredients"]') as $element) { 
				array_push($ingredients, $element->innertext);
			}
			$container["ingredients"] = $ingredients;
			array_push($result, $container);
		}
		echo json_encode($result);
		// $this->load->view('recipes', array('result' => $result));
	}

	public function recipes() {
	}
}