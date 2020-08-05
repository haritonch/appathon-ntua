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
  <img className="thumbnail-image" src={props.url} alt="thumbnail image" />
);

class MoreByArtist extends React.Component {
  render(){
    return (
      <div className="more-by-artist">
        <p>More by {this.props.artistName}</p>
        <div className="thumbnail">
          {
            this.props.imageURLs.map((url) => (
                <ThumbnailImage
                  url={url}
                />
              )
            )
          }
        </div>
      </div>
    );
  }
}

class Discover extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.mainObject);
    this.state = {
      mainObject: this.props.mainObject,

    };
  }

  render() {
    return (
        this.props.mainObject.artistDisplayName ?
        <MoreByArtist
          artistName={this.props.mainObject.artistDisplayName}
          imageURLs={["https://images.metmuseum.org/CRDImages/ep/web-large/DT1396.jpg"]}
        /> : <div></div>
    );
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      objects: null,
      mainObject: null,
    };
  }

  componentDidMount = async () => {
    let response = await fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects');
    const objects = await response.json().objectIDs;
    response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${436532}`)
    const mainObject = await response.json();
    this.setState({
      objects,
      mainObject,
    });
  }

  getObject = async (objId) => {
    const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objId}`);
    const object = await response.json();
    console.log(object);
    return object;
  }

  render() {
    return (
      <div className="App">
        <div className="container-fluid">
          <div className="row">
            <div className="col left-half">
              {this.state.mainObject ?
                <MainArtwork
                  object={this.state.mainObject}
                /> : <div></div>
              }
            </div>
            <div className="col right-half">
              {this.state.mainObject ?
                <Discover
                  mainObject={this.state.mainObject}
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
