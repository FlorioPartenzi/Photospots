import Location from './Location';
import { getAllLocations } from '../Services/ApiService';
import { useEffect, useState } from 'react';
import { auth } from '../utils/firebase';
import { Navigate, useNavigate } from 'react-router-dom';

function LocationList() {
  const [locations, setLocations] = useState([]);
  const navigator = useNavigate();
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
