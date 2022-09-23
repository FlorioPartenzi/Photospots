import { loginRequest } from '../utils/ApiService';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../features/user/userSlice';

function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  async function loginUser(event) {
    event.preventDefault();
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(auth.currentUser);

      if (auth.currentUser) {
        const idToken = await auth.currentUser.getIdToken(true);
        const response = await loginRequest(idToken);
        console.log(response);
        dispatch(login(response.user.email));
        navigate('/profile');
      }
    } catch (error) {
      console.log('ERROR in RegisterForm: ', error);
    }
    event.target.email.value = '';
    event.target.password.value = '';
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={loginUser}>
        <label>
          E-Mail
          <input
            name="email"
            type={'email'}
            placeholder="user@email.gmx"
            required
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          ></input>
        </label>
        <label>
          Password
          <input
            name="password"
            type={'password'}
            placeholder="****"
            required
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          ></input>
        </label>
        <button type="submit">log in</button>
      </form>
    </div>
  );
}

export default LoginForm;
