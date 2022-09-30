import { useState } from 'react';
import './Login.css';
import LoginForm from '../../components/Login/LoginForm/LoginForm';
import RegisterForm from '../../components/Login/RegisterForm/RegisterForm';

function Login() {
  const [toggleLogin, setToggleLogin] = useState(true);
  return (
    <main>
      <div className="loginContainer">
        {toggleLogin ? (
          <LoginForm setToggleLogin={setToggleLogin}></LoginForm>
        ) : (
          <RegisterForm setToggleLogin={setToggleLogin}></RegisterForm>
        )}
      </div>
    </main>
  );
}

export default Login;
