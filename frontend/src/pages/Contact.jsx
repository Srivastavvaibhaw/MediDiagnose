// src/pages/Contact.jsx
import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  TextField, 
  Button,
  Paper,
  Alert,
  Snackbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  Fade,
  Tooltip,
  Divider,
  useMediaQuery,
  useTheme,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SendIcon from '@mui/icons-material/Send';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import '../styles/pages/Contact.css';

const Contact = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isMedium = useMediaQuery(theme.breakpoints.down('md'));
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [copied, setCopied] = useState({
    email: false,
    phone: false,
    address: false
  });
  const [formTouched, setFormTouched] = useState({});
  const [expandedFaq, setExpandedFaq] = useState(null);
  
  useEffect(() => {
    // Reset copied status after 3 seconds
    const timeout = setTimeout(() => {
      Object.keys(copied).forEach(key => {
        if (copied[key]) {
          setCopied(prev => ({ ...prev, [key]: false }));
        }
      });
    }, 3000);
    
    return () => clearTimeout(timeout);
  }, [copied]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Mark field as touched
    setFormTouched({
      ...formTouched,
      [name]: true
    });
    
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null
      });
    }
  };
  
  const handleInputBlur = (e) => {
    const { name } = e.target;
    setFormTouched({
      ...formTouched,
      [name]: true
    });
    validateField(name, formData[name]);
  };
  
  const validateField = (name, value) => {
    let error = null;
    
    switch (name) {
      case 'name':
        if (!value.trim()) {
          error = 'Name is required';
        }
        break;
        
      case 'email':
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
          error = 'Invalid email address';
        }
        break;
        
      case 'subject':
        if (!value.trim()) {
          error = 'Subject is required';
        }
        break;
        
      case 'message':
        if (!value.trim()) {
          error = 'Message is required';
        } else if (value.trim().length < 10) {
          error = 'Message must be at least 10 characters';
        }
        break;
        
      default:
        break;
    }
    
    setFormErrors(prev => ({
      ...prev,
      [name]: error
    }));
    
    return !error;
  };
  
  const validateForm = () => {
    const fields = ['name', 'email', 'subject', 'message'];
    const newErrors = {};
    
    fields.forEach(field => {
      const isValid = validateField(field, formData[field]);
      if (!isValid) {
        newErrors[field] = formErrors[field];
      }
    });
    
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allTouched = {};
    Object.keys(formData).forEach(key => {
      allTouched[key] = true;
    });
    setFormTouched(allTouched);
    
    if (validateForm()) {
      setIsSubmitting(true);
      setSubmitError(null);
      
      // Simulate API call
      setTimeout(() => {
        try {
          // Simulate successful submission
          setIsSubmitting(false);
          setSubmitSuccess(true);
          setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
          });
          setFormTouched({});
        } catch (error) {
          setIsSubmitting(false);
          setSubmitError('An error occurred. Please try again later.');
        }
      }, 1500);
    }
  };
  
  const handleSnackbarClose = () => {
    setSubmitSuccess(false);
  };
  
  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied({ ...copied, [type]: true });
    });
  };
  
  const handleFaqChange = (panel) => (event, isExpanded) => {
    setExpandedFaq(isExpanded ? panel : null);
  };
  
  const contactInfo = {
    email: 'support@medidiagnose.com',
    phone: '+1 (555) 123-4567',
    address: '123 Health Tech Plaza, Suite 400, San Francisco, CA 94103'
  };
  
  const faqs = [
    {
      id: 'faq1',
      question: 'Is MediDiagnose a replacement for seeing a doctor?',
      answer: 'No, MediDiagnose is designed to provide preliminary assessments only. Our AI technology can help identify potential conditions, but it is not a substitute for professional medical diagnosis and treatment. Always consult with qualified healthcare professionals for proper medical advice and care.'
    },
    {
      id: 'faq2',
      question: 'How accurate are the diagnoses?',
      answer: 'Our AI models have been trained on millions of medical images and symptom patterns, achieving high accuracy rates in preliminary assessments. However, accuracy varies depending on image quality, symptom description detail, and the specific condition. We continuously improve our models with feedback from medical professionals.'
    },
    {
      id: 'faq3',
      question: 'Is my medical data secure?',
      answer: 'Yes, we take data security very seriously. All uploaded images and symptom information are encrypted using industry-standard protocols and stored securely on HIPAA-compliant servers. We comply with healthcare data protection regulations and never share your information with third parties without explicit consent.'
    },
    {
      id: 'faq4',
      question: 'Can I use MediDiagnose for emergency situations?',
      answer: 'No, MediDiagnose is not designed for emergency situations. If you are experiencing a medical emergency, please call emergency services (911) or go to your nearest emergency room immediately. Our service is intended for non-urgent preliminary assessments only.'
    },
    {
      id: 'faq5',
      question: 'How do I get started with MediDiagnose?',
      answer: 'Getting started is simple! Create an account, complete your health profile, and you can immediately begin using our diagnostic tools. Upload medical images or describe symptoms through our guided interface. For a personalized walkthrough, schedule a demo with our team through the contact form on this page.'
    },
    {
      id: 'faq6',
      question: 'Do you offer technical support?',
      answer: 'Yes, our technical support team is available Monday through Friday, 9:00 AM to 6:00 PM (PST). You can reach us via email at support@medidiagnose.com or through the contact form on this page. For urgent technical issues, please call our support line at +1 (555) 123-4567.'
    }
  ];
  
  return (
    <Box className="contact-page">
      <Container maxWidth="lg">
        <Fade in={true} timeout={800}>
          <Box className="contact-header">
            <Typography variant="h2" component="h1" className="contact-title">
              Contact Us
            </Typography>
            
            <Typography variant="body1" paragraph className="contact-description">
              Have questions about our services? Need technical support? We're here to help.
              Fill out the form below or reach out to us directly using the contact information provided.
            </Typography>
            
            {submitError && (
              <Alert 
                severity="error" 
                className="submit-error" 
                onClose={() => setSubmitError(null)}
                variant="filled"
                elevation={6}
              >
                {submitError}
              </Alert>
            )}
          </Box>
        </Fade>
        
        <Grid container spacing={4} className="contact-container">
          <Grid item xs={12} md={5}>
            <Fade in={true} timeout={1000} style={{ transitionDelay: '200ms' }}>
              <Paper elevation={3} className="contact-info-paper">
                <Typography variant="h5" component="h2" className="contact-info-title">
                  Get in Touch
                </Typography>
                
                <List className="contact-info-list">
                  <ListItem className="contact-info-item">
                    <ListItemIcon>
                      <EmailIcon color="primary" className="contact-icon" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Email" 
                      secondary={contactInfo.email}
                      primaryTypographyProps={{ className: "contact-info-label" }}
                      secondaryTypographyProps={{ className: "contact-info-value" }}
                    />
                    <Tooltip title={copied.email ? "Copied!" : "Copy email"}>
                      <IconButton 
                        onClick={() => handleCopy(contactInfo.email, 'email')}
                        className="copy-button"
                        size="small"
                      >
                        {copied.email ? <CheckCircleIcon color="success" /> : <ContentCopyIcon />}
                      </IconButton>
                    </Tooltip>
                  </ListItem>
                  
                  <Divider variant="inset" component="li" />
                  
                  <ListItem className="contact-info-item">
                    <ListItemIcon>
                      <PhoneIcon color="primary" className="contact-icon" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Phone" 
                      secondary={contactInfo.phone}
                      primaryTypographyProps={{ className: "contact-info-label" }}
                      secondaryTypographyProps={{ className: "contact-info-value" }}
                    />
                    <Tooltip title={copied.phone ? "Copied!" : "Copy phone"}>
                      <IconButton 
                        onClick={() => handleCopy(contactInfo.phone, 'phone')}
                        className="copy-button"
                        size="small"
                      >
                        {copied.phone ? <CheckCircleIcon color="success" /> : <ContentCopyIcon />}
                      </IconButton>
                    </Tooltip>
                  </ListItem>
                  
                  <Divider variant="inset" component="li" />
                  
                  <ListItem className="contact-info-item">
                    <ListItemIcon>
                      <LocationOnIcon color="primary" className="contact-icon" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Address" 
                      secondary={contactInfo.address}
                      primaryTypographyProps={{ className: "contact-info-label" }}
                      secondaryTypographyProps={{ className: "contact-info-value" }}
                    />
                    <Tooltip title={copied.address ? "Copied!" : "Copy address"}>
                      <IconButton 
                        onClick={() => handleCopy(contactInfo.address, 'address')}
                        className="copy-button"
                        size="small"
                      >
                        {copied.address ? <CheckCircleIcon color="success" /> : <ContentCopyIcon />}
                      </IconButton>
                    </Tooltip>
                  </ListItem>
                </List>
                
                <Box className="business-hours">
                  <Box className="hours-header">
                    <AccessTimeIcon color="primary" className="hours-icon" />
                    <Typography variant="h6" className="hours-title">Business Hours</Typography>
                  </Box>
                  <Box className="hours-content">
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <Typography variant="body2" className="day">Monday - Friday:</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" className="time">9:00 AM - 6:00 PM (PST)</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" className="day">Saturday:</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" className="time">10:00 AM - 2:00 PM (PST)</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" className="day">Sunday:</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" className="time">Closed</Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
                
                <Box className="social-links">
                  <Typography variant="subtitle1" className="social-title">Connect With Us</Typography>
                  <Box className="social-icons">
                    {/* Add your social media icons/links here */}
                  </Box>
                </Box>
              </Paper>
            </Fade>
          </Grid>
          
          <Grid item xs={12} md={7}>
            <Fade in={true} timeout={1000} style={{ transitionDelay: '400ms' }}>
              <Paper elevation={3} className="contact-form-paper">
                <Typography variant="h5" component="h2" className="form-title">
                  Send Us a Message
                </Typography>
                
                <form onSubmit={handleSubmit} className="contact-form">
                  <TextField
                    fullWidth
                    label="Your Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    margin="normal"
                    variant="outlined"
                    error={formTouched.name && !!formErrors.name}
                    helperText={formTouched.name && formErrors.name}
                    required
                    InputProps={{
                      className: "form-input"
                    }}
                    InputLabelProps={{
                      className: "form-label"
                    }}
                  />
                  
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    margin="normal"
                    variant="outlined"
                    error={formTouched.email && !!formErrors.email}
                    helperText={formTouched.email && formErrors.email}
                    required
                    InputProps={{
                      className: "form-input"
                    }}
                    InputLabelProps={{
                      className: "form-label"
                    }}
                  />
                  
                  <TextField
                    fullWidth
                    label="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    margin="normal"
                    variant="outlined"
                    error={formTouched.subject && !!formErrors.subject}
                    helperText={formTouched.subject && formErrors.subject}
                    required
                    InputProps={{
                      className: "form-input"
                    }}
                    InputLabelProps={{
                      className: "form-label"
                    }}
                  />
                  
                  <TextField
                    fullWidth
                    label="Message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    margin="normal"
                    variant="outlined"
                    multiline
                    rows={5}
                    error={formTouched.message && !!formErrors.message}
                    helperText={formTouched.message && formErrors.message}
                    required
                    InputProps={{
                      className: "form-textarea"
                    }}
                    InputLabelProps={{
                      className: "form-label"
                    }}
                  />
                  
                  <Box className="form-footer">
                    <Typography variant="caption" className="form-disclaimer">
                      By submitting this form, you agree to our <a href="/privacy-policy">Privacy Policy</a> and <a href="/terms">Terms of Service</a>.
                    </Typography>
                    
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      endIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                      disabled={isSubmitting}
                      className="submit-button"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </Box>
                </form>
              </Paper>
            </Fade>
          </Grid>
        </Grid>
        
        {/* FAQ Section */}
        <Fade in={true} timeout={1000} style={{ transitionDelay: '600ms' }}>
          <Box className="faq-section">
            <Box className="faq-header">
              <Typography variant="h4" component="h2" className="section-subtitle">
                Frequently Asked Questions
              </Typography>
              <Typography variant="body1" className="faq-intro">
                Find answers to common questions about MediDiagnose and our services.
                Can't find what you're looking for? Contact us directly.
              </Typography>
            </Box>
            
            <Box className="faq-container">
              {isMedium ? (
                // Accordion style for mobile and tablet
                faqs.map((faq) => (
                  <Accordion 
                    key={faq.id}
                    expanded={expandedFaq === faq.id}
                    onChange={handleFaqChange(faq.id)}
                    className="faq-accordion"
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`${faq.id}-content`}
                      id={`${faq.id}-header`}
                      className="faq-accordion-summary"
                    >
                      <Typography variant="h6" className="faq-question">
                        {faq.question}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails className="faq-accordion-details">
                      <Typography variant="body2" className="faq-answer">
                        {faq.answer}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))
              ) : (
                // Grid style for desktop
                <Grid container spacing={3}>
                  {faqs.map((faq) => (
                    <Grid item xs={12} md={6} key={faq.id}>
                      <Paper elevation={2} className="faq-item">
                        <Box className="faq-question-container">
                          <HelpOutlineIcon className="faq-icon" />
                          <Typography variant="h6" className="faq-question">
                            {faq.question}
                          </Typography>
                        </Box>
                        <Typography variant="body2" className="faq-answer">
                          {faq.answer}
                        </Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Box>
          </Box>
        </Fade>
      </Container>
      
      {/* Map Section */}
      <Fade in={true} timeout={1000} style={{ transitionDelay: '800ms' }}>
        <Box className="map-section">
          <Container maxWidth="lg" className="map-header-container">
            <Typography variant="h4" component="h2" className="map-title">
              Visit Our Office
            </Typography>
            <Typography variant="body1" className="map-subtitle">
              We're conveniently located in downtown San Francisco
            </Typography>
          </Container>
          <Box className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0981346485374!2d-122.41941708468212!3d37.77492997975918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5050fa5!2sTwitter%20HQ!5e0!3m2!1sen!2sus!4v1589584776256!5m2!1sen!2sus"
              width="100%"
              height={isMobile ? "350" : "500"}
              frameBorder="0"
              style={{ border: 0 }}
              allowFullScreen=""
              aria-hidden="false"
              tabIndex="0"
              title="MediDiagnose Location"
              className="contact-map"
            ></iframe>
          </Box>
        </Box>
      </Fade>
      
      {/* Call-to-action section */}
      <Fade in={true} timeout={1000} style={{ transitionDelay: '1000ms' }}>
        <Container maxWidth="lg" className="contact-cta-container">
          <Paper elevation={4} className="contact-cta">
            <Typography variant="h5" className="cta-title">
              Need Immediate Assistance?
            </Typography>
            <Typography variant="body1" className="cta-text">
              Our customer support team is available during business hours to help you with any questions.
            </Typography>
            <Button 
              variant="contained" 
              color="secondary" 
              size="large" 
              className="cta-button"
              href="tel:+15551234567"
            >
              Call Us Now
            </Button>
          </Paper>
        </Container>
      </Fade>
      
      <Snackbar
        open={submitSuccess}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" variant="filled" className="success-alert">
          Your message has been sent successfully! We'll get back to you soon.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Contact;
