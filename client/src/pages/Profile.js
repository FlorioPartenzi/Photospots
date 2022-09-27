import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import LocationForm from '../components/LocationForm';
import LocationList from '../components/LocationList';
import Map from '../components/Map';
import { auth } from '../utils/firebase';
import { updatePosition } from '../app/features/postition/positionSlice';
import { getLocationsByDistance } from '../Services/ApiService';
import { getUsersCurrentLocation } from '../utils/locationUtils';
import { setLocationList } from '../app/features/locationList/locationListSlice';
import { useNavigate } from 'react-router-dom';
import PinnedLocations from '../components/PinnedLocations';

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    dispatch(setLocationList(nearestLocations));
  };

  useEffect(() => {
    if (!auth.currentUser) {
      navigate('/');
    }
    setUserCoordinates();
  }, []);

  return (
    <main className="Mainpage">
      <div className="leftSide">
        <PinnedLocations></PinnedLocations>
        <LocationList></LocationList>
      </div>
      <div>
        <LocationForm></LocationForm>
        <Map></Map>
      </div>
    </main>
  );
}

export default Profile;
