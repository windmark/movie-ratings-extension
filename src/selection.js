// Event for contextmenu added to support immediate results when context menu
// is opened without mouseup event firing. Happens on two finger tap on touchpad
// among others.
eventList = ['mouseup', 'contextmenu']

eventList.forEach(function(eventName) {
	document.addEventListener(eventName,function(event) {
		var sel = $.trim(window.getSelection().toString());

		if(sel.length) {
			var node = window.getSelection().focusNode.nodeValue;
			var movieInfo = processSelection(node)
			chrome.runtime.sendMessage({'method': 'setMovie', 'message': movieInfo})
		} else {
			chrome.runtime.sendMessage({'method': 'resetBadge'})
		}
	});
});
