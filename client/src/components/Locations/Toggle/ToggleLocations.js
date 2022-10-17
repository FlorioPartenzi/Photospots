import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLocationList } from '../../../app/features/locationList/locationListSlice';
import { getLocationsByUser, getPinned } from '../../../Services/ApiService';
import { auth } from '../../../utils/firebase';
import './ToggleLocations.css';

function ToggleLocations() {
  const [togglePinned, setTogglePinned] = useState('My Photospots');
  const dispatch = useDispatch();

  const displayMyPhotospots = async () => {
    const idToken = await auth.currentUser.getIdToken();
    setTogglePinned('My Photospots');
    const myPhotospots = await getLocationsByUser(idToken);
    dispatch(setLocationList(myPhotospots));
  };

  const displayPinned = async () => {
    const idToken = await auth.currentUser.getIdToken();
    setTogglePinned('Pinned');
    const pinned = await getPinned(idToken);
    dispatch(setLocationList(pinned));
  };

  const toggle = async () => {
    if (togglePinned == 'Pinned') {
      displayMyPhotospots();
    } else {
      displayPinned();
    }
  };

  useEffect(() => {
    displayMyPhotospots();
  }, []);

  return (
    <button onClick={toggle} className="locationFeedToggle">
      <h1>{togglePinned}</h1>
    </button>
  );
}
export default ToggleLocations;
