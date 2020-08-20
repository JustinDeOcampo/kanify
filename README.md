# Kanify

This Google chrome extension highlights the kanji on a web-page up to the users current Wani Kani level.

Since there are more than 2,000 kanji characters a Japanese learner needs to learn to be deemed literate, we designed that a tool that helps users see how much progress they're making when it comes to reading kanjis. Through [WaniKani](http://wanikani.com), one of the most popular online Kanji learning platforms, users increase their kanji vocabulary through daily practice. Kanify enables Japanese learners to highlight the kanji they know in WaniKani up to their current level on any given web page. 

This project was made through using regular expressions to parse through certain HTML selectors to efficiently determine which HTML elements on a given page require Kanifying. Wani Kani's V2 RESTful API was implemented to store the user's kanji data in Chrome's synchronous storage, so that the extension works cross platform as long as the user is logged into their Google Chrome account. Conditional API calls are made only based on if the user's WaniKani level changes to prevent any unecessary API calls. 

## UPDATES
This project is currently on version 1.0.0. Updates will be pushed to the chrome store as needed.

## DEMO

![Kanify 2](https://i.imgur.com/66NEKI0.jpg)

Highlighted Kanjis include any kanji included in the users current level.

![Kanify 3](https://i.imgur.com/AFmytVh.jpg)

![Kanify 4](https://i.imgur.com/cHj1i4S.jpg)

(Note: Not currently working on Youtube.com)

## Credit

Credit to [WaniKani](http://wanikani.com) for creating a fantastic kanji learning system and providing a great API. 
