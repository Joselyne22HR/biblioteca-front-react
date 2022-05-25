import axios from "axios";

const mainApi = axios.create({
  baseURL: "http://localhost:3030"
});

export default mainApi;