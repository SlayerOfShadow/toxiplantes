import * as React from "react";
import { Link } from "react-router-dom";
import AuthDetails from './AuthDetails'

const Navbar = () => {
    return ( 
    <nav>
                   <Link to="/">    <h1> Toxiplantes</h1></Link>
        <ul>        
            <li><AuthDetails/></li>
            <li>
                <Link to="/account">Compte</Link>
            </li>
        </ul>
    </nav>
     );
}
 
export default Navbar;