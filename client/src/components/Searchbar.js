import { getLocationsBySearch } from '../Services/ApiService';
import { auth } from '../utils/firebase';
import { setLocationList } from '../app/features/locationList/locationListSlice';
import { useDispatch } from 'react-redux';

function Searchbar() {
  const dispatch = useDispatch();

  const getLocations = async (event) => {
    const idToken = await auth.currentUser.getIdToken(true);
    if (event.target.value) {
      const response = await getLocationsBySearch(event.target.value, idToken);
      dispatch(setLocationList(response));
    } else {
      dispatch(setLocationList([null]));
    }
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
