$(document).ready(() => {
  let isAuthenticated = false;

  $.ajax({
	  url: "API.php?action=isAuthenticated",
	  dataType: "json"
  }).done(data => {
	  isAuthenticated = data.isAuthenticated;
	  adaptUI();
  }).fail(e => console.log("error checking auth"));
  
  function adaptUI(){
    $("#login-logout-button").text(isAuthenticated ? "Logout" : "Login");
    $("body").toggleClass("not-authenticated", !isAuthenticated);
  }

  const $loginOverlay = $("#login-overlay");
  $("#login-logout-button").on("click", () => {
    if(!isAuthenticated){
      $loginOverlay.addClass("shown");
    }
    else {
      //Make a login request
	  $.ajax({
		 url: "API.php?action=logout",
		 dataType: "json"
	  }).done(data => {
		  isAuthenticated = false;
		  adaptUI();
	  }).fail(e => console.log("error when logging out", e));
    }
  });

  $("#login-overlay .close-button").on("click", () => {
    $loginOverlay.removeClass("shown");
  });

  $("#login-button").on("click", () => {
    const email = $("#email").val();
    const password = $("#password").val();

    $("#login-overlay .message").text("");
	
	$.ajax({
		url: "API.php?action=login",
		data: {
			email: email,
			password: password
		},
		dataType: "json"
	}).done(data => {
		isAuthenticated = data.isAuthenticated;
		if(isAuthenticated) {
			$loginOverlay.removeClass("shown");
			adaptUI();
		}else {
			$("#login-overlay .message").text("Invalid username and/or password");
		}
		
	}).fail(e => console.log("Error when logging in", e));
	
  });
})
