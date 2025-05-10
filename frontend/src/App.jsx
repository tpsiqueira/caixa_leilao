// frontend/src/App.jsx
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import HomePage from './pages/HomePage/HomePage';
import QuemSomosPage from './pages/QuemSomosPage/QuemSomosPage'; // Nova importação
import SimuladorPage from './pages/SimuladorPage/SimuladorPage'; // Nova importação
// import PropertySearchPage from './pages/PropertySearchPage/PropertySearchPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quem-somos" element={<QuemSomosPage />} /> {/* Nova rota */}
        <Route path="/simulador" element={<SimuladorPage />} /> {/* Nova rota */}
        {/* 
        <Route path="/imoveis" element={<PropertySearchPage />} /> 
        */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
