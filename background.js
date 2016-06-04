
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
                console.log(response);
                setMovieInfo(response);    
            }
        });
        break;
    case 'resetBadge':
        chrome.browserAction.setBadgeText({text: ""});
    default:
        break;
  }
});


chrome.browserAction.onClicked.addListener(function(activeTab){
    console.log(currentMovie);
    url = "http://www.imdb.com/title/" +  currentMovie.imdbID;
    chrome.tabs.create({ url: url });
});