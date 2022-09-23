import { useState, useEffect } from 'react';
import { auth } from '../utils/firebase';
import { postNewLocation } from '../utils/ApiService';
import LocationProposal from './LocationProposal';
import { useNavigate } from 'react-router-dom';
import { uploadImageToFirebase } from '../utils/FirebaseService';
import {
  getAutocompleteAdressByText,
  getCompleteAdsress,
} from '../utils/GeoapifyService';

function LocationForm() {
  const [image, setImage] = useState(null);
  const [addressPorposal, setAddressProposal] = useState([]);
  const [address, setAddress] = useState('');
  const [timer, setTimer] = useState(null);

  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();

    //uploading the image file to Firebase and fetching fore the URL
    if (image == null) return;
    const imgUrl = await uploadImageToFirebase(image);

    //settign the values and fetching a whole address and corresponding coordinates from the geoapify API
    const address = event.target.address.value;
    const idToken = await auth.currentUser.getIdToken(true);
    const response = await getCompleteAdsress(address);
    const housenumber = response.features[0].properties.housenumber || '';
    const street = response.features[0].properties.street || '';
    const city = response.features[0].properties.city || '';
    const postcode = response.features[0].properties.postcode || '';
    const country = response.features[0].properties.country || '';
    const lon = response.features[0].properties.lon;
    const lat = response.features[0].properties.lat;

    // creating the new location in the Database
    const newLocation = await postNewLocation(
      event.target.title.value,
      event.target.description.value,
      housenumber,
      street,
      city,
      postcode,
      country,
      lon,
      lat,
      imgUrl,
      idToken
    );

    //cleaning up the input form
    event.target.title.value = '';
    event.target.description.value = '';
    setAddress('');
    setAddressProposal([]);
    event.target.image.value = '';
  };

  //rte toggeling the input and Api calls to avoid Spam
  async function inputAddress(address) {
    setAddress(address);
    clearTimeout(timer);
    const newTimer = setTimeout(async () => {
      let newAddressPorposal = await getAutocompleteAdressByText(address);
      newAddressPorposal = await newAddressPorposal.json();
      newAddressPorposal = newAddressPorposal.features;
      setAddressProposal(newAddressPorposal);
    }, 500);
    setTimer(newTimer);
  }

  useEffect(() => {
    if (!auth.currentUser) {
      navigate('/');
    }
  }, []);

  return (
    <>
      <h2>add Photospot</h2>
      <form onSubmit={submitHandler}>
        <label>
          Title
          <input
            name="title"
            placeholder="title"
            maxLength="32"
            required
          ></input>
        </label>
        <label>
          description
          <input
            name="description"
            type={'text'}
            required
            minLength="4"
            maxLength="256"
            placeholder="description"
          ></input>
        </label>
        <label>
          address
          <input
            name="address"
            type={'text'}
            required
            minLength="4"
            maxLength="128"
            placeholder="address"
            onChange={(event) => {
              inputAddress(event.target.value);
            }}
            value={address}
          ></input>
          <ul>
            {addressPorposal.map((location, i) => (
              <li key={i}>
                <LocationProposal
                  location={location.properties}
                  setAddress={setAddress}
                ></LocationProposal>
              </li>
            ))}
          </ul>
        </label>
        <input
          type={'file'}
          name="image"
          accept="image/apng, image/avif, image/gif, image/jpeg, image/png, image/svg+xml, image/webp"
          onChange={(event) => {
            setImage(event.target.files[0]);
          }}
          required
        ></input>
        <label>
          submit
          <button type="submit">Add Photospot</button>
        </label>
      </form>
    </>
  );
}

export default LocationForm;
