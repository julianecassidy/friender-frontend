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
    static token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9" +
    ".eyJ1c2VybmFtZSI6Imp1bGVzIn0.Ok1jgR_6t5RXNqCWE-V25aGABIBsJOtFKQz4Ujv--D8";
    // static token = localStorage.getItem("token");
    
        
        static async request(endpoint, data = {}, method = "get") {
            // console.debug("API Call:", endpoint, data, method);
            // console.log("API token: ", this.token);

        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: this.token };
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

    /** Get all user's photos */
    static async getPhotos(username) {
        let res = await this.request(`${username}/photos`);
        return res;
    }

    static async addPhoto(username) {
        console.debug("addPhoto in FrienderAPI")
        let res = await this.request(`${username}/photos`);
        return res
    }

}

export default FrienderApi;