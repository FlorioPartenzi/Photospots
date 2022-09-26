import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import PinnedLocations from './components/PinnedLocations';

function App() {
  return (
    <>
      <Navbar></Navbar>
      <PinnedLocations></PinnedLocations>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
      </Routes>
    </>
  );
}

export default App;
