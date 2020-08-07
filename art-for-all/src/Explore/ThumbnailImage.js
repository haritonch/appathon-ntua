import React from 'react';

const ThumbnailImage = (props) => (
  <img className="thumbnail-image" src={props.url} alt={props.object.title}
       onClick={() => {props.selectImage(props.object);}}/>
);

export default ThumbnailImage;
