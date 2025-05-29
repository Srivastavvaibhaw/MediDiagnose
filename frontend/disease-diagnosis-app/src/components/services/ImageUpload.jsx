import React, { useState, useRef, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { 
  Box, 
  Typography, 
  Button, 
  Paper,
  IconButton,
  Tooltip,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Snackbar,
  Alert,
  Chip,
  FormControl,
  FormControlLabel,
  Checkbox,
  FormGroup,
  TextField
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CropIcon from '@mui/icons-material/Crop';
import FilterIcon from '@mui/icons-material/Filter';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import GetAppIcon from '@mui/icons-material/GetApp';
import ReactMarkdown from 'react-markdown';
import { jsPDF } from 'jspdf';
import '../../styles/components/services/ImageUpload.css';

const ImageUpload = ({ onImageChange }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [showCropDialog, setShowCropDialog] = useState(false);
  const [showZoomDialog, setShowZoomDialog] = useState(false);
  const [imageQuality, setImageQuality] = useState('good');
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [problemDescription, setProblemDescription] = useState('');
  const [diagnosisResult, setDiagnosisResult] = useState(null);
  const [showDiagnosisDialog, setShowDiagnosisDialog] = useState(false);
  
  const fileInputRef = useRef(null);
  const dropAreaRef = useRef(null);

  // Get user data from Clerk
  const { user } = useUser();
  const patientName = user?.fullName || `${user?.firstName || ''} ${user?.lastName || ''}`.trim() || 'Anonymous Patient';

  // Sample symptoms list
  const symptomsList = [
    'Rash',
    'Swelling',
    'Redness',
    'Itching',
    'Pain',
    'Fever',
    'Discoloration',
    'Blisters'
  ];
  
  // Sanitize text to remove asterisks
  const sanitizeText = (text) => {
    if (typeof text !== 'string') return text;
    return text.replace(/\*/g, '');
  };

  // Simulate upload progress
  useEffect(() => {
    if (isUploading) {
      const timer = setInterval(() => {
        setUploadProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(timer);
            setIsUploading(false);
            setNotification({
              open: true,
              message: 'Image and symptoms uploaded successfully!',
              severity: 'success'
            });
            return 100;
          }
          return prevProgress + 10;
        });
      }, 300);
      
      return () => {
        clearInterval(timer);
      };
    }
  }, [isUploading]);

  // Setup drag and drop event listeners
  useEffect(() => {
    const dropArea = dropAreaRef.current;
    
    if (dropArea) {
      const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
      };
      
      const handleDragLeave = () => {
        setIsDragging(false);
      };
      
      const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
          handleFileSelection(e.dataTransfer.files[0]);
        }
      };
      
      dropArea.addEventListener('dragover', handleDragOver);
      dropArea.addEventListener('dragleave', handleDragLeave);
      dropArea.addEventListener('drop', handleDrop);
      
      return () => {
        dropArea.removeEventListener('dragover', handleDragOver);
        dropArea.removeEventListener('dragleave', handleDragLeave);
        dropArea.removeEventListener('drop', handleDrop);
      };
    }
  }, []);

  const sendImageToBackend = async (file, symptoms) => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('symptoms', JSON.stringify(symptoms.map(sanitizeText)));
    formData.append('description', sanitizeText(problemDescription));
    
    console.log('Data being sent to backend:');
    console.log('File Name:', file.name);
    console.log('File Size:', (file.size / (1024 * 1024)).toFixed(2), 'MB');
    console.log('File Type:', file.type);
    console.log('Selected Symptoms:', symptoms);
    console.log('Problem Description:', problemDescription);
    
    try {
      const response = await fetch('https://disease-diagnosis-app.onrender.com', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      console.log('Backend response:', result);
      
      setDiagnosisResult({
        ...result,
        diagnosis: sanitizeText(result.diagnosis),
        description: sanitizeText(result.description),
        symptoms: sanitizeText(result.symptoms),
        causes: sanitizeText(result.causes),
        recommendations: sanitizeText(result.recommendations),
      });
      setShowDiagnosisDialog(true);
      
      setNotification({
        open: true,
        message: 'Image and symptoms successfully sent to backend for analysis!',
        severity: 'success'
      });
      
      return result;
    } catch (error) {
      console.error('Error sending data to backend:', error);
      setNotification({
        open: true,
        message: 'Failed to send data to backend. Please try again.',
        severity: 'error'
      });
    }
  };

  const handleFileSelection = (file) => {
    const validImageTypes = ['image/jpeg', 'image/png', 'image/heic', 'image/heif'];
    if (!validImageTypes.includes(file.type)) {
      setNotification({
        open: true,
        message: 'Please upload a valid image file (JPG, PNG, or HEIC)',
        severity: 'error'
      });
      return;
    }
    
    if (file.size > 10 * 1024 * 1024) {
      setNotification({
        open: true,
        message: 'Image size exceeds 10MB limit',
        severity: 'error'
      });
      return;
    }
    
    setSelectedImage(file);
    setPreviewUrl(URL.createObjectURL(file));
    
    const img = new Image();
    img.onload = () => {
      if (img.width < 500 || img.height < 500) {
        setImageQuality('poor');
      } else if (img.width < 1000 || img.height < 1000) {
        setImageQuality('good');
      } else {
        setImageQuality('excellent');
      }
    };
    img.src = URL.createObjectURL(file);
    
    if (onImageChange) {
      onImageChange(file);
    }
  };
  
  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      handleFileSelection(event.target.files[0]);
    }
  };
  
  const handleRemoveImage = () => {
    setSelectedImage(null);
    setPreviewUrl('');
    setUploadProgress(0);
    setImageQuality('good');
    setSelectedSymptoms([]);
    setProblemDescription('');
    setDiagnosisResult(null);
    setShowDiagnosisDialog(false);
    
    if (onImageChange) {
      onImageChange(null);
    }
  };
  
  const handleCaptureFromCamera = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      fileInputRef.current.click();
      setNotification({
        open: true,
        message: 'Camera capture would open here in production',
        severity: 'info'
      });
    } else {
      setNotification({
        open: true,
        message: 'Camera access not supported in your browser',
        severity: 'warning'
      });
    }
  };
  
  const getQualityColor = () => {
    switch (imageQuality) {
      case 'poor': return 'error';
      case 'good': return 'primary';
      case 'excellent': return 'success';
      default: return 'primary';
    }
  };
  
  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  const handleSymptomsChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedSymptoms((prev) => [...prev, value]);
    } else {
      setSelectedSymptoms((prev) => prev.filter((symptom) => symptom !== value));
    }
  };

  const handleSubmit = () => {
    if (!selectedImage) {
      setNotification({
        open: true,
        message: 'Please upload an image before submitting.',
        severity: 'error'
      });
      return;
    }
    if (selectedSymptoms.length === 0) {
      setNotification({
        open: true,
        message: 'Please select at least one symptom before submitting.',
        severity: 'error'
      });
      return;
    }
    if (!sanitizeText(problemDescription).trim()) {
      setNotification({
        open: true,
        message: 'Please describe your problem before submitting.',
        severity: 'error'
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    sendImageToBackend(selectedImage, selectedSymptoms);
  };

  const handleDownloadReport = async () => {
    if (!diagnosisResult) {
      setNotification({
        open: true,
        message: 'No diagnosis available to generate a report.',
        severity: 'error'
      });
      return;
    }

    if (patientName === 'Anonymous Patient') {
      setNotification({
        open: true,
        message: 'Please log in to generate a personalized report.',
        severity: 'warning'
      });
      return;
    }

    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      let yPosition = 10;
      const pageHeight = 297;
      const pageWidth = 210;
      const margin = 15;
      const maxWidth = pageWidth - 2 * margin;
      const lineHeight = 4;
      const sectionSpacing = 4;

      const primaryColor = [33, 150, 243];
      const secondaryColor = [240, 240, 240];
      const accentColor = [100, 100, 100];

      const fallbackData = {
        'Acne (Acne vulgaris)': {
          description: 'This appears to be the most likely condition based on the presence of red spots and general irritation on the face.',
          symptoms: 'Red papules/pustules on the cheek area, some containing pus.',
          causes: 'Hormonal changes, excess oil production, bacteria (Propionibacterium acnes), lifestyle factors like stress or poor diet.',
          recommendations: 'Gentle cleansing twice daily with a mild cleanser, use over-the-counter treatments with Benzoyl Peroxide or Salicylic Acid, avoid touching the face, moisturize with an oil-free product, consult a dermatologist if symptoms persist.'
        },
        'Eczema': {
          description: 'This condition is likely due to dry, inflamed skin with intense itching, often seen in patches.',
          symptoms: 'Dry, scaly patches, intense itching, redness, and possible oozing or crusting.',
          causes: 'Genetic predisposition, environmental triggers (e.g., allergens, irritants), stress, and immune system dysfunction.',
          recommendations: 'Use fragrance-free moisturizers frequently, avoid known triggers (e.g., harsh soaps), apply topical corticosteroids as prescribed, keep skin clean and hydrated, consult a dermatologist for severe cases.'
        },
        'Psoriasis': {
          description: 'This appears to be a chronic autoimmune condition causing rapid skin cell turnover, leading to scaling on the skin’s surface.',
          symptoms: 'Thick, red patches with silvery scales, dryness, and possible cracking or bleeding.',
          causes: 'Immune system dysfunction, genetic factors, environmental triggers (e.g., stress, infections), and lifestyle factors.',
          recommendations: 'Use moisturizers to reduce dryness, apply topical treatments like corticosteroids, avoid triggers like stress or smoking, consider phototherapy for severe cases, consult a dermatologist for systemic treatments.'
        }
      };

      const formatDate = (date) => {
        return date.toLocaleString('en-GB', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'Asia/Kolkata'
        }) + ' IST';
      };

      const checkPageBreak = (spaceNeeded) => {
        if (yPosition + spaceNeeded > pageHeight - 15) {
          doc.addPage();
          yPosition = 10;
          addHeader();
        }
      };

      const addHeader = () => {
        // Draw header background
        doc.setFillColor(...secondaryColor);
        doc.rect(0, 0, pageWidth, 25, 'F'); // Increased height to accommodate logo

        // Add logo in top left corner
        const logoUrl = '/assets/logo.png'; // Adjust path based on your project structure
        try {
          doc.addImage(logoUrl, 'PNG', margin, 5, 30, 15); // Logo: 30mm wide, 15mm tall
        } catch (error) {
          console.error('Error adding logo to PDF:', error);
          // Fallback: Draw a placeholder if logo fails to load
          doc.setFillColor(...accentColor);
          doc.rect(margin, 5, 30, 15, 'F');
          doc.setFontSize(8);
          doc.setTextColor(255, 255, 255);
          doc.text('Logo Placeholder', margin + 5, 12);
        }

        // Add title next to logo
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...primaryColor);
        doc.text('MediDiagnose Medical Report', margin + 35, 15); // Adjusted to position right of logo
        yPosition = 20;
        doc.setLineWidth(0.2);
        doc.setDrawColor(...primaryColor);
        doc.line(margin, yPosition, pageWidth - margin, yPosition);
        yPosition += 3;
        doc.setTextColor(0, 0, 0);
      };

      addHeader();

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text('Report Generated: ' + formatDate(new Date()), margin, yPosition);
      yPosition += lineHeight;
      doc.text('MediDiagnose - AI-Powered Health Diagnostics', margin, yPosition);
      yPosition += sectionSpacing;

      // Patient Information
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...primaryColor);
      checkPageBreak(15);
      doc.text('Patient Information', margin, yPosition);
      doc.setDrawColor(...primaryColor);
      doc.line(margin, yPosition + 1, margin + 40, yPosition + 1);
      yPosition += lineHeight + 2;
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.setFont('helvetica', 'normal');
      const sanitizedPatientName = sanitizeText(patientName).replace(/[^a-zA-Z0-9\s]/g, '');
      doc.text(`Name: ${sanitizedPatientName}`, margin, yPosition);
      yPosition += lineHeight;
      doc.text('Date of Analysis: ' + (diagnosisResult.analyzedAt ? formatDate(new Date(diagnosisResult.analyzedAt)) : 'Not Available'), margin, yPosition);
      yPosition += sectionSpacing;

      // Diagnosis Overview
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...primaryColor);
      checkPageBreak(30);
      doc.text('Diagnosis Overview', margin, yPosition);
      doc.setDrawColor(...primaryColor);
      doc.line(margin, yPosition + 1, margin + 40, yPosition + 1);
      yPosition += lineHeight + 2;
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.setFont('helvetica', 'normal');
      const diagnosis = sanitizeText(diagnosisResult.diagnosis) || 'Unknown Condition';
      const diagnosisData = {
        description: sanitizeText(diagnosisResult.description || fallbackData[diagnosis]?.description || ''),
        symptoms: sanitizeText(diagnosisResult.symptoms || fallbackData[diagnosis]?.symptoms || 'No specific symptoms identified.'),
        causes: sanitizeText(diagnosisResult.causes || fallbackData[diagnosis]?.causes || 'No specific causes identified.'),
        recommendations: sanitizeText(diagnosisResult.recommendations || fallbackData[diagnosis]?.recommendations || 'Consult a healthcare professional for personalized advice.')
      };
      let lines = doc.splitTextToSize('Based on the provided image and symptoms, the following diagnosis has been determined:', maxWidth);
      checkPageBreak(lineHeight * lines.length);
      doc.text(lines, margin, yPosition);
      yPosition += lineHeight * lines.length;
      lines = doc.splitTextToSize('Condition: ' + diagnosis, maxWidth);
      checkPageBreak(lineHeight * lines.length);
      doc.text(lines, margin, yPosition);
      yPosition += lineHeight * lines.length;
      lines = doc.splitTextToSize(diagnosisData.description, maxWidth);
      checkPageBreak(lineHeight * lines.length);
      doc.text(lines, margin, yPosition);
      yPosition += lineHeight * lines.length + sectionSpacing;

      // Reported Symptoms
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...primaryColor);
      checkPageBreak(30);
      doc.text('Reported Symptoms', margin, yPosition);
      doc.setDrawColor(...primaryColor);
      doc.line(margin, yPosition + 1, margin + 40, yPosition + 1);
      yPosition += lineHeight + 2;
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.setFont('helvetica', 'normal');
      lines = doc.splitTextToSize('Symptoms Reported by Patient: ' + selectedSymptoms.map(sanitizeText).join(', ') + '.', maxWidth);
      checkPageBreak(lineHeight * lines.length);
      doc.text(lines, margin, yPosition);
      yPosition += lineHeight * lines.length;
      lines = doc.splitTextToSize('Analyzed Symptoms: ' + diagnosisData.symptoms, maxWidth);
      checkPageBreak(lineHeight * lines.length);
      doc.text(lines, margin, yPosition);
      yPosition += lineHeight * lines.length + sectionSpacing;

      // Patient’s Description of Problem
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...primaryColor);
      checkPageBreak(30);
      doc.text('Patient’s Description of Problem', margin, yPosition);
      doc.setDrawColor(...primaryColor);
      doc.line(margin, yPosition + 1, margin + 50, yPosition + 1);
      yPosition += lineHeight + 2;
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.setFont('helvetica', 'normal');
      lines = doc.splitTextToSize(sanitizeText(problemDescription), maxWidth);
      checkPageBreak(lineHeight * lines.length);
      doc.text(lines, margin, yPosition);
      yPosition += lineHeight * lines.length + sectionSpacing;

      // Possible Causes
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...primaryColor);
      checkPageBreak(50);
      doc.text('Possible Causes', margin, yPosition);
      doc.setDrawColor(...primaryColor);
      doc.line(margin, yPosition + 1, margin + 30, yPosition + 1);
      yPosition += lineHeight + 2;
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      const causes = sanitizeText(diagnosisData.causes).split(', ').map(cause => cause.trim());
      causes.forEach((cause, index) => {
        const number = `${index + 1}.`;
        const causeText = cause;
        doc.setFont('helvetica', 'bold');
        doc.text(number, margin, yPosition);
        doc.setFont('helvetica', 'normal');
        lines = doc.splitTextToSize(causeText, maxWidth - 10);
        checkPageBreak(lineHeight * lines.length);
        doc.text(lines, margin + 5, yPosition);
        yPosition += lineHeight * lines.length;
      });
      yPosition += sectionSpacing;

      // Recommendations
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...primaryColor);
      checkPageBreak(50);
      doc.text('Recommendations', margin, yPosition);
      doc.setDrawColor(...primaryColor);
      doc.line(margin, yPosition + 1, margin + 30, yPosition + 1);
      yPosition += lineHeight + 2;
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      const recommendations = sanitizeText(diagnosisData.recommendations).split(', ').map(rec => rec.trim());
      recommendations.forEach((rec, index) => {
        const number = `${index + 1}.`;
        const recText = rec;
        doc.setFont('helvetica', 'bold');
        doc.text(number, margin, yPosition);
        doc.setFont('helvetica', 'normal');
        lines = doc.splitTextToSize(recText, maxWidth - 10);
        checkPageBreak(lineHeight * lines.length);
        doc.text(lines, margin + 5, yPosition);
        yPosition += lineHeight * lines.length;
      });
      yPosition += sectionSpacing;

      // Footer
      doc.setFontSize(8);
      doc.setTextColor(...accentColor);
      doc.setFont('helvetica', 'normal');
      checkPageBreak(12);
      lines = doc.splitTextToSize(
        sanitizeText('Disclaimer: This report is generated by MediDiagnose AI and should not be considered a substitute for professional medical advice. Always consult a qualified healthcare provider for diagnosis and treatment.'),
        maxWidth
      );
      checkPageBreak(lineHeight * lines.length);
      doc.text(lines, margin, yPosition);
      yPosition += lineHeight * lines.length;
      lines = doc.splitTextToSize(
        sanitizeText('Contact: support@medidiagnose.com | Website: www.medidiagnose.com'),
        maxWidth
      );
      checkPageBreak(lineHeight * lines.length);
      doc.text(lines, margin, yPosition);

      // Save PDF
      doc.save(`MediDiagnose_Medical_Report_${sanitizedPatientName.replace(/\s+/g, '_')}.pdf`);

      setNotification({
        open: true,
        message: 'Medical report downloaded successfully!',
        severity: 'success'
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      setNotification({
        open: true,
        message: 'Failed to generate report. Please try again.',
        severity: 'error'
      });
    }
  };

  return (
    <Paper elevation={3} className="image-upload-wrapper">
      <Box className="image-upload-header">
        <Box className="header-content">
          <Typography variant="h6">Upload Medical Image</Typography>
          <Tooltip title="Upload a clear, well-lit image of the affected area. Make sure the image is in focus and shows the condition clearly. For best results, take the photo in natural light and avoid shadows.">
            <IconButton size="small">
              <HelpOutlineIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
        {!previewUrl && (
          <Button 
            variant="text" 
            startIcon={<CameraAltIcon />}
            onClick={handleCaptureFromCamera}
            className="camera-button"
          >
            Take Photo
          </Button>
        )}
      </Box>
      
      <Box 
        className={`image-upload-container ${isDragging ? 'dragging' : ''}`}
        ref={dropAreaRef}
      >
        {!previewUrl ? (
          <Box className="upload-placeholder">
            <CloudUploadIcon className="upload-icon" />
            <Typography variant="h6" className="upload-title">
              Drag and Drop Image Here
            </Typography>
            <Typography variant="body2" color="textSecondary" className="upload-subtitle">
              or
            </Typography>
            <input
              accept="image/*"
              id="image-upload-input"
              type="file"
              hidden
              onChange={handleImageChange}
              ref={fileInputRef}
            />
            <label htmlFor="image-upload-input">
              <Button
                variant="contained"
                component="span"
                startIcon={<CloudUploadIcon />}
                className="upload-button"
              >
                Browse Files
              </Button>
            </label>
            <Box className="upload-info">
              <Typography variant="body2" color="textSecondary" className="upload-hint">
                Supported formats: JPG, PNG, HEIC (max 10MB)
              </Typography>
              <Typography variant="body2" color="textSecondary" className="upload-tips">
                Tip: For best results, ensure good lighting and clear focus
              </Typography>
            </Box>
          </Box>
        ) : (
          <Box className="image-preview-container">
            <Box className="image-preview">
              <img 
                src={previewUrl} 
                alt="Medical condition preview" 
                className="preview-image"
              />
              {isUploading && (
                <Box className="upload-progress-overlay">
                  <CircularProgress 
                    variant="determinate" 
                    value={uploadProgress} 
                    className="upload-progress-circle" 
                  />
                  <Typography variant="body2" className="upload-progress-text">
                    {uploadProgress + '%'}
                  </Typography>
                </Box>
              )}
            </Box>
            
            <Box className="image-actions">
              <Box className="image-quality">
                <Typography variant="body2">Image Quality:</Typography>
                <Chip 
                  label={imageQuality.charAt(0).toUpperCase() + imageQuality.slice(1)} 
                  color={getQualityColor()}
                  size="small"
                  icon={imageQuality === 'excellent' ? <CheckCircleIcon /> : null}
                />
              </Box>
              
              <Box className="image-tools">
                <Tooltip title="Crop Image">
                  <IconButton 
                    size="small"
                    onClick={() => setShowCropDialog(true)}
                  >
                    <CropIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Enhance Image">
                  <IconButton size="small">
                    <FilterIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Zoom Image">
                  <IconButton 
                    size="small"
                    onClick={() => setShowZoomDialog(true)}
                  >
                    <ZoomInIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Remove Image">
                  <IconButton 
                    size="small"
                    onClick={handleRemoveImage}
                    className="remove-button"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
      
      {/* Problem Description */}
      <Box sx={{ mt: 2, mb: 2, px: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          Describe Your Problem
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          placeholder="Describe the affected area, when it started, any changes you have noticed, and any other relevant details..."
          value={problemDescription}
          onChange={(e) => setProblemDescription(e.target.value)}
        />
      </Box>
      
      {/* Symptoms Checkboxes */}
      <Box sx={{ mt: 2, mb: 2, px: 2 }}>
        <Typography variant="subtitle1">Select Symptoms</Typography>
        <FormControl component="fieldset">
          <FormGroup row>
            {symptomsList.map((symptom) => (
              <FormControlLabel
                key={symptom}
                control={
                  <Checkbox
                    checked={selectedSymptoms.includes(symptom)}
                    onChange={handleSymptomsChange}
                    value={symptom}
                    name={symptom}
                  />
                }
                label={symptom}
              />
            ))}
          </FormGroup>
        </FormControl>
      </Box>

      {/* Submit Button */}
      <Box sx={{ mt: 2, mb: 2, px: 2, display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={isUploading}
        >
          Submit
        </Button>
      </Box>
      
      {selectedImage && !isUploading && (
        <Box className="upload-details" sx={{ px: 2 }}>
          <Typography variant="body2" className="file-name">
            {selectedImage.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" className="file-size">
            {(selectedImage.size / (1024 * 1024)).toFixed(2) + ' MB'}
          </Typography>
          {selectedSymptoms.length > 0 && (
            <Typography variant="body2" className="selected-symptoms">
              {'Symptoms: ' + selectedSymptoms.join(', ')}
            </Typography>
          )}
        </Box>
      )}
      
      {isUploading && (
        <Box className="upload-progress-bar" sx={{ px: 2 }}>
          <LinearProgress 
            variant="determinate" 
            value={uploadProgress} 
            className="progress-bar" 
          />
          <Typography variant="caption" className="progress-text">
            {'Uploading... ' + uploadProgress + '%'}
          </Typography>
        </Box>
      )}
      
      {/* Image Crop Dialog */}
      <Dialog 
        open={showCropDialog} 
        onClose={() => setShowCropDialog(false)}
        maxWidth="md"
      >
        <DialogTitle>Crop Image</DialogTitle>
        <DialogContent>
          <Box className="crop-container">
            <img 
              src={previewUrl} 
              alt="Crop preview" 
              className="crop-image" 
            />
            <Typography variant="body2" color="textSecondary">
              Drag to adjust the crop area
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowCropDialog(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={() => {
              setShowCropDialog(false);
              setNotification({
                open: true,
                message: 'Image cropped successfully',
                severity: 'success'
              });
            }}
          >
            Apply
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Image Zoom Dialog */}
      <Dialog 
        open={showZoomDialog} 
        onClose={() => setShowZoomDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Zoom Image</DialogTitle>
        <DialogContent>
          <Box className="zoom-container">
            <img 
              src={previewUrl} 
              alt="Zoom preview" 
              className="zoom-image" 
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowZoomDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
      
      {/* Diagnosis Result Dialog */}
      <Dialog
        open={showDiagnosisDialog}
        onClose={() => setShowDiagnosisDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Diagnosis Result</DialogTitle>
        <DialogContent>
          {diagnosisResult ? (
            <Box>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                {'Analyzed at: ' + new Date(diagnosisResult.analyzedAt).toLocaleString()}
              </Typography>
              <Box sx={{ lineHeight: 1.6 }}>
                <ReactMarkdown>{diagnosisResult.diagnosis}</ReactMarkdown>
              </Box>
            </Box>
          ) : (
            <Typography variant="body1" color="error">
              No diagnosis available.
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button 
            variant="contained" 
            startIcon={<GetAppIcon />}
            onClick={handleDownloadReport}
            disabled={!diagnosisResult}
          >
            Download Report
          </Button>
          <Button onClick={() => setShowDiagnosisDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
      
      {/* Notifications */}
      <Snackbar 
        open={notification.open} 
        autoHideDuration={6000} 
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity={notification.severity} 
          variant="filled"
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default ImageUpload;
