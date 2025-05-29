
import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Card,
  CardContent,
  Paper,
  Chip
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import SecurityIcon from '@mui/icons-material/Security';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import TimelineIcon from '@mui/icons-material/Timeline';
import SchoolIcon from '@mui/icons-material/School';
import '../styles/pages/About.css';

const About = () => {
  const teamMembers = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Medical Director',
      bio: 'Board-certified physician with over 15 years of experience in diagnostic medicine and healthcare technology. Dr. Johnson leads our medical validation processes and ensures all diagnostic algorithms meet clinical standards.',
      education: 'MD from Johns Hopkins University',
      specializations: ['Diagnostic Medicine', 'Healthcare Technology', 'Clinical Research']
    },
    {
      name: 'Michael Chen',
      role: 'AI Research Lead',
      bio: 'PhD in Machine Learning with expertise in medical image processing and diagnostic algorithms. Michael has published over 30 research papers on AI applications in healthcare and previously worked at Google Health.',
      education: 'PhD in Computer Science from Stanford University',
      specializations: ['Deep Learning', 'Computer Vision', 'Medical Diagnostics']
    },
    {
      name: 'Priya Patel',
      role: 'Software Engineer',
      bio: 'Full-stack developer specialized in healthcare applications and secure data management systems. Priya has led development teams at three health-tech startups and built HIPAA-compliant platforms serving millions of users.',
      education: 'MS in Computer Science from MIT',
      specializations: ['Full-Stack Development', 'Healthcare APIs', 'Data Security']
    },
    {
      name: 'David Rodriguez',
      role: 'Data Scientist',
      bio: 'Expert in medical data analysis and predictive modeling with a focus on symptom-based diagnosis. David has developed machine learning models that have improved diagnostic accuracy by over 40% compared to traditional methods.',
      education: 'PhD in Biostatistics from University of California, Berkeley',
      specializations: ['Predictive Analytics', 'Biostatistics', 'Clinical Data Mining']
    }
  ];
  
  const achievements = [
    {
      year: '2023',
      milestone: 'Received FDA clearance for our diagnostic support system',
      description: 'Our AI-powered diagnostic platform received FDA clearance as a clinical decision support tool for healthcare providers.'
    },
    {
      year: '2022',
      milestone: '1 million users milestone',
      description: 'MediDiagnose reached 1 million registered users across 45 countries, with a 92% user satisfaction rating.'
    },
    {
      year: '2021',
      milestone: 'Published research validation',
      description: 'Our diagnostic algorithms were validated in a peer-reviewed study published in the New England Journal of Medicine.'
    }
  ];

  const partnerships = [
    {
      name: 'Mayo Clinic',
      logo: '/assets/mayo-clinic.jpg',
      description: 'Research collaboration on AI-powered diagnostic tools'
    },
    {
      name: 'National Institutes of Health',
      logo: '/assets/national-institutes.jpg',
      description: 'Grant recipient for innovative healthcare technology research'
    },
    {
      name: 'World Health Organization',
      logo: '/assets/who.png',
      description: 'Partnership to expand healthcare access in developing regions'
    }
  ];
  
  return (
    <Box className="about-page">
      <Container maxWidth="lg">
        <Box className="hero-section" mb={6}>
          <Typography variant="h2" component="h1" className="about-title" gutterBottom>
            About MediDiagnose
          </Typography>
          <Typography variant="h5" component="h2" color="textSecondary" className="about-subtitle" gutterBottom>
            Revolutionizing Healthcare with AI-Powered Diagnostics
          </Typography>
          <Paper elevation={3} className="hero-paper">
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={8}>
                <Typography variant="body1" paragraph className="hero-text">
                  Founded in 2019, MediDiagnose is at the forefront of healthcare innovation, combining medical expertise with cutting-edge artificial intelligence to create accessible diagnostic solutions for patients and healthcare providers worldwide.
                </Typography>
                <Box mt={2} display="flex" gap={2}>
                  <Button variant="contained" color="primary" size="large">
                    Our Services
                  </Button>
                  <Button variant="outlined" color="primary" size="large">
                    Contact Us
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box className="stats-container">
                  <Box className="stat-item">
                    <Typography variant="h3" color="primary">98%</Typography>
                    <Typography variant="body2">Diagnostic Accuracy</Typography>
                  </Box>
                  <Box className="stat-item">
                    <Typography variant="h3" color="primary">1.2M+</Typography>
                    <Typography variant="body2">Users Worldwide</Typography>
                  </Box>
                  <Box className="stat-item">
                    <Typography variant="h3" color="primary">45+</Typography>
                    <Typography variant="body2">Countries Served</Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Box>
        
        {/* Mission Section */}
        <Box className="mission-section" mb={8}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h4" component="h2" className="section-subtitle" gutterBottom>
                Our Mission
              </Typography>
              <Typography variant="body1" paragraph>
                At MediDiagnose, we're committed to making healthcare more accessible through innovative technology. 
                Our AI-powered platform provides preliminary medical assessments to help users make informed decisions 
                about their health and connect them with appropriate medical care when needed.
              </Typography>
              <Typography variant="body1" paragraph>
                We believe that early detection and timely medical intervention can significantly improve health outcomes. 
                By combining advanced machine learning algorithms with medical expertise, we aim to bridge the gap between 
                symptom onset and professional medical care.
              </Typography>
              <Typography variant="body1" paragraph>
                Our goal is to reduce healthcare disparities by providing reliable preliminary assessments to underserved communities
                and regions with limited access to medical professionals. By leveraging technology, we empower individuals to take
                control of their health journey while ensuring they receive appropriate medical guidance.
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <HealthAndSafetyIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Improving Global Health Outcomes"
                    secondary="By enabling early detection and intervention for common health conditions"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <PeopleAltIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Expanding Healthcare Access"
                    secondary="Making preliminary medical assessments available to everyone regardless of location"
                  />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box className="mission-image-container">
                <img 
                  src="/assets/professional.jpg" 
                  alt="Medical professionals working with technology" 
                  className="mission-image"
                  loading="lazy"
                />
                <Typography variant="caption" className="image-caption">
                  Our team collaborating with healthcare providers to develop AI-powered diagnostic tools
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
        
        <Divider className="section-divider" />
        
        {/* Technology Section */}
        <Box className="technology-section" my={8}>
          <Typography variant="h4" component="h2" className="section-subtitle" gutterBottom>
            Our Technology
          </Typography>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box className="technology-image-container">
                <img 
                  src="/assets/ai medi.jpg" 
                  alt="AI medical technology visualization" 
                  className="technology-image"
                  loading="lazy"
                  style={{ maxWidth: '500px', maxHeight: '400px' }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <List className="technology-list">
                <ListItem>
                  <ListItemIcon>
                    <PrecisionManufacturingIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Advanced AI Algorithms" 
                    secondary="Our platform utilizes deep learning models trained on millions of medical images and symptom patterns to provide accurate preliminary assessments."
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <MedicalServicesIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Medically Validated" 
                    secondary="All diagnostic models are developed in collaboration with medical professionals and validated against clinical standards."
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <SecurityIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Privacy-Focused" 
                    secondary="We employ end-to-end encryption and strict data protection measures to ensure your health information remains private and secure."
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <TimelineIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Continuous Improvement" 
                    secondary="Our diagnostic algorithms are constantly refined through machine learning techniques that incorporate new medical research."
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>
          
          <Box mt={4}>
            <Typography variant="h5" gutterBottom>
              Technical Specifications
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Card variant="outlined" className="tech-spec-card">
                  <CardContent>
                    <Typography variant="h6" color="primary" gutterBottom>
                      AI Framework
                    </Typography>
                    <Typography variant="body2" paragraph>
                      Built on TensorFlow and PyTorch with custom neural network architectures optimized for medical diagnostics.
                    </Typography>
                    <Typography variant="body2">
                      <strong>Accuracy:</strong> 98.2% in clinical validation studies
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card variant="outlined" className="tech-spec-card">
                  <CardContent>
                    <Typography variant="h6" color="primary" gutterBottom>
                      Data Processing
                    </Typography>
                    <Typography variant="body2" paragraph>
                      Processes over 500 different symptoms and medical parameters to generate comprehensive assessments.
                    </Typography>
                    <Typography variant="body2">
                      <strong>Response time:</strong> Under 3 seconds for preliminary results
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card variant="outlined" className="tech-spec-card">
                  <CardContent>
                    <Typography variant="h6" color="primary" gutterBottom>
                      Integration Capabilities
                    </Typography>
                    <Typography variant="body2" paragraph>
                      RESTful APIs and FHIR-compliant interfaces for seamless integration with existing healthcare systems.
                    </Typography>
                    <Typography variant="body2">
                      <strong>Compatibility:</strong> Works with all major EHR systems
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Box>
        
        <Divider className="section-divider" />
        
        {/* Team Section */}
        <Box className="team-section" my={8}>
          <Typography variant="h4" component="h2" className="section-subtitle" gutterBottom>
            Our Team
          </Typography>
          
          <Typography variant="body1" paragraph className="team-intro">
            MediDiagnose is built by a multidisciplinary team of medical professionals, AI researchers, 
            and software engineers dedicated to improving healthcare through technology.
          </Typography>
          
          <Grid container spacing={4} className="team-grid">
            {teamMembers.map((member, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card className="team-member-card" elevation={3}>
                  <CardContent>
                    <Typography variant="h6" className="member-name">
                      {member.name}
                    </Typography>
                    <Typography variant="subtitle2" color="primary" className="member-role" gutterBottom>
                      {member.role}
                    </Typography>
                    <Typography variant="body2" className="member-bio" paragraph>
                      {member.bio}
                    </Typography>
                    <Box className="member-education" display="flex" alignItems="center" mb={1}>
                      <SchoolIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                      <Typography variant="caption">
                        {member.education}
                      </Typography>
                    </Box>
                    <Box className="member-specializations">
                      {member.specializations.map((spec, idx) => (
                        <Chip 
                          key={idx} 
                          label={spec} 
                          size="small" 
                          variant="outlined" 
                          color="primary"
                          className="specialization-chip"
                        />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
        
        <Divider className="section-divider" />
        
        {/* Achievements Section */}
        <Box className="achievements-section" my={8}>
          <Typography variant="h4" component="h2" className="section-subtitle" gutterBottom>
            Our Achievements
          </Typography>
          
          <Grid container spacing={4}>
            {achievements.map((achievement, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card className="achievement-card" elevation={2}>
                  <CardContent>
                    <Typography variant="h6" color="primary" gutterBottom>
                      {achievement.year}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                      {achievement.milestone}
                    </Typography>
                    <Typography variant="body2">
                      {achievement.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          
          <Box mt={4}>
            <Typography variant="h5" gutterBottom>
              Our Partners
            </Typography>
            <Grid container spacing={3}>
              {partnerships.map((partner, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Card variant="outlined" className="partner-card">
                    <CardContent>
                      <Box className="partner-logo-container" mb={2}>
                        <img 
                          src={partner.logo} 
                          alt={partner.name} 
                          className="partner-logo"
                          loading="lazy"
                        />
                      </Box>
                      <Typography variant="subtitle1" gutterBottom>
                        {partner.name}
                      </Typography>
                      <Typography variant="body2">
                        {partner.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
        
        <Divider className="section-divider" />
        
        /* Values Section */
        <Box className="values-section" my={8}>
          <Typography variant="h4" component="h2" className="section-subtitle" gutterBottom>
            Our Values
          </Typography>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box className="value-item">
                <CheckCircleIcon color="primary" className="value-icon" />
                <Typography variant="h6" className="value-title">
                  Accessibility
                </Typography>
                <Typography variant="body2" paragraph>
                  Making healthcare information and preliminary assessments available to everyone, regardless of location or circumstances.
                </Typography>
                <Typography variant="body2">
                  We actively work to ensure our platform is accessible across different devices, languages, and regions.
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Box className="value-item">
                <CheckCircleIcon color="primary" className="value-icon" />
                <Typography variant="h6" className="value-title">
                  Accuracy
                </Typography>
                <Typography variant="body2" paragraph>
                  Continuously improving our algorithms to provide the most accurate preliminary assessments possible.
                </Typography>
                <Typography variant="body2">
                  Our diagnostic models undergo rigorous clinical validation and are regularly updated.
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Box className="value-item">
                <CheckCircleIcon color="primary" className="value-icon" />
                <Typography variant="h6" className="value-title">
                  Transparency
                </Typography>
                <Typography variant="body2" paragraph>
                  Being clear about what our technology can and cannot do, and always emphasizing the importance of professional medical care.
                </Typography>
                <Typography variant="body2">
                  We provide detailed information about how our algorithms work and their limitations.
                </Typography>
              </Box>
            </Grid>
          </Grid>
          
          <Box mt={6} textAlign="center" className="call-to-action">
            <Typography variant="h5" gutterBottom>
              Join Us in Transforming Healthcare
            </Typography>
            <Typography variant="body1" paragraph>
              Whether you're a healthcare provider, researcher, or patient, we invite you to explore how MediDiagnose can enhance your healthcare experience.
            </Typography>
            <Box mt={2} display="flex" justifyContent="center" gap={2}>
              <Button variant="contained" color="primary" size="large">
                Try Our Platform
              </Button>
              <Button variant="outlined" color="primary" size="large">
                Join Our Research Network
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default About;