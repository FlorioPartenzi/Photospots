import LogoutBtn from './LogoutBtn';
import Searchbar from './Searchbar';
import { ReactComponent as Logo } from '../LogoV2.svg';

function Navbar() {
  return (
    <nav className="navbar">
      <div style={{ display: 'flex' }}>
        <Logo className="logo"></Logo>
        <h1>Photospots</h1>
      </div>
      <Searchbar></Searchbar>
      <LogoutBtn></LogoutBtn>
    </nav>
  );
}
export default Navbar;
