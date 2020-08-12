chrome.storage.sync.get(["kanji", "page_refresh"], function (storage_data) {

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
    const re = new RegExp("[\u4e00-\u9faf]", "igm"); // regular expression
    const matches = document.documentElement.innerHTML.match(re); //Contains the set of all kanjis read on the page

    //Calling the highlight function, pass in the storage data
    let known_kanji_count = highlight_content(storage_data);
    sendResponse({ count: matches.length, known_count: known_kanji_count });
  });
});

/*
TODO:
- Stop kanjij_count from printing multiple times
- Style html
- Automatic page loading bug --> add async function or something
- Fix youtube bug
- Add link to WaniKani page for highlighted kanjis
- Add '?' icon for how to find personal access token
- Fix adding new div's for kanji count
- Remove Alerts
*/
