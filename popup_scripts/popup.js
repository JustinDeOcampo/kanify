/*Script which renders functions in the chrome extension "popup" */
import { apiInputRenderer, settingsInputRenderer } from './interface_renderer.js'
import { onAPIInputSubmit, onKanifyClick, onRefreshToggle } from './buttonHandlers.js'

/*Event listener which attaches this even handler once the DOM has loaded the content of a page */
document.addEventListener(
  "DOMContentLoaded",
  function () {
    //Decide which opening screen to render based off of if the user has input their token already or not
    chrome.storage.sync.get(["user_token", "page_refresh"], function (storage_data) {
      if (storage_data.user_token) {
        settingsInputRenderer();
      }
      else {
        apiInputRenderer();
      }

      /*Handles submission of API-Key by user */
      if (document.getElementById("API-Submit")) {
        document.getElementById("API-Submit").addEventListener("click", onAPIInputSubmit);
      }
      //Handles onClick of kanify button
      if (document.getElementById('Kanify')) {
        document.getElementById("Kanify").addEventListener("click", onKanifyClick);
      }
      //Handles onClick of the page refresh toggle option
      if (document.getElementById("Page-Refresh")) {
        let checkbox = document.getElementById('Page-Refresh')
        checkbox.checked = storage_data.page_refresh
        checkbox.addEventListener('click', onRefreshToggle)
      }
    })
  },
  false
);


