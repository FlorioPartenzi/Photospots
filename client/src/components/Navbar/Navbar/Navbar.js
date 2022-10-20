import Searchbar from '../Searchbar/Searchbar';
import { ReactComponent as Logo } from '../../../LogoV2.svg';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import '../Navbar.css';
import './Navbar.css';
import Dropdown from '../Dropdown/Dropdown';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const user = useSelector((state) => state.user);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/home');
  };

  return (
    <nav className="navbar">
      <div style={{ display: 'flex' }} onClick={handleClick}>
        <Logo className="logo"></Logo>
        <h1 className="mainTitle">Photospots</h1>
      </div>
      {user.email != '' ? (
        <>
          <Searchbar></Searchbar>
          <Dropdown></Dropdown>
        </>
      ) : (
        <div></div>
      )}
    </nav>
  );
}
export default Navbar;
