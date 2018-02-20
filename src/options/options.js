function save_options() {
  var badgeMode = document.getElementById('badgeMode').value;
  var fallbackSearch = document.getElementById('fallbackSearch').value;
  var openNewTab = document.getElementById('openNewTab').value;
  
  chrome.storage.sync.set({
    badgeMode: badgeMode,
    fallbackSearch: fallbackSearch,
    openNewTab: openNewTab
  }, function() {
    var status = document.getElementById('save');
    status.textContent = 'Saved successfully.';
    
    setTimeout(function() {
      status.textContent = 'Save';
    }, 3000);
  });
}

function restore_options() {
  chrome.storage.sync.get({
    badgeMode: 'normal',
    fallbackSearch: 'fallback-deactivated',
    openNewTab: 'new-tab-activated'
  }, function(items) {
    document.getElementById('badgeMode').value = items.badgeMode;
    document.getElementById('fallbackSearch').value = items.fallbackSearch;
    document.getElementById('openNewTab').value = items.openNewTab;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);