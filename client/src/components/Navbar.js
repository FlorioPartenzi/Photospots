import LogoutBtn from './LogoutBtn';
import Searchbar from './Searchbar';

function Navbar() {
  return (
    <div className="navbar">
      <h1>Photospots</h1>
      <Searchbar></Searchbar>
      <LogoutBtn></LogoutBtn>
    </div>
  );
}
export default Navbar;
