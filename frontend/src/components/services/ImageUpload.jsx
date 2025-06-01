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

  const { user } = useUser();
  const patientName = user?.fullName || `${user?.firstName || ''} ${user?.lastName || ''}`.trim() || 'Anonymous Patient';

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
  
  const sanitizeText = (text) => {
    if (typeof text !== 'string') return text;
    return text.replace(/\*/g, '');
  };

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
    
    console.log('Data being sent to backend:', {
      fileName: file.name,
      fileSize: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
      fileType: file.type,
      symptoms: symptoms,
      description: problemDescription
    });
    
    try {
      const response = await fetch('https://disease-diagnosis-app.onrender.com/symptom-check', {
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
        message: 'Analysis complete! Diagnosis results available.',
        severity: 'success'
      });
      
      return result;
    } catch (error) {
      console.error('Error sending data to backend:', error);
      setNotification({
        open: true,
        message: 'Failed to analyze image. Please try again.',
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

    try {
      // Create a new PDF document
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Constants for layout
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 15;
      const contentWidth = pageWidth - 2 * margin;
      const lineHeight = 5;
      const sectionSpacing = 8;
      let yPosition = margin;

      // Colors
      const primaryColor = '#1976d2';
      const secondaryColor = '#f5f5f5';
      const textColor = '#212121';

      // Improved page break check with buffer
      const checkPageBreak = (spaceNeeded, buffer = 10) => {
        if (yPosition + spaceNeeded > pageHeight - margin - buffer) {
          doc.addPage();
          yPosition = margin;
          addHeader();
          return true;
        }
        return false;
      };

      // Add header with protection against overflow
      const addHeader = () => {
        // Header background
        doc.setFillColor(secondaryColor);
        doc.rect(0, 0, pageWidth, 25, 'F');
        
        // Logo placeholder
        doc.setFillColor(primaryColor);
        doc.rect(margin, 5, 30, 15, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(8);
        doc.text('MEDIDIAGNOSE', margin + 5, 15);
        
        // Header text
        doc.setTextColor(textColor);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.text('Medical Diagnosis Report', margin + 35, 15);
        
        // Divider line
        doc.setDrawColor(primaryColor);
        doc.setLineWidth(0.5);
        doc.line(margin, 25, pageWidth - margin, 25);
        
        yPosition = 30;
      };

      // Safe text addition with overflow protection
      const addText = (text, x, y, maxWidth, align = 'left') => {
        const lines = doc.splitTextToSize(text, maxWidth);
        lines.forEach((line, i) => {
          // Check if we need a new page before adding each line
          if (i > 0 && checkPageBreak(lineHeight)) {
            y = yPosition;
          }
          doc.text(line, x, y + (i * lineHeight), { align });
        });
        return lines.length * lineHeight;
      };

      // Add section with title
      const addSection = (title) => {
        checkPageBreak(15);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.setTextColor(primaryColor);
        doc.text(title, margin, yPosition);
        doc.setDrawColor(primaryColor);
        doc.setLineWidth(0.3);
        doc.line(margin, yPosition + 1, margin + 20, yPosition + 1);
        yPosition += 5;
      };

      // Add paragraph with proper spacing
      const addParagraph = (text, isBold = false) => {
        doc.setFont('helvetica', isBold ? 'bold' : 'normal');
        doc.setFontSize(10);
        doc.setTextColor(textColor);
        
        const heightUsed = addText(text, margin, yPosition, contentWidth);
        yPosition += heightUsed + 2;
      };

      // Add key-value pair with overflow protection
      const addKeyValue = (key, value) => {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.setTextColor(textColor);
        
        // First write the key
        doc.text(key + ':', margin, yPosition);
        
        // Then the value with proper wrapping
        const valueLines = doc.splitTextToSize(value, contentWidth - 20);
        valueLines.forEach((line, i) => {
          if (i === 0) {
            doc.setFont('helvetica', 'normal');
            doc.text(line, margin + 15, yPosition);
          } else {
            if (checkPageBreak(lineHeight)) {
              yPosition = margin + 10;
            }
            doc.text(line, margin, yPosition + lineHeight);
          }
        });
        
        yPosition += (valueLines.length * lineHeight) + 2;
      };

      // Add list items with proper numbering
      const addListItems = (items) => {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.setTextColor(textColor);
        
        items.forEach((item, index) => {
          const bullet = `${index + 1}.`;
          const fullText = `${bullet} ${item}`;
          
          const lines = doc.splitTextToSize(fullText, contentWidth - 5);
          lines.forEach((line, i) => {
            if (checkPageBreak(lineHeight)) {
              yPosition = margin;
            }
            doc.text(line, margin, yPosition);
            yPosition += lineHeight;
          });
          
          yPosition += 2;
        });
      };

      // Initialize with header
      addHeader();

      // 1. Patient Information
      addSection('Patient Information');
      addKeyValue('Patient Name', sanitizeText(patientName));
      addKeyValue('Report Date', new Date().toLocaleString());

      // 2. Diagnosis Summary
      addSection('Diagnosis Summary');
      const diagnosis = sanitizeText(diagnosisResult.diagnosis) || 'Condition requiring further evaluation';
      addParagraph(`Primary Diagnosis: ${diagnosis}`, true);
      addParagraph(sanitizeText(diagnosisResult.description) || 'Based on the provided image and symptoms, this appears to be the most likely condition.');

      // 3. Reported Symptoms
      addSection('Reported Symptoms');
      addKeyValue('Patient Reported', selectedSymptoms.join(', '));
      addKeyValue('Identified Symptoms', sanitizeText(diagnosisResult.symptoms) || 'Not specified');

      // 4. Patient Description
      if (problemDescription.trim()) {
        addSection('Patient Description');
        addParagraph(sanitizeText(problemDescription));
      }

      // 5. Possible Causes
      if (diagnosisResult.causes) {
        addSection('Possible Causes');
        const causes = sanitizeText(diagnosisResult.causes).split('. ')
          .filter(cause => cause.trim().length > 0)
          .map(cause => cause.trim() + (cause.endsWith('.') ? '' : '.'));
        addListItems(causes);
      }

      // 6. Recommendations
      addSection('Recommendations');
      const recommendations = sanitizeText(diagnosisResult.recommendations || 'Consult a healthcare professional').split('. ')
        .filter(rec => rec.trim().length > 0)
        .map(rec => rec.trim() + (rec.endsWith('.') ? '' : '.'));
      addListItems(recommendations.length > 0 ? recommendations : ['No specific recommendations available.']);

      // 7. Disclaimer
      addSection('Important Notes');
      addParagraph('This report is generated by artificial intelligence and should not be considered a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.', true);
      addParagraph(`Report generated by MediDiagnose AI - ${new Date().toLocaleString()}`);

      // Footer
      doc.setFontSize(8);
      doc.setTextColor('#757575');
      doc.setFont('helvetica', 'italic');
      doc.text('Confidential Medical Document - For Patient Use Only', margin, pageHeight - 10);
      doc.text(`© ${new Date().getFullYear()} MediDiagnose. All rights reserved.`, pageWidth - margin - 50, pageHeight - 10);

      // Save PDF
      const sanitizedName = patientName.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '_');
      doc.save(`MediDiagnose_Report_${sanitizedName}_${Date.now()}.pdf`);

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
          size="large"
        >
          {isUploading ? 'Analyzing...' : 'Submit for Analysis'}
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
        scroll="paper"
      >
        <DialogTitle sx={{ backgroundColor: '#f5f5f5', borderBottom: '1px solid #e0e0e0' }}>
          <Box display="flex" alignItems="center">
            <Typography variant="h6" sx={{ flexGrow: 1 }}>Diagnosis Results</Typography>
            <Button 
              variant="contained" 
              startIcon={<GetAppIcon />}
              onClick={handleDownloadReport}
              disabled={!diagnosisResult}
              size="small"
            >
              Download Report
            </Button>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          {diagnosisResult ? (
            <Box sx={{ lineHeight: 1.6 }}>
              <Typography variant="subtitle1" color="primary" gutterBottom>
                {diagnosisResult.diagnosis}
              </Typography>
              
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Analyzed at: {new Date(diagnosisResult.analyzedAt || Date.now()).toLocaleString()}
              </Typography>
              
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" gutterBottom>Description:</Typography>
                <Typography variant="body1" paragraph>
                  {diagnosisResult.description || 'No description available.'}
                </Typography>
              </Box>
              
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" gutterBottom>Identified Symptoms:</Typography>
                <Typography variant="body1" paragraph>
                  {diagnosisResult.symptoms || 'No specific symptoms identified.'}
                </Typography>
              </Box>
              
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" gutterBottom>Possible Causes:</Typography>
                <Typography variant="body1" paragraph>
                  {diagnosisResult.causes || 'No specific causes identified.'}
                </Typography>
              </Box>
              
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" gutterBottom>Recommendations:</Typography>
                <Typography variant="body1" paragraph>
                  {diagnosisResult.recommendations || 'Consult a healthcare professional for personalized advice.'}
                </Typography>
              </Box>
            </Box>
          ) : (
            <Typography variant="body1" color="error">
              No diagnosis available.
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
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