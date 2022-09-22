import { registerRequest } from '../utils/ApiService';
import { useNavigate } from 'react-router-dom';

function RegisterForm() {
  const navigate = useNavigate();
  async function submitHandler(event) {
    event.preventDefault();

    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const repPassword = event.target.repPassword.value;

    if (password === repPassword) {
      console.log(username, email, password, repPassword);
      const newUser = await registerRequest(username, email, password);
      if (newUser) {
        navigate('/profile');
      }
    }

    event.target.username.value = '';
    event.target.email.value = '';
    event.target.password.value = '';
    event.target.repPassword.value = '';
  }

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={submitHandler}>
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
