import axios from "axios";
// baseURL: "https://image-generator-4l8k.onrender.com/api/",
const API = axios.create({
  baseURL: "http://localhost:8080/api/",
});

export const GetPosts = async () => await API.get("/post/");
export const CreatePost = async (data) => await API.post("/post/", data);
export const GenerateAIImage = async (data) =>
  await API.post("/generateImage/", data);
