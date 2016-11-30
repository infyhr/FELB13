$(document).ready(function(){
    let slideIndex = 0;

    const sliderData = [
        {
            title: "Google Nexus 5X",
            imagePath: "images/5x4.jpg",
            grade: 5,
            body: `
                The Nexus 5X offers top-line performance in a compact,
                lightweight design with the new
                Nexus Camera that takes great photos in all light conditions.
                Beneath the 5.2” display is a hexa-core processor that offers world-class speed 
                at an affordable price. And it has Marshmallow, the latest version of Android
                working right out of the box. 
            `
        },
        {
            title: "Google Pixel",
            imagePath: "images/pixel.jpg",
            grade: 0,
            body: `
                It has a camera that takes stunning photos in any light. 
                A battery that lasts all day. Unlimited storage for all your photos and videos.
                And it's the first phone with the Google Assistant built in.
                Only on Verizon, the next gen network. With Google Duo you can video call with
                friends and family on Android & iOS. Spend less time buffering and more time
                talking with 50% faster peak speeds in 450 cities nationwide on Verizon LTE Advanced.
            `
        }
    ];

    function getNewSlide() {
        const $slideTemplate = $("#slide-template").html();

        // Append graded stars
        sliderData[slideIndex].htmlRating = "";
        for(let i = 0; i < sliderData[slideIndex].grade; i++) {
            sliderData[slideIndex].htmlRating += "<i name=\"star-" + i + "\" class=\"fa fa-star\" aria-hidden=\"true\"></i>";
        }
        // Append the rest
        for(let i = sliderData[slideIndex].grade; i < 5; i++) {
            sliderData[slideIndex].htmlRating += "<i name=\"star-" + i + "\" class=\"fa fa-star-o\" aria-hidden=\"true\"></i>";   
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

    // Hook buttons
    $("#carousel").on("click", "#arrow-left", () => {
        changeSlide(0);
    });
    $("#carousel").on("click", "#arrow-right", () => {
        changeSlide(1);
    });

    // Hook stars
    $("#carousel").on("click", "#rating > i", function() {
        // Update all the previous stars...
        let lastStar = 0;
        $(this).prevAll().each(function(index) {
            $(this).replaceWith("<i name=\"star-" + index+1 + "\" class=\"fa fa-star\" aria-hidden=\"true\"></i>");
            lastStar = index;
        });

        // Might as well do it for the remaining ones now.
        $(this).nextAll().each(function(index) {
            $(this).replaceWith("<i name=\"star-" + index+1 + "\" class=\"fa fa-star-o\" aria-hidden=\"true\"></i>");
        });

        // And now the current one.
        $(this).replaceWith("<i name=\"star-" + lastStar + "\" class=\"fa fa-star\" aria-hidden=\"true\"></i>");
    });

    // Start off with a first slide.
    getNewSlide(0);
});