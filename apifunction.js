/*This function manipulates the API data once it is called */

function apifunction(responseBody) {
  console.log(responseBody);
  //Save user's current level
  chrome.storage.sync.get("current_user_level", function (storage_data) {
    //if user level is not in storage, add it to storage
    if (!storage_data["current_user_level"]) {
      CURRENT_USER_LEVEL = responseBody[2].data.level;
      chrome.storage.sync.set({ current_user_level: CURRENT_USER_LEVEL });
    }
    //if user level is in storage, just grab that value
    else {
      CURRENT_USER_LEVEL = storage_data.current_user_level;
    }
  });

  chrome.storage.sync.get("kanji", function (data) {
    let kanji_set = new Set();
    //if the kanji data does not exist yet OR user level has changed, add it to storage
    if (!data.kanji) {
      let i = 0;
      while (i < 1000) {
        if (responseBody[0].data[i].data.level <= CURRENT_USER_LEVEL) {
          kanji_set.add(responseBody[0].data[i].data.characters);
        }
        if (responseBody[1].data[i].data.level <= CURRENT_USER_LEVEL) {
          kanji_set.add(responseBody[1].data[i].data.characters);
        }
        i++;
      }
      //adding the set to storage
      chrome.storage.sync.set({ kanji: [...kanji_set] });
    } else {
      /*else if (user level has CHANGED and kanji set already exists)
      //add the new kanjis to the kanji_set 
    */
      kanji_set = new Set(data.kanji);
      console.log(kanji_set);
    }
  });
}

const createRequest = (endpointpath, apiToken) => {
  /*Header authenticates the request with the user's api token  */
  var requestHeaders = new Headers({
    Authorization: "Bearer " + apiToken,
  });
  /*Creating Request object with parameters*/
  var request = new Request("https://api.wanikani.com/v2/" + endpointpath, {
    method: "GET",
    headers: requestHeaders,
  });
  return request;
};

export { apifunction, createRequest };
