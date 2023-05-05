import { useParams } from "react-router-dom";
import PhotoForm from "./PhotoForm";
import Photos from "./Photos";
import EditProfile from "./EditProfile";

/** Component for Profile
 *  Parent component to render profile page and child components.
 * 
 * Props:
 * - photoUrls, editUser, savePhoto, removePhoto
 * 
 * State:
 * - none
 * 
 * RoutesList -> Profile -> { EditProfile, Photos }
 */

function Profile({ photoUrls, savePhoto, removePhoto }) {

    const { username } = useParams()

    return (
        <div className="Profile">
            <PhotoForm savePhoto={savePhoto} />
            <Photos photoUrls={photoUrls} removePhoto={removePhoto} />
            <EditProfile />
        </div>
    )
}

export default Profile;