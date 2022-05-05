import axios from "axios";

const mainApi = axios.create({
  baseURL: "http://localhost:3000"
});

export default mainApi;