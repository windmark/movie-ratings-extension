function getMovieInfo(title) {
  return $.ajax({
    url: "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&r=json",
  });
}

function setMovieInfo(info) {
  chrome.browserAction.setBadgeText({text: info.imdbRating});
  //var textBox = document.getElementById('text');
  //textBox.value = info.Title + " " + info.imdbRating;
  
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.method == "setMovie") {
    getMovieInfo(request.message).done(function(response) {
        if(response.Response != "False") {
            console.log(response);
            setMovieInfo(response);    
        }
    });
  }
});

