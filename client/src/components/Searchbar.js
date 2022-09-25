import { getLocationsBySearch } from '../Services/ApiService';
import { auth } from '../utils/firebase';

function Searchbar() {
  const getLocations = async (event) => {
    const idToken = await auth.currentUser.getIdToken(true);
    const response = await getLocationsBySearch(event.target.value, idToken);
    console.log(response);
  };
  return (
    <div>
      <input
        name="searchbar"
        type={'text'}
        required
        placeholder="search..."
        className="searchbar"
        onChange={(event) => {
          getLocations(event);
        }}
      ></input>
    </div>
  );
}

export default Searchbar;
