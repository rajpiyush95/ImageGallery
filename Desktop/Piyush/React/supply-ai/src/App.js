import React from "react";

import Comp from "./Comp";
import "./Comp.css";

const URL =
  "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=";
const SECRET = "4d89dcfda021622b427cba06e5e79578";
const QUERY = "&per_page=20&format=json&nojsoncallback=1";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pictures: []
    };

    //this.fetchPhotos = this.fetchPhotos.bind(this);
    this.createImageArray = this.createImageArray.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.fetchPhotosInstantly = this.fetchPhotosInstantly.bind(this);

    this.currOffsetHeight = 0;
    this.page = 1;
    this.pictures = [];
  }

  handleScroll() {
    //console.log("scrolled")
    //window.scrollY 
    const offsetHeight = document.body.offsetHeight;
    console.log(window.innerHeight)
    console.log(document.documentElement.scrollTop)
    console.log(offsetHeight)
    
    if (
      window.innerHeight + document.documentElement.scrollTop >= offsetHeight &&
      offsetHeight > this.currOffsetHeight
    ) {
      this.currOffsetHeight = offsetHeight;
      this.page = this.page + 1;
      console.log("scrolled")
      this.fetchPhotosInstantly(this.page);
    }
  }

  componentDidMount() {
    window.onscroll = () => this.handleScroll();
  }

  createImageArray(resp) {
    let picArray = resp.photos.photo.map(pic => {
      var srcPath =
        "https://farm" +
        pic.farm +
        ".staticflickr.com/" +
        pic.server +
        "/" +
        pic.id +
        "_" +
        pic.secret +
        ".jpg";
      return srcPath;
    });
    this.pictures = [...this.pictures, ...picArray];
    this.setState({ pictures: this.pictures });
  }

  // fetchPhotos(page = 1, clear) {
  //   const input = document.getElementById("input");
  //   if (clear) {
  //     this.pictures = [];
  //     this.page = 1;
  //     this.currOffsetHeight = 0;
  //   }
  //   if(input.value.length !== 0)
  //   {
  //     fetch(URL + SECRET + "&tags=" + input.value + "&page=" + page + QUERY)
  //     .then(response => response.json())
  //     .then(j => this.createImageArray(j));
  //   }
    
  // }

  fetchPhotosInstantly(page = 1) {
    const input = document.getElementById("input");

    if(input.value.length === 0)
    {
      this.setState({ pictures: [] });
    }
    
    if(input.value.length !== 0)
    {
      this.setState({ pictures: [] });
      this.pictures = []
      fetch(URL + SECRET + "&tags=" + input.value + "&page=" + page + QUERY)
      .then(response => response.json())
      .then(j => this.createImageArray(j));
    }
    
  }

  render() {
    return (
      <div id = "main">
        
        <input placeholder = "Type to Search Image" onChange={() => this.fetchPhotosInstantly(1)} type="text" id="input" />
        {/* <button id = "getData" onClick={() => this.fetchPhotos(1, true)}> Search </button> */}
        {this.state.pictures.length > 0 ? (
          <Comp images={this.state.pictures} />
        ) : null}
      </div>
    );
  }
}

export default App;
