import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 */


class FrienderApi {
    // Remember, the backend needs to be authorized with a token
    // We're providing a token you can use to interact with the backend API
    // DON'T MODIFY THIS TOKEN
    // static token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imp1bGVzIn0.Ok1jgR_6t5RXNqCWE-V25aGABIBsJOtFKQz4Ujv--D8";
    static token = localStorage.getItem("token");


    static async request(endpoint, data = {}, method = "get") {
        // console.debug("API Call:", endpoint, data, method);
        // console.log("API token: ", this.token);
        const url = `${BASE_URL}/${endpoint}`;
        const headers = this.token ? { Authorization: this.token } : {};
        const params = (method === "get")
            ? data
            : {};

        try {
            return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
            console.error("API Error:", err);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    // Individual API routes

    /** Get a users data with username and return 
     * { username, name, interests, hobbies, searchRadius, postalCode }.
     */
    static async getUser(username) {
        const res = await this.request(`users/${username}`);
        return res;
    }

    /** Authenticate a user with {username, password} and return a token from
     * the API. 
     */
    static async authenticateUser(userData) {
        const res = await this.request("login", userData, "post");
        this.token = res;
        // console.log("Token", this.token);
        return this.token;
    }

    /** Sign up a new user with userData { username, password, name, interests,
     * hobbies, searchRadius, postalCode } and return a token from the API.
     */
    static async signupUser(userData) {
        const newUser = {
            username: userData.username,
            password: userData.password,
            name: userData.name,
            interest: userData.interests,
            hobbies: userData.hobbies,
            postal_code: userData.postalCode,
            search_radius: userData.searchRadius
        }

        const res = await this.request("signup", newUser, "post");
        this.token = res.token;
        return this.token;
    }

    /**Log out user. Sets token to null and returns null token.*/
    static logoutUser() {
        this.token = null;
        return this.token;
    }

    /** Get all user's photos. */
    static async getPhotos(username) {
        const res = await this.request(`users/${username}/photos`);
        return res;
    }

    /** Add a new photo for a username. */
    static async addPhoto(username, file) {
        console.debug("addPhoto in FrienderAPI")
        const data = new FormData();
        data.append('image-file', file)
        console.log("Data", data);
        const res = await this.request(`users/${username}/photos`, data, "post");
        return res
    }

}

export default FrienderApi;