import React from 'react';
import './App.css';
import { MainArtwork } from './MainArtwork';
import { Explore } from './Explore';

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

  getMainObject = async (objectID) => {
    let response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`);
    let mainObject = await response.json();
    this.setState({
      mainObject,
    });
  }

  getMoreByArtist = async () => {
    this.setState({
      moreObjectsByArtist: [],
    });
    const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&artistOrCulture=true&q=${this.state.mainObject.artistDisplayName}`);
    const responseJSON = await response.json();
    const objectIDs = await responseJSON.objectIDs;
    const selection = objectIDs.sort(() => .5 - Math.random()).slice(0, 6);
    for (let objectID of selection) {
      const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`);
      const object = await response.json();
      if (object.artistDisplayName === this.state.mainObject.artistDisplayName) {
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
    const objectIDs = await responseJSON.objectIDs;
    const selection = objectIDs.sort(() => .5 - Math.random()).slice(0, 6);
    for (let objectID of selection) {
      const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`);
      const object = await response.json();
      this.setState({
        moreObjectsInDepartment: this.state.moreObjectsInDepartment.concat([object]),
      });
    }
  }

  getYouMightLike = async () => {
    this.setState({
      moreObjectsYouMightLike: [],
    });
    const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=""`);
    const responseJSON = await response.json();
    const objectIDs = responseJSON.objectIDs;
    let i = 6;
    while (i > 0) {
      const objectID = objectIDs[Math.floor(Math.random() * objectIDs.length)];
      const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`);
      const object = await response.json();
      if (object.artistDisplayName !== "") {
        i--;
        this.setState({
          moreObjectsYouMightLike: this.state.moreObjectsYouMightLike.concat([object]),
        });
      }
    }
  }

  createDeptIdOf = async () => {
    const response = await fetch('https://collectionapi.metmuseum.org/public/collection/v1/departments');
    const responseJSON = await response.json();
    for (let dept of responseJSON.departments) {
      this.deptIdOf[dept.displayName] = dept.departmentId;
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

  selectImage = async (object) => {
    const oldMainObject = this.state.mainObject;
    await this.setState({
      mainObject: object,
    });
    if (object.artistDisplayName !== oldMainObject.artistDisplayName) {
      this.getMoreByArtist();
    }
    if (object.department !== oldMainObject.department) {
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
