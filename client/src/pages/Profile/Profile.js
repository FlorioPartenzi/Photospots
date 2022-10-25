import { useEffect } from 'react';
import LocationList from '../../components/Locations/Feed/LocationList/LocationList';
import PinnedLocations from '../../components/Locations/Pinned/LocationsPinned/LocationsPinned';
import ToggleLocations from '../../components/Locations/Toggle/ToggleLocations';
import UserInfo from '../../components/Profile/UserInfo';

import { auth } from '../../utils/firebase';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.currentUser) {
      navigate('/');
    }
  }, []);

  return (
    <div className="Mainpage">
      <div className="leftSide">
        <ToggleLocations></ToggleLocations>
        <LocationList></LocationList>
      </div>
      <div className="rightSide">
        <UserInfo></UserInfo>
      </div>
    </div>
  );
}

export default Profile;
