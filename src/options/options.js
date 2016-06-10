function save_options() {
  var badgeMode = document.getElementById('badgeMode').value;
  
  chrome.storage.sync.set({
    badgeMode: badgeMode,
  }, function() {
    var status = document.getElementById('status');
    status.textContent = 'Saved successfully.';
    
    setTimeout(function() {
      status.textContent = '';
    }, 1800);
  });
}

function restore_options() {
  chrome.storage.sync.get({
    badgeMode: 'normal',
  }, function(items) {
    document.getElementById('badgeMode').value = items.badgeMode;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);