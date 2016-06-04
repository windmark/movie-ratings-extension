
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