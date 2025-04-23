/* eslint-disable prettier/prettier */
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const firebase = require("firebase-admin");
const axios = require("axios");
const fileUpload = require("express-fileupload");
const sharp = require("sharp");
const { createWorker } = require("tesseract.js");
const vision = require("@google-cloud/vision");

// Initialize Firebase
try {
  firebase.initializeApp({
    credential: firebase.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });
  console.log("✅ Firebase initialized successfully");
} catch (error) {
  console.error("❌ Firebase initialization error:", error);
  process.exit(1);
}

// Initialize Google Vision if credentials exist
let visionClient = null;
try {
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON) {
    visionClient = new vision.ImageAnnotatorClient({
      credentials: JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON),
    });
  }
} catch (error) {
  console.warn("⚠️ Google Vision initialization failed:", error.message);
}

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(fileUpload());

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString(),
  });
});

// Upload route
app.post("/upload", async (req, res) => {
  try {
    if (!req.files?.image && !req.body?.imageUrl) {
      return res.status(400).json({
        success: false,
        message: "Either provide an image file or imageUrl",
      });
    }

    let plateNumber;
    const startTime = Date.now();
    let imageBuffer;

    if (req.files?.image) {
      const image = req.files.image;
      console.log(
        `📷 Processing uploaded file: ${image.name} (${image.size} bytes)`,
      );
      imageBuffer = image.data;
    } else if (req.body?.imageUrl) {
      console.log(`🌐 Processing image URL: ${req.body.imageUrl}`);
      const response = await axios.get(req.body.imageUrl, {
        responseType: "arraybuffer",
      });
      imageBuffer = Buffer.from(response.data, "binary");
    }

    const processedImage = await preprocessImage(imageBuffer);
    plateNumber = await recognizePlateNumber(processedImage);
    const processingTime = Date.now() - startTime;
    console.log(`✅ OCR completed in ${processingTime}ms`);

    const isReserved = await checkReservation(plateNumber);

    res.status(200).json({
      success: true,
      plateNumber,
      isReserved,
      accessGranted: isReserved,
      processingTime: `${processingTime}ms`,
    });
  } catch (error) {
    console.error("❌ Upload Error:", error.message);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
      details: error.details || null,
    });
  }
});

// Image preprocessing
async function preprocessImage(imageBuffer) {
  try {
    return await sharp(imageBuffer)
      .greyscale()
      .normalise()
      .sharpen()
      .threshold(128)
      .toBuffer();
  } catch (error) {
    console.warn("⚠️ Image preprocessing failed. Using original image.", error);
    return imageBuffer;
  }
}

// Multi-strategy OCR
async function recognizePlateNumber(imageBuffer) {
  const strategies = [
    { name: "OCR.space", fn: recognizeWithOCRSpace },
    { name: "Google Vision", fn: recognizeWithGoogleVision },
    { name: "Tesseract", fn: recognizeWithTesseract },
  ];

  let lastError;

  for (const strategy of strategies) {
    try {
      console.log(`🔍 Trying OCR with ${strategy.name}`);
      const result = await strategy.fn(imageBuffer);
      const cleaned = cleanPlateNumber(result);
      if (validatePlateNumber(cleaned)) {
        return cleaned;
      }
    } catch (error) {
      console.warn(`${strategy.name} failed:`, error.message);
      lastError = error;
    }
  }

  throw new Error("All OCR methods failed", { details: lastError?.message });
}

// OCR.space
async function recognizeWithOCRSpace(imageBuffer) {
  try {
    const response = await axios.post(
      "https://api.ocr.space/parse/image",
      new URLSearchParams({
        apikey: process.env.OCR_API_KEY,
        base64Image: `data:image/jpeg;base64,${imageBuffer.toString("base64")}`,
        language: "eng",
        isOverlayRequired: false,
        OCREngine: 2,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        timeout: 30000,
      },
    );

    const parsedText = response.data.ParsedResults?.[0]?.ParsedText;
    if (!parsedText) throw new Error("No text found in image");
    return parsedText;
  } catch (error) {
    throw new Error(`OCR.space failed: ${error.message}`);
  }
}

// Google Vision
async function recognizeWithGoogleVision(imageBuffer) {
  if (!visionClient) throw new Error("Google Vision not configured");

  try {
    const [result] = await visionClient.textDetection(imageBuffer);
    const detections = result.textAnnotations;
    if (!detections || detections.length === 0) {
      throw new Error("No text found in image");
    }
    return detections[0].description;
  } catch (error) {
    throw new Error(`Google Vision failed: ${error.message}`);
  }
}

// Tesseract.js
async function recognizeWithTesseract(imageBuffer) {
  const { recognize } = require("tesseract.js");

  try {
    const {
      data: { text },
    } = await recognize(imageBuffer, "eng"); // No logger!
    return text;
  } catch (error) {
    throw new Error(`Tesseract failed: ${error.message}`);
  }
}

// Plate number cleanup and validation
function cleanPlateNumber(text) {
  return text.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
}

function validatePlateNumber(plateNumber) {
  const phPattern = /^[A-Z]{3}\d{4}$/;
  return phPattern.test(plateNumber);
}

// Check reservation from Firestore
async function checkReservation(plateNumber) {
  const db = firebase.firestore();
  const snapshot = await db
    .collection("reservations")
    .where("plateNumber", "==", plateNumber)
    .where("expiryTime", ">", new Date())
    .limit(1)
    .get();

  return !snapshot.empty;
}

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
  console.log(`📥 Upload endpoint: POST http://localhost:${port}/upload`);
});
