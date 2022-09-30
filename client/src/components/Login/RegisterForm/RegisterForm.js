import { registerRequest } from '../../../Services/ApiService';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../../../utils/firebase';
import { useDispatch } from 'react-redux';
import { login } from '../../../app/features/user/userSlice';
import '../Login.css';
import './RegisterForm.css';

function RegisterForm({ setToggleLogin }) {
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
        event.target.username.value,
        registerEmail,
        idToken
      );
      if (response.email) {
        dispatch(login(response.email));
        navigate('/home');
      }
    } catch (error) {
      console.log('ERROR in RegisterForm: ', error);
    }
  };

  return (
    <div className="formContainer">
      <h2 style={{ marginBottom: '0.5vh' }}>Register</h2>
      <div
        onClick={() => {
          setToggleLogin(true);
        }}
        className="toggleLogin"
      >
        Log in instead
      </div>
      <form onSubmit={register} className="form">
        <label className="formInputLabel">
          Username
          <input
            name="username"
            autoComplete="username"
            placeholder="Username"
            required
          ></input>
        </label>
        <label className="formInputLabel">
          E-Mail
          <input
            name="email"
            type={'email'}
            autoComplete="eamil"
            placeholder="user@email.gmx"
            required
            onChange={(event) => {
              setRegisterEmail(event.target.value);
            }}
          ></input>
        </label>
        <label className="formInputLabel">
          Password
          <input
            name="password"
            type={'password'}
            autoComplete="new-password"
            placeholder="****"
            required
            onChange={(event) => {
              setRegisterPassword(event.target.value);
            }}
          ></input>
        </label>
        <label className="formInputLabel">
          repeat Password
          <input
            name="repPassword"
            type={'password'}
            autoComplete="new-password"
            placeholder="****"
            required
          ></input>
        </label>
        <button
          className="formSubmitBtn"
          style={{ marginTop: '2vh' }}
          type="submit"
        >
          register
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
