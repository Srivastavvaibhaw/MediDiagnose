// src/components/ui/Card.jsx
import React from 'react';
import { 
  Card as MuiCard, 
  CardContent, 
  CardHeader, 
  CardActions, 
  CardMedia,
  Typography,
  IconButton,
  Divider
} from '@mui/material';
import PropTypes from 'prop-types';
import '../../styles/components/ui/Card.css';

const Card = ({
  title,
  subheader,
  image,
  imageAlt = '',
  imageHeight,
  children,
  actions,
  headerAction,
  elevation = 1,
  variant = 'elevation',
  className = '',
  onClick,
  ...props
}) => {
  const cardClasses = `custom-card ${className} ${onClick ? 'clickable' : ''}`;
  
  return (
    <MuiCard 
      elevation={elevation} 
      variant={variant} 
      className={cardClasses} 
      onClick={onClick}
      {...props}
    >
      {(title || subheader) && (
        <CardHeader
          title={title && <Typography variant="h6" className="card-title">{title}</Typography>}
          subheader={subheader && <Typography variant="body2" color="text.secondary" className="card-subheader">{subheader}</Typography>}
          action={headerAction && (
            <IconButton aria-label="card action" className="card-header-action">
              {headerAction}
            </IconButton>
          )}
          className="card-header"
        />
      )}
      
      {image && (
        <CardMedia
          component="img"
          height={imageHeight || 140}
          image={image}
          alt={imageAlt}
          className="card-media"
        />
      )}
      
      <CardContent className="card-content">
        {children}
      </CardContent>
      
      {actions && actions.length > 0 && (
        <>
          <Divider />
          <CardActions className="card-actions">
            {actions}
          </CardActions>
        </>
      )}
    </MuiCard>
  );
};

Card.propTypes = {
  title: PropTypes.node,
  subheader: PropTypes.node,
  image: PropTypes.string,
  imageAlt: PropTypes.string,
  imageHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  children: PropTypes.node,
  actions: PropTypes.node,
  headerAction: PropTypes.node,
  elevation: PropTypes.number,
  variant: PropTypes.oneOf(['elevation', 'outlined']),
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default Card;
