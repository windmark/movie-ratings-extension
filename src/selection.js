// Event for contextmenu added to support immediate results when context menu
// is opened without mouseup event firing. Happens on two finger tap on touchpad
// among others.
eventList = ['mouseup', 'contextmenu']

eventList.forEach(function(eventName) {
	document.addEventListener(eventName,function(event) {
		var sel = $.trim(window.getSelection().toString());
		movieInfo = processSelection(sel)

		if(sel.length) {
			chrome.runtime.sendMessage({'method': 'setMovie', 'message': movieInfo})
		} else {
			chrome.runtime.sendMessage({'method': 'resetBadge'})
		}
	});
});
