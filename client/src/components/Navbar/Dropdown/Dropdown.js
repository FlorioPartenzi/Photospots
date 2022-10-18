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
      setToggle(false);
    } else {
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
    <div className="dropdown">
      <button onClick={clickHandler} className="barsBtn">
        <Bars></Bars>
      </button>
      {toggle ? (
        <div className="menuList">
          <LogoutBtn />
          <button onClick={navigateToProfile} className="menuItem">
            Profile
          </button>
          <button onClick={navigateToHome} className="menuItem">
            Home
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Dropdown;
