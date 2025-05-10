// frontend/src/pages/HomePage/HomePage.jsx
import React from 'react';
import MainLayout from '../../layouts/MainLayout'; // Ajuste o caminho se necessário
import './HomePage.css'; // Criaremos este arquivo em seguida

// Componentes de placeholder para as seções da Home
const HeroSection = () => (
  <div className="hero-section">
    <h1>AGTS - Soluções - Assessoria Inteligente CAIXA</h1>
    <p>Suporte de especialistas desde a arrematação até a regularização com a Caixa Econômica Federal.</p>
    {/* Adicionar imagem de fundo ou elementos visuais aqui */}
  </div>
);

const SearchFilters = () => (
  <div className="search-filters-container page-section">
    <h2>Encontre seu Imóvel</h2>
    <div className="filter-grid">
      <div className="filter-item">
        <label htmlFor="estado">Estado</label>
        <select id="estado" name="estado">
          <option value="">Selecione o Estado</option>
          {/* Popular com dados reais depois */}
          <option value="SP">São Paulo</option>
          <option value="RJ">Rio de Janeiro</option>
        </select>
      </div>
      <div className="filter-item">
        <label htmlFor="cidade">Cidade</label>
        <input type="text" id="cidade" placeholder="Digite uma cidade..." />
      </div>
      <div className="filter-item">
        <label htmlFor="bairro">Bairro</label>
        <input type="text" id="bairro" placeholder="Digite um bairro..." />
      </div>
      <div className="filter-item">
        <label htmlFor="tipo-imovel">Tipo de Imóvel</label>
        <select id="tipo-imovel" name="tipo-imovel">
          <option value="">Todos os tipos</option>
          <option value="casa">Casa</option>
          <option value="apartamento">Apartamento</option>
          <option value="terreno">Terreno</option>
        </select>
      </div>
      <div className="filter-item">
        <label htmlFor="modalidade-venda">Modalidade de Venda</label>
        <select id="modalidade-venda" name="modalidade-venda">
          <option value="">Todas</option>
          <option value="leilao-sfi">Leilão SFI</option>
          <option value="venda-online">Venda Online</option>
          <option value="venda-direta">Venda Direta Online</option>
        </select>
      </div>
      <div className="filter-item">
        <label htmlFor="preco-de">Preço (de)</label>
        <input type="text" id="preco-de" placeholder="R$ 0,00" />
      </div>
      <div className="filter-item">
        <label htmlFor="preco-ate">Preço (até)</label>
        <input type="text" id="preco-ate" placeholder="R$ 1.000.000,00" />
      </div>
    </div>
    <div className="filter-actions">
      <button type="button" className="search-button">Buscar</button>
      <button type="button" className="advanced-filters-button">Filtros Avançados</button>
    </div>
  </div>
);

const HighlightCategories = () => (
  <div className="highlight-section page-section">
    <h2>Destaques</h2>
    <div className="highlight-grid">
      <div className="highlight-card">
        {/* Idealmente, usar ícones SVG ou imagens aqui */}
        <h3>50% abaixo da avaliação</h3>
        <p>Grandes oportunidades</p>
      </div>
      <div className="highlight-card">
        <h3>Imóveis até 500 mil</h3>
        <p>Opções acessíveis</p>
      </div>
      <div className="highlight-card">
        <h3>Imóveis em disputa</h3>
        <p>Leilões concorridos</p>
      </div>
      <div className="highlight-card">
        <h3>Imóveis com financiamento</h3>
        <p>Facilidade na compra</p>
      </div>
    </div>
  </div>
);

const InfoSection = ({ title, children, imageSrc, imageAlt, reverseOrder }) => (
  <div className={`info-section page-section ${reverseOrder ? 'info-section-reverse' : ''}`}>
    <div className="info-text">
      <h2>{title}</h2>
      {children}
    </div>
    {imageSrc && (
      <div className="info-image">
        <img src={imageSrc} alt={imageAlt || title} />
      </div>
    )}
  </div>
);

const HomePage = () => {
  return (
    <MainLayout>
      <HeroSection />
      <SearchFilters />
      <HighlightCategories />

      <InfoSection 
        title="O que são Leilões da Caixa?"
        imageSrc="https://via.placeholder.com/400x300/003366/ffffff?text=Leilões+Caixa"
        imageAlt="Ilustração sobre leilões da Caixa"
      >
        <p>Os leilões de imóveis da Caixa Econômica Federal são uma excelente oportunidade para adquirir casas, apartamentos, terrenos e imóveis comerciais com valores abaixo do mercado. São imóveis retomados pela Caixa por inadimplência em financiamentos, que são então ofertados ao público.</p>
        <button className="cta-button">Saiba Mais</button>
      </InfoSection>

      <InfoSection 
        title="Por que escolher a AGTS Soluções?"
        imageSrc="https://via.placeholder.com/400x300/0056b3/ffffff?text=Smart+Leilões"
        imageAlt="Diferenciais AGTS Soluções"
        reverseOrder={true} /* Para alternar a ordem imagem/texto */
      >
        <p>Oferecemos assessoria completa, desde a identificação das melhores oportunidades até a regularização do imóvel arrematado. Nossa equipe de especialistas garante segurança e tranquilidade em todo o processo.</p>
        <ul>
          <li>Análise de viabilidade</li>
          <li>Suporte jurídico especializado</li>
          <li>Acompanhamento pós-arremate</li>
        </ul>
        <button className="cta-button">Nossos Serviços</button>
      </InfoSection>

      {/* Adicionar mais seções conforme o site de referência */}
      {/* Ex: Depoimentos, Blog, FAQ, etc. */}

    </MainLayout>
  ) ;
};

export default HomePage;

