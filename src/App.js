import React, { Component } from 'react';
const API_KEY = 'AIzaSyAmR9D14t6tKjjTjmA80JyX_S2UYrCHwr4';


class App extends Component {

  /* loadYoutubeApi() {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/client.js";

    script.onload = () => {
      
      window.gapi.load('client', () => {
        window.gapi.client.setApiKey(API_KEY);
        window.gapi.client.load('youtube', 'v3', () => {
          console.log("setstate")
          this.setState({ gapiReady: true });
        });
      });
    };

    document.body.appendChild(script);
  } */
  initGapi = () => {
    console.log('Initializing GAPI...');
    console.log('Creating the google script tag...');

    const script = document.createElement("script");
    script.onload = () => {
      console.log('Loaded script, now loading our api...')
      // Gapi isn't available immediately so we have to wait until it is to use gapi.
      this.loadClientWhenGapiReady(script);
    };
    script.src = "https://apis.google.com/js/client.js";
    
    document.body.appendChild(script);
  }

  loadClientWhenGapiReady = (script) => {
    console.log('Trying To Load Client!');
    console.log(script)
    if(script.getAttribute('gapi_processed')){
      console.log('Client is ready! Now you can access gapi. :)');
      if(window.location.hostname==='localhost'){
        window.gapi.load('client', () => {
          window.gapi.client.setApiKey(API_KEY);
          console.log("gapiInfor",window.gapi.client)
          window.gapi.client.load('youtube', 'v3', () => {
            console.log("setstate")
            console.log("gapiInfor 67",window.gapi.client.youtube.channels.list({
              "part": [
                "snippet,contentDetails,statistics"
              ],
              "id": [
                "UCL03ygcTgIbe36o2Z7sReuQ"
              ]
            }))
            this.setState({ gapiReady: true });
          });
        });
      }
    }
    else{
      console.log('Client wasn\'t ready, trying again in 100ms');
      setTimeout(() => {this.loadClientWhenGapiReady(script)}, 100);
    }
  }
  componentDidMount() {
    this.initGapi();
  }

  render() {
    
     return (
       <h1>GAPI is loaded and ready to use.</h1>
     );
  
}
}

export default App;