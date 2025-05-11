// frontend/src/App.jsx
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import HomePage from './pages/HomePage/HomePage';
import QuemSomosPage from './pages/QuemSomosPage/QuemSomosPage'; 
import SimuladorPage from './pages/SimuladorPage/SimuladorPage'; 
import PropertySearchPage from './pages/PropertySearchPage/PropertySearchPage'; // Descomentado e corrigido se necessário

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quem-somos" element={<QuemSomosPage />} /> 
        <Route path="/simulador" element={<SimuladorPage />} /> 
        <Route path="/imoveis" element={<PropertySearchPage />} /> {/* Descomentado */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

