import { GoogleAuthProvider } from 'firebase/auth';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addPinPosition } from '../app/features/pinPosition/pinPositionSlice';
import { updateViewPosition } from '../app/features/viewPosition/viewPositionSlice';
import { createAddressString } from '../utils/locationUtils';

function Location({ location }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(addPinPosition([location.lon, location.lat]));
  }, []);
  const address = createAddressString(location);

  const goToPos = () => {
    dispatch(updateViewPosition([location.lon, location.lat]));
  };

  return (
    <div
      className="photospot"
      onClick={() => {
        goToPos();
      }}
    >
      <div>
        <img src={location.imgUrl} className="photospotImage"></img>
      </div>
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
