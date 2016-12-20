document.addEventListener('mouseup',function(event) {
    var sel = $.trim(window.getSelection().toString());
    movieInfo = processSelection(sel)

    if(sel.length) {
		chrome.runtime.sendMessage({'method': 'setMovie', 'message': movieInfo})
    } else {
    	chrome.runtime.sendMessage({'method': 'resetBadge'})
    }
});