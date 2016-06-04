
var selectedText = "";

document.addEventListener('mouseup',function(event) {
    var sel = window.getSelection().toString();
    if(sel.length) {
		selectedText = sel;
		chrome.runtime.sendMessage({'method': 'setMovie', 'message': sel})
    } else {
    	chrome.runtime.sendMessage({'method': 'resetBadge'})
    }
});


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.method == "getSelection") {
		sendResponse({data: selectedText});
		//sendResponse({data: window.getSelection().toString()});
	} else {
		sendResponse({});
	}
});