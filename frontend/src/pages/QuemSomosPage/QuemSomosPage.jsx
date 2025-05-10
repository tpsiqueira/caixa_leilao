// frontend/src/pages/QuemSomosPage/QuemSomosPage.jsx
import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import PageBanner from '../../components/common/PageBanner';
import './QuemSomosPage.css'; // Criaremos este CSS
// Importe uma imagem de banner se tiver, ou deixe null
// import quemSomosBannerImg from '../../assets/images/banner-quem-somos.jpg';

const QuemSomosPage = () => {
  return (
    <MainLayout>
      <PageBanner 
        title="Quem Somos"
        subtitle="Conheça a AGTS Soluções Imobiliárias e nossa paixão por realizar sonhos."
        // backgroundImage={quemSomosBannerImg} // Descomente e adicione a imagem se tiver
      />
      <div className="page-content-container quem-somos-content">
        <section>
          <h2>Nossa História</h2>
          <p>
            A AGTS Soluções Imobiliárias nasceu do desejo de simplificar e tornar mais acessível 
            a aquisição de imóveis através de leilões da Caixa Econômica Federal. Com anos de 
            experiência no mercado imobiliário e um profundo conhecimento dos processos de leilão, 
            nossa equipe de especialistas está pronta para oferecer a melhor assessoria, desde a 
            identificação da oportunidade ideal até a entrega das chaves.
          </p>
        </section>
        
        <section>
          <h2>Nossa Missão</h2>
          <p>
            Nossa missão é proporcionar aos nossos clientes uma jornada de compra segura, transparente 
            e vantajosa, transformando o sonho da casa própria ou do investimento imobiliário em 
            realidade. Acreditamos que todos merecem encontrar o imóvel perfeito com as melhores 
            condições.
          </p>
        </section>

        <section>
          <h2>Nossos Valores</h2>
          <ul>
            <li><strong>Transparência:</strong> Comunicação clara e honesta em todas as etapas.</li>
            <li><strong>Expertise:</strong> Profundo conhecimento do mercado e dos processos de leilão.</li>
            <li><strong>Compromisso:</strong> Dedicação total aos objetivos dos nossos clientes.</li>
            <li><strong>Inovação:</strong> Busca contínua por soluções inteligentes e eficientes.</li>
            <li><strong>Ética:</strong> Atuação pautada pela integridade e respeito.</li>
          </ul>
        </section>

        <section>
          <h2>Por que escolher a AGTS?</h2>
          <p>
            Com a AGTS Soluções Imobiliárias, você conta com uma assessoria completa e personalizada. 
            Analisamos seu perfil, buscamos as melhores ofertas, cuidamos de toda a burocracia e 
            oferecemos suporte jurídico especializado. Nosso objetivo é a sua satisfação e a 
            realização do seu investimento com segurança e economia.
          </p>
        </section>
      </div>
    </MainLayout>
  );
};

export default QuemSomosPage;
