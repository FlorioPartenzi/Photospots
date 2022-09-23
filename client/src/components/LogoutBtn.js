import { auth } from '../utils/firebase';
import { signOut } from 'firebase/auth';
import { logout } from '../features/user/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutUser = async () => {
    await signOut(auth);
    dispatch(logout());
    console.log('log out you F***');
    navigate('/');
  };
  return (
    <>
      <button onClick={logoutUser}>Log Out</button>
    </>
  );
}

export default LogoutBtn;