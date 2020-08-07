import React from 'react';
import ThumbnailImage from '../ThumbnailImage';

const MoreInDepartment = (props) => {
  if (props.moreObjectsInDepartment) {
    let thumbnailImages = props.moreObjectsInDepartment.map((obj) => (
        <ThumbnailImage
          url={obj.primaryImageSmall}
          object={obj}
          selectImage={props.selectImage}
          key={obj.objectID}
        />
      )
    );
    return (
      <div className="more in-department">
        <p>More in department: {props.departmentName}</p>
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

export default MoreInDepartment;
