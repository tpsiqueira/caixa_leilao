import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import PropertyCard from '../../components/features/PropertyCard';
import mockProperties from '../../data/mockProperties'; // Dados de exemplo
import './PropertySearchPage.css'; // Criaremos este CSS para o grid

const PropertySearchPage = () => {
  // Para a página inicial, vamos mostrar 20 cards (4 linhas de 5)
  // Se mockProperties tiver menos de 20, mostrará o que tiver.
  const propertiesToShow = mockProperties.slice(0, 20);

  return (
    <MainLayout>
      <div className="property-search-page">
        <h1 className="page-title">Imóveis em Destaque</h1>
        {/* Aqui podem entrar os filtros de busca no futuro */}
        <div className="property-list-container">
          {propertiesToShow.length > 0 ? (
            propertiesToShow.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))
          ) : (
            <p>Nenhum imóvel encontrado.</p>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default PropertySearchPage;

