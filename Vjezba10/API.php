<?php

require_once("php/Card.php");

class API {
	//API.php?action=deleteCard&id=1
	//API.php?action=getCards
	//API.php?action=addCard&title=Naslov&imageUrl=..&text=..
	public static function processRequest() {
		$action = API::getParametarValue("action");
		
		switch($action){
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

	private static function getCards(){
		return json_encode(Card::getCards());
	}

	private static function deleteCard(){
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
		$title = API::getParametarValue("title");
		$imageUrl = API::getParametarValue("imageUrl");
		$text = API::getParametarValue("text");

		try {
			return json_encode(array(
				"id" => Card::addCard($title, $imageUrl, $text)
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