import { auth } from '../utils/firebase';
import { signOut } from 'firebase/auth';
import { logout } from '../features/user/userSlice';
import { useDispatch } from 'react-redux';

function LogoutBtn() {
  const dispatch = useDispatch();

  const logout = async () => {
    await signOut(auth);
    dispatch(logout());
  };
  return (
    <>
      <button onClick={logout}>Log Out</button>
    </>
  );
}

export default LogoutBtn;
