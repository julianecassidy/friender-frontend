import { useState } from "react";
import { useNavigate } from "react-router-dom";

/**Component for Login
 * renders login form and calls login with inputted info
 * 
 * Props: login
 * 
 * State: formData
 */

function Login({ login }) {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        errors: []
    });
    console.debug("Login form data: ", formData);

    const navigate = useNavigate();

    /** Update form input. */
    function handleChange(evt) {
        const fieldName = evt.target.name;
        const value = evt.target.value;

        setFormData((currData) => {
            currData[fieldName] = value;
            return { ...currData };
        });
    }

    //calls parent fn login and, if successful, redirects to homepage
    async function handleSubmit(evt) {
        evt.preventDefault();
        try {
            await login(formData.username, formData.password);
            navigate("/");
        } catch (err) {
            setFormData(
                curr => {
                    curr.errors = err;
                    return { ...curr }
                }
            )
        }
    }

    return (
        <div className="Login-form">
            <form onSubmit={handleSubmit}>

                <div>

                    <label>Username
                        <input className="login-input"
                            value={formData.username}
                            name="username"
                            onChange={handleChange}>
                        </input>
                    </label>
                </div>

                <div>

                    <label>Password
                        <input className="login-input"
                            value={formData.password}
                            name="password"
                            type="password"
                            onChange={handleChange}>
                        </input>
                    </label>
                </div>

                <button type="submit">Submit</button>
            </form>
            {formData.errors.length ?
                <ul className="Errors">
                    {formData.errors.map(error => (
                        <li key={error}>
                            {error}
                        </li>
                    ))}
                </ul> : ""
            }
        </div>
    );
}

export default Login;