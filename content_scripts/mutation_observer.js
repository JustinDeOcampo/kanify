//Call yt vid function to see which taglist to use
/*let isYoutube = ytVidId(CURRENT_URL);
if (isYoutube) {
  tag_list = ["yt-formatted-string", "span"];
} else {
  tag_list = [
    "span",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "p",
    "a",
    "li",
    "tr",
    "td",
    "ruby",
  ];
  
}*/
//for each tag in the taglist set observer.observe(tag,config)
/*
let targetNode = document.body;

//const targetNode = document.body;
const config = { attributes: false, childList: true, subtree: true };

//Callback function which is executed on each item that the observer finds
const callback = function (mutationsList, observer) {
  for (let mutation of mutationsList) {
    console.log(mutation.target);
  }
};
// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);
// Start observing the target node for configured mutations
observer.observe(targetNode, config);
*/
