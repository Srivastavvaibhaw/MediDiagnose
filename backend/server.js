const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3030;

// CORS setup with allowed origins
const allowedOrigins = [
  'http://localhost:10000',
  'http://localhost:3000',
  'http://localhost:5173',  // Vite default port
  'https://disease-diagnosis-app.onrender.com',
  'https://disease-diagnosis-app.vercel.app',
  'https://api.medidiagnose.com',
  'http://44.226.145.213',
  'http://54.187.200.255',
  'http://34.213.214.55',
  'http://35.164.95.156',
  'http://44.230.95.183',
  'http://44.229.200.200',
  'https://disease-diagnosis-66vxbecdg-vaibhawteach12-gmailcoms-projects.vercel.app'
];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Initialize Gemini AI
const ai = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// Set up file uploads
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
  destination: uploadsDir,
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Simplified analysis endpoint
app.post('/symptom-check', upload.single('image'), async (req, res) => {
  try {
    console.log('\n=== NEW ANALYSIS REQUEST ===');
    
    // Log incoming data
    const file = req.file;
    const symptoms = req.body.symptoms || 'No symptoms provided';
    
    console.log('Received file:', {
      name: file.originalname,
      type: file.mimetype,
      size: `${(file.size / (1024 * 1024)).toFixed(2)}MB`
    });
    console.log('Symptoms:', symptoms);

    // Convert image to base64
    const imageBuffer = fs.readFileSync(file.path);
    const base64Image = imageBuffer.toString('base64');
    
    // Prepare prompt for Gemini
    const prompt = `
      Analyze this medical image with the following symptoms: ${symptoms}
      Provide a diagnosis in simple terms including:
      1. Most likely condition(s)
      2. Key observations
      3. Recommended actions
      4. When to see a doctor
    `;

    console.log('\nSending to Gemini AI...');
    
    // Call Gemini API
    const model = ai.getGenerativeModel({ model:"gemini-2.0-flash" });
    const result = await model.generateContent([
      { text: prompt },
      { 
        inlineData: {
          mimeType: file.mimetype,
          data: base64Image
        }
      }
    ]);

    const diagnosis = result.response.text();
    console.log('\nGemini response:', diagnosis);

    // Clean up - delete the uploaded file
    fs.unlinkSync(file.path);

    // Send response
    res.json({
      success: true,
      diagnosis,
      analyzedAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('Analysis error:', error);
    
    // Clean up file if it exists
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});