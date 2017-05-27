<?php
require_once("php/Card.php");
session_start();

class API {
	private static $email = "user@fesb.hr";
	private static $password = "password";

	public static function processRequest() {
		$action = API::getParametarValue("action");

		switch($action){
			case "isAuthenticated":
				return API::isAuthenticated();
			case "login":
					return API::login();
			case "logout":
					return API::logout();

			case "getCards":
				return API::getCards();
			case "deleteCard":
				return API::deleteCard();
			case "addCard":
				return API::addCard();
			default:
				return "Unknown action!";
		}
	}

	private static function isAuthenticated(){
		return json_encode(array(
			"isAuthenticated" => API::isLoggedIn()
		));
	}

	private static function login(){
		/*CHECK EMAIL AND PASSWORD AND IF IS CORRECT GRANT ACCESS*/
		$email = API::getParametarValue("email");
		$password = API::getParametarValue("password");
		
		if($email == API::$email && $password == API::$password) {
			$_SESSION["email"] = $email;
		}

		return json_encode(array(
			"isAuthenticated" => API::isLoggedIn()
		));
	}

	private static function logout(){
		/* REVOKE ACCESS */
		session_unregister("email");
		session_destroy();
		
		return json_encode(array(
			"logout" => true
		));
	}

	private static function isLoggedIn(){
		//CHECK IS USER LOGGED IN
		return isset($_SESSION['email']);
	}

	private static function getCards(){
		return json_encode(Card::getCards());
	}

	private static function deleteCard(){
		if(!API::isLoggedIn()){
			return json_encode(array(
				"success" => false
			));
		}

		$id = API::getParametarValue("id");
		if($id != ""){
			Card::deleteCard($id);
			return json_encode(array(
				"success" => true
			));
		}
		else {
			API::sendErrorAndDie("deleteCards needs an id");
		}
	}

	private static function addCard(){
		if(!API::isLoggedIn()){
			return json_encode(array(
				"message" => "idk",
				"success" => false
			));
		}

		$title = API::getParametarValue("title");
		$imageUrl = API::getParametarValue("imageUrl");
		$text = API::getParametarValue("text");

		try {
			return json_encode(array(
				"id" => Card::addCard($title, $imageUrl, $text),
				"success" => true
			));
		}
		catch(Exception $e){
			API::sendErrorAndDie("Failed when adding a card: $e");
		}
	}

	public static function sendErrorAndDie($message){
		header("HTTP/1.1 400 Invalid Request");

		die(json_encode(array(
			"message" => $message
		)));
	}

	private static function getParametarValue($key){
		return isset($_REQUEST[$key]) ? $_REQUEST[$key] : "";
	}
}

echo(API::processRequest());
