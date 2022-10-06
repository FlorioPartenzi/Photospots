import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutBtn from '../LogoutBtn/LogoutBtn';
import './Dropdown.css';
import { ReactComponent as Bars } from '../../../Bars.svg';
function Dropdown() {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const clickHandler = () => {
    if (toggle) {
      console.log('on');
      setToggle(false);
    } else {
      console.log('off');
      setToggle(true);
    }
  };
  const navigateToHome = () => {
    navigate('/home');
    setToggle(false);
  };
  const navigateToProfile = () => {
    navigate('/profile');
    setToggle(false);
  };

  return (
    <div>
      <button onClick={clickHandler}>
        <Bars className="barsBtn"></Bars>
      </button>
      <div>
        {toggle ? (
          <div className="menuList">
            <LogoutBtn />
            <button onClick={navigateToProfile}>Profile</button>
            <button onClick={navigateToHome}>Home</button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Dropdown;
