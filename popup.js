/*Script which renders functions in the chrome extension "popup" */
import { apifunction, createRequest } from "./apifunction.js";

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
      chrome.storage.sync.get("user_token", function (data) {
        var apiToken;
        //if user has not put in the api token, add it to the storage
        if (!data["user_token"]) {
          apiToken = document.getElementById("API-Input").value;
          chrome.storage.sync.set({ user_token: apiToken });
          console.log("We just saved your token: " + apiToken);
        }
        //if user has already put in api token, just use what is in storage
        else {
          apiToken = data.user_token;
          console.log(
            "Your token has been loaded from storage: " +
              String(data.user_token)
          );
        }

        //TODO: Make it so if user has already put in API token, the html input doesnt get rendered

        ///////////////////////////////////////////////////////////////////
        chrome.storage.sync.get(["last_modified_user"], function (data) {
          var appendable_user;
          //if last modified date exists in storage, append it to the request header
          if (data.last_modified_user) {
            appendable_user = data.last_modified_user;
          } else {
            appendable_user = null;
          }
          //Saving API endpoints we want to access to variables
          var apiSubjectEndPointPath_1 = "subjects?page_after_id=439";
          var apiSubjectEndPointPath_2 = "subjects?page_after_id=1439";
          var apiUserEndPointPath = "user";
          //Creating request objects with given endpoints
          var apiSubjectEndpoint_1 = createRequest(
            apiSubjectEndPointPath_1,
            apiToken,
            null
          );
          var apiSubjectEndpoint_2 = createRequest(
            apiSubjectEndPointPath_2,
            apiToken,
            null
          );
          var apiUserEndpoint = createRequest(
            apiUserEndPointPath,
            apiToken,
            appendable_user
          );
          //Making calls to subject/user endpoints
          Promise.all([
            fetch(apiSubjectEndpoint_1),
            fetch(apiSubjectEndpoint_2),
            fetch(apiUserEndpoint),
          ])
            .then(async ([subject_1, subject_2, user]) => {
              //adding last modified-dates to storage
              chrome.storage.sync.set({
                last_modified_user: user.headers.get("last-modified"),
                last_modified_subject_1: subject_1.headers.get("last-modified"),
                last_modified_subject_2: subject_2.headers.get("last-modified"),
              });
              //If 401, user did not enter valid api key
              if (user.status === 401) {
                console.log(
                  "You did not enter a valid API key! Please try again"
                );
                return [];
                //if 304, user data has not changed since last API access, so do not make any api calls
              } else if (user.status === 304) {
                console.log("Made 0 API calls!");
                return [];
              }
              //else, retrieve the user's information from the api
              else {
                console.log(
                  "We are retrieving ur info for the first time. Code: " +
                    user.status
                );
                //destructuring promises and jsonify the body of data
                const user_data = await user.json();
                const subject_data_1 = await subject_1.json();
                const subject_data_2 = await subject_2.json();

                return [subject_data_1, subject_data_2, user_data]; //return an array of jsons
              }
            })
            .then(apifunction); //call api function to manipulate data*/
        });
      });
    }
  },
  false
);
