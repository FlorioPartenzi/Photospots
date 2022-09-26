import { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

function Login() {
  const [toggleLogin, setToggleLogin] = useState(true);
  return (
    <main>
      {toggleLogin ? (
        <LoginForm setToggleLogin={setToggleLogin}></LoginForm>
      ) : (
        <RegisterForm setToggleLogin={setToggleLogin}></RegisterForm>
      )}
    </main>
  );
}

export default Login;
