import Location from '../components/Location';
import LocationForm from '../components/LocationForm';
import LocationList from '../components/LocationList';
import LogoutBtn from '../components/LogoutBtn';
import Navbar from '../components/Navbar';

function Profile() {
  return (
    <div className="Mainpage">
      <LocationList></LocationList>
      <LocationForm></LocationForm>
    </div>
  );
}

export default Profile;
