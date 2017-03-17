$(document).ready(function() {
    function insertCard(title, imagePath) {
        const $cardTemplate = $("#card-template").html();

        $.ajax({
            url: 'API.php?r=addImage',
            type: 'POST',
            data: 'name=' + title + '&url=' + imagePath
        }).done(() => {
            // Success!
            $("#images").append(Mustache.render(
                $cardTemplate,
                {imagePath: imagePath, title: title}
            ));
        }).fail(err => console.log("Error while getting data: " + JSON.stringify(err)));
    }

    // Hook the Add new image button
    $("#add-image").on("click", () => {
        const imagePath = prompt("Enter the image path", "images/Google-Nexus-5.jpg");
        if(!imagePath) return;

        const title = prompt("Enter the title");
        if(!title) return;

        // Insert into the actual page
        insertCard(title, imagePath);
    });
});