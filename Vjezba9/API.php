<?php

require_once "php/Card.php";

class API {
	public static function processRequest() {
		$action = API::getParameterValue("action");
		
		switch($action) {
			case "getCards":
				#return "Request for getting cards";
				return json_encode(Card::getAllCards());
			break;
			case "deleteCard":
				return "Request for deleting card";
			break;
			default:
				return API::sendErrorAndDie("Unknown: " . $action . " blabla");
			break;
		}
	}
	
	private static function sendErrorAndDie($message) {
		header("HTTP/1.1 400 Invalid Request");
		
		die(json_encode(array(
			"success" => false,
			"message" => $message
		)));
	}
	
	private static function getParameterValue($key) {
		return isset($_GET[$key]) ? $_GET[$key] : NULL;
	}
}

echo API::processRequest();
#phpinfo();