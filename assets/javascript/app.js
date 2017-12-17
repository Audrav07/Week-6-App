
$(document).ready(function(){

//array of gif searches
// var topics = ["red panda", "cats", "dogs", "people falling", "slay", "gordon ramsay", "chi's sweet home", "broad city", "friends", "angry panda"];

var topics=[];


//function to display buttons

function displayGifTopics(){
	$("#gifsDisplay").empty();
	var gifImage = $(this).data("search");
	console.log(gifImage);


var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifImage + "&api_key=5BqhrXIjyWask1DYw7sN1mc1Rq75i9dq&limit=25";
console.log(queryURL);
//api for var topics
$.ajax({
	url: queryURL,
	method: "GET"
}).done(function(response){
	var results = response.data;
	console.log(results);

	for(var i = 0; i < results.length; i++){

		var divTopics = $("<div>");
		divTopics.addClass("divTopics");

		 defaultAnimatedSrc = results[i].images.fixed_height.url;
		 staticSrc = results[i].images.fixed_height_still.url;
		 showGif = $("<img>");

		showGif.attr("src", staticSrc);
		showGif.addClass("topicsGif");
		showGif.attr("data-state", "still");
		showGif.attr("data-still", staticSrc);
		showGif.attr("data-animate", defaultAnimatedSrc);
		divTopics.append(showGif);
		$("#gifsDisplay").prepend(divTopics);
		
	}

});
}

function displayGifTrends(){
	$("#gifsDisplay").empty();
	var gifTrend = $(this).data("search");
	console.log(gifTrend);

var queryURL = "https://api.giphy.com/v1/gifs/trending?q=" + gifTrend + "&api_key=5BqhrXIjyWask1DYw7sN1mc1Rq75i9dq&limit=25";
console.log(queryURL);

$.ajax({
	url: queryURL,
	method: "GET"
}).done(function(response){
	var results = response.data;
	console.log(results);

	for(var i = 0; i < results.length; i++){

		var divTrending = $("<div>");
		divTrending.addClass("divTrending");

		 defaultAnimatedSrc = results[i].images.fixed_height.url;
		 staticSrc = results[i].images.fixed_height_still.url;
		 showGif = $("<img>");

		showGif.attr("src", staticSrc);
		showGif.addClass("trendGif");
		showGif.attr("data-state", "still");
		showGif.attr("data-still", staticSrc);
		showGif.attr("data-animate", defaultAnimatedSrc);
		divTrending.append(showGif);
		$("#gifsDisplay").prepend(divTrending);
		
	}
});

}





//submit button cick event
$("#addGif").on("click", function(event){
event.preventDefault();
var newSearch = $("#gifInputs").val().trim();
topics.push(newSearch);
console.log(topics);
$("#gifInputs").val('');
	displayButtons();
});

//function to iterate through topics array and display the buttons
function displayButtons(){
	$("#myButtons").empty();
	for (var i = 0; i < topics.length; i++){
		var buttonTag = $('<button class="btn btn-info">');
		buttonTag.attr("id", "gif");
		buttonTag.attr("data-search", topics[i]);
		buttonTag.text(topics[i]);
		$("#myButtons").append(buttonTag);
	}
}




displayButtons();

//click gif button event id of gif
$(document).on("click", "#gif", displayGifTopics);

//click on gifs events class of topicsGif
$(document).on("click", ".topicsGif", pausePlayGifs);

//on click gifs for trending
$(document).on("click", "#trend", displayGifTrends);

//on click pause gifs for trending
$(document).on("click", ".trendGif", pausePlayGifs);



//function for pausing or animating gifs
function pausePlayGifs(){
	var state = $(this).attr("data-state");
	if(state === "still"){
		$(this).attr("src", $(this).attr("data-animate"));
		$(this).attr("data-state", "animate");
	} else{
		$(this).attr("src", $(this).attr("data-still"));
		$(this).attr("data-state", "still");
	}

}

});

	


//remove previous gif
function removePreviousBtn(){
	$("removeGif").on("click", function(){
		topics.pop(search);
		displayButtons();
		return false;
		
	});


}

