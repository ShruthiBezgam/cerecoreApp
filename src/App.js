import React, { Component } from 'react';
import Header from './Components/HeaderComponent';
import './App.css';

class App extends Component {

  dataList = [];
  searchUrl = "https://youtube.googleapis.com/youtube/v3/search";
  channelId = "UCL03ygcTgIbe36o2Z7sReuQ"
  query = "COVID-19"
  API_KEY = 'AIzaSyB4XuWRDCGWgNddkUHnINSiitEnBEJsv_g';

  constructor() {
    super()
    this.state = {
      dataReady: false
    }
  }

  callSearchApi(pageToken) {
    let completeSearchUrl = this.searchUrl + "?part=snippet&channelId=" + this.channelId + "&maxResults=5&q=" + this.query + "&key=" + this.API_KEY + "&type=video";
    if (pageToken !== undefined && pageToken !== "") {
      completeSearchUrl = completeSearchUrl + "&pageToken=" + pageToken;
    }
    fetch(completeSearchUrl)
      .then(response => response.json())
      .then(data => {
        console.log("data", data);
        let responseList = data.items;
        console.log("responseList", responseList);
        for (let d of responseList) {
          this.dataList.push({ "videoId": d.id.videoId, "title": d.snippet.title, "publishedDate": d.snippet.publishTime, "description": d.snippet.description });
        }
        this.setState({ dataReady: true });
        /* if (data.nextPageToken !== undefined && data.nextPageToken !== "") {
          this.callSearchApi(data.nextPageToken);
        } else {
          this.setState({ dataReady: true });
        } */

      })
  }
  componentDidMount() {
    this.callSearchApi();
  }

  render() {
    if (this.state.dataReady) {
      const data = this.dataList.map(function (item, index) {
        let srcUrl = "https://www.youtube.com/embed/" + item.videoId;
        return (
          <div class="container-fluid ">
            <div>
              <Header />
            </div>
            <div class="container main py-3">
              <div class="row">
                <div class="col-4">
                  <iframe width="200" height="150" src={srcUrl} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
                </div>
                <div class="col-8">
                  <h5>{item.title}</h5>
                  <p style={{fontSize:'14px'}}>{item.description}</p>
                  <small><strong>PublishDate: {item.publishedDate}</strong></small>
                </div>
              </div>
            </div>
          </div>
        )
      })
      return (<div>{data}</div>)
    } else {
      return (<div> spinner! </div>)
    }
  }
}

export default App;