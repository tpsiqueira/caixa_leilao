// frontend/src/pages/SimuladorPage/SimuladorPage.jsx
import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import PageBanner from '../../components/common/PageBanner';
import './SimuladorPage.css'; // Criaremos este CSS
// import simuladorBannerImg from '../../assets/images/banner-simulador.jpg';

const SimuladorPage = () => {
  return (
    <MainLayout>
      <PageBanner 
        title="Simulador de Financiamento"
        subtitle="Planeje a compra do seu imóvel com nossa ferramenta de simulação."
        // backgroundImage={simuladorBannerImg} // Descomente e adicione a imagem se tiver
      />
      <div className="page-content-container simulador-content">
        <p>
          Bem-vindo ao nosso simulador de financiamento imobiliário! Esta ferramenta foi 
          desenvolvida para ajudar você a ter uma estimativa das condições de financiamento 
          para a aquisição do seu imóvel através dos leilões da Caixa.
        </p>
        <p>
          <strong>Em breve,</strong> você poderá inserir informações como valor do imóvel, 
          entrada desejada, prazo e sua renda para obter uma simulação detalhada das parcelas, 
          taxas de juros e outras condições.
        </p>
        <p>
          Enquanto finalizamos o desenvolvimento completo desta funcionalidade, nossa equipe de 
          especialistas está à disposição para realizar simulações personalizadas e tirar 
          todas as suas dúvidas. Entre em contato conosco!
        </p>
        {/* Placeholder para o formulário do simulador */}
        <div className="simulador-form-placeholder">
          <h3>Formulário do Simulador (Em Desenvolvimento)</h3>
          <p>Aqui você poderá inserir os dados para simulação.</p>
        </div>
      </div>
    </MainLayout>
  );
};

export default SimuladorPage;
