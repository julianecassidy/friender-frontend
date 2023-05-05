import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import userContext from './userContext';
import NavBar from './Routing/NavBar';
import RoutesList from './Routing/RoutesList';
import Loading from './Loading';
import FrienderApi from './ApiFuncs/FrienderApi';

/** App for Friender
 * 
 * Props:
 * - none
 * 
 * State:
 * - token: API auth token
 * - currentUser: if token, undefined until user data is fetched from the API.
 *   Null if no token exists in local storage.
 * - photoUrls: array of URLs
 * 
 * App -> { Nav, RoutesList }
 */

function App() {

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [currentUser, setCurrentUser] = useState(token ? undefined : null);
  const [photoUrls, setPhotoUrls] = useState([])

  console.debug(
    "App, token: ", token,
    "currentUser: ", currentUser, 
    "photos: ", photoUrls
  );

  /** Send login data from form to API and set state with returned token */
  async function login(username, password) {
    console.debug("login")
    const userData = {
      username: username,
      password: password
    };
    const token = await FrienderApi.authenticateUser(userData);
    localStorage.setItem("token", token)
    setToken(token);
  }

  /** Send new user data from form to API and set state with returned token */
  async function signup(userData) {
    const token = await FrienderApi.signupUser(userData);
    localStorage.setItem("token", token)
    setToken(token);
  }

  /** Logout user by removing token and current user data  */
  function logout() {
    const token = FrienderApi.logoutUser();
    localStorage.removeItem("token");
    setToken(token);
    setCurrentUser(null);
  }

  /** Make an API request to upload a submitted image to S3. */
  async function savePhoto(file) {
    console.debug("savePhoto in App", file);
    await FrienderApi.addPhoto(currentUser.username, file);
    getPhotos();
  }

  /** Make an API request to get photos associated with current user. */
  async function getPhotos() {
    const photos = await FrienderApi.getPhotos(currentUser.username);
    setPhotoUrls(photos);
  }

  /** Make an API request to remove a photo. */
  async function removePhoto(photoUrl) {
    console.log("functionality coming soon");
  }

  /** fetches user details from API after every token change when token exists */
  useEffect(function fetchCurrentUserOnTokenChange() {
    async function fetchUser() {
      if (token !== null) {
        try {
          const { username } = jwt_decode(token);
          
          const user = await FrienderApi.getUser(username);
          setCurrentUser(user);
          const photos = await FrienderApi.getPhotos(username);
          setPhotoUrls(photos);
        } catch (err) {
          setToken(localStorage.getItem("token"));
          setCurrentUser(null)
        }
      } else {
        setCurrentUser(null)
      } 
    } fetchUser();
  }, [token])

  return (
    <div className="App">
            {currentUser !== undefined
        ? <userContext.Provider
          value={currentUser}>
          <BrowserRouter>
            <NavBar logout={logout} />
            <RoutesList 
              login={login} 
              signup={signup}
              photoUrls={photoUrls}
              savePhoto={savePhoto}
              removePhoto={removePhoto}
           />
          </BrowserRouter>
        </userContext.Provider>
        : <Loading />
      }
    </div>
  );
}

export default App;