import Location from '../Location/Location';
import { getAllLocations, getPinned } from '../../../../Services/ApiService';
import { useEffect, useState } from 'react';
import { auth } from '../../../../utils/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersCurrentLocation } from '../../../../utils/locationUtils';
import { updatePosition } from '../../../../app/features/postition/positionSlice';
import '../Feed.css';
import './LocationList.css';

function LocationList() {
  const [locations, setLocations] = useState([]);
  const dispatch = useDispatch();
  const locationList = useSelector((state) => state.locationList).locationList;

  // show content of the location list redux state, this allows
  // for dynaic setting of the list, search profile home all cann set the state of the list

  useEffect(() => {
    if (locationList[0]) {
      setLocations(locationList);
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
