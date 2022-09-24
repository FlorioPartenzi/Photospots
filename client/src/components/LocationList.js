import Location from './Location';
import { getAllLocations } from '../utils/ApiService';
import { useEffect, useState } from 'react';
import { auth } from '../utils/firebase';

function LocationList() {
  const [locations, setLocations] = useState([]);

  const getLocations = async () => {
    const idToken = await auth.currentUser.getIdToken(true);
    const response = await getAllLocations(idToken);
    setLocations(response);
  };

  useEffect(() => {
    getLocations();
  }, []);

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
