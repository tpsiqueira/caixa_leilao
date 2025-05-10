// frontend/src/layouts/MainLayout.jsx
import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import './MainLayout.css'; // Importando o CSS do MainLayout

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <Header />
      <main className="main-content-area">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
