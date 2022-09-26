import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import LocationForm from '../components/LocationForm';
import LocationList from '../components/LocationList';
import Map from '../components/Map';
import { updatePosition } from '../features/postition/positionSlice';
import { getUsersCurrentLocation } from '../utils/locationUtils';

function Profile() {
  const dispatch = useDispatch();

  const setUserCoordinates = async () => {
    const response = await getUsersCurrentLocation();
    dispatch(
      updatePosition([response.coords.longitude, response.coords.latitude])
    );
  };

  useEffect(() => {
    setUserCoordinates();
  }, []);

  return (
    <div className="Mainpage">
      <LocationList></LocationList>
      <div>
        <LocationForm></LocationForm>
        <Map></Map>
      </div>
    </div>
  );
}

export default Profile;
