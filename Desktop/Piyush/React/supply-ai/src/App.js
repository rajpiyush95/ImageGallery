import React from "react";

import Comp from "./Comp";

// constants in API call

const URL =
  "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=";
const SECRET = "4d89dcfda021622b427cba06e5e79578";
const QUERY = "&per_page=10&format=json&nojsoncallback=1";

// intialize intial state with urls in pictures array

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pictures: []
    };

    
    this.fetchPhotosInstantly = this.fetchPhotosInstantly.bind(this);
    this.createImageArray = this.createImageArray.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.fetchPhotosOnScroll = this.fetchPhotosOnScroll.bind(this);

    this.currOffsetHeight = 0;
    this.page = 1;
    this.pictures = [];
  }

  // this function takes care of responsive scrolling

  handleScroll() {
    const offsetHeight = document.body.offsetHeight;
    //console.log(window.innerHeight)
    //console.log(document.documentElement.scrollTop)
    //console.log(offsetHeight)
    
    if (window.innerHeight + document.documentElement.scrollTop>= offsetHeight) {
      this.currOffsetHeight = offsetHeight;
      this.page = this.page + 1;
      this.fetchPhotosOnScroll(this.page);
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


  // this function is used to call fetch data from next page on scrolling
  fetchPhotosOnScroll(page) {
    const input = document.getElementById("input");
    fetch(URL + SECRET + "&tags=" + input.value + "&page=" + page + QUERY)
      .then(response => response.json())
      .then(j => this.createImageArray(j));

  }


  // this function call the api as per the changing input
  fetchPhotosInstantly(page = 1) {
    const input = document.getElementById("input");

    if(input.value.length === 0)
    {
      this.setState(
        {
          pictures:[]
        }
      )
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
        <div id = "justInput">
            <input placeholder = "Type To Search Image" onChange={() => this.fetchPhotosInstantly(1)} type="text" id="input" />
        </div>
        
        {this.state.pictures.length > 0 ? (
          <Comp images={this.state.pictures} />
        ) : null}
      </div>
    );
  }
}

export default App;
