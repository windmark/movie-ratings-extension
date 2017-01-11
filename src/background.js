// Configurations loaded from config.js

var _gaq = _gaq || [];
_gaq.push(['_setAccount', _analyticsCode]);

(function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = 'https://ssl.google-analytics.com/ga.js';
    //ga.src = 'https://ssl.google-analytics.com/u/ga_debug.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

chrome.storage.sync.get({
    badgeMode: 'normal',
}, function(items) {
    badgeMode = items.badgeMode;
});


chrome.storage.onChanged.addListener(function(changes, namespace) {
    for (key in changes) {
      var storageChange = changes[key];
      if(key == 'badgeMode') {
        badgeMode = storageChange.newValue;
      }
    }
});



//////////////////////////

currentMovie = {};

function getMovieInfo(details) {
    title = details['title'].replace(/ /g, "+")
    year = details['year']
    type = ""

    if(details['episode']) {
        type = "series"
    }

    requestUrl = "http://www.omdbapi.com/?t=" + title + "&y=" + year 
        + "&type=" + type + "&plot=short&r=json"

    var response = $.ajax({
        url: requestUrl
    });
    return response
}

function setMovieInfo(info) {
    currentMovie = info;
    currentMovie.url = "http://www.imdb.com/title/" +  info.imdbID;
    drawIcon(info.imdbRating)
    chrome.browserAction.setTitle({title: info.Title + ' ' + info.Year})
}

function setSearch(requestInfo) {
    currentMovie.url = "http://www.imdb.com/find?q=" + requestInfo.title + "&s=all"
    drawIcon("N/A")

}

function drawIcon(text, reset) {
    if(badgeMode == 'minimal') {
        var canvas = document.createElement('canvas');
        canvas.width = 19;
        canvas.height = 19;

        var context = canvas.getContext('2d');
        context.fillStyle = "#000000";
        context.textAlign = "center";
        context.textBaseline = "middle";

        if(text == "10.0" || text == "N/A") {
            context.font = "11px Arial";
            context.fillText(text, 9, 12);
        } else {
            context.font = "14px Arial";
            context.fillText(text, 10, 12);
        }

        chrome.browserAction.setIcon({
            imageData: context.getImageData(0, 0, 19, 19)
        });
    } else {
        chrome.browserAction.setBadgeBackgroundColor({ color: [85, 85, 85, 255] });
        chrome.browserAction.setBadgeText({text: text});
    }
}

function resetIcon() {
    chrome.browserAction.setIcon({path:"assets/icon.png"});
    chrome.browserAction.setBadgeText({text: ""});
    chrome.browserAction.setTitle({title: ""})

}


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    switch(request.method) {
        case 'setMovie':
            getMovieInfo(request.message.default).done(function(response) {
                if(response.Response != "False") {
                    setMovieInfo(response);
                    _gaq.push(['_trackEvent', 'movie-search', 'fired']);
                } else {
                    getMovieInfo(request.message.fallback).done(function(fallbackResponse) {
                        if(fallbackResponse.Response != "False") {
                            setMovieInfo(fallbackResponse);
                            _gaq.push(['_trackEvent', 'movie-search', 'fired']);
                        } else {
                            setSearch(request.message.default)
                        }
                    });
                }
            }).error(function() {
                getMovieInfo(request.message.fallback).done(function(response) {
                    if(response.Response != "False"){
                        setMovieInfo(response);
                        _gaq.push(['_trackEvent', 'movie-search', 'fired']);
                    } else {
                        setSearch(request.message.default)
                    }
                });
            });
            break;
        case 'resetBadge':
            currentMovie = {};
            resetIcon();
            break;
        default:
            break;
    }
});



chrome.browserAction.onClicked.addListener(function(activeTab){
    if(!$.isEmptyObject(currentMovie)) {
        _gaq.push(['_trackEvent', 'badge-click', 'clicked']);
        var url = currentMovie.url
        chrome.tabs.create({ url: url });
    } else {
        _gaq.push(['_trackEvent', 'badge-click', 'empty-clicked']);
        var url = "http://www.imdb.com/find?q=&s=all"
        chrome.tabs.create({ url: url });
    }
});



chrome.contextMenus.removeAll(function() {
    chrome.contextMenus.create({
        "id": "searchImdb",
        "title": "Search IMDb for '%s'",
        "contexts": ["selection", "link"]
    });
});



chrome.contextMenus.onClicked.addListener(function(info, tab) {
    var sel = info.selectionText;
    var movieInfo = processSelection(sel)
    var url = "http://www.imdb.com/find?q=" + movieInfo.title + "&s=all"
    _gaq.push(['_trackEvent', 'context-click', 'clicked']);
    chrome.tabs.create({ url: url });
});