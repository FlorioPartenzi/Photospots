import Location from './Location';
import { getAllLocations, getPinned } from '../Services/ApiService';
import { useEffect, useState } from 'react';
import { auth } from '../utils/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { addToPinnedList } from '../app/features/pinnedList/pinnedListSlice';

function LocationList() {
  const [locations, setLocations] = useState([]);
  const dispatch = useDispatch();
  const locationList = useSelector((state) => state.locationList).locationList;
  const getLocations = async () => {
    const idToken = await auth.currentUser.getIdToken(true);
    const response = await getAllLocations(idToken);
    setLocations(response);
  };

  //set locations to all locations on first load
  useEffect(() => {
    getLocations();
    const setPinned = async () => {
      const idToken = await auth.currentUser.getIdToken(true);
      const pinned = await getPinned(idToken);
      dispatch(addToPinnedList([...pinned]));
    };
    setPinned();
  }, []);

  //if search show search else show all
  useEffect(() => {
    if (locationList[0]) {
      setLocations(locationList);
    } else {
      getLocations();
    }
  }, [locationList]);

  return (
    <ul className="photospotsListElement">
      {locations.map((location, i) => (
        <li key={i}>
          <Location location={location}></Location>
        </li>
      ))}
    </ul>
  );
}
export default LocationList;
