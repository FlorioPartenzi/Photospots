import { loginRequest } from '../utils/ApiService';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();

  async function submitHandler(event) {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;
    const authenticated = await loginRequest(email, password);

    if (authenticated) {
      navigate('/profile');
    }

    event.target.email.value = '';
    event.target.password.value = '';
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={submitHandler}>
        <label>
          E-Mail
          <input
            name="email"
            type={'email'}
            placeholder="user@email.gmx"
            required
          ></input>
        </label>
        <label>
          Password
          <input
            name="password"
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

export default LoginForm;
