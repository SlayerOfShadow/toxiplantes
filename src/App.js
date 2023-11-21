import './App.css';
import Plants from './components/Plants';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Account from './components/Account';
import Navbar from './components/Navbar';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import AddPlant from './components/AddPlant';


function App() {
  const [authUser, setAuthUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState('false');

  const listen = onAuthStateChanged(auth, (user) => {
    if (user) {
      setAuthUser(user);
      setIsLoggedIn(true)
    } else {
      setAuthUser(null);
      setIsLoggedIn(false)
    }
  });

  useEffect(() => {

    return () => {
      listen();
    };
  }, [authUser]);

  return (
    <div className="App">
      <Router>
      <Navbar />
          <Routes>
            <Route path="/" element={<Plants />} />
            {isLoggedIn && <Route path="/account" element={<Account isLoggedIn={authUser} />} />}
            <Route path="/add-plant" element={<AddPlant/>} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
