import React from 'react';
import ThumbnailImage from '../ThumbnailImage';

const YouMightAlsoLike = (props) => {
  if (props.moreObjectsYouMightLike) {
    let thumbnailImages = props.moreObjectsYouMightLike.map((obj) => (
        <ThumbnailImage
          url={obj.primaryImageSmall}
          object={obj}
          selectImage={props.selectImage}
          key={obj.objectID}
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

export default YouMightAlsoLike;
