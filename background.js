chrome.storage.sync.get("user_token", function (storage_data) {
  chrome.browserAction.onClicked.addListener(function () {
    if (storage_data.user_token) {
      chrome.browserAction.setPopup({ popup: "html_files/normal.html" });
    } else {
      chrome.browserAction.setPopup({ popup: "html_files/register.html" });
    }
  });
});
