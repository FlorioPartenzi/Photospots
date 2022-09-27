import { GoogleAuthProvider } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPinPosition } from '../app/features/pinPosition/pinPositionSlice';
import { updateViewPosition } from '../app/features/viewPosition/viewPositionSlice';
import { createAddressString } from '../utils/locationUtils';
import { ReactComponent as Pin_Outline } from '../Pin_Solid.svg';
import { auth } from '../utils/firebase';
import {
  addToPinnedList,
  removeFromPinnedList,
} from '../app/features/pinnedList/pinnedListSlice';
import { getPinned, getUserInfo, putPinned } from '../Services/ApiService';

function Location({ location }) {
  const [isPinned, setIsPinned] = useState(false);
  const [classNames, setClassName] = useState('pin');
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();
  const address = createAddressString(location);
  const goToPos = () => {
    dispatch(updateViewPosition([location.lon, location.lat]));
  };

  console.log(location.imgUrl);
  const togglePinned = () => {
    const setPin = async () => {
      const idToken = await auth.currentUser.getIdToken(true);
      if (isPinned) {
        setClassName('pin');
        dispatch(removeFromPinnedList(location));
        putPinned(location.id, false, idToken);
        setIsPinned(false);
      } else {
        setClassName('pin pinned');
        dispatch(addToPinnedList(location));
        putPinned(location.id, true, idToken);
        setIsPinned(true);
      }
    };
    setPin();
  };

  useEffect(() => {
    console.log(location);
    const getUsername = async () => {
      const idToken = await auth.currentUser.getIdToken(true);
      const user = await getUserInfo(idToken);
      setUsername(user.name);
    };
    dispatch(addPinPosition([location.lon, location.lat]));
    const pinMe = async () => {
      const idToken = await auth.currentUser.getIdToken(true);
      const pinned = await getPinned(idToken);
      const isPinned = pinned.some((pinned) => {
        return pinned.id == location.id;
      });

      if (isPinned) {
        setIsPinned(true);
        setClassName('pin pinned');
      }
    };
    getUsername();
    pinMe();
  }, []);

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
          <div className="photospotBottomLine">
            <h2 className="photospotInfoTitle">{location.title}</h2>
            <p className="usernameSmall">
              <small>{username}</small>
            </p>
          </div>
          <p>{location.description}</p>
        </div>
        <div className="photospotBottomLine">
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
