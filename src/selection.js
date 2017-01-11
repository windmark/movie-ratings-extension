document.addEventListener('mouseup',function(event) {
	var sel = $.trim(window.getSelection().toString());

	if(sel.length) {
		var node = window.getSelection().focusNode.nodeValue
		var movieInfo = null
		
		if(node) {
			movieInfo = processSelection(node)
		}
		
		var fallbackInfo = processSelection(sel)
		chrome.runtime.sendMessage({
			'method': 'setMovie',
			'message': {'default': movieInfo, 'fallback': fallbackInfo}
		})
	} else {
		chrome.runtime.sendMessage({'method': 'resetBadge'})
	}
});



document.addEventListener('contextmenu',function(event) {
	if(event.target.host == 'www.netflix.com') {
		var nodeInfo = event.target.nextElementSibling.innerText
		var movieInfo = processSelection(nodeInfo)
		var fallbackInfo = {'title': nodeInfo.split('\n')[0], 'year': ''}
		movieInfo['search-movie-info'] = true
		fallbackInfo['search-movie-info'] = true
		
		chrome.runtime.sendMessage({
			'method': 'setMovie',
			'message': {'default': movieInfo, 'fallback': fallbackInfo}
		})
	} else {
		var sel = $.trim(window.getSelection().toString());	

		if(sel.length) {
			var node = window.getSelection().focusNode.nodeValue
			var movieInfo = null
			
			if(node) {
				movieInfo = processSelection(node)
			}
			
			var fallbackInfo = processSelection(sel)
			chrome.runtime.sendMessage({
				'method': 'setMovie',
				'message': {'default': movieInfo, 'fallback': fallbackInfo}
			})
		} else {
			chrome.runtime.sendMessage({'method': 'resetBadge'})
		}	
	}
	
});
