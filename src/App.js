import "./App.css";
import Plants from "./components/Plants";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Account from "./components/Account";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import AddPlant from './components/AddPlant';

import { AuthContextProvider } from "./utils/authContext";

function App() {
  const [authUser, setAuthUser] = useState(null);

  const listen = onAuthStateChanged(auth, (user) => {
    if (user) {
      setAuthUser(user);
    } else {
      setAuthUser(null);
    }
  });

  useEffect(() => {
    return () => {
      listen();
    };
  }, [authUser]);

  return (
    <AuthContextProvider>
      <div className="App">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Plants />} />
            {isLoggedIn && <Route path="/account" element={<Account isLoggedIn={authUser} />} />}
            <Route path="/add-plant" element={<AddPlant/>} />
            <Route
              path="/account"
              element={<Account isLoggedIn={authUser} />}
            />
          </Routes>
        </Router>
      </div>
    </AuthContextProvider>
  );
}

export default App;
