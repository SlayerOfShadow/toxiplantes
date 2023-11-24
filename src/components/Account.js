import { useEffect } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

import { useContext } from "react";
import { AuthContext } from "../utils/authContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Account = (props) => {
  const { authState, setAuthState } = useContext(AuthContext);

  const navigate = useNavigate();

  if (authState) {
    navigate("/");
  }

  const listen = onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("update authState");
      setAuthState(user.toJSON());
    } else {
      setAuthState(null);
    }
  });

  useEffect(() => {
    return () => {
      listen();
    };
  }, [authState]);

  return (
    <>
      <div className="account">
        <SignIn /> <SignUp />
      </div>
    </>
  );
};

export default Account;
