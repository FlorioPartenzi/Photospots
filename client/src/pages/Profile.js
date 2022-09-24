import LocationForm from '../components/LocationForm';
import LocationList from '../components/LocationList';
import Map from '../components/Map';

function Profile() {
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
