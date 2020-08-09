//This function renders the html for the API input screen
export const apiInputRenderer = () => {
  const div = document.getElementById("Input-Container");
  div.innerHTML = `
    <label for="API-Input">Wani Kani v2 API Key</label><br />
      <input
        id="API-Input"
        type="text"
        placeholder="Please paste Wani Kani v2 API Key here"
      /><br />
      <button id="API-Submit" type="button">Insert API key</button>
    `;
};

//This function renders the html for the kanify button screen
export const settingsInputRenderer = () => {
  const div = document.getElementById("Input-Container");
  div.innerHTML = `
  <button class = "Kanify" id="Kanify">Kanify Me!</button>
  <label class = "label">Enable kanify on page load</label>
  <label class="switch">
    <input type="checkbox" id="Page-Refresh" >
    <span class="slider round"></span>
  </label>
  `;
};

//This function deletes the html for the API input screen
export const apiInputRemover = () => {
  document
    .getElementById("Input-Container")
    .removeChild(document.getElementById("API-Container"));
};

// This function clicks the kanify button, used for hotkey
// I think this is useless, But when I delete it the hotkey breaks...
export const kanifyClicker = () => {
  //alert("clicking button")
  document.getElementsByTagName("button").click()
};


