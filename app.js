var YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3/search';


function getDataFromApi(searchTerm, callback) {
  var query = {
    part: 'snippet',
    key: 'AIzaSyCvqJSDVyL69rFZj9fwkFSbMydJwrJaGxs',
    q: searchTerm,
    maxResults: 8,
  }
  $.getJSON(YOUTUBE_BASE_URL, query, function(data) {
    displayYoutubeSearchData(data);
  });
}

function displayYoutubeSearchData(data) {
  var resultElement = '';
  if (data.items) {
    data.items.forEach(function(item) {
     if (item.id.kind === 'youtube#channel') {
        resultElement += '<div class="result-item"><a href="https://www.youtube.com/channel/' + item.snippet.channelId + 
        '" target="_blank"><img width="110px" height="110px" src="' + item.snippet.thumbnails.medium.url + '"><br>' + item.snippet.channelTitle + 
        '</a></div>';
     } else {
        resultElement += '<div class="result-item"><a href="https://www.youtube.com/watch?v=' + item.id.videoId + 
        '" target="_blank"><img width="196px" height="110px" src="' + item.snippet.thumbnails.medium.url + '">' + 
        item.snippet.title.trunc() + '</a><br><span><a href="https://www.youtube.com/channel/' + item.snippet.channelId + 
        '" target="_blank">' + item.snippet.channelTitle + '</a></span></div>'; 
     }
    });
  }
  else {
    resultElement += '<p>No results</p>';
  }
  
  $('.js-search-results').html(resultElement);
}

String.prototype.trunc = function() {
  if (this.length <= 55) { return this; }
  var subString = this.substr(0, 55);
  return (subString.substr(0, subString.lastIndexOf(' '))) + "&#8230;";
};

function watchSubmit() {
  $('.js-search-form').submit(function(e) {
    e.preventDefault();
    var query = $(this).find('.js-query').val();
    getDataFromApi(query, displayYoutubeSearchData);
  });
}

$(function(){watchSubmit();});