$(document).ready(function(){
  const $thumbnails = $("#thumbnails-container > .thumbnail");
  
  $thumbnails.on("click", (e) => selectThumbnail(e.currentTarget));
  
  $thumbnails.each((index, element) => {
    const largeImage = new Image();
    largeImage.src = $(element).attr("data-large-image"); //element.getAttribute("data-large-image");
  });
  
  $("#slider-go-right").on("click", () => {
    const $thumbnails = $("#thumbnails-container > .thumbnail");
    const $selectedThumbnail = $("#thumbnails-container > .thumbnail.selected");

    let currentIndex = $thumbnails.index($selectedThumbnail);
    currentIndex++;

    if(currentIndex >= $thumbnails.length){ currentIndex = 0;}

    selectThumbnail($thumbnails[currentIndex]);
  });

  $("#slider-go-left").on("click", (e) => {
    const $thumbnails = $("#thumbnails-container > .thumbnail");
    const $selectedThumbnail = $("#thumbnails-container > .thumbnail.selected");

    let currentIndex = $thumbnails.index($selectedThumbnail);
    currentIndex--;

    if(currentIndex < 0){ currentIndex = $thumbnails.length - 1;}

    selectThumbnail($thumbnails[currentIndex]);
  });
  
  function selectThumbnail(thumbnail){
    $("#thumbnails-container > .thumbnail.selected").removeClass("selected");

    const $thumbnail = $(thumbnail);

    $thumbnail.addClass("selected");

    const $mainImage = $("#main-picture-container > img");

    $mainImage.fadeOut(function(){
      $mainImage.attr("src", $thumbnail.attr("data-large-image"));
      $mainImage.fadeIn();
    });
  }
});