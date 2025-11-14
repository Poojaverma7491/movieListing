import axios from "axios";
import { baseURL } from "../ApiBackend/SummaryAPI";

const Axios = axios.create({
    baseURL : baseURL,
    withCredentials : true
})
export default Axios