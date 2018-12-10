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
var topics = ["Cats", "Dogs", "Pengiun", "Eagle"];

$(document).ready(function() {

renderButtons();

$("#add-gif").on("click", function(event) {
  event.preventDefault();
  var gifVal = $("#gif-input").val().trim();
  $("#Message").empty();
  if(topics.includes(firstCapital(gifVal)) || gifVal === ""){
    console.log("Topic already added  or nothing entered!!!!");
    $("#Message").attr("class", "alert-danger");
    $("#Message").append("Topic already added or nothing typed.");
  }
  else{
    console.log("NEW Topic added.....");     
    topics.push(firstCapital(gifVal));
  }

  renderButtons();
});

$("#gifButtonView").on("click","button",function(){
    $("#Message").empty();
    console.log("data-name ::"+$(this).attr("data-name"));
    displayGIFInfo($(this).attr("data-name"));
})

$(".checkRow").on("click","img", function() {
    $("#Message").empty();
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
            for(var i=0; i<response.data.length; i++ ){
                var gifDiv = $("<div class='gif'>");
                var image = $("<img>");
                image.attr("class","rounded");
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
                $("#gifView"+i).empty();
                $("#gifView"+i).append(gifDiv);
            }
        });
      }

    function firstCapital(word) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }