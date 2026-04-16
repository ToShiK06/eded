import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const HomeContainer = styled.div`
  min-height: 100vh;
  background: #F5F0E8;
`;

// Hero секция - меняем расположение
const HeroSection = styled.section`
  min-height: 90vh;
  display: flex;
  align-items: center;
  padding: 100px 24px 60px;
`;

const HeroContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 40px;
  }
`;

// Меняем местами - текст теперь справа, картинка слева
const TextContent = styled.div`
  animation: ${fadeIn} 0.8s ease-out;
  order: 2;
  
  @media (max-width: 968px) {
    order: 1;
  }
`;

const VisualContent = styled.div`
  animation: ${fadeIn} 0.8s ease-out;
  order: 1;
  
  @media (max-width: 968px) {
    order: 2;
  }
`;

const MainTitle = styled.h1`
  font-size: 64px;
  font-weight: 500;
  line-height: 1.1;
  margin-bottom: 24px;
  color: #1A1A1A;
  letter-spacing: -0.02em;

  span {
    color: #2A2A2A;
  }

  @media (max-width: 768px) {
    font-size: 40px;
  }
`;

const Subtitle = styled.p`
  font-size: 18px;
  color: #4A4A4A;
  margin-bottom: 40px;
  line-height: 1.6;
  max-width: 500px;

  @media (max-width: 968px) {
    max-width: 100%;
  }
`;

const CTAButton = styled(Link)`
  display: inline-block;
  padding: 16px 40px;
  background: #2A2A2A;
  color: #FFFFFF;
  font-weight: 500;
  font-size: 16px;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;

  &:hover {
    background: #1A1A1A;
    transform: translateY(-2px);
  }
`;

const HeroImage = styled.div`
  width: 100%;
  height: 400px;
  background: linear-gradient(135deg, #EDE5DB 0%, #E0D8CD 100%);
  border: 1px solid #D5CDC0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

// Секция со статистикой - меняем расположение (теперь горизонтальный скролл)
const StatsSection = styled.section`
  padding: 80px 24px;
  background: #FFFFFF;
  border-top: 1px solid #D5CDC0;
  border-bottom: 1px solid #D5CDC0;
  overflow-x: auto;
`;

const StatsGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  gap: 60px;
  min-width: 800px;

  @media (max-width: 768px) {
    gap: 40px;
  }
`;

const StatCard = styled.div`
  text-align: center;
  flex: 1;
`;

const StatNumber = styled.div`
  font-size: 48px;
  font-weight: 500;
  color: #2A2A2A;
  margin-bottom: 8px;
  letter-spacing: -0.02em;
`;

const StatLabel = styled.div`
  color: #4A4A4A;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

// Секция с преимуществами - меняем на 2 колонки вместо 3
const FeaturesSection = styled.section`
  padding: 100px 24px;
`;

const SectionTitle = styled.h2`
  text-align: left;
  font-size: 36px;
  font-weight: 500;
  margin-bottom: 16px;
  color: #1A1A1A;
  letter-spacing: -0.02em;
`;

const SectionSubtitle = styled.p`
  text-align: left;
  font-size: 18px;
  color: #4A4A4A;
  max-width: 600px;
  margin-bottom: 60px;
`;

const FeaturesGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled.div`
  padding: 40px 32px;
  background: #FFFFFF;
  border: 1px solid #D5CDC0;
  transition: all 0.3s ease;
  text-align: left;
  display: flex;
  gap: 20px;
  align-items: flex-start;

  &:hover {
    border-color: #2A2A2A;
    transform: translateY(-4px);
  }
`;

const FeatureNumber = styled.div`
  font-size: 48px;
  font-weight: 500;
  color: #2A2A2A;
  opacity: 0.3;
  line-height: 1;
`;

const FeatureContent = styled.div`
  flex: 1;
`;

const FeatureTitle = styled.h3`
  font-size: 22px;
  font-weight: 500;
  color: #1A1A1A;
  margin-bottom: 16px;
`;

const FeatureDescription = styled.p`
  color: #4A4A4A;
  line-height: 1.6;
  font-size: 15px;
`;

// Новая секция с CTA
const CTASection = styled.section`
  padding: 80px 24px;
  background: #2A2A2A;
  text-align: center;
`;

const CTATitle = styled.h2`
  font-size: 36px;
  font-weight: 500;
  color: #FFFFFF;
  margin-bottom: 16px;
  letter-spacing: -0.02em;
`;

const CTASubtitle = styled.p`
  font-size: 18px;
  color: #D5CDC0;
  margin-bottom: 40px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const CTAButtonLight = styled(Link)`
  display: inline-block;
  padding: 16px 48px;
  background: #FFFFFF;
  color: #2A2A2A;
  font-weight: 500;
  font-size: 16px;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;

  &:hover {
    background: #EDE5DB;
    transform: translateY(-2px);
  }
`;

const Home = () => {
  const stats = [
    { number: '10,000+', label: 'Выпускников' },
    { number: '150+', label: 'Курсов' },
    { number: '95%', label: 'Довольных студентов' },
    { number: '50+', label: 'Экспертов' }
  ];

  const features = [
    { number: '01', title: 'Инновационное обучение', description: 'Современные методики и технологии для максимальной эффективности' },
    { number: '02', title: 'Премиум качество', description: 'Актуальные знания от практикующих экспертов с реальным опытом' },
    { number: '03', title: 'Быстрый результат', description: 'Интенсивные программы для быстрого освоения новых навыков' },
    { number: '04', title: 'Поддержка 24/7', description: 'Круглосуточная помощь и консультации от наших экспертов' }
  ];

  return (
    <HomeContainer>
      <HeroSection>
        <HeroContent>
          <VisualContent>
            <HeroImage />
          </VisualContent>
          <TextContent>
            <MainTitle>
              Твой путь к<br />
              <span>профессии</span><br />
              мечты
            </MainTitle>
            <Subtitle>
              Освойте востребованные навыки с помощью наших экспертных курсов. 
              Получите официальные документы и начните новую карьеру уже сегодня.
            </Subtitle>
            <CTAButton to="/courses">Начать обучение →</CTAButton>
          </TextContent>
        </HeroContent>
      </HeroSection>

      <StatsSection>
        <StatsGrid>
          {stats.map((stat, index) => (
            <StatCard key={index}>
              <StatNumber>{stat.number}</StatNumber>
              <StatLabel>{stat.label}</StatLabel>
            </StatCard>
          ))}
        </StatsGrid>
      </StatsSection>

      <FeaturesSection>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <SectionTitle>Почему выбирают нас</SectionTitle>
          <SectionSubtitle>
            Инновационный подход к образованию, который действительно работает
          </SectionSubtitle>
          <FeaturesGrid>
            {features.map((feature, index) => (
              <FeatureCard key={index}>
                <FeatureNumber>{feature.number}</FeatureNumber>
                <FeatureContent>
                  <FeatureTitle>{feature.title}</FeatureTitle>
                  <FeatureDescription>{feature.description}</FeatureDescription>
                </FeatureContent>
              </FeatureCard>
            ))}
          </FeaturesGrid>
        </div>
      </FeaturesSection>

      <CTASection>
        <CTATitle>Готовы начать?</CTATitle>
        <CTASubtitle>Присоединяйтесь к тысячам студентов, которые уже выбрали нас</CTASubtitle>
        <CTAButtonLight to="/courses">Выбрать курс</CTAButtonLight>
      </CTASection>
    </HomeContainer>
  );
};

export default Home;