$(function(){
	populateButtons(searchArray,'searchButton','#buttonsArea');
	console.log("Page Loaded");
})

var searchArray = ['Basketball','Baseball','Tennis','Soccer','Golf','Rugby'];

function populateButtons(searchArray,classToAdd,areaToAddTo){
	console.log(areaToAddTo);
	$(areaToAddTo).empty();
	for(var i=0;i<searchArray.length;i++){
		var a = $('<button>');
		a.addClass(classToAdd);
		a.attr('data-type',searchArray[i]);
		a.text(searchArray[i]);
		$(areaToAddTo).append(a);
	}
}

$(document).on('click','.searchButton',function(){
	$('#searches').empty();
	var type = $(this).data('type');
	console.log(type);
	var queryURL = 'http://api.giphy.com/v1/gifs/search?q='+type+'&api_key=xhQVH4Kgh43IC7cHrfMbQGebOIkRRjQL&limit=10';
	$.ajax({
		url:queryURL,
		method: "GET"
	}).done(function(response){
		//console.log(response);
		for(var i=0;i<response.data.length;i++){
			var searchDiv = $('<div class="search-item">');
			var rating = response.data[i].rating;
			var p = $('<p>').text('Rating: '+rating);
			var animated = response.data[i].images.fixed_height.url;
			var still = response.data[i].images.fixed_height_still.url;
			var image = $('<img>');
			image.attr('src',still);
			image.attr('data-still',still);
			image.attr('data-animated',animated);
			image.attr('data-state','still');
			image.addClass('searchImage');
			searchDiv.append(p);
			searchDiv.append(image);
			$('#searches').append(searchDiv);
		}
	})
})

$(document).on('click','.searchImage',function(){
	var state = $(this).attr('data-state');
	if(state == 'still'){
		$(this).attr('src',$(this).data('animated'));
		$(this).attr('data-state','animated');
	} else {
		$(this).attr('src',$(this).data('still'));
		$(this).attr('data-state','still');
	}
})

$('#add-field').on('click', function(event){
	event.preventDefault();
	var classToAdd = $('#search-input').val().trim();
	searchArray.push(classToAdd);
	populateButtons(searchArray, 'searchButton', '#buttonsArea');
})

