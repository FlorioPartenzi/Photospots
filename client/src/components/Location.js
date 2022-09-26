import { GoogleAuthProvider } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPinPosition } from '../app/features/pinPosition/pinPositionSlice';
import { updateViewPosition } from '../app/features/viewPosition/viewPositionSlice';
import { createAddressString } from '../utils/locationUtils';
import { ReactComponent as Pin_Outline } from '../Pin_Solid.svg';
import {
  addToPinnedList,
  removeFromPinnedList,
} from '../app/features/pinnedList/pinnedListSlice';

function Location({ location }) {
  const [isPinned, setIsPinned] = useState(false);
  const [classNames, setClassName] = useState('pin');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(addPinPosition([location.lon, location.lat]));
  }, []);
  const address = createAddressString(location);
  const goToPos = () => {
    dispatch(updateViewPosition([location.lon, location.lat]));
  };
  const togglePinned = () => {
    if (isPinned) {
      setClassName('pin');
      dispatch(removeFromPinnedList(location));
      setIsPinned(false);
    } else {
      setClassName('pin pinned');
      dispatch(addToPinnedList(location));
      setIsPinned(true);
    }
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
        <div style={{ display: 'flex' }}>
          <p className="photosptInfoAddress">{address}</p>
          <button onClick={togglePinned} className="pinBtn">
            <Pin_Outline className={classNames}></Pin_Outline>
          </button>
        </div>
      </div>
    </div>
  );
}
export default Location;
