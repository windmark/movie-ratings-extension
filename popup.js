$(function(){
  $('#paste').click(function(){
    console.log("Click");
    pasteSelection();
  });
});


function getMovieInfo(title) {
  return $.ajax({
    url: "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&r=json",
  });
}


function logResults(info) {
  console.log(info);
  var textBox = document.getElementById('text');
  textBox.innerHTML = info.Title + " " + info.imdbRating;
  chrome.browserAction.setBadgeText({text: info.imdbRating});
}


function pasteSelection() {
  chrome.tabs.query({active:true, windowId: chrome.windows.WINDOW_ID_CURRENT}, 

  function(tab) {
    chrome.tabs.sendMessage(tab[0].id, {method: "getSelection"},{frameId: 0}, function(response){
      var selectedText = response.data;
      getMovieInfo(selectedText).done(logResults);
    });
  });
}