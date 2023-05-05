import { useState } from "react";

/** Component for PhotoForm
 * Provides a form to add photos to a user profile.
 * 
 * Props:
 * - savePhoto
 * 
 * State:
 * - file
 * 
 * App -> PhotoForm
 */

function PhotoForm({ savePhoto }) {
    const [file, setFile] = useState("");
    console.debug("PhotoForm, state: ", file)

    /** Update form input. */
    function handleChange(evt) {
        const file = evt.target.files[0]
        setFile(file);
    }

    /** Handle form on submit to save file. */
    async function handleSubmit(evt) {
        evt.preventDefault();
        console.debug("handleSubmit on form");

        if (file !== null) {
            try {
                await savePhoto(file);
                setFile("")
            } catch (err) {
                throw err;
            }
        }
    }

    return (
        <div className="PhotoForm">
            <form onSubmit={handleSubmit}>
                <label>Add a Photo</label>
                <input 
                  name="image-file" 
                  id="image-file" 
                  type="file"
                  onChange={handleChange}
                />
                <button type="submit" value="Upload">Submit</button>
            </form>
        </div>
    )
}

export default PhotoForm