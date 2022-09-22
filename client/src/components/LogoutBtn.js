import { auth } from '../utils/firebase';
import { signOut } from 'firebase/auth';

function LogoutBtn() {
  const logout = async () => {
    await signOut(auth);
  };
  return (
    <>
      <button onClick={logout}>Log Out</button>
    </>
  );
}

export default LogoutBtn;
