import { auth } from '../../../utils/firebase';
import { signOut } from 'firebase/auth';
import { logout } from '../../../app/features/user/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeAllFromPinnedList } from '../../../app/features/pinnedList/pinnedListSlice';
import '../Navbar.css';
import './LogoutBtn.css';

function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutUser = async () => {
    await signOut(auth);
    dispatch(logout());
    dispatch(removeAllFromPinnedList());
    navigate('/');
  };
  return (
    <>
      <button onClick={logoutUser} className="menuItem">
        Log Out
      </button>
    </>
  );
}

export default LogoutBtn;
