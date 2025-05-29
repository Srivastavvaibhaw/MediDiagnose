import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  IconButton,
  Drawer,
  useMediaQuery,
  useTheme,
  Typography,
  Divider,
  Container,
  List,
  ListItem,
  ListItemIcon,
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import InfoIcon from '@mui/icons-material/Info';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';

import { SignInButton, UserButton, useUser } from '@clerk/clerk-react';
import '../../styles/components/common/Navbar.css';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [navbarVisible, setNavbarVisible] = useState(true);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  const location = useLocation();
  const { isSignedIn, user } = useUser();

  const navItems = [
    { name: 'Home', path: '/', icon: <HomeIcon /> },
    { name: 'Services', path: '/services', icon: <MedicalServicesIcon /> },
    { name: 'About', path: '/about', icon: <InfoIcon /> },
    { name: 'Contact', path: '/contact', icon: <ContactSupportIcon /> },
  ];

  const handleScroll = useCallback(() => {
    const currentScrollTop = window.scrollY;

    setScrolled(currentScrollTop > 50);
    setNavbarVisible(currentScrollTop < lastScrollTop || currentScrollTop <= 300);
    setLastScrollTop(currentScrollTop);
  }, [lastScrollTop]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path);

  const drawer = (
    <Box className="mobile-drawer">
      <Box className="mobile-drawer-header">
        <Link to="/" className="mobile-logo" onClick={handleDrawerToggle}>
          <HealthAndSafetyIcon className="mobile-logo-icon" />
          <Box className="mobile-logo-text">
            <Typography variant="h6" component="span" className="logo-text">
              Medi<span className="logo-text-accent">Diagnose</span>
            </Typography>
          </Box>
        </Link>
        <IconButton
          onClick={handleDrawerToggle}
          className="drawer-close-button"
          aria-label="close menu"
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider className="drawer-divider" />

      <List className="mobile-nav-list">
        {navItems.map((item, index) => (
          <ListItem key={item.name} className="mobile-nav-item" disablePadding>
            <Link
              to={item.path}
              className={`mobile-nav-link ${isActive(item.path) ? 'active' : ''}`}
              onClick={handleDrawerToggle}
              style={{ animationDelay: `${0.1 + index * 0.05}s` }}
            >
              <span className="mobile-nav-icon">{item.icon}</span>
              {item.name}
            </Link>
          </ListItem>
        ))}
      </List>

      <Divider className="drawer-divider" />

      <Box className="mobile-auth-section" sx={{ mt: 2, px: 2 }}>
        {isSignedIn ? (
          <UserButton afterSignOutUrl="/" />
        ) : (
          <SignInButton mode="modal">
            <button className="login-link">Log In</button>
          </SignInButton>
        )}
      </Box>

      <Box className="mobile-drawer-footer">
        <Typography variant="caption" className="copyright-text">
          © 2025 MediDiagnose
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box
      className={`navbar ${scrolled ? 'scrolled' : ''} ${navbarVisible ? 'visible' : 'hidden'}`}
      component="nav"
      aria-label="main navigation"
    >
      <Container maxWidth="xl" className="navbar-container">
        <Link to="/" className="logo-link">
          <HealthAndSafetyIcon className="logo-icon" />
          <Typography variant="h5" component="span" className="logo-text">
            Medi<span className="logo-text-accent">Diagnose</span>
          </Typography>
        </Link>

        {isMobile ? (
          <>
            <IconButton
              aria-label="open menu"
              onClick={handleDrawerToggle}
              className="menu-button"
            >
              <MenuIcon />
            </IconButton>

            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{ keepMounted: true }}
              classes={{ paper: 'drawer-paper' }}
              className="mobile-menu-drawer"
            >
              {drawer}
            </Drawer>
          </>
        ) : (
          <Box className="desktop-nav">
            <Box className="nav-links">
              {navItems.map((item, index) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
                  style={{ animationDelay: `${0.1 + index * 0.1}s` }}
                >
                  {item.name}
                </Link>
              ))}
            </Box>

            <Box className="auth-buttons">
              {isSignedIn ? (
                <UserButton afterSignOutUrl="/" />
              ) : (
                <SignInButton mode="modal">
                  <button className="login-link">Log In</button>
                </SignInButton>
              )}
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Navbar;
