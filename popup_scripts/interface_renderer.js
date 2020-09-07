//This function renders the html for the API input screen
export const apiInputRenderer = () => {
  const div = document.getElementById("Input-Container");
  div.innerHTML = `
    <div id = "Info-Box" class="Info-Box">
    <label class="Info-Light">Highlight kanji up to your WaniKani Level!</label>
    </div>
    
    <label class="Info-Dark" for="API-Input">Insert Personal Access Token</label>
    <label class="Info-Small" for="API-Input">(Wanikani.com -> Settings -> API Tokens -> Generate New Token)</label>
    <br />
      <input 
        id="API-Input"
        type="text"
        placeholder=""
      /><br />
      <button class="Submit-Button" id="API-Submit" type="button">Submit</button>
    `;
};

//This function renders the html for the kanify button screen
export const settingsInputRenderer = () => {
  const div = document.getElementById("Input-Container");
  div.innerHTML = `
  <div class="Info-Box">
    <label style = "margin-top:5px;" class="Info-Light">PC: Ctrl + Shift + X</label><br />
    <label class="Info-Light">Mac: Cmd + Shift + X</label>
  </div>
  <button class = "Kanify" id="Kanify">Kanify Me!</button>
  <label class="switch">
    <input type="checkbox" id="Page-Refresh" >
    <span class="slider round"></span>
  </label>
  <label class="label" for="Page-Refresh">Enable kanify on page load</label>
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


