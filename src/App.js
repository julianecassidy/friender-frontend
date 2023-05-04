import './App.css';
import { useState } from 'react';
import PhotoForm from './PhotoForm';
import FrienderApi from './FrienderApi';

/** App for Friender
 * 
 * Props:
 * - none
 * 
 * State:
 * - photoUrls
 * 
 * App -> PhotoForm
 */
function App() {

  const username="jules"

  const [photoUrls, setPhotoUrls] = useState([])
  console.debug("App state: ", photoUrls)

  /** Make an API request to upload a submitted image to S3. */
  async function savePhoto(file) {
    console.debug("savePhoto in App");
    await FrienderApi.addPhoto(file);
    getPhotos();
  }

  async function getPhotos() {
    const photos = await FrienderApi.getPhotos(username)
    setPhotoUrls(photos);
  }

  return (
    <div className="App">
      <PhotoForm savePhoto={savePhoto} />
      <div className='Photos'>
        {photoUrls.map(url =>
          <img src={url}/>)}
      </div>
    </div>
  );
}

export default App;
