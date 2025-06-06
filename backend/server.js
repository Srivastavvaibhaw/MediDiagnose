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
  // Local development
  'http://localhost:10000',
  'http://localhost:3000',
  'http://localhost:5173',  // Vite default port
  
  // Production domains
  'https://disease-diagnosis-app.onrender.com',
  'https://disease-diagnosis-app.render.com',
  'https://disease-diagnosis-app.vercel.app',
  'https://api.medidiagnose.com',
  
  // Render.com static IP addresses
  'http://44.226.145.213',
  'http://54.187.200.255',
  'http://34.213.214.55',
  'http://35.164.95.156',
  'http://44.230.95.183',
  'http://44.229.200.200'
];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    
    // Allow all localhost origins
    if (origin.startsWith('http://localhost:')) {
      return callback(null, true);
    }
    
    // Allow Vercel preview deployments
    if (origin.includes('vercel.app')) {
      return callback(null, true);
    }
    
    // Check against explicit allowed origins
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    }
    
    console.log(`CORS error: Origin ${origin} not allowed`);
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
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
    const prompt = `You are a knowledgeable and compassionate medical assistant. A user presents with the following symptoms:

Symptoms: ${symptoms}

Please provide a detailed, structured response that includes:

1. **Possible Diagnoses:** List potential conditions and explain why each is possible.
2. **Severity Assessment:** Rate the urgency or severity (e.g., mild, moderate, urgent).
3. **Red Flags:** Mention any symptoms that suggest a medical emergency or need for urgent care.
4. **Home Remedies & Self-Care:** Provide practical tips for symptom relief at home.
5. **Medical Advice:** Recommend whether the user should:
   - Monitor at home
   - Consult a general doctor
   - Visit a specialist
   - Seek emergency medical attention
6. **Preventive Care:** Give advice on how to prevent these symptoms or related illnesses in the future.
7. **Lifestyle Suggestions:** Offer general health, hygiene, nutrition, or mental wellness tips (if applicable).

Make sure your response is easy to read, well-organized, and clearly explains that this is not a substitute for professional medical diagnosis or treatment.
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