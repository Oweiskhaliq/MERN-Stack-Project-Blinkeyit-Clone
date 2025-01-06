import axios from "axios";
import { baseURL } from "../common/summaryApi";

const Axiox = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export default Axiox;
