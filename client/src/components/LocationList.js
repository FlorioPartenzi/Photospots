import Location from './Location';
import { getAllLocations, getPinned } from '../Services/ApiService';
import { useEffect, useState } from 'react';
import { auth } from '../utils/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { addToPinnedList } from '../app/features/pinnedList/pinnedListSlice';
import { getUsersCurrentLocation } from '../utils/locationUtils';
import { updatePosition } from '../app/features/postition/positionSlice';

function LocationList() {
  const [locations, setLocations] = useState([]);
  const dispatch = useDispatch();
  const locationList = useSelector((state) => state.locationList).locationList;
  const getLocations = async () => {
    const idToken = await auth.currentUser.getIdToken(true);
    const userPos = await getUsersCurrentLocation();
    const response = await getAllLocations(
      userPos.coords.longitude,
      userPos.coords.latitude,
      idToken
    );
    dispatch(
      updatePosition([userPos.coords.longitude, userPos.coords.latitude])
    );
    setLocations(response);
  };
  //set locations to all locations on first load
  useEffect(() => {
    getLocations();
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
        <li key={i} id={location.id}>
          <Location location={location}></Location>
        </li>
      ))}
    </ul>
  );
}
export default LocationList;
