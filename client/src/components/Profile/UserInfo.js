import { useEffect, useState } from 'react';
import { getUserInfo } from '../../Services/ApiService';
import { auth } from '../../utils/firebase';

function UserInfo() {
  const [userName, setUserName] = useState('');
  const [userMail, setUserMail] = useState('');
  const [userDate, setUserDate] = useState('');
  const [userPinned, setUserPinned] = useState(0);
  const [userPlaces, setUserPlaces] = useState(0);

  const getUserName = async () => {
    const idToken = await auth.currentUser.getIdToken(true);
    const user = await getUserInfo(idToken);
    console.log(user);
    setUserName(user.name);
    setUserMail(user.email);
    setUserPinned(user.placeIDs.length);
    setUserPlaces(user.places.length);

    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    const date = new Date(user.createdAt);
    const formatedDate = date.toLocaleDateString('en-EN', options);
    setUserDate(formatedDate);
  };

  useEffect(() => {
    getUserName();
  }, []);

  return (
    <div style={{ margin: '1vw' }}>
      <h1>{userName}</h1>
      <p>e-mail: {userMail}</p>
      <p>created at: {userDate}</p>
      <p>pinned: {userPinned} </p>
      <p>places: {userPlaces} </p>
    </div>
  );
}

export default UserInfo;
