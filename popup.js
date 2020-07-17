/*Script which renders functions in the chrome extension "popup" */

/*Event listener which attaches this even handler once the DOM has loaded the content of a page */
document.addEventListener(
  "DOMContentLoaded",
  function () {
    ////////////////////////////////////////////////////////////////////////////
    document.querySelector("button").addEventListener("click", onclick, false);

    function onclick() {
      chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, "heyo", setCount); // does setCount function below
      });
    }

    function setCount(res) {
      const div = document.createElement("div");
      div.textContent = `${res.count} kanji, and ${res.check}`; // adds a div with this on it
      document.body.appendChild(div); // appends the new div above
    }

    //////////////////////////////////////////////////////////////////////////
    /*Handles submission of API-Key by user */
    document.getElementById("API-Submit").addEventListener("click", onSubmit);

    /*On submit button, authorize users API key */
    function onSubmit() {
      var apiToken = document.getElementById("API-Input").value;

      var apiSubjectEndPointPath_1 = "subjects?page_after_id=439";
      var apiSubjectEndPointPath_2 = "subjects?page_after_id=1439";
      /*TODO:subjectendpoint path 3, there are still some kanjis for level 60 on the next page of subjects */
      var apiUserEndPointPath = "user";

      /*Header authenticates the request with the user's api token  */
      var requestHeaders = new Headers({
        Authorization: "Bearer " + apiToken,
      });

      /*Creating Vocabulary Request object */
      var apiSubjectEndpoint_1 = new Request(
        "https://api.wanikani.com/v2/" + apiSubjectEndPointPath_1,
        {
          method: "GET",
          headers: requestHeaders,
        }
      );
      /*Creating 2nd set of Vocabulary Request object */
      var apiSubjectEndpoint_2 = new Request(
        "https://api.wanikani.com/v2/" + apiSubjectEndPointPath_2,
        {
          method: "GET",
          headers: requestHeaders,
        }
      );

      /*Creating user Request object*/
      var apiUserEndpoint = new Request(
        "https://api.wanikani.com/v2/" + apiUserEndPointPath,
        {
          method: "GET",
          headers: requestHeaders,
        }
      );

      //Making calls to subject/user endpoints
      Promise.all([
        fetch(apiSubjectEndpoint_1),
        fetch(apiSubjectEndpoint_2),
        fetch(apiUserEndpoint),
      ])
        .then(async ([subject_1, subject_2, user]) => {
          //destructuring promises
          const subject_data_1 = await subject_1.json(); //jsonify each endpoint
          const subject_data_2 = await subject_2.json();
          const user_data = await user.json();
          return [subject_data_1, subject_data_2, user_data]; //return an array of jsons
        })
        .then((responseBody) => {
          console.log(responseBody);
          const CURRENT_USER_LEVEL = responseBody[2].data.level;

          //Adding kanjis to a set (probably move this to its own function)
          let i = 0; //Part in API array where kanji's begin
          let kanjiSet = new Set(); //TODO: add this to cache once its completed
          while (i < 1000) {
            if (responseBody[0].data[i].data.level <= CURRENT_USER_LEVEL) {
              kanjiSet.add(responseBody[0].data[i].data.characters);
            }
            if (responseBody[1].data[i].data.level <= CURRENT_USER_LEVEL) {
              kanjiSet.add(responseBody[1].data[i].data.characters);
            }
            i++;
          }
          console.log(kanjiSet);
        });
    }
  },
  false
);
