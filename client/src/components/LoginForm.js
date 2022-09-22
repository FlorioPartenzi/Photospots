import { loginRequest } from '../utils/ApiService';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useState } from 'react';

function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function login(event) {
    event.preventDefault();
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
    } catch (error) {
      console.log('ERROR in RegisterForm: ', error);
    }
    event.target.email.value = '';
    event.target.password.value = '';
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={login}>
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
