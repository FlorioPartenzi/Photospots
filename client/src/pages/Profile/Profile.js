import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import LocationList from '../../components/Locations/Feed/LocationList/LocationList';
import PinnedLocations from '../../components/Locations/Pinned/LocationsPinned/LocationsPinned';
import { setLocationList } from '../../app/features/locationList/locationListSlice';
import { getLocationsByUser } from '../../Services/ApiService';
import { auth } from '../../utils/firebase';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dispatchUserLocations = async () => {
    const idToken = await auth.currentUser.getIdToken();
    const locations = await getLocationsByUser(idToken);
    dispatch(setLocationList(locations));
  };

  useEffect(() => {
    if (!auth.currentUser) {
      navigate('/');
    }
    dispatchUserLocations();
  }, []);

  return (
    <div>
      <div className="leftSide">
        <PinnedLocations></PinnedLocations>
        <LocationList></LocationList>
      </div>
    </div>
  );
}

export default Profile;
