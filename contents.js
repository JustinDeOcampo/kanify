chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    const re = /[\u4e00-\u9faf]+/igm
    const matches = document.documentElement.innerHTML.match(re)
  
    sendResponse({count: matches.length})




})