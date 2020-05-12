import axios from "axios";
import { API_BASE_URL } from "../utilities/Constants";

export default axios.create({
  baseURL: API_BASE_URL,
});
