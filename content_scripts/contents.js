chrome.storage.local.get(["kanji", "page_refresh"], function (storage_data) {

  //This function is automatically run once the page is loaded
  const pageLoaded = () => {
    highlight_content(storage_data);
  };
  //If the user has automatic page refresh enabled, call the highlight function on page refresh
  if (storage_data.page_refresh) {
    window.addEventListener("load", pageLoaded, false);
  }

  //This is triggered on click of the kanify button
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    //Calling the highlight function, pass in the storage data
    highlight_content(storage_data);
    sendResponse({ count: 0, known_count: 0 });
  });
});

