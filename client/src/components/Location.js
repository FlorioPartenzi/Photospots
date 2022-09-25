import { useEffect } from 'react';
import { createAddressString } from '../utils/locationUtils';

function Location({ location }) {
  const address = createAddressString(location);
  return (
    <div className="photospot">
      <img src={location.imgUrl} className="photospotImage"></img>
      <div className="photospotInfoContainer">
        <div>
          <h2 className="photospotInfoTitle">{location.title}</h2>
          <p>{location.description}</p>
        </div>
        <p className="photosptInfoAddress">{address}</p>
      </div>
    </div>
  );
}
export default Location;
