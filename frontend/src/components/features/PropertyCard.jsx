import React from 'react';
import './PropertyCard.css';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'; // Ícones para navegação de imagem

const PropertyCard = ({ property }) => {
  // Destructuring com valores padrão para evitar erros caso alguma propriedade não venha
  const {
    imageUrl = 'https://via.placeholder.com/300x200?text=Imóvel+Sem+Foto',
    imageAlt = 'Foto do imóvel',
    discountTag = '', // Ex: "73%"
    statusTag = '', // Ex: "Venda Online", "Financiamento"
    propertyType = 'Tipo não informado',
    cityUf = 'Local não informado',
    address = 'Endereço não informado',
    area = 'Área não informada',
    assessmentValue = 'Valor não informado',
    deadline = 'Prazo não informado',
    price = 'Preço não informado',
    link = '#',
    images = [], // Array de URLs de imagens para o slideshow
  } = property;

  // Lógica simples para slideshow (apenas para demonstração, pode ser melhorada)
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const displayImages = images && images.length > 0 ? images : [imageUrl];

  const nextImage = (e) => {
    e.preventDefault(); // Impede que o clique no botão propague para o link do card
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % displayImages.length);
  };

  const prevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + displayImages.length) % displayImages.length);
  };

  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className="property-card-link">
      <div className="property-card">
        <div className="property-card-image-container">
          <img src={displayImages[currentImageIndex]} alt={imageAlt} className="property-card-image" />
          {discountTag && <span className="property-card-discount-tag">{discountTag}</span>}
          {statusTag && <span className="property-card-status-tag">{statusTag}</span>}
          {displayImages.length > 1 && (
            <>
              <button onClick={prevImage} className="property-card-nav-arrow prev-arrow"><FiChevronLeft size={24} /></button>
              <button onClick={nextImage} className="property-card-nav-arrow next-arrow"><FiChevronRight size={24} /></button>
            </>
          )}
        </div>
        <div className="property-card-info">
          <p className="property-card-type">{propertyType}</p>
          <p className="property-card-location">{cityUf}</p>
          <p className="property-card-address">{address}</p>
          <div className="property-card-area" title={`Área total: ${area}`}>
            <span role="img" aria-label="Ícone de área">📐</span> {area}
          </div>
          <p className="property-card-assessment">Avaliação: R$ {assessmentValue}</p>
          <p className="property-card-deadline">{deadline}</p>
          <h3 className="property-card-price">R$ {price}</h3>
        </div>
      </div>
    </a>
  );
};

export default PropertyCard;

