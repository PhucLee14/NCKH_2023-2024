import axios from "axios";

const instance = axios.create({ baseURL: "http://localhost:5000" });

export const fetchNewsfeedApi = () =>
  instance
    .get("/newsfeed")
    .then((res) => res.data)
    .catch((err) => res.json("ServerError:"));

export const deleteNewsfeedApi = (id) =>
  instance.delete("/newsfeed/delete/" + id).then((res) => res);
