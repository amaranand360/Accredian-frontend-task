import Login from './component/Login';
import Signup from './component/Signup';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

import './App.css';
import Navbar from './component/Navbar';

function App() {
  return (
    <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          </Routes>
          <Toaster />

        </BrowserRouter>
  );
}

export default App;
