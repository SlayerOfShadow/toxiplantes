import "./App.css";
import Plants from "./components/Plants";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Account from "./components/Account";
import Navbar from "./components/Navbar";
import AddPlant from "./components/AddPlant";

import { AuthContextProvider } from "./utils/authContext";

function App() {
  return (
    <AuthContextProvider>
      <div className="App">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Plants />} />
            <Route path="/account" element={<Account />} />
            <Route path="/add-plant" element={<AddPlant />} />
          </Routes>
        </Router>
      </div>
    </AuthContextProvider>
  );
}

export default App;
