import { useEffect } from 'react';
import LocationForm from '../../components/Locations/Form/LocationForm/LocationForm';
import LocationList from '../../components/Locations/Feed/LocationList/LocationList';
import Map from '../../components/Map/Map/Map';
import { auth } from '../../utils/firebase';
import { useNavigate } from 'react-router-dom';
import PinnedLocations from '../../components/Locations/Pinned/LocationsPinned/LocationsPinned';
import './Home.css';
function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.currentUser) {
      navigate('/');
    }
  }, []);

  return (
    <main className="Mainpage">
      <div className="leftSide">
        <PinnedLocations></PinnedLocations>
        <LocationList></LocationList>
      </div>
      <div className="rightSide">
        <LocationForm></LocationForm>
        <Map></Map>
      </div>
    </main>
  );
}

export default Home;
