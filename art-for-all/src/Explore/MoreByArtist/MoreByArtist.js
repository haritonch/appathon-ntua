import React from 'react';
import ThumbnailImage from '../ThumbnailImage';

const MoreByArtist = (props) => {
  if (props.moreObjectsByArtist) {
    const thumbnailImages = props.moreObjectsByArtist.map( (obj) => (
        <ThumbnailImage
          url={obj.primaryImageSmall}
          object={obj}
          selectImage={props.selectImage}
          key={obj.objectID}
        />
      )
    );
    return (
      <div className="more by-artist more">
        <p>More by {props.artistName}</p>
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

export default MoreByArtist;
