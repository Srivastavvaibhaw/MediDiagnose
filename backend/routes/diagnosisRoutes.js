const express = require('express');
const router = express.Router();
const {
  createDiagnosis,
  getDiagnoses,
  getDiagnosis,
  deleteDiagnosis
} = require('../controllers/diagnosisController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware'); // handles multipart/form-data for images

// Create a new diagnosis (with image upload and Gemini API analysis)
// Get all diagnoses for the authenticated user
router.route('/')
  .post(protect, upload.array('images', 5), createDiagnosis)
  .get(protect, getDiagnoses);

// Get or delete a specific diagnosis by ID
router.route('/:id')
  .get(protect, getDiagnosis)
  .delete(protect, deleteDiagnosis);

module.exports = router;
