// const axios = require("axios");
import axios from "axios";
// const FormData = require("form-data");
import FormData from 'form-data';
// const fs = require("fs");



export const generateImage = async (req, res, next) => {
  // console.log(req)
  const { prompt } = req.body;
  console.log("prompt",prompt)

  const form = new FormData();
  form.append("prompt", "a white siamese cat");
  form.append("model", "stable-diffusion-v1-5");
  form.append("mode", "text-to-image");
  form.append("cfg_scale", "7");
  form.append("samples", "1");
  form.append("steps", "30");
  form.append("width", "512");
  form.append("height", "512");

  axios
    .post("https://api.stability.ai/v2beta/stable-image/generate/core", form, {
      headers: {
        ...form.getHeaders(),
        Authorization: `Bearer sk-lUisMJRvVmRBdc8hSqUbVDmGC9rAYxUBewbCiM5x9dS6wPNu`,
        Accept: "image/*",
      },
      responseType: "arraybuffer", // To handle binary image
    })
    .then((response) => {
      // console.log("response",response)
      const generatedImage = Buffer.from(response.data).toString('base64');
      // // fs.writeFileSync("siamese_cat.png", response.data);
      // // const generatedImage = response.data[0].b64_json;
      // console.log("generatedImage",generatedImage)
      return res.status(200).json({ photo: generatedImage });  
      console.log("✅ Image saved as siamese_cat.png");
    })
    .catch((err) => {
      const errorData = Buffer.from(err.response?.data || '').toString('utf-8');

    let errorMsg = 'Something went wrong!';
    try {
      const json = JSON.parse(errorData);
      if (json.errors && Array.isArray(json.errors)) {
        errorMsg = json.errors.join(' ');
      }
    } catch (e) {
      // leave errorMsg as default
    }
    console.log("errorData",errorMsg)

    // Send error message as JSON to client
    return res.status(400).json({
      success: false,
      message: errorMsg
    });
      console.error('❌ Error:', Buffer.from(err.response.data).toString('utf-8'));

      // console.error("❌ Error:", err.response?.data || err.message);
    });
};
