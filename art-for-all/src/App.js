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
  <img className="thumbnail-image" src={props.url} alt={props.object.title}
       onClick={() => {props.selectImage(props.object)}}/>
);

class YouMightAlsoLike extends React.Component {
  render() {
    if (this.props.moreObjectsYouMightLike) {
      let thumbnailImages = this.props.moreObjectsYouMightLike.map((obj) => (
          <ThumbnailImage
            url={obj.primaryImageSmall}
            object={obj}
            selectImage={this.props.selectImage}
          />
        )
      );
      return (
        <div className="more you-might-also-like">
          <p>You might also like</p>
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

class MoreInDepartment extends React.Component {
  render() {
    if (this.props.moreObjectsInDepartment) {
      let thumbnailImages = this.props.moreObjectsInDepartment.map((obj) => (
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
  render(){
    if (this.props.moreObjectsByArtist) {
      const thumbnailImages = this.props.moreObjectsByArtist.map( (obj) => (
          <ThumbnailImage
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
            artistName={this.props.mainObject.artistDisplayName}
            moreObjectsByArtist={this.props.moreObjectsByArtist}
            selectImage={this.props.selectImage}
          />
          <MoreInDepartment
            departmentName={this.props.mainObject.department}
            moreObjectsInDepartment={this.props.moreObjectsInDepartment}
            selectImage={this.props.selectImage}
          />
          <YouMightAlsoLike
            moreObjectsYouMightLike={this.props.moreObjectsYouMightLike}
            selectImage={this.props.selectImage}
          />

        </div> : <div></div>
    );
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.deptIdOf = {};
    this.state = {
      mainObject: null,
      moreObjectsByArtist: null,
      moreObjectsInDepartment: null,
      moreObjectsYouMightLike: null,
    };
  }

  getMoreByArtist = async () => {
    this.setState({
      moreObjectsByArtist: [],
    });
    const artistName = this.state.mainObject.artistDisplayName;
    const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&artistOrCulture=true&q=${artistName}`);
    const responseJSON = await response.json();
    const objectIDs = responseJSON.objectIDs;
    console.log(objectIDs);
    for (let objectID of objectIDs.sort(() => .3 - Math.random()).slice(0, 10)) {
      const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`);
      const object = await response.json();
      if (object.artistDisplayName === artistName) {
        console.log("Im In");
        this.setState({
          moreObjectsByArtist: this.state.moreObjectsByArtist.concat([object]),
        });
      }
    }
  }

  getMoreInDepartment = async () => {
    this.setState({
      moreObjectsInDepartment: [],
    });
    const deptID = this.deptIdOf[this.state.mainObject.department];
    const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?departmentId=${deptID}&hasImages=true&q=%22%22`);
    const responseJSON = await response.json();
    const objectIDs = responseJSON.objectIDs;
    const selection = objectIDs.sort(() => .5 - Math.random()).slice(0, 6);
    for (let objectID of selection) {
      const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`);
      const object = await response.json();
      this.setState({
        moreObjectsInDepartment: this.state.moreObjectsInDepartment.concat([object]),
      });
    }
  }

  getMainObject = async (objectID) => {
    let response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`);
    let mainObject = await response.json();
    this.setState({
      mainObject,
    });
  }

  createDeptIdOf = async () => {
    const response = await fetch('https://collectionapi.metmuseum.org/public/collection/v1/departments');
    const responseJSON = await response.json();
    for (let dept of responseJSON.departments) {
      this.deptIdOf[dept.displayName] = dept.departmentId;
    }
  }

  getYouMightLike = async () => {
    this.setState({
      moreObjectsYouMightLike: [],
    })
    const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=""`);
    const responseJSON = await response.json();
    const objectIDs = responseJSON.objectIDs;
    for (let objectID of objectIDs.sort(() => .3 - Math.random()).slice(0, 10)) {
      const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`);
      const object = await response.json();
      this.setState({
        moreObjectsYouMightLike: this.state.moreObjectsYouMightLike.concat([object]),
      });
    }
  }

  componentDidMount() {
    this.getMainObject(436532)
    .then(() => {
      this.getMoreByArtist();
      this.createDeptIdOf()
      .then(() => {
        this.getMoreInDepartment();
      });
      this.getYouMightLike();
    });
  }

  selectImage = async (mainObject) => {
    const oldMainObject = this.state.mainObject;
    this.setState({
      mainObject
    });
    if (mainObject.artistDisplayName !== oldMainObject.artistDisplayName) {
      this.getMoreByArtist();
    }
    if (mainObject.department !== oldMainObject.department) {
      this.getMoreInDepartment();
    }
    this.getYouMightLike();
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
                  moreObjectsByArtist={this.state.moreObjectsByArtist}
                  moreObjectsInDepartment={this.state.moreObjectsInDepartment}
                  moreObjectsYouMightLike={this.state.moreObjectsYouMightLike}
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
