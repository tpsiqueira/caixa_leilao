// frontend/src/components/layout/Header.jsx
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.css'; // Criaremos este arquivo de estilo em seguida
import logoUrl from '../../assets/images/logo_agts.png';

const Header = () => {
  return (
    <header className="app-header-detailed">
      <div className="logo-container">
        <Link to="/">
          {/* Substitua pelo seu logo. Se não tiver um ainda, pode usar um texto. */}
          <img src={logoUrl} alt="AGTS Soluções" />
        </Link>
      </div>
      <nav className="main-nav">
        <ul>
          <li><NavLink to="/" className={({ isActive }) => isActive ? "active" : ''}>Início</NavLink></li>
          <li><NavLink to="/imoveis" className={({ isActive }) => isActive ? "active" : ''}>Buscar Imóveis</NavLink></li>
          {/* Adicione mais links de navegação conforme necessário */}
          <li><NavLink to="/simulador" className={({ isActive }) => isActive ? "active" : ''}>Simulador</NavLink></li>
          <li><NavLink to="/sobre" className={({ isActive }) => isActive ? "active" : ''}>Sobre Nós</NavLink></li>
        </ul>
      </nav>
      <div className="auth-buttons">
        {/* Lógica de autenticação pode ser adicionada aqui mais tarde */}
        <button type="button">Login</button>
        <button type="button" className="primary">Registrar</button>
      </div>
    </header>
  );
};

export default Header;
