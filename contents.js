chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  const re = new RegExp("[\u4e00-\u9faf]+", "igm"); // regular expression
  const matches = document.documentElement.innerHTML.match(re); // array of all kanji on page //Contains the set of all kanjis read on the page
  /*const kanjiSet = new Set(matches);*/

  var checker = 0;
  chrome.storage.sync.get('kanji', function(data_storage){
    console.log(data_storage.kanji) // printing as an array
    //convert back to set
    let kanji_set = new Set(data_storage.kanji)

    for(var i = 0; i < matches.length; i++ ){
        if(kanji_set.has(matches[i])){
            console.log('what\'s up')
        }
    }
    
  })
  for (var i = 0; i < matches.length; i++) {

    //console.log(matches[i]); // logging all the kanji
    checker = checker + 1; // This is just to show that I can pass more arguments to popup.js
  }
  sendResponse({ count: matches.length, check: checker }); // sends to popup.js
});
