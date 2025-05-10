// frontend/src/components/common/PageBanner.jsx
import React from 'react';
import './PageBanner.css'; // Criaremos este CSS em seguida

const PageBanner = ({ title, subtitle, backgroundImage }) => {
  const bannerStyle = backgroundImage ? {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`,
  } : {};

  return (
    <div className="page-banner" style={bannerStyle}>
      <div className="banner-content">
        {title && <h1>{title}</h1>}
        {subtitle && <p>{subtitle}</p>}
      </div>
    </div>
  );
};

export default PageBanner;
