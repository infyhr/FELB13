$(document).ready(function(){
  let cards = [];
  /* Get cards from the server*/
  $.ajax({
	 url: "API.php?action=getCards",
	 dataType: "json",
  //}).done(cards => cards.forEach(card => createAndInsertCard(card)))
  }).done(serverCards => {
	  $("#cards-container").empty()
	  cards = serverCards
	  cards .forEach(card => createAndInsertCard(card));
  }).fail(error => console.log("Error when getting cards", e))
  
  $("#add-card-button").on("click", e => {
    const imageUrl = prompt("Enter image path", "images/newsHeadings/primosten.jpg");
    if(!imageUrl) { return; }
    
    const title = prompt("Enter title", "Title");
    if(!title) { return; }
    
    const text = prompt("Enter text", "Text");
    if(!text) { return; }
    
    /*
    Objekt bi treba imati svojstva koja su navedena u template-u #card-template
    npr: {{imageUrl}} {{title}} {{text}}
    */
    const card = { 
      title: title,
      imageUrl: imageUrl,
      text: text
    };
	
	$.ajax({
		url: "API.php?action=addCard",
		data: card, // Mozemo sve parametre navodit u URL-u ili ih poslati preko data polja
		dataType: "json" // Inace bi u response.id dobili nista :) po defaultu smatra da server vraca samo string a ne json.
	}).done(response => {
		// Tek ako je dodana kartica na server u bazi onda je želimo odma pokazat tu.
		card.id = response.id // ovo je ono data-id da znamo da mozemo brisat i slicno. Ako je sve bilo OK onda ce u API.php addCard() vratit automatski ID.
		cards.push(card);
		createAndInsertCard(card);
	}).fail(error => console.log("Error when adding card", error));
    /* add card to the server and then show it in the UI */
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
      const id = $card.attr("data-id");
      
	  $.ajax({
		  url: "API.php?action=deleteCard",
		  // ili ako necemo ovo s DataType json sta inace je malo zbunjujuce jer je $_GET a ovo je JSON oblik ka al opet svejedno bice misli na ?key=value ugl moze se i na URL samo stavit ?action=deleteCard&id= + id ili pomocu literala se moze napravit `API.php?action=deleteCard&id={$id}` nes tako provjeri na Google.
		  data: {id: id},
		  dataType: "json"
	  }).done(response => {
		  //Delete card from the server and then remove it from the UI
		  $card.fadeOut(() => $card.remove());
	  }).fail(error => console.log("Failed to delete the card", error))
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