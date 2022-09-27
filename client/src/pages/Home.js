import { useEffect } from 'react';
import LocationForm from '../components/LocationForm';
import LocationList from '../components/LocationList';
import Map from '../components/Map';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import PinnedLocations from '../components/PinnedLocations';

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
      <div>
        <LocationForm></LocationForm>
        <Map></Map>
      </div>
    </main>
  );
}

export default Home;
