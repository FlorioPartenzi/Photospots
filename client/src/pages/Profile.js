import Location from '../components/Location';
import LocationForm from '../components/LocationForm';
import LocationList from '../components/LocationList';
import LogoutBtn from '../components/LogoutBtn';

function Profile() {
  return (
    <>
      <LogoutBtn></LogoutBtn>
      <LocationForm></LocationForm>
      <LocationList></LocationList>
    </>
  );
}

export default Profile;
