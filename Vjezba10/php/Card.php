<?php

require_once("DatabaseAccess.php");

class Card {
	public $id;
	public $title;
	public $imageUrl;
	public $text;
	
	public function __construct($id, $title, $imageUrl, $text) {
		$this->id = $id;
		$this->title = $title;
		$this->imageUrl = $imageUrl;
		$this->text = $text;
	}
	
	public static function getCards(){
		$cards = array();
		$dbAccess = Card::getDbAccess();
		
		$rows = $dbAccess->executeQuery("SELECT * FROM Cards;");
		
		foreach($rows as $row){
			$cards[] = new Card($row[0], $row[1], $row[2], $row[3]);
		}
		
		return $cards;
	}
	
	public static function deleteCard($id){
		$dbAccess = Card::getDbAccess();
		
		$dbAccess->executeQuery("DELETE FROM Cards WHERE ID='$id';");
	}

	public static function addCard($title, $imageUrl, $text){
		$dbAccess = Card::getDbAccess();
		
		$dbAccess->executeQuery("INSERT INTO Cards (Title, ImageUrl, Text) VALUES ('$title', '$imageUrl', '$text');");
		$rows = $dbAccess->executeQuery("SELECT MAX(ID) FROM Cards;");
		
		return $rows[0][0];
	}
	
	private static function getDbAccess(){
		return new DatabaseAccess(
			"localhost",  //lokacija do DB servera
			"BeovicToni", //Ime baze PrezimeIme
			"BeovicToni", //username PrezimeIme
			"BeovicToni1" //password PrezimeIme1
		);
	}
}








