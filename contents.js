chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  const re = new RegExp("[\u4e00-\u9faf]+", "igm"); // regular expression
  const matches = document.documentElement.innerHTML.match(re); // array of all kanji on page //Contains the set of all kanjis read on the page
  /*const kanjiSet = new Set(matches);*/
  

  /* NEW IDEA //////////////////////////////////////////////
  skip the regex, just get all text on doc, if it matches the kanji,
  grab it directly and replace
  */
  
///////////////////////////////////////////////////////


  //.replace attempt

  // for( var i = 0; i < matches.length; i++){
  //   var highlightedboi = matches[i].replace(re, replacer)
  //   console.log(highlightedboi)

  // }
  function replacer(match){ // function to set the class to "highlight"
    //console.log(match)
    // vvv this doesn't work darnit
    //var styler = match.style.color = '#FF00FF' 
    //can't use .setAttribute smhhhh
    //var attribute = match.setAttribute("class", "highlight");
    return attribute;
  }
  




  function highlight_character(tag,character) {
    var innerHTML = tag.innerHTML;
    var index = innerHTML.indexOf(character);
    innerHTML = innerHTML.substring(0,index) + "<span class='highlight'>" + innerHTML.substring(index,index+1) + "</span>" + innerHTML.substring(index+1);
    tag.innerHTML = innerHTML;
  }

  
  
  var known_kanji_count = 0
  chrome.storage.sync.get('kanji', function(data_storage){ 
    if(!data_storage.kanji){
        console.log("load your API First")
    }

    console.log(data_storage.kanji) // printing as an array
    let kanji_set = new Set(data_storage.kanji) //convert back to set

    //List of all tags that could contain kanji
    tag_list = ['h1','h2','h3','h4','h5','p','a','li']
    //Iterate through all tags in tag_list
    for(tag of tag_list){
      //Find all tags on screen that belong to tag
      var capt_tags = document.getElementsByTagName(tag)
      for(captured of capt_tags){
        //Run regex that looks for all known kanji in the tag text content
        regex = new RegExp(data_storage.kanji.join("|")).exec(captured.textContent)
        if (regex) {
          console.log('hi')
          //captured.style['background-color'] = '#FF00FF'
          
          text = captured.textContent
          for(var i = 0; i < text.length; i++){
            if(kanji_set.has(text.charAt(i))){
              highlight_character(captured, text.charAt(i))
            }
          }
        }
      }
    }

    var highlighted = document.getElementsByClassName("highlight")
    for(highlight of highlighted){ // does the highlighting
      highlight.style['background-color'] = '#FF11FF'
    }

    
    for(var i = 0; i < matches.length; i++ ){
      if(kanji_set.has(matches[i])){
          console.log('known kanji count + 1')
          known_kanji_count = known_kanji_count + 1
          //console.log(matches[i])
          //matches[i].setAttribute('class', 'highlight')
          //var highlightedboi = matches[i].replace(re, replacer)

      }
    }
    document.querySelectorAll('*').forEach(function(node){

    });
    //if we change the attributes, we will change styling like this
    let highlighterGuys = document.getElementsByClassName('highlight')
    for(character of highlighterGuys){
      character.style['background-color'] = '#FF00FF';
    }
    
  })
  known_kanji_count = known_kanji_count + 1
  sendResponse({ count: matches.length, known_count: known_kanji_count });
   // sends to popup.js
});
