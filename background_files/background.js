import { onAPIInputSubmit, onKanifyClick } from '../popup_scripts/buttonHandlers.js'
import { kanifyClicker } from '../popup_scripts/interface_renderer.js';
//Call the API checker function every 1 minutes if the user has already input a valid api token
chrome.storage.sync.get(["user_token", "kanji", "page_refresh"], (storage_data) => {
  //Calls api checker periodically
  if (storage_data.user_token) {
    setInterval(onAPIInputSubmit, 1000 * 5 * 60);

  }
  //Listens for if the hot key is pressed
  chrome.commands.onCommand.addListener(function (command) {
    if (command == "kanify_me") {
      onKanifyClick()
    }
  })
})

