$(document).ready(function(){
  let cards = [];
  const $getCardsRequest = $.ajax({
    url: "API.php?action=getCards",
    dataType: "json"
  });

  $getCardsRequest.done(data => {
    cards = data;
    $("#cards-container").empty();
    cards.forEach(card => createAndInsertCard(card));
  });

  $getCardsRequest.fail(e => console.log("Error when fetching cards", e));

  $("#add-card-button").on("click", e => {
    const imageUrl = prompt("Enter image path", "images/newsHeadings/primosten.jpg");
    if(!imageUrl) { return; }

    const title = prompt("Enter title", "Title");
    if(!title) { return; }

    const text = prompt("Enter text", "Text");
    if(!text) { return; }

    const card = {
      title: title,
      imageUrl: imageUrl,
      text: text
    };

    $.ajax({
      url: "API.php?action=addCard",
      data: card,
      dataType:"json"
    }).done(data => {
      if(data.success){
        card.id = data.id;
        cards.push(card);
        createAndInsertCard(card);
      }
    }).fail(e => console.log("Error when adding card", e));
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
        url: "API.php?action=deleteCard&id=" + id,
        dataType: "json"
      })
      .done(data => {
        if(data.success){
            $card.fadeOut(() => $card.remove())
        }
      })
      .fail(error => console.log("Error when deleting card", e));
    }
  });

  $("#cards-container").on("click", ".card .add-button", e => {
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
