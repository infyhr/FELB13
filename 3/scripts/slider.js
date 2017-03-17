$(document).ready(function(){
    let   slideIndex = 0;
    const filledStar = '<i class="fa fa-star"   aria-hidden="true"></i>';
    const emptyStar  = '<i class="fa fa-star-o" aria-hidden="true"></i>';
    
    // Make the ajax request
    let sliderData = [];
    $.ajax({
        url: 'API.php?r=getItems',
        dataType: 'json'
    }).done(items => {
        sliderData = items;

        // Start off with the first slide
        //getNewSlide();
    }).fail(err => console.log("Error while getting data: " + JSON.stringify(err)));

    function getNewSlide() {
        const $slideTemplate = $("#slide-template").html();

        // Append graded stars
        sliderData[slideIndex].htmlRating = "";
        for(let i = 0; i < sliderData[slideIndex].grade; i++) {
            sliderData[slideIndex].htmlRating += filledStar;
        }
        // Append the rest
        for(let i = sliderData[slideIndex].grade; i < 5; i++) {
            sliderData[slideIndex].htmlRating += emptyStar;
        }

        $("#carousel").html(Mustache.render($slideTemplate, sliderData[slideIndex]));
    }

    function changeSlide(direction) {
        // Determine where we're even going...
        slideIndex = direction > 0 ? slideIndex+1 : slideIndex-1;

        // Check boundaries now
        if(slideIndex >= sliderData.length) slideIndex = 0;
        if(slideIndex < 0) slideIndex = sliderData.length - 1;

        // Just update it.
        getNewSlide();
    }

    function updateStars(stars) {
        let starCount = 1;

        // Update all the previous stars...
        $(stars).prevAll().each(function(index) {
            $(this).replaceWith(filledStar);
            starCount++;
        });

        // Might as well do it for the remaining ones now.
        $(stars).nextAll().each(function(index) {
            $(this).replaceWith(emptyStar);
        });

        // And now the current one.
        $(stars).replaceWith(filledStar);

        return starCount;
    }

    // Hook buttons
    $("#carousel").on("click", "#arrow-left",  () => {
        changeSlide(0);
    });
    $("#carousel").on("click", "#arrow-right", () => {
        changeSlide(1);
    });

    // Hook rating
    $("#carousel").on("click", "#rating > i", function() {
        let newGrade = updateStars(this);

        // Update serverside
        $.ajax({
            url: 'API.php?r=updateRating',
            type: 'POST',
            data: 'grade=' + newGrade + '&title=' + sliderData[slideIndex].title
        }).done(() => {
            sliderData[slideIndex].grade = newGrade;
        }).fail(err => console.log("Error while getting data: " + JSON.stringify(err)));
    });

    // Hook the edit button
    $("#carousel").on("click", "#edit", () => {
        const $selector = $("#carousel > #desc > p");
        const newBody   = prompt("New card body", $selector.text());
        if(!newBody) return;

        $selector.text(newBody);
        sliderData[slideIndex].body = newBody;
    });

    // Hook the delete button
    $("#images").on("click", "article > i.fa.fa-times", e => {
        const targetImage = e.currentTarget;
        const $image = $(targetImage).parent("article");
        $image.fadeOut(() => $image.remove());
    });
});