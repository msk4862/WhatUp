import axios from "axios";

const TEST_API_BASE_URL =
    "https://us-central1-what-up-bde10.cloudfunctions.net/api";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || TEST_API_BASE_URL;

export default axios.create({
    baseURL: API_BASE_URL,
});
