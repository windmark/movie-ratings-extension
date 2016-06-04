$(function(){
  $('#paste').click(function(){
    console.log("Click");
    pasteSelection();
  });
});

function pasteSelection() {
  chrome.tabs.query({active:true, windowId: chrome.windows.WINDOW_ID_CURRENT}, 

  function(tab) {
    chrome.tabs.sendMessage(tab[0].id, {method: "getSelection"},{frameId: 0}, function(response){
      var text = document.getElementById('text'); 
      console.log(response.data);
      text.innerHTML = response.data;
    });
  });
}