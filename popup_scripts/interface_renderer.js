//This function renders the html for the API input screen
export const apiInputRenderer = () => {
  const div = document.createElement("div");
  div.id = "API-Container";
  div.innerHTML = `
    <label for="API-Input">Wani Kani v2 API Key</label><br />
      <input
        id="API-Input"
        type="text"
        placeholder="Please paste Wani Kani v2 API Key here"
      /><br />
      <button id="API-Submit" type="button">Insert API key</button>
    `;
  document.getElementsByClassName("Input-Container")[0].appendChild(div);
};

//This function renders the html for the kanify button screen
export const settingsInputRenderer = () => {
  const div = document.createElement("div");
  div.className = "Kanify-Container";
  div.innerHTML = `<button id="Kanify">Kanify Me!</button>`;
  document.getElementsByClassName("Input-Container")[0].appendChild(div);
};

//This function deletes the html for the API input screen
export const apiInputRemover = () => {
  document
    .getElementById("Input-Container")
    .removeChild(document.getElementById("API-Container"));
};
