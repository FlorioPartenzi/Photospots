import './Home.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Map from '../../components/Map/Map/Map';
import LocationForm from '../../components/Locations/Form/LocationForm/LocationForm';
import LocationList from '../../components/Locations/Feed/LocationList/LocationList';
import PinnedLocations from '../../components/Locations/Pinned/LocationsPinned/LocationsPinned';
import { getAllLocations } from '../../Services/ApiService';
import { auth } from '../../utils/firebase';
import { getUsersCurrentLocation } from '../../utils/locationUtils';
import { updatePosition } from '../../app/features/postition/positionSlice';
import { setLocationList } from '../../app/features/locationList/locationListSlice';

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getLocations = async () => {
    const idToken = await auth.currentUser.getIdToken(true);
    //try catch in case the users Position cant be resolved (user did not accept tracking)
    try {
      const userPos = await getUsersCurrentLocation();
      const response = await getAllLocations(
        userPos.coords.longitude,
        userPos.coords.latitude,
        idToken
      );
      dispatch(
        updatePosition([userPos.coords.longitude, userPos.coords.latitude])
      );
      dispatch(setLocationList(response));
    } catch (error) {
      console.log(error);
      const response = await getAllLocations(0.0, 0.0, idToken);
      dispatch(updatePosition([0.0, 0.0]));
      dispatch(setLocationList(response));
    }
  };

  useEffect(() => {
    if (!auth.currentUser) {
      navigate('/');
    } else {
      getLocations();
    }
  }, []);

  return (
    <main className="Mainpage">
      <div className="leftSide">
        <PinnedLocations></PinnedLocations>
        <LocationList></LocationList>
      </div>
      <div className="rightSide">
        <div className="rightSideMapAndForm">
          <LocationForm></LocationForm>
          <Map></Map>
        </div>
      </div>
    </main>
  );
}

export default Home;
