/*Script which renders functions in the chrome extension "popup" */
import { apifunction } from "./apifunction.js";

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
      //Check chrome storage to see if user has input the api token in before
      chrome.storage.sync.get('user_token', function (data) {
        //if user has not put in the api token, add it to the storage
        var apiToken
        if (!data["user_token"]) {
          apiToken = document.getElementById("API-Input").value;
          chrome.storage.sync.set({ 'user_token': apiToken });
          console.log("FIRST TIME USER EH")
        }
        //if user has already put in api token, just use what is in storage
        //TODO: Make it so if user has already put in API token, they don't have to press submit 
        else {
          apiToken = data.user_token
          console.log("WE ALREADY GOT YO SHIT " + String(data.user_token))
        }
        //Perform operation on given apiToken
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
          .then(apifunction); //call api function to manipulate data*/
      });
    }
  },
  false
);



