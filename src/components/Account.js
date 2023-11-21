import { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

import { useContext } from "react";
import { AuthContext } from "../utils/authContext";

const Account = (props) => {
  const { authState, setAuthState } = useContext(AuthContext);
  console.log(authState);

  setAuthState("Nouvelle valeur du contexte");

  const [isLoggedIn, setIsLoggedIn] = useState("false");

  return (
    <>
      <div className="account">{!isLoggedIn ? <SignIn /> : <SignUp />}</div>
    </>
  );
};

export default Account;
