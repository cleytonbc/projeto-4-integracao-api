import axios from "axios";

const apiTrack = axios.create({
  baseURL: process.env.LINKETRACK_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiTrack;
