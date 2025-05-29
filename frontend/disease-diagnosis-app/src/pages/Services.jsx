// src/pages/Services.jsx
import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  Alert,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tooltip,
  IconButton
} from '@mui/material';
import ImageUpload from '../components/services/ImageUpload';
import Loading from '../components/common/Loading';
import '../styles/pages/Services.css';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoIcon from '@mui/icons-material/Info';
import HelpIcon from '@mui/icons-material/Help';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const Services = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [symptoms, setSymptoms] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [diagnosisResults, setDiagnosisResults] = useState(null);
  const [error, setError] = useState(null);
  const [recentDiagnoses, setRecentDiagnoses] = useState([]);
  const [serviceStats, setServiceStats] = useState({
    diagnosesCompleted: 0,
    averageAccuracy: 0,
    userRating: 0
  });
  
  const steps = ['Upload Image',];
  
  useEffect(() => {
    // Simulate fetching service statistics
    setTimeout(() => {
      setServiceStats({
        diagnosesCompleted: 15783,
        averageAccuracy: 87.5,
        userRating: 4.7
      });
      
      // Simulate fetching recent diagnoses
      setRecentDiagnoses([
        { id: 1, condition: 'Eczema', date: '2 days ago', severity: 'Mild' },
        { id: 2, condition: 'Psoriasis', date: '1 week ago', severity: 'Moderate' },
        { id: 3, condition: 'Rosacea', date: '2 weeks ago', severity: 'Mild' }
      ]);
    }, 1000);
  }, []);
  
  const handleImageChange = (image) => {
    setUploadedImage(image);
  };
  
  const handleSymptomsChange = (symptomData) => {
    setSymptoms(symptomData);
  };
  
  const processSubmission = () => {
    setIsProcessing(true);
    setError(null);
    
    // Simulate API call to backend for diagnosis
    setTimeout(() => {
      try {
        // Enhanced mock diagnosis results
        const mockResults = {
          possibleConditions: [
            { name: 'Dermatitis', confidence: 87, description: 'Inflammation of the skin characterized by redness, itching, and rash.' },
            { name: 'Eczema', confidence: 65, description: 'Chronic skin condition that causes dry, itchy, inflamed skin.' },
            { name: 'Contact Rash', confidence: 42, description: 'Skin reaction from direct contact with an irritant or allergen.' },
            { name: 'Psoriasis', confidence: 28, description: 'Chronic condition causing rapid buildup of skin cells forming scales and red patches.' }
          ],
          confidenceLevel: 'medium',
          recommendations: [
            'Apply hydrocortisone cream to affected areas',
            'Avoid potential allergens and irritants',
            'Schedule a consultation with a dermatologist',
            'Keep the area clean and moisturized',
            'Use gentle, fragrance-free soaps and detergents',
            'Apply cold compresses to reduce inflammation'
          ],
          urgencyLevel: 'medium',
          additionalInfo: {
            potentialTriggers: ['Stress', 'Weather changes', 'Certain fabrics', 'Food allergies'],
            preventiveMeasures: ['Regular moisturizing', 'Avoiding known irritants', 'Managing stress levels'],
            followUpTimeframe: '2-3 weeks'
          },
          similarCases: [
            { id: 1, condition: 'Dermatitis', matchPercentage: 78 },
            { id: 2, condition: 'Eczema', matchPercentage: 65 }
          ]
        };
        
        setDiagnosisResults(mockResults);
        setActiveStep(2);
        setIsProcessing(false);
      } catch (err) {
        setError('An error occurred while processing your diagnosis. Please try again.');
        setIsProcessing(false);
      }
    }, 3000);
  };
  
  const handleSaveReport = () => {
    alert('Report saved successfully!');
  };
  
  const handleFindDoctor = () => {
    alert('Redirecting to doctor finder...');
  };
  
  const handleScheduleAppointment = () => {
    alert('Opening appointment scheduler...');
  };
  
  const handleShareResults = () => {
    alert('Opening sharing options...');
  };
  
  const isNextDisabled = () => {
    if (activeStep === 0) {
      return !uploadedImage && !symptoms?.description;
    }
    if (activeStep === 1) {
      return !symptoms?.description && !uploadedImage;
    }
    return false;
  };

  const renderServiceStats = () => (
    <Box className="service-stats-container" mt={4} mb={4}>
      <Typography variant="h5" gutterBottom className="section-title">
        <HealthAndSafetyIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
        Our Diagnostic Service
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card className="stat-card">
            <CardContent>
              <Typography variant="h3" color="primary">{serviceStats.diagnosesCompleted.toLocaleString()}</Typography>
              <Typography variant="subtitle1">Diagnoses Completed</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className="stat-card">
            <CardContent>
              <Typography variant="h3" color="primary">{serviceStats.averageAccuracy}%</Typography>
              <Typography variant="subtitle1">Average Accuracy</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className="stat-card">
            <CardContent>
              <Typography variant="h3" color="primary">{serviceStats.userRating}/5</Typography>
              <Typography variant="subtitle1">User Rating</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );

  const renderFeatures = () => (
    <Box className="features-container" mt={6} mb={6}>
      <Typography variant="h5" gutterBottom className="section-title">
        <MedicalServicesIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
        Key Features
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card className="feature-card" elevation={2}>
            <CardMedia
              component="div"
              className="feature-icon"
              sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                pt: 2,
                '& img': {
                  width: '60px',
                  height: '60px',
                  objectFit: 'contain'
                }
              }}
            >
              <img src="src/assets/ai.jpg" alt="AI Diagnosis" />
            </CardMedia>
            <CardContent>
              <Typography variant="h6" gutterBottom>AI-Powered Analysis</Typography>
              <Typography variant="body2">
                Our advanced machine learning algorithms analyze images and symptoms to provide accurate preliminary diagnoses.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className="feature-card" elevation={2}>
            <CardMedia
              component="div"
              className="feature-icon"
              sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                pt: 2,
                '& img': {
                  width: '60px',
                  height: '60px',
                  objectFit: 'contain'
                }
              }}
            >
              <img src="src/assets/Doctor Connection.png" alt="Doctor Connection" />
            </CardMedia>
            <CardContent>
              <Typography variant="h6" gutterBottom>Connect with Specialists</Typography>
              <Typography variant="body2">
                Easily schedule appointments with qualified healthcare professionals based on your diagnosis results.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className="feature-card" elevation={2}>
            <CardMedia
              component="div"
              className="feature-icon"
              sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                pt: 2,
                '& img': {
                  width: '60px',
                  height: '60px',
                  objectFit: 'contain'
                }
              }}
            >
              <img src="src/assets/Secure Data.jpg" alt="Secure Data" />
            </CardMedia>
            <CardContent>
              <Typography variant="h6" gutterBottom>Privacy & Security</Typography>
              <Typography variant="body2">
                Your medical data is encrypted and securely stored in compliance with healthcare privacy standards.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );

  const renderFAQs = () => (
    <Box className="faq-container" mt={6} mb={4}>
      <Typography variant="h5" gutterBottom className="section-title">
        <HelpIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
        Frequently Asked Questions
      </Typography>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle1">How accurate is the AI diagnosis?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2">
            Our AI diagnostic system has an average accuracy rate of 87.5% when compared to diagnoses from healthcare professionals. However, it should always be used as a preliminary tool and not a replacement for professional medical advice.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle1">Is my medical data kept private?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2">
            Yes, we take your privacy seriously. All uploaded images and symptom information are encrypted and stored securely. We comply with HIPAA and other relevant healthcare privacy regulations. Your data is never shared with third parties without your explicit consent.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle1">How do I connect with a doctor after receiving my diagnosis?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2">
            After receiving your diagnosis, you can use our "Find a Doctor" feature to locate specialists in your area who treat your specific condition. You can then schedule appointments directly through our platform with participating healthcare providers.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
  
  return (
    <Box className="services-page">
      <Container maxWidth="lg">
        <Box className="services-hero" mb={6}>
          <Typography variant="h2" component="h1" className="services-title">
            Medical Diagnosis Services
          </Typography>
          
          <Typography variant="h5" paragraph className="services-subtitle">
            AI-Powered Healthcare at Your Fingertips
          </Typography>
          
          <Typography variant="body1" paragraph className="services-description">
            Upload images of medical conditions and describe your symptoms to receive AI-powered preliminary diagnosis and recommendations. Our advanced technology helps identify potential skin conditions, provides treatment suggestions, and connects you with healthcare professionals when needed.
          </Typography>
          
          <Box className="services-highlights" mt={3}>
            <Chip icon={<CheckCircleIcon />} label="Quick Results" color="primary" className="highlight-chip" />
            <Chip icon={<CheckCircleIcon />} label="HIPAA Compliant" color="primary" className="highlight-chip" />
            <Chip icon={<CheckCircleIcon />} label="Doctor Referrals" color="primary" className="highlight-chip" />
            <Chip icon={<CheckCircleIcon />} label="24/7 Availability" color="primary" className="highlight-chip" />
          </Box>
        </Box>
        
        {error && (
          <Alert severity="error" className="error-alert" onClose={() => setError(null)}>
            {error}
          </Alert>
        )}
        
        <Paper elevation={3} className="services-stepper-container">
          <Stepper activeStep={activeStep} alternativeLabel className="services-stepper">
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          
          <Box className="services-content">
            {isProcessing ? (
              <Loading message="Processing your information..." />
            ) : (
              <>
                {activeStep === 0 && (
                  <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                      <ImageUpload onImageChange={handleImageChange} />
                      <Box className="image-tips" mt={2}>
                        <Typography variant="subtitle2" gutterBottom>
                          Tips for the best results:
                        </Typography>
                        <List dense>
                          <ListItem>
                            <ListItemIcon><CheckCircleIcon color="success" fontSize="small" /></ListItemIcon>
                            <ListItemText primary="Use good lighting" />
                          </ListItem>
                          <ListItem>
                            <ListItemIcon><CheckCircleIcon color="success" fontSize="small" /></ListItemIcon>
                            <ListItemText primary="Keep the camera steady" />
                          </ListItem>
                          <ListItem>
                            <ListItemIcon><CheckCircleIcon color="success" fontSize="small" /></ListItemIcon>
                            <ListItemText primary="Focus directly on the affected area" />
                          </ListItem>
                        </List>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box className="service-instructions">
                        <Typography variant="h5" gutterBottom>
                          Upload a Medical Image
                        </Typography>
                        <Typography variant="body1" paragraph>
                          Take a clear, well-lit photo of the affected area. Make sure the image is in focus and shows the condition clearly. Multiple angles can help provide a more accurate diagnosis.
                        </Typography>
                        <Typography variant="body2" paragraph>
                          Our AI system can analyze various skin conditions including rashes, moles, infections, and inflammatory disorders. The more visible the condition is in your image, the more accurate our analysis will be.
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          You can also proceed without an image by clicking Next and describing your symptoms in detail.
                        </Typography>
                        
                        <Box mt={3}>
                          <Alert severity="info" icon={<InfoIcon />}>
                            For privacy and security, all images are encrypted and stored securely in compliance with healthcare regulations.
                          </Alert>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                )}
                
                {activeStep === 1 && (
                  <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                      <SymptomForm onSymptomsChange={handleSymptomsChange} />
                      <Box className="symptom-examples" mt={2} p={2} bgcolor="background.paper" borderRadius={1}>
                        <Typography variant="subtitle2" gutterBottom>
                          Example descriptions:
                        </Typography>
                        <Typography variant="body2" component="div">
                          <ul>
                            <li>"Red, itchy rash that appeared 3 days ago after hiking"</li>
                            <li>"Painful, swollen area that feels warm to the touch"</li>
                            <li>"Circular rash with clear center that has been expanding"</li>
                          </ul>
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box className="service-instructions">
                        <Typography variant="h5" gutterBottom>
                          Describe Your Symptoms
                        </Typography>
                        <Typography variant="body1" paragraph>
                          Provide as much detail as possible about your symptoms, including when they started, their severity, and any factors that make them better or worse.
                        </Typography>
                        <Typography variant="body1" paragraph>
                          Include information about:
                        </Typography>
                        <List>
                          <ListItem>
                            <ListItemIcon><WarningIcon color="warning" /></ListItemIcon>
                            <ListItemText 
                              primary="Duration and onset" 
                              secondary="When did you first notice the symptoms? Have they changed over time?"
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemIcon><WarningIcon color="warning" /></ListItemIcon>
                            <ListItemText 
                              primary="Associated symptoms" 
                              secondary="Do you have fever, pain, itching, or other symptoms?"
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemIcon><WarningIcon color="warning" /></ListItemIcon>
                            <ListItemText 
                              primary="Triggers or relief factors" 
                              secondary="Does anything make symptoms better or worse?"
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemIcon><WarningIcon color="warning" /></ListItemIcon>
                            <ListItemText 
                              primary="Previous treatments" 
                              secondary="Have you tried any medications or remedies?"
                            />
                          </ListItem>
                        </List>
                        <Typography variant="body2" color="textSecondary">
                          The more information you provide, the more accurate our AI diagnosis will be.
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                )}
                
                {activeStep === 2 && (
                  <Box className="diagnosis-container">
                    <DiagnosisResult 
                      results={diagnosisResults}
                      onSaveReport={handleSaveReport}
                      onFindDoctor={handleFindDoctor}
                    />
                    
                    <Box mt={4}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                          <Button 
                            variant="contained" 
                            color="secondary" 
                            fullWidth
                            startIcon={<LocalHospitalIcon />}
                            onClick={handleScheduleAppointment}
                          >
                            Schedule Doctor Appointment
                          </Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Button 
                            variant="outlined" 
                            color="primary" 
                            fullWidth
                            onClick={handleShareResults}
                          >
                            Share Results with Provider
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                    
                    {diagnosisResults?.additionalInfo && (
                      <Box mt={4} className="additional-info">
                        <Typography variant="h6" gutterBottom>Additional Information</Typography>
                        <Grid container spacing={3}>
                          <Grid item xs={12} md={4}>
                            <Typography variant="subtitle2">Potential Triggers</Typography>
                            <List dense>
                              {diagnosisResults.additionalInfo.potentialTriggers.map((trigger, index) => (
                                <ListItem key={index}>
                                  <ListItemIcon><WarningIcon fontSize="small" color="warning" /></ListItemIcon>
                                  <ListItemText primary={trigger} />
                                </ListItem>
                              ))}
                            </List>
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <Typography variant="subtitle2">Preventive Measures</Typography>
                            <List dense>
                              {diagnosisResults.additionalInfo.preventiveMeasures.map((measure, index) => (
                                <ListItem key={index}>
                                  <ListItemIcon><CheckCircleIcon fontSize="small" color="success" /></ListItemIcon>
                                  <ListItemText primary={measure} />
                                </ListItem>
                              ))}
                            </List>
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <Typography variant="subtitle2">Follow-up Timeframe</Typography>
                            <Typography variant="body2">
                              {diagnosisResults.additionalInfo.followUpTimeframe}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>
                    )}
                    
                    {diagnosisResults?.similarCases && (
                      <Box mt={4} className="similar-cases">
                        <Typography variant="h6" gutterBottom>Similar Cases</Typography>
                        <Grid container spacing={2}>
                          {diagnosisResults.similarCases.map((caseItem) => (
                            <Grid item xs={12} sm={6} key={caseItem.id}>
                              <Card variant="outlined">
                                <CardContent>
                                  <Typography variant="subtitle2">
                                    {caseItem.condition}
                                  </Typography>
                                  <Typography variant="body2" color="textSecondary">
                                    {caseItem.matchPercentage}% match with your symptoms
                                  </Typography>
                                </CardContent>
                              </Card>
                            </Grid>
                          ))}
                        </Grid>
                      </Box>
                    )}
                    
                    <Box className="diagnosis-disclaimer" mt={4} p={2} bgcolor="background.paper" borderRadius={1}>
                      <Typography variant="body2" color="textSecondary">
                        <strong>Important:</strong> This is an AI-generated preliminary assessment and not a definitive medical diagnosis.
                        Always consult with a healthcare professional for proper evaluation and treatment.
                      </Typography>
                    </Box>
                  </Box>
                )}
              </>
            )}
          </Box>
        </Paper>
        
        <Divider sx={{ my: 6 }} />
        
        {/* Additional content sections */}
        {renderServiceStats()}
        {renderFeatures()}
        {renderFAQs()}
        
        {/* Recent diagnoses section */}
        <Box className="recent-diagnoses" mt={6} mb={6}>
          <Typography variant="h5" gutterBottom className="section-title">
            Recent Anonymous Diagnoses
          </Typography>
          <Typography variant="body2" paragraph color="textSecondary">
            Examples of recent diagnoses made by our AI system (all user data anonymized)
          </Typography>
          <Grid container spacing={3}>
            {recentDiagnoses.map((diagnosis) => (
              <Grid item xs={12} sm={4} key={diagnosis.id}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6">{diagnosis.condition}</Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      Diagnosed {diagnosis.date}
                    </Typography>
                    <Chip 
                      size="small" 
                      label={diagnosis.severity} 
                      color={diagnosis.severity === 'Mild' ? 'success' : 'warning'} 
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
        
        {/* Call-to-action section */}
        <Box className="cta-section" mt={6} mb={4} p={4} bgcolor="primary.main" color="white" borderRadius={2}>
          <Typography variant="h5" align="center" gutterBottom>
            Get Started with Your Diagnosis Today
          </Typography>
          <Typography variant="body1" align="center" paragraph>
            Upload an image, describe your symptoms, and receive a preliminary diagnosis in minutes.
          </Typography>
          <Box textAlign="center">
            <Button 
              variant="contained" 
              color="secondary" 
              size="large"
              onClick={() => setActiveStep(0)}
            >
              Start New Diagnosis
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Services;