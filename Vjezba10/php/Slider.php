<?php

//Thumbnail: largeImagePath, smallImagePath
class Thumbnail {
	public $largeImagePath;
	public $smallImagePath;
	
	function __construct($largeImagePath, $smallImagePath){
		//Pristup svojstvu instance
		$this->largeImagePath = $largeImagePath;
		$this->smallImagePath = $smallImagePath;
	}
}


class Slider { //class pa ime klase (koje nema $)
	public $thumbnails; //property klase - modifikator pristupa pa $imeSvojstva
	public $selectedThumbnail;
	
	public function __construct(){ //Definiranje konstruktora klase!
		$this->thumbnails = array(); //Stvori prazan niz!
		
		//dodaj vrijednost s desne strane na kraj niza s lijeve
		$this->thumbnails[] = new Thumbnail("images/kozjak.jpg", "images/thumbnails/kozjak.jpg");
		$this->thumbnails[] = new Thumbnail("images/primosten.jpg", "images/thumbnails/primosten.jpg");
		$this->thumbnails[] = new Thumbnail("images/sibenik.jpg", "images/thumbnails/sibenik.jpg");
		$this->thumbnails[] = new Thumbnail("images/cetina.jpg", "images/thumbnails/cetina.jpg");
		$this->thumbnails[] = new Thumbnail("images/svilaja.jpg", "images/thumbnails/svilaja.jpg");
		
		$this->selectedThumbnail = $this->thumbnails[0];
	}
	
	//public metode klase
	public function getMainImageHTML(){
		$largeImage = $this->selectedThumbnail->largeImagePath;
		return "<img alt='picture' src='$largeImage'/>";
	}
	
	public function getThumbnailsHTML(){
		$html = "";
		
		foreach($this->thumbnails as $thumbnail){
			$largeImage = $thumbnail->largeImagePath;
			$smallImage = $thumbnail->smallImagePath;
			//varijable možemo direktno ugraditi u "" string
			//interpolacija stringova!
			
			$selectedClass = $thumbnail == $this->selectedThumbnail ? "selected" : "";
			
			$html .= "<div class='thumbnail $selectedClass' data-large-image='$largeImage'>
						<img src='$smallImage'/>
					 </div>";
		}
		
		return $html;
	}
}























