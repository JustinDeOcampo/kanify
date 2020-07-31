document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("Kanify").addEventListener("click", onclick);
  //triggered when the kanify button is clicked
  function onclick() {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      //sends the content of the current tab to the content script
      chrome.tabs.sendMessage(tabs[0].id, tabs[0].url, setCount);
    });
  }

  function setCount(res) {
    const div = document.createElement("div");
    div.textContent = `${res.count} kanji and you know ${res.known_count}`; // adds a div with this on it ${res.count}
    document.body.appendChild(div); // appends the new div above
  }
});
