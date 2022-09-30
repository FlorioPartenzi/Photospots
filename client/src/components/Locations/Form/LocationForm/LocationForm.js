import { useState, useEffect } from 'react';
import { auth } from '../../../../utils/firebase';
import {
  getAllLocations,
  postNewLocation,
} from '../../../../Services/ApiService';
import LocationProposal from '../LocationProposal/LocationProposal';
import { uploadImageToFirebase } from '../../../../Services/FirebaseService';
import Compressor from 'compressorjs';
import {
  getAutocompleteAdressByText,
  getCompleteAddress,
} from '../../../../Services/GeoapifyService';
import { useDispatch, useSelector } from 'react-redux';
import { setLocationList } from '../../../../app/features/locationList/locationListSlice';
import '../Form.css';
import './LocationForm.css';

function LocationForm() {
  const [image, setImage] = useState(null);
  const [compressedImage, setCompressedImage] = useState(null);
  const [addressPorposal, setAddressProposal] = useState([]);
  const [address, setAddress] = useState('');
  const [timer, setTimer] = useState(null);
  const [submitMsg, setSubmitMsg] = useState('upload');
  const userPos = useSelector((state) => state.position).position;
  const dispatch = useDispatch();
  const getLocations = async () => {
    const idToken = await auth.currentUser.getIdToken(true);
    const response = await getAllLocations(userPos[0], userPos[1], idToken);
    dispatch(setLocationList(response));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setSubmitMsg('Uploading');
    //uploading the image file to Firebase and fetching fore the URL
    if (image == null) return;
    const imgUrl = await uploadImageToFirebase(compressedImage);
    setSubmitMsg('•');

    //settign the values and fetching a whole address and corresponding coordinates from the geoapify API
    const address = event.target.address.value;
    const idToken = await auth.currentUser.getIdToken(true);
    setSubmitMsg('••');
    const response = await getCompleteAddress(address);
    const housenumber = response.features[0].properties.housenumber || '';
    const street = response.features[0].properties.street || '';
    const city = response.features[0].properties.city || '';
    const postcode = response.features[0].properties.postcode || '';
    const country = response.features[0].properties.country || '';
    const lon = response.features[0].properties.lon;
    const lat = response.features[0].properties.lat;
    setSubmitMsg('•');

    // creating the new location in the Database
    postNewLocation(
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
    setSubmitMsg('✔');

    getLocations();

    setTimeout(() => {
      setSubmitMsg('upload');
    }, 1500);
  };

  //rte toggeling the input and Api calls to avoid Spam
  async function inputAddress(address) {
    setAddress(address);
    clearTimeout(timer);
    const newTimer = setTimeout(async () => {
      if (address) {
        const addressPorposalResponse = await getAutocompleteAdressByText(
          address
        );
        const addressPorposal = await addressPorposalResponse.json();
        const newAddressPorposal = addressPorposal.features;
        setAddressProposal(newAddressPorposal);
      } else {
        setAddressProposal([]);
      }
    }, 500);
    setTimer(newTimer);
  }

  //compresses the image
  useEffect(() => {
    const compressImage = (image) => {
      return new Compressor(image, {
        quality: 0.6,
        success: (compressedResult) => {
          setCompressedImage(compressedResult);
          return compressedResult;
        },
      });
    };
    const compressImageALot = (image) => {
      return new Compressor(image, {
        quality: 0.4,
        success: (compressedResult) => {
          setCompressedImage(compressedResult);
          return compressedResult;
        },
      });
    };
    if (image) {
      if (image.size < 1000000) {
        compressImage(image);
      } else {
        compressImageALot(image);
      }
    }
  }, [image]);

  return (
    <div className="formContainer">
      <h2 className="formTitle">add Photospot</h2>
      <form onSubmit={submitHandler} className="form">
        <label className="formInputLabel">
          Title
          <input
            name="title"
            placeholder="title"
            maxLength="32"
            required
          ></input>
        </label>
        <label className="formInputLabel descriptionInput">
          description
          <textarea
            name="description"
            placeholder="description"
            rows={5}
            cols={64}
            maxLength="256"
            required
          ></textarea>
        </label>
        <label className="formInputLabel">
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
          <ul className="formInputProposal">
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
        <label className="formInputLabel">
          {' '}
          image
          <input
            type={'file'}
            name="image"
            accept="image/apng, image/avif, image/gif, image/jpeg, image/png, image/svg+xml, image/webp"
            onChange={(event) => {
              setImage(event.target.files[0]);
            }}
            required
            className="imgInput"
          ></input>
          <div className="fakeImgInput">add image</div>
        </label>
        <label className="formInputLabel">
          <button type="submit" className="formSubmitBtn">
            {submitMsg}
          </button>
        </label>
      </form>
    </div>
  );
}

export default LocationForm;
