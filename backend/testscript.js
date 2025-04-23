/* eslint-disable prettier/prettier */
const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");

const SERVER_URL = "http://localhost:5000/upload";
const IMAGE_PATH = "C:/Users/10/Desktop/test_image.png";

async function testUpload() {
  try {
    console.log("🚀 Starting test with image:", IMAGE_PATH);

    // Verify image exists
    if (!fs.existsSync(IMAGE_PATH)) {
      throw new Error(`Image not found at ${IMAGE_PATH}`);
    }

    // Create form data
    const form = new FormData();
    form.append("image", fs.createReadStream(IMAGE_PATH), "plate.jpg");

    console.log(`📸 Image loaded from ${IMAGE_PATH}`);

    // Send to server
    const response = await axios.post(SERVER_URL, form, {
      headers: {
        ...form.getHeaders(),
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    });

    console.log("\n✅ Test Successful");
    console.log("📋 Server Response:", response.data);
  } catch (error) {
    console.log("\n❌ Test Failed");
    if (error.response) {
      console.log("Status:", error.response.status);
      console.log("Data:", error.response.data);
    } else {
      console.log("Error:", error.message);
    }
  }
}

// Run the test
testUpload();
