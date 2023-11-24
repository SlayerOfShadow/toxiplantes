import * as React from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../utils/authContext";
import { useContext } from "react";
import { getAuth, signOut } from "firebase/auth";

const Navbar = () => {
  const { authState } = useContext(AuthContext);

  const auth = getAuth();

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Signed out successfully");
      })
      .catch((error) => console.log(error));
  };

  return (
    <nav>
      <Link to="/">
        {" "}
        <h1> Toxiplantes</h1>
      </Link>
      <ul>
        <li>
          {authState ? (
            <div>
              <p>Bienvenue {authState.email}</p>{" "}
              <button onClick={userSignOut}>Se déconnecter</button>{" "}
            </div>
          ) : (
            <Link to="/account">Se connecter / Créer un compte</Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
