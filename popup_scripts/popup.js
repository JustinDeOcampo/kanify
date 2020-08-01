/*Script which renders functions in the chrome extension "popup" */
import { apiInputRenderer, settingsInputRenderer } from './interface_renderer.js'
import { onAPIInputSubmit, onKanifyClick } from './buttonHandlers.js'

/*Event listener which attaches this even handler once the DOM has loaded the content of a page */
document.addEventListener(
  "DOMContentLoaded",
  function () {

    chrome.storage.sync.get("user_token", function (storage_data) {
      if (storage_data.user_token) {
        settingsInputRenderer();
      }
      else {
        apiInputRenderer();
      }

      //Periodically check if we need to make api calls every three hours
      setInterval(onAPIInputSubmit, 1000 * 60 * 3);

      /*Handles submission of API-Key by user */
      if (document.getElementById("API-Submit")) {
        document.getElementById("API-Submit").addEventListener("click", onAPIInputSubmit);
      }
      //Handles onClick of kanify button
      if (document.getElementById('Kanify')) {
        document.getElementById("Kanify").addEventListener("click", onKanifyClick);
      }
    })
  },
  false
);
