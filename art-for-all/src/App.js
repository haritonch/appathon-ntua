import React from 'react';
import './App.css';

const MainArtwork = (props) => (
  <div className="main-artwork">
    <a href={props.object.objectURL} target="_blank" rel="noopener noreferrer">
      <img className="primary-image" src={props.object.primaryImageSmall} alt={props.object.title}/>
    </a>
    <div className="main-info">
      <h2 className="title">{props.object.title}</h2>
      <h4 className="date">{props.object.objectDate}</h4>
      <h3 className="artist">{props.object.artistDisplayName}</h3>
    </div>
  </div>
);

const ThumbnailImage = (props) => (
  <img className="thumbnail-image" src={props.url} alt={props.mainObject}
       onClick={() => {props.selectImage(props.object)}}/>
);

class MoreInDepartment extends React.Component {
  constructor(props) {
    super(props);
    this.deptIdOf = {};
    this.state = {
      mainObject: this.props.mainObject,
      objects: [],
    }
  }

  createNameIdMapping = async () => {
    const response = await fetch('https://collectionapi.metmuseum.org/public/collection/v1/departments');
    const responseJSON = await response.json();
    for (let dept of responseJSON.departments) {
      this.deptIdOf[dept.displayName] = dept.departmentId;
    }
  }

  getObjects = async () => {
    this.setState({
      objects: [],
    });
    let response = await fetch('https://collectionapi.metmuseum.org/public/collection/v1/departments');
    let responseJSON = await response.json();
    for (let dept of responseJSON.departments) {
      this.deptIdOf[dept.displayName] = dept.departmentId;
    }
    const deptID = this.deptIdOf[this.props.departmentName];
    response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?departmentId=${deptID}&hasImages=true&q=%22%22`);
    responseJSON = await response.json();
    const objIDs = responseJSON.objectIDs;
    const selection = objIDs.sort(() => .5 - Math.random()).slice(0, 6);
    for (let objID of selection) {
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

  render() {
    if (this.state.objects) {
      let thumbnailImages = this.state.objects.map( (obj) => (
          <ThumbnailImage
            url={obj.primaryImageSmall}
            object={obj}
            selectImage={this.props.selectImage}
          />
        )
      );
      return (
        <div className="more in-department">
          <p>More in department: {this.props.departmentName}</p>
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

class MoreByArtist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainObject: this.props.mainObject,
      objects: [],
    };
  }

  getObjects = async () => {
    this.setState({
      objects: [],
    });
    const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&artistOrCulture=true&q=${this.props.artistName}`);
    const responseJSON = await response.json();
    const objIDs = responseJSON.objectIDs;
    for (let objID of objIDs.sort(() => .3 - Math.random()).slice(0, 10)) {
      const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objID}`);
      const obj = await response.json();
      if (obj.artistDisplayName === this.state.mainObject.artistDisplayName) {
        this.setState({
          objects: this.state.objects.concat([obj]),
        });
      }
    }
  }

  componentDidMount() {
    this.getObjects();
  }

  render(){
    if (this.state.objects) {
      const thumbnailImages = this.state.objects.map( (obj) => (
          <ThumbnailImage
            mainObject={this.props.mainObject}
            url={obj.primaryImageSmall}
            object={obj}
            selectImage={this.props.selectImage}
          />
        )
      );
      return (
        <div className="more by-artist more">
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

class Explore extends React.Component {
  render() {
    return (
        this.props.mainObject.artistDisplayName && this.props.mainObject.department ?
        <div>
          <MoreByArtist
            mainObject={this.props.mainObject}
            artistName={this.props.mainObject.artistDisplayName}
            selectImage={this.props.selectImage}
          />
          <MoreInDepartment
            mainObject={this.props.mainObject}
            departmentName={this.props.mainObject.department}
            selectImage={this.props.selectImage}
          />
        </div> : <div></div>
    );
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      mainObject: null,
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
                <Explore
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
