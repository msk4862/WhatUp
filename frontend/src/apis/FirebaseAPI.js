import axios from "axios";

export default axios.create({
    baseURL: "https://us-central1-what-up-bde10.cloudfunctions.net/api"
})