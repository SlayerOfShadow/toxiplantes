import { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

import { useContext } from "react";
import { AuthContext } from "../utils/authContext";

const Account = (props) => {
    const context = useContext(AuthContext);
    console.log(context);

    const [isLoggedIn, setIsLoggedIn] = useState('false');

    // setIsLoggedIn(props.isLoggedIn);
    console.log("account.js", isLoggedIn);

    return ( 
        <>
        {/* <div className="account">
            {!isLoggedIn ? (
                <SignIn />
            ) : (
                <SignUp />
            )}
        </div> */}
        </>
     );
}
 
export default Account;