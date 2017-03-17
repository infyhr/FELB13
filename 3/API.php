<?php
class API {
    public $request, $PDO;
    
    public function __construct() {
        // Database connection first.
        //$this->PDO = new PDO('mysql:host=localhost;dbname=domaci;charset=utf8', 'root', '', array(
        $this->PDO = new PDO('mysql:host=localhost;dbname=BeovicToni;charset=utf8', 'BeovicToni', 'BeovicToni1', array(
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ));
        $this->PDO->exec("SET names utf8;SET character_set_results=utf8;SET character_set_client=utf8"); // old PHP version
    }

    public function __handlerouting() {
        $this->request = isset($_GET['r']) ? htmlspecialchars($_GET['r']) : NULL;
        if(!$this->request)
            throw new Exception('No action specified.');

        // Check against the whitelist
        $whitelist = array('getItems', 'updateRating', 'addImage');
        if(!in_array($this->request, $whitelist))
            throw new Exception('Request action unknown.');

        // Now call the actual method.
        $this->{$this->request}();
    }

    public function getCardsHTML() {
        $cards = $this->PDO->query('SELECT * FROM images')->fetchAll();
        $out   = '';
        foreach($cards as $card) {
            $out .= sprintf('
                <article>
                    <i class="fa fa-times" aria-hidden="true"></i>
                    <img src="%s" alt="%s">
                    <div class="img-desc">
                        <h3>%s</h3>
                        <button type="button">Read more</button>
                    </div>
                </article>
            ', $card['url'], $card['name'], $card['name']);
        }

        return $out;
    }

    public function getFirstSlideHTML() {
        $slide = $this->PDO->query('SELECT * FROM items WHERE id = 1')->fetch();
        $htmlRating = '';

        for($i = 0; $i < $slide['grade']; $i++) $htmlRating .= '<i class="fa fa-star"   aria-hidden="true"></i>';
        for($i = $slide['grade']; $i < 5; $i++) $htmlRating .= '<i class="fa fa-star-o" aria-hidden="true"></i>';

        return sprintf('
            <div id="desc">
                <h2>%s</h2>
                <p>%s</p>
                <div id="buttons">
                    <button id="edit" type="button">Edit</button>
                    <button type="button">Add a new image</button>
                </div>
            </div>
            <div id="image">
                <img src="%s" alt="%s">
                <div id="rating">
                    %s
                </div>
            </div>
            <div id="arrow-left">
                <i class="fa fa-arrow-circle-left arrow-nav" aria-hidden="true"></i>
            </div>
            <div id="arrow-right">
                <i class="fa fa-arrow-circle-right arrow-nav" aria-hidden="true"></i>
            </div>
        ', $slide['title'], $slide['description'], $slide['url'], $slide['title'], $htmlRating);
    }

    private function updateRating() {
        if($_SERVER['REQUEST_METHOD'] !== 'POST')
            throw new Exception('Invalid request method for the specified action.');

        // Retrieve the new rating from the URI & the title itself.
        $title    = isset($_POST['title']) ? htmlspecialchars($_POST['title']) : NULL;
        $newGrade = (isset($_POST['grade']) && is_numeric($_POST['grade'])) ? $_POST['grade'] : NULL;
        if($newGrade > 5 || $newGrade < 0) $newGrade = 0;

        // Have we got both?
        if(!$title || !$newGrade) throw new Exception('Missing arguments.');

        // Update.
        $this->PDO->prepare('UPDATE items SET grade = ? WHERE title = ?')
                  ->execute(array($newGrade, $title));
    }

    private function addImage() {
        if($_SERVER['REQUEST_METHOD'] !== 'POST')
            throw new Exception('Invalid request method for the specified action.');

        // Retrieve all the needed data
        $name = isset($_POST['name']) ? htmlspecialchars($_POST['name']) : NULL;
        $url  = isset($_POST['url']) ? htmlspecialchars($_POST['url'])   : NULL;

        // Have we got both here?
        if(!$name || !$url) throw new Exception('Missing arguments.');

        // Insert, I guess.
        $this->PDO->prepare('INSERT INTO images (name, url) VALUES (?, ?)')
                  ->execute(array($name, $url));
    }

    private function getItems() {
        echo json_encode($this->PDO->query('SELECT * FROM items')->fetchAll());
    }
}

try {
    $API = new API();
    if(!defined('INDEX')) $API->__handlerouting();
}catch(Exception $e) {
    header('HTTP/1.1 400 Bad Request');
    printf('<h1>Error</h1><p>There has been an error in your request: %s</p>', $e->getMessage());
}