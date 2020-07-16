document.addEventListener('DOMContentLoaded', function (){
    document.querySelector('button').addEventListener('click',
    onclick, false)

    function onclick (){
        chrome.tabs.query({currentWindow: true, active: true},
            function(tabs){
                chrome.tabs.sendMessage(tabs[0].id, 'heyo', setCount)// does setCount function below
            })
    }

    function setCount(res){
        const div = document.createElement('div')
        div.textContent = `${res.count} kanji, and ${res.check}` // adds a div with this on it
        document.body.appendChild(div) // appends the new div above
    }
}, false)