import { Link } from "react-router-dom";
import { useContext } from 'react';
import userContext from './userContext';

/** Component for Home
 *  Renders a homepage. If currentUser exists, shows a welcome message. Otherwise
 *  shows long in and sign up buttons.
 * 
 * Props:
 * - none
 * 
 * State:
 * - none
 * 
 * call list
 * - Routelist -> Home
 */

function Home() {
    console.log("Home");
    const currentUser = useContext(userContext);

    return (
        <div className="Home">
            <h1 className="Home-h1">Friender</h1>
            <div className="Home-subheading">
                Never go to the Colorado Railroad Museum alone again.
            </div>
            {currentUser !== null
            ? <h2>Welcome back, {currentUser.name}</h2>
            :<div className='Home-buttons'>
                <button><Link to="/signup">Sign Up</Link></button>
                <button><Link to="/login">Log In</Link></button>
            </div>}
        </div>
    );
}
export default Home;