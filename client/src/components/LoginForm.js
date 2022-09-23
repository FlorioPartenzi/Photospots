import { loginRequest } from '../utils/ApiService';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../features/user/userSlice';

function LoginForm({ setToggleLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  async function loginUser(event) {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);

      if (auth.currentUser) {
        const idToken = await auth.currentUser.getIdToken(true);
        const response = await loginRequest(idToken);
        dispatch(login(response.email));
        navigate('/profile');
      }
    } catch (error) {
      console.log('ERROR in LoginForm: ', error);
    }
    event.target.email.value = '';
    event.target.password.value = '';
  }

  return (
    <div className="formContainer">
      <h2 style={{ marginBottom: '0.5vh' }}>Log In</h2>
      <div
        onClick={() => {
          setToggleLogin(false);
        }}
        className="toggleLogin"
      >
        register instead
      </div>
      <form onSubmit={loginUser} className="form">
        <label className="formInputLabel">
          E-Mail
          <input
            name="email"
            type={'email'}
            autoComplete="email"
            placeholder="user@email.gmx"
            required
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          ></input>
        </label>
        <label className="formInputLabel">
          Password
          <input
            name="password"
            type={'password'}
            autoComplete="current-password"
            placeholder="****"
            required
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          ></input>
        </label>
        <button style={{ marginTop: '2vh' }} type="submit">
          log in
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
