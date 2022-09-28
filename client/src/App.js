import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar></Navbar>

      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/profile" element={<Home />}></Route>
      </Routes>
    </>
  );
}

export default App;
