import React from 'react';

const MainArtwork = (props) => (
  <div className="main-artwork">
    <a href={props.object.objectURL} target="_blank" rel="noopener noreferrer">
      <img className="primary-image" src={props.object.primaryImageSmall} alt={props.object.title}/>
    </a>
    <div className="main-info">
      <h2 className="title">{props.object.title}</h2>
      <h4 className="date">{props.object.objectDate} {props.object.country ? "," + props.object.country : ""}</h4>
      <h3 className="artist">{props.object.artistDisplayName}</h3>
    </div>
  </div>
);

export default MainArtwork;
