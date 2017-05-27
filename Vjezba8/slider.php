<?php

class Thumbnail {
	public $thumbnailImagePath;
	public $largeImagePath;
	
	public function __construct($thumbnailImagePath, $largeImagePath) {
		$this->thumbnailImagePath = $thumbnailImagePath;
		$this->largeImagePath 	  = $largeImagePath;
	}
}

class Slider {
	public $mainThumbnail;
	public $thumbnails;
	
	public function __construct() {
		$this->thumbnails = array();
		
		//images/thumbnails/kozjak.jpg
		//images/kozjak.jpg	
		foreach(array("kozjak", "cetina", "sibenik", "primosten", "svilaja") as $entity) {
			//$this->thumbnails[] = new Thumbnail('images/thumbnails/' . $entity . '.jpg', 'images/' . $entity . '.jpg');
			$this->thumbnails[] = new Thumbnail(
				sprintf('images/thumbnails/%s.jpg', $entity),
				sprintf('images/%s.jpg', $entity)
			);
		}
		
		//var_dump($this->thumbnails);
		
		$this->mainThumbnail = $this->thumbnails[0];
	}
	
	public function generateMainImageHTML() {
		return '<img alt="picture" src="' . $this->mainThumbnail->largeImagePath . '"/>';
	}
	
	public function generateThumbnailsHTML() {
		$out = "";
		
		foreach($this->thumbnails as $thumbnail) {
			$out .= '<div class="thumbnail selected" data-large-image="' . $thumbnail->largeImagePath . '">
						<img src="' . $thumbnail->thumbnailImagePath . '"/>
					</div>';
		}
		
		return $out;
	}
}

?>