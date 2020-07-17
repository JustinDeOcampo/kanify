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

      var apiSubjectEndPointPath = "subjects";
      var apiUserEndPointPath = "user";

      /*Wani Kani's API formatted header, which holds the API token  */
      var requestHeaders = new Headers({
        Authorization: "Bearer " + apiToken,
      });

      /*Creating Vocabulary Request object */
      var apiSubjectEndpoint = new Request(
        "https://api.wanikani.com/v2/" + apiSubjectEndPointPath,
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
      Promise.all([fetch(apiSubjectEndpoint), fetch(apiUserEndpoint)])
        .then(async ([subject, user]) => {
          //destructuring promises
          const subject_data = await subject.json(); //jsonify each endpoint
          const user_data = await user.json();
          return [subject_data, user_data]; //return an array of jsons
        })
        .then((responseBody) => {
          console.log(responseBody);
          const CURRENT_USER_LEVEL = responseBody[1].data.level;

          //Adding kanjis to a set
          let i = 439; //Part in API array where kanji's begin
          let kanjiSet = new Set();
          while (i < 1000) {
            if (responseBody[0].data[i].data.level <= CURRENT_USER_LEVEL) {
              kanjiSet.add(responseBody[0].data[i].data.characters);
            }
            i++;
          }
          console.log(kanjiSet);
        });
    }
  },
  false
);
