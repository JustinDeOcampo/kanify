import { onAPIInputSubmit } from '../popup_scripts/buttonHandlers.js'
//Call the API checker function every 30 minutes if the user has already input a valid api token
chrome.storage.sync.get("user_token", (storage_data) => {
  if (storage_data.user_token) {
    setInterval(onAPIInputSubmit, 1000 * 60);
  }
})
