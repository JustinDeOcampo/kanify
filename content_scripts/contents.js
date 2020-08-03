chrome.storage.sync.get("kanji", function (data_storage) {
  document.addEventListener;
  //This is triggered on click of the kanify button
  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    const re = new RegExp("[\u4e00-\u9faf]", "igm"); // regular expression
    const matches = document.documentElement.innerHTML.match(re); // array of all kanji on page //Contains the set of all kanjis read on the page

    //Calling the highlight function, pass in the current url and the storage data
    let known_kanji_count = highlight_content(data_storage);
    sendResponse({ count: matches.length, known_count: known_kanji_count });
  });
});

/* TODO:
  -Have it activate upon scrolling to new content, this is really difficult lol
  -Have it activate automatically on a new page
  -Hotkey option for highlighting 
  -Style html
    -Rest of logins: 
      -Kanify me button
      -Settings
        -For re-inputting api key
        -Toggle automatic kanji highlighting vs hotkey
  -Clean up bug where theres no the kanji page 
  -Still a youtube bug for certain html elements disappearing
  -Youtube bug where it will not update the html elements on a page if you activate the plugin then go to another page
  */
