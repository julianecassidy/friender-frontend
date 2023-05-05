import { NavLink } from "react-router-dom";
import { useContext } from "react";
import userContext from "../userContext";

/** Component for NavBar
 * 
 * Navigation bar for every page on site 
 * When user is logged in, shows main pages: 
 *  - home, profile, matches, findMatches, logout
 * 
 * when user is not logged in shows:
 * - login, signup, home
 * 
 * State:none
 * 
 * Props: logout
 * 
 * Links to: /, user/:username, user/username/matches, /find-matches
 * 
 * App -> Nav
*/

function NavBar({ logout }) {
    console.debug("NavBar");

    const currentUser = useContext(userContext);

    //nav bar if there is not a current user 
    function notLoggedIn() {
        return (
            <div className="Nav-right">
                <NavLink className="Nav-Login" to="/login">
                    Login</NavLink>
                <NavLink className="Nav-signup" to="/signup">
                    Sign Up</NavLink>

            </div>
        );
    }

    //nav bar if there is a current user
    function loggedIn() {
        return (
            <div className="Nav-right">
                <NavLink to="/users/:username">
                    Profile</NavLink>
                <NavLink to="/users/matches">
                    Matches</NavLink>
                <NavLink to="/match">
                    Find Matches</NavLink>
                <NavLink className="Nav-logout" onClick={logout}>
                    Logout {currentUser.username}</NavLink>

            </div>
        );
    }

    return (
        <nav className="Nav">
            <NavLink className="Nav-Home" to="/">
                Friender</NavLink>
            {(currentUser !== null) ? loggedIn() : notLoggedIn()}
        </nav>
    );

}
export default NavBar;