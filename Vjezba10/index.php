<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8"/>
    <title>
		<?php
			//Nema definicije tipa, ni deklaracije varijable
			//Ime varijable mora početi s "$";
			$title = "PZI - php";
			echo($title);
		?>
	</title>
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
            require_once("php/Slider.php");
            $slider = new Slider();
            echo($slider->getMainImageHTML());
          ?>
          <!--<img alt="picture" src="images/cetina.jpg"/>-->
          <i class="fa fa-chevron-circle-left slider-button" id="slider-go-left" aria-hidden="true"></i>
          <i class="fa fa-chevron-circle-right slider-button" id="slider-go-right" aria-hidden="true"></i>
        </div>
        <div id="thumbnails-container">
          <?php
            echo($slider->getThumbnailsHTML());
          ?>
        </div>
      </div>    
      <h1>Vježba 6 - jQuery</h1>
			<button id="add-card-button"> Add card </button>
      <div id="cards-container">
        <div class="spinner">
          <div class="double-bounce1"></div>
          <div class="double-bounce2"></div>
        </div>
      </div>
    </main>

    <footer>
      Copyright Ime i Prezime @FESB 2016 PZI
    </footer>
		
		<script type="text/html" id="card-template">
			<article class="card" data-id="{{id}}">
          <i class="fa fa-times delete-button"></i>
          <img src="{{imageUrl}}" alt="{{title}}"/>
          <h3>{{title}}</h3>
          <p>
						{{text}}
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
