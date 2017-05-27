$(document).ready(function(){
  const cards = [{
    cardImageUrl: "images/newsHeadings/cetina.jpg",
    cardTitle: "Cetina",
    cardText: `
      Cetina izvire na nadmorskoj visini od 385 m 
      u sjeverozapadnim obroncima Dinare blizu sela Cetina, 
      7 km sjeverno od Vrlike, a po kojem je rijeka i dobila ime.
      Izvor Cetine je jezero duboko preko stotinu metara.

      Blizu Vrlike se nalazi Peručko jezero, umjetno stvoreno branom 
      na Cetini 25 km nizvodno. Nakon jezera rijeka prolazi krškim područjem 
      i Sinjskim poljem prema gradu Sinju. Cetina pod Gardunom, kod grada Trilja, 
      napušta Sinjsko polje, ulazi u kanjon te teče prema jugu. Nad kanjonom je 
      utvrda Nutjak. Obale su u kanjonu bliže i više, a rijeka duboka i spora. 
      Nekad je voda brzo tekla i okretala brojne mlinove, ali su je brane usporile.`
  }, {
    cardImageUrl: "images/newsHeadings/kozjak.jpg",
    cardTitle: "Kozjak",
    cardText: `
      Kozjak je planina koja sa sjeverne strane okružuje grad Kaštela.
      Njegova je južna padina vrlo strma i klisurasta, a sjeverni kameniti
      obronci postupno prelaze u valovitu visoravan Dalmatinske Zagore.

      To je u hrvatskom planinarstvu najpoznatije popularno značenje naziva Kozjak,
      za razliku od manje poznatog ali znatno višega Velikog Kozjaka iznad Kijeva 
      u Dalmatinskoj Zagori, 1207 m.

      Najupečatljiviji dio Kozjaka je južna stijena (16 km), koja je ujedno najduža 
      u Hrvatskoj, mada razmjerno male visine (50 – 250 m).`
  },{
    cardImageUrl: "images/newsHeadings/primosten.jpg",
    cardTitle: "Primošten",
    cardText: `
      Tijekom turske invazije 1542., otočić na kojemu se nalazi Primošten je
      bio zaštićen zidovima i kulama i sa pomičnim mostom koji ga je spajao
      s kopnom. Kad su se Turci povukli, most je zamijenjen nasipom, a naselje
      je nazvano "Primošten", od riječi "primostiti" (premostiti).

      Primošten je poznat po svojim velikim i predivnim vinogradima.
      Fotografija jednog od primoštenskih vinograda visi na zidu zgrade
      središta UN-a u New Yorku. Razmatra se uvrštenje vinograda u UNESCO-v popis baštine.
      Najveća plaža u Primoštenu je Raduča, a postoji i Mala Raduča, koja je izabrana
      za jednu od 10 najljepših plaža u Hrvatskoj.`
  },{
    cardImageUrl: "images/newsHeadings/sibenik.jpg",
    cardTitle: "Katedrala",
    cardText: `
      Katedrala Sv. Jakova u Šibeniku najznačajnije je graditeljsko ostvarenje
      15. i 16. st. na tlu Hrvatske. Zbog svojih iznimnih vrijednosti katedrala je
      2000. godine uvrštena u UNESCO-ov popis svjetskog kulturnog nasljeđa.

      Gradnja nove katedrale simbolički je bila kulminacija višestoljetnog stremljenja grada,
      da se odvoji od trogirske biskupije te da i uz vlastitu crkvu stekne i komunalnu autonomiju.
      Podignuta je na južnoj strani središnjeg starog gradskog trga, na mjestu romaničke crkve sv. Jakova.
      Ideja o gradnji velikog katedralnog hrama datira od 1298. godine. kada je Šibenik dobio vlastitu
      biskupiju i naslov grada. Odluka o gradnji i početku pripremnih radova donesena je 1402. godine.
      Gradnja je međutim, započela tek 1431. godine i trajala uz prekide do 1536. godine.`
  },{
    cardImageUrl: "images/newsHeadings/svilaja.jpg",
    cardTitle: "Svilaja",
    cardText: `
      Svilaja je planina u Dalmatinskoj Zagori, usporedna s višim sjevernijim
      lancem Dinara-Troglav. Pruža se smjerom sjeverozapad-jugoistok između Sinjskoga
      i Petrovog polja u dužini oko 30 km.

      Najviši je južni vrh Svilaje (Bat) 1508 m iznad Sinja. Sjevernije su još važniji
      vrhovi Jančak 1483 m, Kita 1413 m, Turjača 1340 m , Mala Svilaja 1472 m i Lisina 1301 m
      iznad Vrlike. Od najbližeg grebena Veliki Kozjak (1207 m) koji je sjeverni nastavak Svilaje,
      ova je odvojena nižim sedlom Lemeš (860 m) iznad sela Maovice. Najveći dio lanca Svilaje
      je krški greben s naizmjeničnim nizom vrhova i ponikava (vrtača), te više krških jama i špilja.`
  }];
  
  cards.forEach(card => createAndInsertCard(card));
  
  $("#add-card-button").on("click", e => {
    const imagePath = prompt("Enter image path", "images/newsHeadings/primosten.jpg");
    if(!imagePath) { return; }
    
    const title = prompt("Enter title", "Title");
    if(!title) { return; }
    
    const text = prompt("Enter text", "Text");
    if(!text) { return; }
    
    /*
    Objekt bi treba imati svojstva koja su navedena u template-u #card-template
    npr: {{cardImageUrl}} {{cardTitle}} {{cardText}}
    */
    createAndInsertCard({ 
      cardImageUrl: imagePath,
      cardTitle: title,
      cardText: text
    });
  });
  
  function createAndInsertCard(card) {
    const cardTemplate = $("#card-template").html();
    const cardHtml = Mustache.render(cardTemplate, card);
    
    $("#cards-container").append(cardHtml);
  }
  
  $("#cards-container").on("click", ".card .delete-button", (e) => {
    const deleteButton = e.currentTarget;
    if(confirm("Delete?")){
      const $card = $(deleteButton).parent(".card");
      $card.fadeOut(() => $card.remove());
    }
  });

  $("#cards-container").on("click", ".card .add-button", (e) => {
    const addButton = e.currentTarget;
    const value = prompt("New paragraph text");

    if(value){
      $(addButton).parent(".card").append("<p>" + value + "</p");
    }
  });
  
  $("#cards-container").on("dblclick", ".card h3", e => {
    const clickedOnTitle = e.currentTarget;
    const value = prompt("Change title", clickedOnTitle.textContent);

    if(value){
      clickedOnTitle.textContent = value;
    }
  });
  
  $("#search-box").on("keyup", e => {
    const searchKey = e.target.value;
    
    $("#cards-container .card").each((index, card) => {
      const $card = $(card);
      const cardText = $card.text();
      
      if(cardText.indexOf(searchKey) >= 0) {
        //Naša je string
        $card.removeClass("hidden");
      }
      else {
        //Nije naša string
        $card.addClass("hidden");
      }
    });
    
    //Dohvati sve trenutne kartice (elemente) u sučelju
    //Sa for petljom proći po svim elementima 
    //Za svaku karticu pogledati textContent svojstvo
    //i provjeriti da li taj text sadrži upisani string
    //cards[i].textContent.indexOf(searchKey) >= 0
    //Ako sadrži ili ako je searchKey === "" maknuti klasu hidden
    //Ako ne sadrži dodati klasu hidden
    
  });
  
  
  
  
  
  
  
  
  
  
  
  
});