document.addEventListener('mouseup',function(event) {
    var sel = $.trim(window.getSelection().toString());

    var title = ""
    var year_list = []
    var year_regexp = /\d{4}/g;
    
    while(year_regexp.test(sel) == true) {
    	matched_index = year_regexp.lastIndex - 4
    	year = sel.substr(matched_index, 4)
    	year_list.push([year, matched_index])
    }

    if(year_list.length > 0) {
    	title = $.trim(sel.substr(0, year_list[year_list.length - 1][1]))
    	year = year_list[year_list.length - 1][0]
    } else {
    	title = sel
    	year = ""
    }
    
    message = {"title": title, "year": year}
    
    if(sel.length) {
		chrome.runtime.sendMessage({'method': 'setMovie', 'message': message})
    } else {
    	chrome.runtime.sendMessage({'method': 'resetBadge'})
    }
});