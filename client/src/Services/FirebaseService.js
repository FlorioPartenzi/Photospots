import { storage } from '../utils/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';

export async function uploadImageToFirebase(image) {
  try {
    const imageRef = ref(storage, `images/${image.name + v4()}`);
    await uploadBytes(imageRef, image);
    const imgUrl = await getDownloadURL(imageRef);
    return imgUrl;
  } catch (error) {
    console.log(
      'ERROR while fetching uploadImageToFirebase at FirebaseService: ',
      error
    );
  }
}
