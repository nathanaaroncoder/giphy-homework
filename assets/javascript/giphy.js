$(document).ready(function() {


var foods = ["spaghetti", "ice cream", "burger", "pizza", "milkshake", "fries"]


function gifMagic (){
	var food = $(this).attr("data-name");
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + food + "&api_key=0xmjh4jszizqHe29c7R02PRJEFy9qJSz&limit=10";

	$.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {

        	$("#gifs").empty();

        	var results = response.data;

        	for (var i = 0; i < results.length; i++) {
        		
        		var gifDiv = $("<div class='gifSpot'>");
        		var gifImage = $("<img class='gif-image'>");
        		var rating = results[i].rating;
        		var p = $("<p>").text("Rating: " + rating.toUpperCase());

        		gifImage.attr("src", results[i].images.fixed_height_still.url);
        		gifImage.attr("data-still", results[i].images.fixed_height_still.url);
        		gifImage.attr("data-animate", results[i].images.fixed_height.url);
        		gifImage.attr("data-state", "still");

        		gifDiv.prepend(p);
            	gifDiv.prepend(gifImage);

            	$("#gifs").prepend(gifDiv);
        	}




        	$(".gif-image").on("click", function() {

			console.log("Does this click?");

         	var state = $(this).attr("data-state");

         	console.log("state: " + state);
         	console.log("this: " + this);

        	if(state === "still"){
          		$(this).attr("src", $(this).attr("data-animate"));
          		$(this).attr("data-state", "animate");
        	}

       		else {
        		$(this).attr("src", $(this).attr("data-still"));
        		$(this).attr("data-state", "still");
       		}

});



        }) 
}




function makeButtons (){
	$("#gif-buttons").empty();

	for (var i = 0; i < foods.length; i++) {
		var newButton = $("<button>");
		newButton.addClass("food-button");
		newButton.attr("data-name", foods[i]);
		newButton.text(foods[i]);
		$("#gif-buttons").append(newButton);

	}
}




$("#add-button").click(function(event){
	event.preventDefault();
	var input = $("#new-button-input").val().trim();

	if(input === ""){

	} else {
	foods.push(input);
	makeButtons();
	$("#new-button-input").val("");
	}
})



makeButtons();


$(document).on("click", ".food-button", gifMagic);

})





