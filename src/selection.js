document.addEventListener('mouseup',function(event) {
    var sel = $.trim(window.getSelection().toString());
    message = processSelection(sel)

    if(sel.length) {
		chrome.runtime.sendMessage({'method': 'setMovie', 'message': message})
    } else {
    	chrome.runtime.sendMessage({'method': 'resetBadge'})
    }
});