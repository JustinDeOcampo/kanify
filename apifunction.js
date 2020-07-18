/*This function manipulates the API data once it is called */

function apifunction(responseBody) {
  console.log(responseBody);
  const CURRENT_USER_LEVEL = responseBody[2].data.level;
  let i = 0;
  let kanji_set = new Set();
  while (i < 1000) {
    if (responseBody[0].data[i].data.level <= CURRENT_USER_LEVEL) {
      kanji_set.add(responseBody[0].data[i].data.characters);
    }
    if (responseBody[1].data[i].data.level <= CURRENT_USER_LEVEL) {
      kanji_set.add(responseBody[1].data[i].data.characters);
    }
    i++;
  }
  /*
    chrome.storage.sync.set({ 'kanji': [...kanji_set] });
  
    chrome.storage.sync.get('kanji', function (items) {
      if (!chrome.runtime.error) {
        var mySet = new Set(items.kanji)
        console.log(mySet)
  
      }
    });
    */

}




export { apifunction };
