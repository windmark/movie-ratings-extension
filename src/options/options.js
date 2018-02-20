function save_options() {
  var badgeMode = document.getElementById('badgeMode').value;
  var fallbackSearch = document.getElementById('fallbackSearch').value;
  
  chrome.storage.sync.set({
    badgeMode: badgeMode,
    fallbackSearch: fallbackSearch
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
    fallbackSearch: 'fallback-deactivated'
  }, function(items) {
    document.getElementById('badgeMode').value = items.badgeMode;
    document.getElementById('fallbackSearch').value = items.fallbackSearch;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);