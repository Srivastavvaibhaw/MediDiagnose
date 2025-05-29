import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Link, 
  IconButton,
  Divider,
  Tooltip
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <Box component="footer" sx={{ 
      position: 'relative',
      backgroundColor: '#1e293b',
      color: '#f8fafc',
      pt: 4,  // Reduced from 8
      pb: 2   // Reduced from 3
    }}>
      {/* Wave Border - Smaller */}
      <Box sx={{ position: 'absolute', top: -30, left: 0, right: 0, height: 30 }}>
        {/* Your wave SVG here */}
      </Box>
      
      {/* Compact Back to top button */}
      <Box sx={{ position: 'absolute', top: -18, right: '5%' }}>
        <Tooltip title="Back to top" placement="top">
          <IconButton 
            onClick={scrollToTop} 
            size="small"
            sx={{
              backgroundColor: '#3b82f6',
              color: 'white',
              '&:hover': {
                backgroundColor: '#2563eb',
                transform: 'translateY(-2px)'
              },
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
            aria-label="back to top"
          >
            <KeyboardArrowUpIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      <Container maxWidth="lg">
        <Grid container spacing={2} justifyContent="center"> {/* Reduced spacing */}
          {/* Company Info - Compact */}
          <Grid item xs={12} md={4} sx={{ textAlign: 'center', mb: 2 }}>
            <Typography variant="h6" component="div" sx={{ fontWeight: 700, mb: 1 }}> {/* Smaller heading */}
              MediDiagnose
            </Typography>
            <Typography variant="caption" sx={{ mb: 2, opacity: 0.8, display: 'block' }}> {/* Smaller text */}
              Creating amazing experiences since 2010.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 2 }}> {/* Tighter spacing */}
              {[FacebookIcon, TwitterIcon, InstagramIcon, LinkedInIcon].map((Icon, index) => (
                <IconButton 
                  key={index} 
                  size="small"
                  sx={{ 
                    color: '#f8fafc', 
                    '&:hover': { color: '#3b82f6' },
                    p: 0.5
                  }}
                >
                  <Icon fontSize="small" />
                </IconButton>
              ))}
            </Box>
          </Grid>
          
          {/* Quick Links - Compact */}
          <Grid item xs={6} md={2} sx={{ textAlign: 'center' }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}> {/* Smaller heading */}
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}> {/* Tighter gap */}
              {['Home', 'About', 'Services', 'Contact'].map((item) => (
                <Link 
                  key={item}
                  component={RouterLink} 
                  to={`/${item.toLowerCase()}`} 
                  variant="caption" // Smaller text
                  sx={{ 
                    color: '#f8fafc', 
                    textDecoration: 'none', 
                    '&:hover': { color: '#3b82f6' } 
                  }}
                >
                  {item}
                </Link>
              ))}
            </Box>
          </Grid>
          
          {/* Contact - Compact */}
          <Grid item xs={6} md={3} sx={{ textAlign: 'center' }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}> {/* Smaller heading */}
              Contact
            </Typography>
            <Typography variant="caption" sx={{ mb: 0.5, opacity: 0.8, display: 'block' }}> {/* Smaller text */}
              123 Example Street
            </Typography>
            <Typography variant="caption" sx={{ mb: 0.5, opacity: 0.8, display: 'block' }}>
              info@example.com
            </Typography>
            <Typography variant="caption" sx={{ mb: 1, opacity: 0.8, display: 'block' }}>
              +1 (555) 123-4567
            </Typography>
            <Link 
              component={RouterLink} 
              to="/contact" 
              variant="caption" // Smaller text
              sx={{ 
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.5,
                backgroundColor: '#3b82f6',
                color: 'white',
                px: 1.5,
                py: 0.5,
                borderRadius: 1,
                textDecoration: 'none',
                '&:hover': {
                  backgroundColor: '#2563eb',
                }
              }}
            >
              <EmailIcon fontSize="small" />
              Contact
            </Link>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 2, borderColor: 'rgba(248, 250, 252, 0.1)' }} /> {/* Smaller margin */}
        
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="caption" sx={{ opacity: 0.8 }}> {/* Smaller text */}
            © {new Date().getFullYear()} MediDiagnose. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;