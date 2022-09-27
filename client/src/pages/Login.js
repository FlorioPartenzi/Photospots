import { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

function Login() {
  const [toggleLogin, setToggleLogin] = useState(true);
  return (
    <main>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
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
