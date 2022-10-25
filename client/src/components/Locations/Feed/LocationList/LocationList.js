import Location from '../Location/Location';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import '../Feed.css';
import './LocationList.css';

function LocationList() {
  const [locations, setLocations] = useState([]);
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
