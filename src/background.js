// Configurations loaded from config.js

var _gaq = _gaq || [];
_gaq.push(['_setAccount', _analyticsCode]);

(function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    //ga.src = 'https://ssl.google-analytics.com/ga.js';
    ga.src = 'https://ssl.google-analytics.com/u/ga_debug.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

//////////////////////////




currentMovie = {};

function getMovieInfo(title) {
  return $.ajax({
    url: "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&r=json",
  });
}

function setMovieInfo(info) {
    currentMovie = info;
    chrome.browserAction.setBadgeBackgroundColor({ color: [109, 109, 109, 255] });
    chrome.browserAction.setBadgeText({text: info.imdbRating});
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  switch(request.method) {
    case 'setMovie':
        getMovieInfo(request.message).done(function(response) {
            if(response.Response != "False") {
                setMovieInfo(response);

                _gaq.push(['_trackEvent', 'movie-search', 'fired']);  
            }
        });
        break;
    case 'resetBadge':
        currentMovie = {};
        chrome.browserAction.setBadgeText({text: ""});
    default:
        break;
  }
});


chrome.browserAction.onClicked.addListener(function(activeTab){
    if(!$.isEmptyObject(currentMovie)) {
        _gaq.push(['_trackEvent', 'badge-click', 'clicked']);
        var url = "http://www.imdb.com/title/" +  currentMovie.imdbID;
        chrome.tabs.create({ url: url });
    }    
});


