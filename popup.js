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

      var apiEndpointPath = "subjects";

      var requestHeaders = new Headers({
        Authorization: "Bearer " + apiToken,
      });
      var apiEndpoint = new Request(
        "https://api.wanikani.com/v2/" + apiEndpointPath,
        {
          method: "GET",
          headers: requestHeaders,
        }
      );

      fetch(apiEndpoint)
        .then((response) => response.json())
        .then((responseBody) => console.log(responseBody));
    }
  },
  false
);
