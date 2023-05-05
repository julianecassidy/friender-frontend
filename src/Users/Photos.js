import "./Photos.css"

/** Component for Photos
 *  Renders an array of photos.
 * 
 * Props:
 * - photoUrls: array of image urls
 * 
 * State:
 * - none
 * 
 * { Profile, User } -> Photos
 */

function Photos({ photoUrls, removePhoto }) {

    return (
        <div className='Photos'>
            {photoUrls.map(url =>
                <div className="Photo-Image" key={url}>
                    <img src={url} />
                    <button onClick={removePhoto}>Remove</button>
                </div>
            )}
        </div>
    )
}

export default Photos;