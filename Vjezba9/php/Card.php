<?php

require_once "DatabaseAccess.php";

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
	
	public static function getAllCards() {
		// username: PrezimeIme, password: PrezimeIme1
		$dbAccess = new DatabaseAccess("localhost", "JosipMarasDB", "Josip.Maras", "Josip.Maras1");
		
		$rows = $dbAccess->executeQuery("SELECT * FROM `Cards`");
		$cards = array();
		
		foreach($rows as $row) {
			$cards[] = new Card($row[0], $row[1], $row[2], $row[3]);
		}
		
		return $cards;
	}
}

?>