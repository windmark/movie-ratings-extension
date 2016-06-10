document.addEventListener('mouseup',function(event) {
    var sel = $.trim(window.getSelection().toString());
    
    if(sel.length) {
		chrome.runtime.sendMessage({'method': 'setMovie', 'message': sel})
    } else {
    	chrome.runtime.sendMessage({'method': 'resetBadge'})
    }
});