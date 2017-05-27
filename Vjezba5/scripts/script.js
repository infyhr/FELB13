//querySelectorAll -> dohvati listu elemenata (prazna lista ako ne nađe ništa)
const thumbnails = document.querySelectorAll("#thumbnails-container > .thumbnail");

for(const thumbnail of thumbnails){
  const largeImage = new Image();
  largeImage.src = thumbnail.getAttribute("data-large-image");
  thumbnail.addEventListener("click", handleThumbnailClick);  
}

function handleThumbnailClick(){
  //this -> thumbnail na kojeg se kliklo
  selectThumbnail(this);
}


function selectThumbnail(thumbnail) { // Za funkcije se ne specificira tip podatka :\
  const currentlySelectedThumbnail = document.querySelector("#thumbnails-container > .thumbnail.selected");
  
  if(currentlySelectedThumbnail){
      currentlySelectedThumbnail.classList.remove("selected");
  }
  
  thumbnail.classList.add("selected"); //doda novu klasu elementu
  
  const largeImagePath = thumbnail.getAttribute("data-large-image");
  const mainImage      = document.querySelector("#main-picture-container > img");
  
  mainImage.src = largeImagePath;
}

const deleteButtons = document.querySelectorAll(".card .delete-button");

for(const deleteButton of deleteButtons){
  deleteButton.addEventListener("click", handleDeleteButtonClick);
}

function handleDeleteButtonClick(){
    if(confirm("Zaista izbrisati" + this.parentNode.textContent)) this.parentNode.remove();
    // Ili parentElement i removeChild.
}


/* Botuni */ 
const rightButton = document.querySelector("#slider-go-right");
const leftButton  = document.querySelector("#slider-go-left");

/*rightButton.addEventListener("click", function() {
    let currentIndex = getCurrentThumbnailIndex();
    currentIndex++;
    currentIndex = (currentIndex > 4) ? 0 : currentIndex;
    console.log(currentIndex);
    
    selectThumbnail(thumbnails[currentIndex]);
    
    console.log(this);   
});
leftButton.addEventListener("click", function() {
    let currentIndex = getCurrentThumbnailIndex();
    currentIndex--;
    currentIndex = (currentIndex < 0) ? 4 : currentIndex;
    console.log(currentIndex);
    
    selectThumbnail(thumbnails[currentIndex]);
});*/
rightButton.addEventListener("click", function(){
   moveThumbnail(1); 
});
leftButton.addEventListener("click", function() {
    moveThumbnail(0);
})

function moveThumbnail(direction) {
    let currentIndex = getCurrentThumbnailIndex();
    currentIndex = (direction == 1) ? currentIndex+1 : currentIndex-1;
    currentIndex = (currentIndex >= thumbnails.length) ? 0 : currentIndex;
    currentIndex = (currentIndex < 0) ? thumbnails.length-1 : currentIndex;
    
    selectThumbnail(thumbnails[currentIndex]);
}

function getCurrentThumbnailIndex() {
    // Find the selected thumbnails
    const selectedThumb = document.querySelector("#thumbnails-container > .thumbnail.selected");
    for(let i = 0; i < thumbnails.length; i++) { // thumbnails -> to je globalno tamo na vrhu.
        if(thumbnails[i] == selectedThumb) {
            return i;
        }
    }
    
    return -1;
}

/* Naslov u kartici */
const titles = document.querySelectorAll(".card > h3");
for(const title of titles) {
    title.addEventListener("dblclick", function() {
        let newTitle = prompt("Unesi novi naslov", this.textContent);
        if(!newTitle) return;
        
        if(newTitle.length > 10) {
            newTitle = this.textContent.substring(0, 7) + "...";
        }
        
        this.textContent = newTitle;
    });  
}