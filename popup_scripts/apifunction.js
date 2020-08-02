/*This function manipulates the API data once it is called */

function apifunction(responseBody) {
  console.log(responseBody);

  //bool that keeps track of whether or not we need to record new data from the API
  var hasModified;

  //Save user's current level
  var CURRENT_USER_LEVEL;
  chrome.storage.sync.get("current_user_level", function (storage_data) {
    //if user level is not in storage or if the level in storage doesnt match up with the current API data, update storage
    if (
      responseBody.length === 4 &&
      (!storage_data["current_user_level"] ||
        storage_data["current_user_level"] != responseBody[2].data.level)
    ) {
      hasModified = true;
      CURRENT_USER_LEVEL = responseBody[2].data.level;
      chrome.storage.sync.set({ current_user_level: CURRENT_USER_LEVEL });
    }
    //if user level is in storage, just grab that value
    else {
      CURRENT_USER_LEVEL = storage_data.current_user_level;
      console.log(
        "Current user level loaded from storage: " + CURRENT_USER_LEVEL
      );
      hasModified = false;
    }
  });
  chrome.storage.sync.get("kanji", function (data) {
    let kanji_set = new Set();
    //if the kanji data does not exist yet OR user level has changed, add it to storage
    if (!data.kanji || hasModified) {
      let i = 0;
      while (i < 1000) {
        //if the level of the kanji is less than or equal to the user's level, add it to the set
        if (responseBody[0].data[i].data.level <= CURRENT_USER_LEVEL) {
          kanji_set.add(responseBody[0].data[i].data.characters);
        }
        if (responseBody[1].data[i].data.level <= CURRENT_USER_LEVEL) {
          kanji_set.add(responseBody[1].data[i].data.characters);
        }
        i++;
      }
      //adding the set to storage
      chrome.storage.sync.set({ kanji: [...kanji_set] }); //spread operator takes every variable and places it there
    } else {
      kanji_set = new Set(data.kanji);
      console.log("Kanji loaded from storage:");
      console.log(kanji_set);
    }
  });
  //returning the status code of the api call for future use
  return responseBody[3];
}

const createRequest = (endpointpath, apiToken, last_modified_date) => {
  /*Header authenticates the request with the user's api token  */
  var requestHeaders = new Headers({
    Authorization: "Bearer " + apiToken,
  });
  //if last modified date exists, append it to the header, so we can keep track of when we last accessed the api
  if (last_modified_date !== null) {
    requestHeaders.append("If-Modified-Since", last_modified_date);
    console.log("Last date api was modified: " + last_modified_date);
  }
  /*Creating Request object with parameters*/
  var request = new Request("https://api.wanikani.com/v2/" + endpointpath, {
    method: "GET",
    headers: requestHeaders,
  });
  return request;
};

export { apifunction, createRequest };
