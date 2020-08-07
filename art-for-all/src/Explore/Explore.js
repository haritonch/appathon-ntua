import React from 'react';
import { MoreByArtist } from './MoreByArtist';
import { MoreInDepartment } from './MoreInDepartment';
import { YouMightAlsoLike } from './YouMightAlsoLike';

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

export default Explore;
