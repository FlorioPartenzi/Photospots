import { registerRequest } from '../utils/ApiService';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { login } from '../features/user/userSlice';

function RegisterForm() {
  const navigate = useNavigate();
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const dispatch = useDispatch();

  const register = async (event) => {
    event.preventDefault();
    try {
      await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      const idToken = await auth.currentUser.getIdToken(true);
      const response = await registerRequest(
        event.target.name.value,
        registerEmail,
        idToken
      );
      console.log(event.target.name.value);
      if (response.user.email) {
        dispatch(login(response.user.email));
        navigate('/profile');
      }
    } catch (error) {
      console.log('ERROR in RegisterForm: ', error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={register}>
        <label>
          Username
          <input name="username" placeholder="Username" required></input>
        </label>
        <label>
          E-Mail
          <input
            name="email"
            type={'email'}
            placeholder="user@email.gmx"
            required
            onChange={(event) => {
              setRegisterEmail(event.target.value);
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
              setRegisterPassword(event.target.value);
            }}
          ></input>
        </label>
        <label>
          repeat Password
          <input
            name="repPassword"
            type={'password'}
            placeholder="****"
            required
          ></input>
        </label>
        <button type="submit">register</button>
      </form>
    </div>
  );
}

export default RegisterForm;
