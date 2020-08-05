import React from 'react';
import './App.css';

const MainArtwork = (props) => (
  <div className="main-artwork">
    <div className="main-info">
      <h1 className="title">{props.object.title}</h1>
      <h4 className="date">{props.object.objectDate}</h4>
      <h3 className="artist">{props.object.artistDisplayName}</h3>
    </div>
    <a href={props.object.objectURL} target="_blank">
      <img className="primary-image" src={props.object.primaryImageSmall} alt="primary image"/>
    </a>
  </div>
);

const ThumbnailImage = (props) => (
  <img className="thumbnail-image" src={props.url} alt="thumbnail"
       onClick={() => {props.selectImage(props.object)}}/>
);

class MoreByArtist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      objects: [],
    };
  }

  getObjects = async () => {
    const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&artistOrCulture=true&q=${this.props.artistName}`);
    const responseJSON = await response.json();
    const objIDs = responseJSON.objectIDs;
    const objects = [];
    for (let objID of objIDs.slice(0, 5)) {
      const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objID}`);
      const obj = await response.json();
      this.setState({
        objects: this.state.objects.concat([obj]),
      });
    }
  }

  componentDidMount() {
    this.getObjects();
  }

  render(){
    if (this.state.objects) {
      let thumbnailImages = this.state.objects.map( (obj) => (
          <ThumbnailImage
            url={obj.primaryImageSmall}
            obect={obj}
            selectImage={this.props.selectImage}
          />
        )
      );
      return (
        <div className="more-by-artist">
          <p>More by {this.props.artistName}</p>
          <div className="thumbnail">
            { thumbnailImages }
          </div>
        </div>
      );
    }
    else {
      return <div></div>
    }
  }
}

class Discover extends React.Component {
  render() {
    return (
        this.props.mainObject.artistDisplayName ?
        <MoreByArtist
          artistName={this.props.mainObject.artistDisplayName}
          imageURLs={["https://images.metmuseum.org/CRDImages/ep/web-large/DT1396.jpg"]}
          selectImage={this.props.selectImage}
        /> : <div></div>
    );
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      mainObject: {},
    };
  }

  async componentDidMount() {
    let response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${436532}`);
    let obj = await response.json();
    this.setState({
      mainObject: obj,
    })
  }

  selectImage = (obj) => {
    this.setState({
      mainObject: obj,
    });
  }

  render() {
    return (
      <div className="App">
        <div className="container-fluid">
          <div className="row">
            <div className="col left-half">
              {
                this.state.mainObject ?
                <MainArtwork
                  object={this.state.mainObject}
                /> : <div></div>
              }
            </div>
            <div className="col right-half">
              {this.state.mainObject ?
                <Discover
                  mainObject={this.state.mainObject}
                  selectImage={this.selectImage}
                /> : <div></div>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default App;
