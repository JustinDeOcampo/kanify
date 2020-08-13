//You can call this function and pass in the current_url in order to highlight the kanjis on the page
const highlight_content = (data_storage) => {

  known_kanji_count = 0;
  console.log(data_storage.kanji);
  let kanji_set = new Set(data_storage.kanji); //convert back to set
  let tag_list;
  let isYoutube = ytVidId();

  if (isYoutube) {
    tag_list = ["span", "a"]
    //"yt-formatted-string",
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

  return known_kanji_count;
};

/*Finds the index of the kanji and then injects a span with a highlighted style to it */
function highlight_character(tag, character, index, kanjis_replaced_counter) {
  //Saving the text content to a variable
  let innerHTML = tag.innerHTML;
  // this is how many characters are in the "highlight" span
  const width_of_span = 77;
  //Grabbing correct index to slice at
  let updated_index = innerHTML.indexOf(
    character,
    index + kanjis_replaced_counter * width_of_span //Slice it into the correct index based off of how many spans we have already added
  );
  //Slicing the highlighted kanji into the text content
  let new_innerHTML =
    innerHTML.substring(0, updated_index) +
    "<span class='highlight' style='background-color:rgb(255,105,255,0.9)'>" +
    innerHTML.substring(updated_index, updated_index + 1) +
    "</span>" +
    innerHTML.substring(updated_index + 1);
  //Inject the updated content into the page
  tag.innerHTML = new_innerHTML;
}

//Regex expression to check if on youtube
function ytVidId() {
  return String(location.host) === "www.youtube.com" ? true : false;

}
