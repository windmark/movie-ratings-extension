function processSelection(sel) {
    var title = ""
    var episode = ""
    var yearList = []
    var yearRegex = /\d{4}[^a-zA-Z]/g;
    var episodeRegex = /s[0-9]+.{1}e[0-9]+/gi;
    var regionRegex = /US|UK/g;

    if(sel) {
        sel = sel.replace(regionRegex, '')
    }

    while(yearRegex.test(sel) == true) {
        matchedIndex = yearRegex.lastIndex - 5
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
    if(title) {
        title = $.trim(title.replace('|', ''))    
    }
    year = $.trim(year)

    return {"title": title, "year": year, "episode": episode}
}