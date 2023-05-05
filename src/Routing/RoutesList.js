import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import userContext from '../userContext';
import Home from '../Home';
import Login from '../Auth/Login';
import Signup from '../Auth/Signup';
import Profile from '../Users/Profile';
import Matches from '../Matches/Matches';
import FindMatches from '../Matches/FindMatches';

/**Component for RoutesList
 * Routes to all site paths 
 * 
 * Props: login, signup, updateProfile
 * 
 * State:none
 * 
 * if not logged in 
 *  RoutesList -> { Signup, Login }
 * 
 * if logged in 
 * App -> RoutesList -> { Home, Profile, Matches, FindMatches, User }
 * */

function RoutesList({ login, signup, photoUrls, savePhoto, removePhoto, updateProfile }) {
    console.log("RoutesList");
    const currentUser = useContext(userContext);

    if (currentUser === null) {
        return (
            <Routes>
                <Route path="/login" element={<Login login={login} />}></Route>
                <Route path="/signup" element={<Signup signup={signup} />}></Route>
                <Route path="/" element={<Home />}></Route>
                <Route path="*" element={<Navigate to="/" />} ></Route>
            </Routes>
        );
    }

    if (currentUser !== null) {
        return (
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/users/:username" 
                       element={<Profile
                          photoUrls={photoUrls}
                          savePhoto={savePhoto}
                          removePhoto={removePhoto}
                        />}></Route>
                <Route path="/users/:username/matches" element={<Matches />}></Route>
                <Route path="/match" element={<FindMatches />}></Route>
                {/* <Route path="/users/:username/messages" element={<Messages />}></Route> */}
                <Route path="*" element={<Navigate to="/" />} ></Route>
            </Routes>
        );
    }

}

export default RoutesList;