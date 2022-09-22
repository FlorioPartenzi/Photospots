import { useState } from 'react';
import { storage } from '../utils/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';

function LocationForm() {
  const [image, setImage] = useState(null);

  const submitHandler = async (event) => {
    event.preventDefault();
    if (image == null) return;
    const imageRef = ref(storage, `images/${image.name + v4()}`);
    const uploadedImage = await uploadBytes(imageRef, image);
    const imgUrl = await getDownloadURL(imageRef);

    const newLocation = {
      title: event.target.title.value,
      description: event.target.description.value,
      address: event.target.address.value,
      imgUrl: imgUrl,
    };
    console.log(newLocation);
  };

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
          ></input>
        </label>
        <input
          type={'file'}
          onChange={(event) => {
            setImage(event.target.files[0]);
          }}
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
