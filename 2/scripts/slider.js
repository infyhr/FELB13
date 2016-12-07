$(document).ready(function(){
    let   slideIndex = 0;
    const filledStar = '<i class="fa fa-star"   aria-hidden="true"></i>';
    const emptyStar  = '<i class="fa fa-star-o" aria-hidden="true"></i>';

    const sliderData = [
        {
            title: "Google Nexus 5X",
            imagePath: "images/5x4.jpg",
            grade: 0,
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
        },
        {
            title: "Huawei Nexus 6P",
            imagePath: "images/nexus-6p.jpg",
            grade: 0,
            body: `
                Nexus 6P is the ultimate Android experience. Enjoy the freshest, fastest version.
                An evolving core keeps you up to date with the latest software:
                Pure and smart, Android 6.0 Marshmallow is matched by Huawei’s power and iconic design, 
                featuring the latest Android version with over the air upgrades.
            `
        }
    ];

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

    function insertCard(title, imagePath) {
        const $cardTemplate = $("#card-template").html();

        $("#images").append(Mustache.render(
            $cardTemplate,
            {imagePath: imagePath, title: title}
        ));
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
        sliderData[slideIndex].grade = updateStars(this);
    });

    // Hook the edit button
    $("#carousel").on("click", "#edit", () => {
        const $selector = $("#carousel > #desc > p");
        const newBody   = prompt("New card body", $selector.text());
        if(!newBody) return;

        $selector.text(newBody);
        sliderData[slideIndex].body = newBody;
    });

    // Hook the Add new image button
    $("#add-image").on("click", () => {
        const imagePath = prompt("Enter the image path", "images/Google-Nexus-5.jpg");
        if(!imagePath) return;

        const title = prompt("Enter the title");
        if(!title) return;

        insertCard(title, imagePath);
    });

    // Hook the delete button
    $("#images").on("click", "article > i.fa.fa-times", e => {
        const targetImage = e.currentTarget;
        const $image = $(targetImage).parent("article");
        $image.fadeOut(() => $image.remove());
    });

    // Start off with a first slide.
    getNewSlide(0);
});