document.addEventListener('mouseup',function(event) {
    var sel = $.trim(window.getSelection().toString());

    var title = ""
    var yearList = []
    var yearRegex = /\d{4}/g;
    var episodeRegex = /s[0-9]*e[0-9]*/gi;
    
    while(yearRegex.test(sel) == true) {
    	matchedIndex = yearRegex.lastIndex - 4
    	year = sel.substr(matchedIndex, 4)
    	yearList.push([year, matchedIndex])
    }

    if(yearList.length > 0) {
    	title = $.trim(sel.substr(0, yearList[yearList.length - 1][1]))
    	year = yearList[yearList.length - 1][0]
    } else {
    	title = sel
    	year = ""
    }

    if(episodeRegex.test(title)) {
    	matchedIndex = episodeRegex.lastIndex
    	episodeRegex.lastIndex = 0
    	episode = episodeRegex.exec(title)[0]
    	title = title.substring(0, matchedIndex - episode.length)
    }

    message = {"title": title, "year": year}
    
    if(sel.length) {
		chrome.runtime.sendMessage({'method': 'setMovie', 'message': message})
    } else {
    	chrome.runtime.sendMessage({'method': 'resetBadge'})
    }
});