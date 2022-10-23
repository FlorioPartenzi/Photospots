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
    if (myPhotospots.length > 0) dispatch(setLocationList(myPhotospots));
    if (myPhotospots.length == 0) {
      dispatch(
        setLocationList([
          {
            id: '6332f23407c2afa587d7c59d',
            title: 'No Photospots',
            description: "You currently don't have any Photospots!",
            user: { name: 'nobody', email: 'nowhere@nirwana.com' },
            imgUrl:
              'https://firebasestorage.googleapis.com/v0/b/photospots-e5a41.appspot.com/o/utils%2FPhotospots_Logo_512x512.png?alt=media&token=aaba6daf-27c6-414b-a817-63b627bb0efc',
            housenumber: '',
            street: '',
            city: '',
            postcode: '',
            country: 'nowhere',
            lon: 10.7915786,
            lat: 45.8141194,
            isPinned: false,
          },
        ])
      );
    }
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
