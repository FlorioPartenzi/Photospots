import Location from './Location';
import {
  getAllLocations,
  getLocationsByDistance,
} from '../Services/ApiService';
import { useEffect, useState } from 'react';
import { auth } from '../utils/firebase';
import { useSelector } from 'react-redux';

function LocationList() {
  const [locations, setLocations] = useState([]);
  const locationList = useSelector((state) => state.locationList).locationList;
  const getLocations = async () => {
    const idToken = await auth.currentUser.getIdToken(true);
    const response = await getAllLocations(idToken);
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
        <li key={i}>
          <Location location={location}></Location>
        </li>
      ))}
    </ul>
  );
}
export default LocationList;
