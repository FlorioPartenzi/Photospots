import { registerRequest } from '../utils/ApiService';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../utils/firebase';

function RegisterForm() {
  const navigate = useNavigate();
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  const register = async (event) => {
    event.preventDefault();
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(user);
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
        <button type="submit">log in</button>
      </form>
    </div>
  );
}

export default RegisterForm;
