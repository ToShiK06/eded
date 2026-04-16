import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  background: #FFFFFF;
  border-top: 1px solid #D5CDC0;
  padding: 60px 24px 30px;
  position: relative;
`;

const FooterContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 40px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr 1fr;
    gap: 30px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const FooterSection = styled.div`
  h3 {
    color: #1A1A1A;
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 20px;
    letter-spacing: 1px;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 30px;
      height: 1px;
      background: #2A2A2A;
    }
  }
  
  p {
    color: #4A4A4A;
    line-height: 1.6;
    margin-bottom: 20px;
    font-size: 14px;
  }
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  
  a {
    color: #4A4A4A;
    text-decoration: none;
    transition: all 0.3s ease;
    font-size: 14px;
    
    &:hover {
      color: #2A2A2A;
    }
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  
  .contact-item {
    display: flex;
    align-items: center;
    gap: 12px;
    color: #4A4A4A;
    font-size: 14px;
  }
`;

const Copyright = styled.div`
  max-width: 1400px;
  margin: 40px auto 0;
  padding-top: 24px;
  border-top: 1px solid #D5CDC0;
  text-align: center;
  color: #808080;
  font-size: 12px;
  letter-spacing: 0.5px;
`;

const Logo = styled(Link)`
  display: inline-block;
  text-decoration: none;
  margin-bottom: 20px;
`;

const LogoText = styled.div`
  .main {
    font-size: 24px;
    font-weight: 500;
    color: #1A1A1A;
    letter-spacing: -0.02em;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <Logo to="/">
            <LogoText>
              <div className="main">Корочки.есть</div>
            </LogoText>
          </Logo>
          <p>
            Ведущая платформа дополнительного профессионального образования. 
            Помогаем освоить востребованные навыки и построить успешную карьеру.
          </p>
        </FooterSection>

        <FooterSection>
          <h3>Курсы</h3>
          <FooterLinks>
            <Link to="/courses">Все курсы</Link>
            <Link to="/courses">Программирование</Link>
            <Link to="/courses">Дизайн</Link>
            <Link to="/courses">Маркетинг</Link>
            <Link to="/courses">Менеджмент</Link>
            <Link to="/courses">Аналитика</Link>
          </FooterLinks>
        </FooterSection>

        <FooterSection>
          <h3>Компания</h3>
          <FooterLinks>
            <Link to="/about">О нас</Link>
            <Link to="/reviews">Отзывы</Link>
            <Link to="/contacts">Контакты</Link>
          </FooterLinks>
        </FooterSection>

        <FooterSection>
          <h3>Контакты</h3>
          <ContactInfo>
            <div className="contact-item">info@korochki.est</div>
            <div className="contact-item">+7 (123) 555-55-55</div>
            <div className="contact-item">Великий Новгород</div>
            <div className="contact-item">Пн-Пт: 9:00-18:00</div>
          </ContactInfo>
        </FooterSection>
      </FooterContent>

      <Copyright>
        © 2024 Корочки.есть. Все права защищены.
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;