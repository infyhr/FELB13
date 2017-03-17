<?php
define('INDEX', 1);
require_once './API.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="Prvi domaći rad iz PZI.">
    <meta name="author" content="Toni Beović">
    <link rel="icon" href="favicon.ico?">

    <title>Android</title>

    <link href="css/style.css" rel="stylesheet">
    <link href="css/font-awesome.min.css" rel="stylesheet">
</head>

<body>

    <header>
        <div id="links-container">
            <a href="#" class="active">Phones</a>
            <a href="#">Tablets</a>
            <a href="#">Wear</a>
            <a href="#">TV</a>
        </div>
    </header>

    <main>
        <div class="container">
            <div id="intro">
                <h1>Android</h1>
                <h2>Be together, not the same</h2>
            </div>

            <div id="user">
                <a href="#"><i class="fa fa-fw fa-user" aria-hidden="true"></i>Sign up</a>
                <a href="#">Log in</a>
            </div>
            <div id="panel">
                <h3>Here be dragons! Keep in mind this page is a work in progress for the new Android devices showcase!</h3>
            </div>

            <div id="carousel">
                <?php echo $API->getFirstSlideHTML(); ?>
            </div>

            <div id="images">
                <?php echo $API->getCardsHTML(); ?>
            </div>

            <div id="add-image">
                <button>Add a new image</button>
            </div>
        </div>

        <footer>
            <div id="footer-icons">
                <a href="#"><i class="fa fa-facebook-official" aria-hidden="true"></i></a>
                <a href="#"><i class="fa fa-twitter-square" aria-hidden="true"></i></a>
            </div>

            <div id="footer-text">
            All rights reserved<br>
            <span>Toni Beović</span>
            </div>

            <div id="footer-links">
                <a href="https://www.google.com/">Google.com</a>
                <a href="https://abc.xyz/">Alphabet</a>
            </div>
        </footer>
    </main>

    <script type="text/html" id="slide-template">
        <div id="desc">
            <h2>{{title}}</h2>
            <p>{{description}}</p>
            <div id="buttons">
                <button id="edit" type="button">Edit</button>
                <button type="button">Add a new image</button>
            </div>
        </div>
        <div id="image">
            <img src="{{url}}" alt="{{title}}">
            <div id="rating">
                {{{htmlRating}}}
            </div>
        </div>
        <div id="arrow-left">
            <i class="fa fa-arrow-circle-left arrow-nav" aria-hidden="true"></i>
        </div>
        <div id="arrow-right">
            <i class="fa fa-arrow-circle-right arrow-nav" aria-hidden="true"></i>
        </div>
    </script>
    <script type="text/html" id="card-template">
        <article>
            <i class="fa fa-times" aria-hidden="true"></i>
            <img src="{{imagePath}}" alt="{{title}}">
            <div class="img-desc">
                <h3>{{title}}</h3>
                <button type="button">Read more</button>
            </div>
        </article>
    </script>

    <script src="scripts/jquery-3.1.1.min.js"></script>
    <script src="scripts/mustache.min.js"></script>
    <script src="scripts/slider.js"></script>
    <script src="scripts/cards.js"></script>
</body>

</html>
