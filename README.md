# appathon-ntua

## Project Goal
The goal of this project is to build a front-end app that makes requests to the [Met Museum API](https://metmuseum.github.io/) and display paintings and information about them. The final project will look like Instagram's explore page, but filled with paintings. When the user clicks on a painting, requests are made to bring more relevant artwork (same period, same artist, same collection, etc.). It may not be clear how this application enhances the quality of life in a society: Making art accessible contributes to overall happiness, please watch [this video](https://www.youtube.com/watch?v=-O5kNPlUV7w). 

## Implementation
The implementation uses HTML, CSS (Bootstrap), Javascript (React) for the front-end and Java (Spring) for the rest-service.

## Run
The app is deployed with github-pages and you can run it on http://haritonch.github.io/appathon-ntua.

To run locally you need gradle and npm.
#### Front end

`cd art-for-all`

`npm start`

#### REST Web Service

`cd gs-rest-service-complete`

`./gradlew bootRun`


You also need [this Chrome plugin](https://chrome.google.com/webstore/detail/moesif-origin-cors-change/digfbfaphojjndkpccljibejjbppifbc) or something similar for your web browser to run locally.
