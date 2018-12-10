// GifTastic

/*
Rutgers Full Stack coding Bootcamp Program
Description: This is GifTastic Program where system makes a call to GIPHY API 
and renders the GIF's to the user. 
Author : Prashanth K Mijar
Date: 09-Dev-2018 
*/

var GIF_LIMIT = 10;

// Initial array of topics
var topics = ["The Matrix", "The Notebook", "Mr. Nobody", "The Lion King"];

$(document).ready(function() {

renderButtons();

$("#add-gif").on("click", function(event) {
  event.preventDefault();
  var gifVal = $("#gif-input").val().trim();
  topics.push(gifVal);
  renderButtons();
});

$("#gifButtonView").on("click","button",function(){
    console.log("data-name ::"+$(this).attr("data-name"));
    displayGIFInfo($(this).attr("data-name"));
})

$("#gifView").on("click","img", function() {
    console.log($(this));
    var state = $(this).attr("state");

    if (state === "still") {
        console.log("Playing GIF , state is " + state)
      $(this).attr("src", $(this).attr("playGIF"));
      $(this).attr("state", "play");
    } else {
        console.log("Still GIF , state is " + state)
      $(this).attr("src", $(this).attr("stillGIF"));
      $(this).attr("state", "still");
    }
  });


})

function renderButtons(){
    $("#gifButtonView").empty();
    for (var i = 0; i < topics.length; i++) {
      var gifButton = $("<button>");
      gifButton.addClass("type","button");
      gifButton.addClass("btn btn-outline-success btn-space");
      gifButton.attr("data-name", topics[i]);
      gifButton.text(topics[i]);
      $("#gifButtonView").append(gifButton);
    }
  }


    function displayGIFInfo(gifName) {

        console.log(gifName);
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=Sn1nsyDQL8lSLXzK1XPBWk42O286s03x&q=" + gifName + "&limit=" + GIF_LIMIT;

        // Creating an AJAX call for the specific gif button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
            console.log(response);
            $("#gifView").empty();
            for(var i=0; i<response.data.length; i++ ){
                var gifDiv = $("<div class='gif'>");
                var image = $("<img>");
                image.attr("class","rounded clear-both");
                var rating = response.data[i].rating;    
                var urlStill = response.data[i].images.original_still.url;
                var urlPlay = response.data[i].images.fixed_height.url;  
                image.attr("src", urlStill);
                image.attr("state","still");
                image.attr("stillGIF",urlStill);
                image.attr("playGIF", urlPlay);
                var gifRating = $("<p>").text("Rating: " + rating);
                gifDiv.append(image);    
                gifDiv.append(gifRating) 
                $("#gifView").append(gifDiv);
            }
        });
      }