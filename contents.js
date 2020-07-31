chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  const re = new RegExp("[\u4e00-\u9faf]+", "igm"); // regular expression
  const matches = document.documentElement.innerHTML.match(re); // array of all kanji on page //Contains the set of all kanjis read on the page

  /* TODO:
  -Have it activate upon scrolling to new content
  -Have it activate automatically on a new page
  -Hotkey option for highlighting 
  -Style html
    -Rest of logins: 
      -Kanify me button
      -Settings
        -For re-inputting api key
        -Toggle automatic kanji highlighting vs hotkey
  -Clean up bug where theres no the kanji page 
  */
  const CURRENT_URL = request;
  //Regex expression to check if on youtube
  function ytVidId(url) {
    var p = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
    return url.match(p) ? true : false;
  }
  /*Finds the index of the kanji and then injects a span with a highlighted style to it */
  function highlight_character(tag, character, index, kanjis_replaced_counter) {
    //Saving the text content to a variable
    let innerHTML = tag.innerHTML;
    // this is how many characters are in the "hightlight" span
    const width_of_span = 31;
    //Grabbing correct index to slice at
    let updated_index = innerHTML.indexOf(
      character,
      index + kanjis_replaced_counter * width_of_span //Slice it into the correct index based off of how many spans we have already added
    );
    //Slicing the highlighted kanji into the text content
    let new_innerHTML =
      innerHTML.substring(0, updated_index) +
      "<span class='highlight'>" +
      innerHTML.substring(updated_index, updated_index + 1) +
      "</span>" +
      innerHTML.substring(updated_index + 1);
    console.log(new_innerHTML);
    //Inject the updated content into the page
    tag.innerHTML = new_innerHTML;
  }

  known_kanji_count = 0;
  chrome.storage.sync.get("kanji", function (data_storage) {
    console.log(data_storage.kanji);
    if (!data_storage.kanji) {
      alert("Please load your API token First");
    }

    let kanji_set = new Set(data_storage.kanji); //convert back to set
    let tag_list;
    let isYoutube = ytVidId(CURRENT_URL);

    if (isYoutube) {
      tag_list = ["yt-formatted-string", "span"];
    } else {
      tag_list = [
        "span",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "p",
        "a",
        "li",
        "tr",
        "td",
        "ruby",
      ];
    }
    //Iterate through all tags in tag_list
    for (tag of tag_list) {
      //Find all tags on screen that belong to tag
      var capt_tags = document.querySelectorAll(`${tag}:not(.highlight)`);

      for (captured of capt_tags) {
        let text = captured.textContent;
        let kanjis_replaced_counter = 0;
        //Run regex that checks for if the tag includes kanjis that we know from wani kani
        regex = new RegExp(data_storage.kanji.join("|")).exec(text);
        //If the tag contains known kanjis,
        if (regex) {
          //iterate through each character in the text content
          for (var i = 0; i < text.length; i++) {
            //If the kanji we found is known in wani kani, highlight it
            if (kanji_set.has(text.charAt(i))) {
              highlight_character(
                captured,
                text.charAt(i),
                i,
                kanjis_replaced_counter
              );
              kanjis_replaced_counter += 1;
              known_kanji_count += 1;
            }
          }
        }
      }
    }

    var highlighted = document.getElementsByClassName("highlight");
    for (highlight of highlighted) {
      // does the highlighting
      highlight.style["background-color"] = "#FF11FF";
    }
  });

  sendResponse({ count: matches.length, known_count: known_kanji_count });
  // sends to popup.js
});
