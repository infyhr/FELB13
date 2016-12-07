$(document).ready(function() {
    let cardsData = [
        {
            title: "Google Nexus 5",
            description: "Something about Google Nexus 5...",
            image: "images/Google-Nexus-5.jpg"
        },
        {
            title: "Google Nexus 6",
            description: "Something about Google Nexus 6...",
            image: "images/Google-Nexus-6.png"
        },
        {
            title: "Google Pixel XL",
            description: "Something about Google Pixel XL...",
            image: "images/pixelzadnji.jpg"
        }
    ];

    function insertCard(title, imagePath, description) {
        const $cardTemplate = $("#card-template").html();

        $("#images").append(Mustache.render(
            $cardTemplate,
            {imagePath: imagePath, title: title}
        ));

        console.log(cardsData);
    }

    // Hook the Add new image button
    $("#add-image").on("click", () => {
        const imagePath = prompt("Enter the image path", "images/Google-Nexus-5.jpg");
        if(!imagePath) return;

        const title = prompt("Enter the title");
        if(!title) return;

        const description = prompt("Enter the description");
        if(!description) return;

        // Insert into the object first
        cardsData.push({
            title: title,
            description: description,
            image: imagePath   
        });

        // Now insert into the actual page
        insertCard(title, imagePath, description);
    });

    // Load the first cards
    cardsData.forEach(function(entry) {
        insertCard(entry.title, entry.image);
    });
});