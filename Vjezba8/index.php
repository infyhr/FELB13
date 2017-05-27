<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8"/>
    <title><?php echo "PZI - vjezba 8 aaa"; ?></title>
    <link rel="stylesheet" href="styles/font-awesome.min.css"/>
    <link rel="stylesheet" href="styles/style.css"/>
  </head>

  <body>
    <header>
      <label>Vježba 7</label>
	  <label>PZI</label>
      <div id="search-container">
        <i class="fa fa-search search-icon"></i>
        <input type="text" id="search-box" placeholder="search"/>
      </div>
    </header>

    <main>
      <nav>
        <div class="logo-container">
          <img src="images/fesb-logo.png"/>
        </div>
        <div class="links-container">
            <a href="#">Vježba 1</a>
            <a href="#">Vježba 2</a>
            <a href="#">Vježba 3</a>
						<a href="#">Vježba 4</a>
            <a href="#">Vježba 5</a>
						<a href="#">Vježba 6</a>
            <a href="#" class="selected">Vježba 7</a>
        </div>
      </nav>
      <div id="slider">
        <div id="main-picture-container">
		  <?php 
			  require_once "slider.php";
			  $slider = new Slider();
			  echo $slider->generateMainImageHTML();
		  ?>
          <!--<img alt="picture" src="images/cetina.jpg"/>-->
          <i class="fa fa-chevron-circle-left slider-button" id="slider-go-left" aria-hidden="true"></i>
          <i class="fa fa-chevron-circle-right slider-button" id="slider-go-right" aria-hidden="true"></i>
        </div>
        <div id="thumbnails-container">
		<?php
			echo $slider->generateThumbnailsHTML();
		?>
		<!--
          <div class="thumbnail selected" data-large-image="images/cetina.jpg">
            <img src="images/thumbnails/cetina.jpg"/>
          </div>
          <div class="thumbnail" data-large-image="images/kozjak.jpg">
            <img src="images/thumbnails/kozjak.jpg"/>
          </div>
          <div class="thumbnail" data-large-image="images/sibenik.jpg">
            <img src="images/thumbnails/sibenik.jpg"/>
          </div>
          <div class="thumbnail" data-large-image="images/primosten.jpg">
            <img src="images/thumbnails/primosten.jpg"/>
          </div>
          <div class="thumbnail" data-large-image="images/svilaja.jpg">
            <img src="images/thumbnails/svilaja.jpg"/>
          </div>-->
        </div>
      </div>
						
      <h1>Vježba 6 - jQuery</h1>
			<button id="add-card-button"> Add card </button>
      <div id="cards-container">
				
      </div>
    </main>

    <footer>
      Copyright Ime i Prezime @FESB 2016 PZI
    </footer>
		
		<script type="text/html" id="card-template">
			<article class="card">
          <i class="fa fa-times delete-button"></i>
          <img src="{{cardImageUrl}}" alt="{{cardTitle}}"/>
          <h3>{{cardTitle}}</h3>
          <p>
						{{cardText}}
          </p>
          <i class="fa fa-plus add-button"></i>
			</article>
		</script>
		
    <script src="scripts/vendor/jquery-3.1.1.min.js"></script>
		<script src="scripts/vendor/mustache.min.js"></script>
		<script src="scripts/slider.js"></script>
		<script src="scripts/cards.js"></script>
  </body>
</html>
