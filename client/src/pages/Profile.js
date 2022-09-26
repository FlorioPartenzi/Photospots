import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import LocationForm from '../components/LocationForm';
import LocationList from '../components/LocationList';
import Map from '../components/Map';
import { auth } from '../utils/firebase';
import { updatePosition } from '../features/postition/positionSlice';
import { getLocationsByDistance } from '../Services/ApiService';
import { getUsersCurrentLocation } from '../utils/locationUtils';
import { setLocationList } from '../features/locationList/locationListSlice';

function Profile() {
  const dispatch = useDispatch();

  //fetch for user coordinates
  const setUserCoordinates = async () => {
    const idToken = await auth.currentUser.getIdToken(true);
    const response = await getUsersCurrentLocation();
    dispatch(
      updatePosition([response.coords.longitude, response.coords.latitude])
    );
    //fetch for Photospots sorted by distance to user Position
    const nearestLocations = await getLocationsByDistance(
      response.coords.longitude,
      response.coords.latitude,
      idToken
    );
    console.log(nearestLocations);
    dispatch(setLocationList(nearestLocations));
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
