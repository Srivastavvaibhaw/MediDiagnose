// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Button,
  useMediaQuery,
  useTheme,
  Fade,
  Zoom,
  Chip,
  Avatar,
  Rating,
  Paper,
  Divider
} from '@mui/material';
import { Link } from 'react-router-dom';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import HealingIcon from '@mui/icons-material/Healing';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DevicesIcon from '@mui/icons-material/Devices';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Card from '../components/ui/Card';
import '../styles/pages/Home.css';

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [animateHero, setAnimateHero] = useState(false);
  
  useEffect(() => {
    setAnimateHero(true);
    
    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const features = [
    {
      title: "AI-Powered Diagnosis",
      description: "Upload images of medical conditions and receive instant AI analysis to identify potential issues with 95% accuracy.",
      icon: <MedicalServicesIcon fontSize="large" color="primary" />,
      link: "/services"
    },
    {
      title: "Symptom Analysis",
      description: "Describe your symptoms in detail and get preliminary diagnosis suggestions based on our database of 10,000+ medical conditions.",
      icon: <HealingIcon fontSize="large" color="primary" />,
      link: "/services"
    },
    {
      title: "Secure & Private",
      description: "Your health data is encrypted with military-grade protection. We prioritize your privacy with HIPAA-compliant security measures.",
      icon: <VerifiedUserIcon fontSize="large" color="primary" />,
      link: "/services"
    },
    {
      title: "24/7 Availability",
      description: "Access medical guidance anytime, anywhere. Our AI system is always available to help with your health concerns.",
      icon: <AccessTimeIcon fontSize="large" color="primary" />,
      link: "/about"
    },
    {
      title: "Multi-device Support",
      description: "Use our service seamlessly across all your devices - desktop, tablet, or mobile phone with synchronized health records.",
      icon: <DevicesIcon fontSize="large" color="primary" />,
      link: "#"
    },
    {
      title: "Doctor Referrals",
      description: "Get connected with specialists in your area based on your diagnosis results when professional care is recommended.",
      icon: <LocalHospitalIcon fontSize="large" color="primary" />,
      link: "/services"
    }
  ];
  
  const testimonials = [
    {
      text: "MediDiagnose helped me identify a skin condition that I'd been concerned about for weeks. The diagnosis was confirmed by my doctor later, saving me weeks of worry.",
      name: "Sarah Johnson",
      location: "New York, USA",
      avatar: "/assets/images/avatars/sarah.jpg",
      rating: 5
    },
    {
      text: "As someone living in a rural area, having access to quick medical assessments is invaluable. This tool has been a lifesaver! I was able to determine the severity of my condition before driving 2 hours to the nearest hospital.",
      name: "Michael Rodriguez",
      location: "Montana, USA",
      avatar: "/assets/images/avatars/michael.jpg",
      rating: 5
    },
    {
      text: "The symptom analyzer provided me with insights that helped me have a more informed conversation with my healthcare provider. It suggested questions I hadn't thought to ask.",
      name: "Emily Chen",
      location: "California, USA",
      avatar: "/assets/images/avatars/emily.jpg",
      rating: 4
    },
    {
      text: "I was skeptical at first, but the accuracy of the diagnosis surprised me. It correctly identified my rash and suggested effective over-the-counter treatments until I could see a dermatologist.",
      name: "David Thompson",
      location: "London, UK",
      avatar: "/assets/images/avatars/david.jpg",
      rating: 5
    }
  ];
  
  const stats = [
    { value: "2M+", label: "Users Worldwide" },
    { value: "95%", label: "Diagnosis Accuracy" },
    { value: "10K+", label: "Medical Conditions" },
    { value: "24/7", label: "Support Available" }
  ];

  return (
    <Box className="home-page">
      {/* Hero Section */}
      <Box className="hero-section">
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Fade in={animateHero} timeout={1000}>
                <Box className="hero-content">
                  <Chip 
                    label="Trusted by 2M+ Users Worldwide" 
                    color="primary" 
                    size="medium" 
                    className="hero-chip"
                  />
                  <Typography variant="h2" component="h1" className="hero-title">
                    Medical Diagnosis <span className="text-gradient">Reimagined</span>
                  </Typography>
                  <Typography variant="h5" component="h2" className="hero-subtitle">
                    AI-Powered Healthcare at Your Fingertips
                  </Typography>
                  <Typography variant="body1" className="hero-description">
                    Get accurate medical insights in minutes, not days. Our advanced AI analyzes your symptoms and images to provide preliminary diagnoses with 95% accuracy.
                  </Typography>
                  <Box className="hero-stats">
                    {stats.map((stat, index) => (
                      <Box key={index} className="stat-item">
                        <Typography variant="h4" className="stat-value">
                          {stat.value}
                        </Typography>
                        <Typography variant="body2" className="stat-label">
                          {stat.label}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                  <Box className="hero-buttons">
                    <Button 
                      variant="contained" 
                      color="primary" 
                      size="large"
                      component={Link}
                      to="/services"
                      className="primary-button"
                      endIcon={<ArrowForwardIcon />}
                    >
                      Try Diagnosis Now
                    </Button>
                    <Button 
                      variant="outlined" 
                      color="primary"
                      size="large"
                      component={Link}
                      to="/about"
                      className="secondary-button"
                    >
                      How It Works
                    </Button>
                  </Box>
                </Box>
              </Fade>
            </Grid>
            <Grid item xs={12} md={6}>
              <Zoom in={animateHero} timeout={1500}>
                <Box className="hero-image-container">
                  <div className="hero-image-background"></div>
                  <img 
                    src="/src/assets/illustration.jpg" 
                    alt="Medical diagnosis illustration" 
                    className="hero-image"
                  />
                  <div className="floating-card card-1">
                    <CheckCircleIcon color="success" />
                    <Typography variant="body2">Diagnosis Complete</Typography>
                  </div>
                  <div className="floating-card card-2">
                    <AccessTimeIcon color="primary" />
                    <Typography variant="body2">Results in 2 minutes</Typography>
                  </div>
                </Box>
              </Zoom>
            </Grid>
          </Grid>
        </Container>
      </Box>
      
      {/* Trust Indicators */}
      <Box className="trust-indicators-section">
        <Container maxWidth="lg">
          <Box className="partners-logos">
            <Typography variant="subtitle1" className="partners-title">
              Trusted by healthcare professionals worldwide
            </Typography>
            <Grid container spacing={4} justifyContent="center" alignItems="center">
              {['partner1.png', 'partner2.png', 'partner3.png', 'partner4.webp', 'partner5.png'].map((logo, index) => (
                <Grid item key={index}>
                  <img 
                    src={`src/assets/partners/${logo}`} 
                    alt={`Healthcare partner ${index + 1}`} 
                    className="partner-logo"
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>
      
      {/* Features Section */}
      <Box className="features-section">
        <Container maxWidth="lg">
          <Box className="section-header">
            <Typography variant="overline" className="section-overline">
              Our Services
            </Typography>
            <Typography variant="h3" component="h2" className="section-title" align="center">
              Comprehensive Health Solutions
            </Typography>
            <Typography variant="subtitle1" className="section-subtitle" align="center">
              Discover how our AI-powered platform can help you understand and manage your health
            </Typography>
          </Box>
          
          <Grid container spacing={4} className="features-grid">
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper 
                  elevation={2} 
                  className="feature-card" 
                  component={Link} 
                  to={feature.link}
                >
                  <Box className="feature-icon-wrapper">
                    {feature.icon}
                  </Box>
                  <Typography variant="h5" component="h3" className="feature-title">
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" className="feature-description">
                    {feature.description}
                  </Typography>
                  <Box className="feature-link">
                    <Typography variant="button" color="primary">
                      Learn More
                    </Typography>
                    <ArrowForwardIcon fontSize="small" color="primary" />
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      
      {/* How It Works Section */}
      <Box className="how-it-works-section">
        <Container maxWidth="lg">
          <Box className="section-header">
            <Typography variant="overline" className="section-overline">
              Process
            </Typography>
            <Typography variant="h3" component="h2" className="section-title" align="center">
              Simple 3-Step Process
            </Typography>
            <Typography variant="subtitle1" className="section-subtitle" align="center">
              Get started in minutes with our user-friendly platform
            </Typography>
          </Box>
          
          <Box className="steps-timeline">
            <div className="timeline-line"></div>
            <Grid container spacing={isMobile ? 2 : 4} className="steps-container">
              <Grid item xs={12} md={4}>
                <Box className="step-item">
                  <Box className="step-number">1</Box>
                  <Box className="step-content">
                    <Typography variant="h5" component="h3" className="step-title">
                      Upload Image
                    </Typography>
                    <Typography variant="body1" className="step-description">
                      Take a clear photo of the affected area and upload it to our secure platform. Our system supports multiple image formats for your convenience.
                    </Typography>
                    <img 
                      src="src/assets/imageupload.png" 
                      alt="Upload medical image" 
                      className="step-image"
                    />
                  </Box>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Box className="step-item">
                  <Box className="step-number">2</Box>
                  <Box className="step-content">
                    <Typography variant="h5" component="h3" className="step-title">
                      Describe Symptoms
                    </Typography>
                    <Typography variant="body1" className="step-description">
                      Provide details about your symptoms, duration, and any other relevant information. Our smart form adapts to your inputs for comprehensive analysis.
                    </Typography>
                    <img 
                      src="src/assets/Describe Symptoms.png" 
                      alt="Describe symptoms" 
                      className="step-image"
                    />
                  </Box>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Box className="step-item">
                  <Box className="step-number">3</Box>
                  <Box className="step-content">
                    <Typography variant="h5" component="h3" className="step-title">
                      Get Results
                    </Typography>
                    <Typography variant="body1" className="step-description">
                      Receive preliminary diagnosis and actionable recommendations from our AI-powered system within minutes. Save, print, or share your results with healthcare providers.
                    </Typography>
                    <img 
                      src="src/assets/result.jpg" 
                      alt="Get diagnosis results" 
                      className="step-image"
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
          
          <Box className="cta-container" textAlign="center" mt={6}>
            <Typography variant="h5" className="cta-text" gutterBottom>
              Ready to get started with your diagnosis?
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              size="large"
              component={Link}
              to="/services"
              className="cta-button"
              endIcon={<ArrowForwardIcon />}
            >
              Start Diagnosis Now
            </Button>
          </Box>
        </Container>
      </Box>
      
      {/* Testimonials Section */}
      <Box className="testimonials-section">
        <Container maxWidth="lg">
          <Box className="section-header">
            <Typography variant="overline" className="section-overline">
              Testimonials
            </Typography>
            <Typography variant="h3" component="h2" className="section-title" align="center">
              What Our Users Say
            </Typography>
            <Typography variant="subtitle1" className="section-subtitle" align="center">
              Read about real experiences from people who've used our platform
            </Typography>
          </Box>
          
          <Box className="testimonials-carousel">
            <Box className="testimonial-slide" sx={{ opacity: 1 }}>
              <Paper elevation={3} className="testimonial-card">
                <Box className="testimonial-content">
                  <Typography variant="body1" className="testimonial-text">
                    "{testimonials[activeTestimonial].text}"
                  </Typography>
                  <Rating 
                    value={testimonials[activeTestimonial].rating} 
                    readOnly 
                    className="testimonial-rating" 
                  />
                  <Divider className="testimonial-divider" />
                  <Box className="testimonial-author">
                    <Avatar 
                      src={testimonials[activeTestimonial].avatar} 
                      alt={testimonials[activeTestimonial].name} 
                      className="author-avatar" 
                    />
                    <Box>
                      <Typography variant="subtitle1" className="author-name">
                        {testimonials[activeTestimonial].name}
                      </Typography>
                      <Typography variant="body2" className="author-location">
                        {testimonials[activeTestimonial].location}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Paper>
            </Box>
            
            <Box className="testimonial-indicators">
              {testimonials.map((_, index) => (
                <Box 
                  key={index}
                  className={`indicator ${index === activeTestimonial ? 'active' : ''}`}
                  onClick={() => setActiveTestimonial(index)}
                />
              ))}
            </Box>
          </Box>
          
          <Box className="cta-container" textAlign="center" mt={6}>
            <Button 
              variant="outlined" 
              color="primary"
              size="large"
              component={Link}
              to="/testimonials"
              className="testimonials-button"
            >
              View All Testimonials
            </Button>
          </Box>
        </Container>
      </Box>
      
      {/* Download App Section */}
      <Box className="download-section">
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box className="download-content">
                <Typography variant="h3" component="h2" className="download-title">
                  Take MediDiagnose With You
                </Typography>
                <Typography variant="body1" className="download-description">
                  Download our mobile app to access our AI-powered medical diagnosis tools anytime, anywhere. Available for iOS and Android devices.
                </Typography>
                <Box className="download-buttons">
                  <Button 
                    variant="contained" 
                    color="primary" 
                    className="download-button"
                    component="a"
                    href="https://www.apple.com/in/app-store/"
                  >
                    <img 
                      src="src/assets/download.png" 
                      alt="Download on App Store" 
                      className="store-icon"
                    />
                  </Button>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    className="download-button"
                    component="a"
                    href="https://play.google.com/store/games?hl=en_IN&pli=1"
                  >
                    <img 
                      src="src/assets/play store.png" 
                      alt="Get it on Google Play" 
                      className="store-icon"
                    />
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box className="app-showcase">
                <img 
                  src="src/assets/app.jpg" 
                  alt="MediDiagnose mobile app" 
                  className="app-image"
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      
      {/* Newsletter Section */}
      <Box className="newsletter-section">
        <Container maxWidth="md">
          <Paper elevation={3} className="newsletter-container">
            <Typography variant="h4" component="h2" className="newsletter-title" align="center">
              Stay Updated with Health Insights
            </Typography>
            <Typography variant="body1" className="newsletter-description" align="center">
              Subscribe to our newsletter for the latest health tips, medical research, and updates on our AI technology.
            </Typography>
            <Box className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="newsletter-input"
              />
              <Button 
                variant="contained" 
                color="primary" 
                className="newsletter-button"
              >
                Subscribe
              </Button>
            </Box>
            <Typography variant="body2" className="newsletter-privacy" align="center">
              We respect your privacy. Unsubscribe at any time.
            </Typography>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
