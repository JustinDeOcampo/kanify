chrome.storage.sync.get("kanji", function (data_storage) {
  //This function is automatically run once the page is loaded
  const pageLoaded = () => {
    console.log("PAGE LOADED")
    highlight_content(data_storage);
  };
  window.addEventListener("load", pageLoaded, false);

  //This is triggered on click of the kanify button
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    const re = new RegExp("[\u4e00-\u9faf]", "igm"); // regular expression
    const matches = document.documentElement.innerHTML.match(re); //Contains the set of all kanjis read on the page

    //Calling the highlight function, pass in the storage data
    let known_kanji_count = highlight_content(data_storage);
    sendResponse({ count: matches.length, known_count: known_kanji_count });
  });
});
