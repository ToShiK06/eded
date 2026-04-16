import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const AboutContainer = styled.div`
  min-height: 100vh;
  background: #F5F0E8;
  padding: 100px 24px 60px;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

// Меняем хедер - теперь с подзаголовком слева
const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 60px;
  padding-bottom: 30px;
  border-bottom: 1px solid #D5CDC0;
  animation: ${fadeIn} 0.6s ease-out;
  flex-wrap: wrap;
  gap: 20px;
  
  .title-section {
    h1 {
      font-size: 48px;
      font-weight: 500;
      color: #1A1A1A;
      margin-bottom: 8px;
      letter-spacing: -0.02em;
    }
  }
  
  .subtitle-section {
    p {
      font-size: 18px;
      color: #4A4A4A;
      max-width: 400px;
      line-height: 1.6;
      text-align: right;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    
    .subtitle-section p {
      text-align: left;
    }
  }
`;

// Миссия - теперь в 2 колонки с большим заголовком
const MissionSection = styled.section`
  margin-bottom: 80px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: start;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const MissionLeft = styled.div`
  h2 {
    font-size: 36px;
    font-weight: 500;
    color: #1A1A1A;
    margin-bottom: 24px;
    letter-spacing: -0.02em;
  }
  
  p {
    font-size: 16px;
    color: #4A4A4A;
    line-height: 1.8;
    margin-bottom: 20px;
  }
`;

const MissionRight = styled.div`
  background: #FFFFFF;
  border: 1px solid #D5CDC0;
  padding: 40px;
  
  .stat-block {
    margin-bottom: 30px;
    
    &:last-child {
      margin-bottom: 0;
    }
    
    .stat-value {
      font-size: 48px;
      font-weight: 500;
      color: #2A2A2A;
      margin-bottom: 8px;
    }
    
    .stat-desc {
      color: #4A4A4A;
      font-size: 14px;
      line-height: 1.5;
    }
  }
`;

// Команда - новая сетка 2x2
const TeamSection = styled.section`
  margin: 80px 0;
`;

const TeamTitle = styled.h2`
  font-size: 36px;
  font-weight: 500;
  color: #1A1A1A;
  margin-bottom: 50px;
  letter-spacing: -0.02em;
  text-align: center;
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TeamCard = styled.div`
  background: #FFFFFF;
  border: 1px solid #D5CDC0;
  padding: 40px;
  display: flex;
  gap: 30px;
  align-items: flex-start;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #2A2A2A;
    transform: translateY(-4px);
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    align-items: center;
  }
`;

const TeamAvatar = styled.div`
  width: 100px;
  height: 100px;
  background: #EDE5DB;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  font-weight: 500;
  color: #2A2A2A;
  flex-shrink: 0;
`;

const TeamInfo = styled.div`
  flex: 1;
  
  h3 {
    font-size: 24px;
    font-weight: 500;
    color: #1A1A1A;
    margin-bottom: 8px;
  }
  
  .role {
    color: #2A2A2A;
    font-weight: 500;
    margin-bottom: 16px;
    font-size: 14px;
    letter-spacing: 1px;
  }
  
  .bio {
    color: #4A4A4A;
    line-height: 1.6;
    font-size: 14px;
  }
`;

// Ценности - горизонтальный скролл
const ValuesSection = styled.section`
  margin: 80px 0;
  overflow-x: auto;
`;

const ValuesGrid = styled.div`
  display: flex;
  gap: 30px;
  min-width: 800px;
`;

const ValueCard = styled.div`
  flex: 1;
  background: #FFFFFF;
  border: 1px solid #D5CDC0;
  padding: 40px 30px;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #2A2A2A;
    transform: translateY(-4px);
  }
  
  .value-icon {
    font-size: 48px;
    margin-bottom: 20px;
  }
  
  h3 {
    font-size: 20px;
    font-weight: 500;
    color: #1A1A1A;
    margin-bottom: 16px;
  }
  
  p {
    color: #4A4A4A;
    font-size: 14px;
    line-height: 1.6;
  }
`;

const About = () => {
  const stats = [
    { value: '10,000+', desc: 'Выпускников по всей России' },
    { value: '150+', desc: 'Экспертных курсов' },
    { value: '95%', desc: 'Студентов рекомендуют нас' },
    { value: '50+', desc: 'Преподавателей-практиков' }
  ];

  const teamMembers = [
    { name: 'Анна Петрова', role: 'Основатель & CEO', bio: '15+ лет в IT-образовании, экс-руководитель образовательных программ в крупнейших EdTech-компаниях.', avatar: 'АП' },
    { name: 'Максим Иванов', role: 'CTO', bio: 'Fullstack разработчик с 10-летним опытом, эксперт в e-learning и масштабировании образовательных платформ.', avatar: 'МИ' },
    { name: 'Елена Смирнова', role: 'Head of Education', bio: 'Педагог с 12-летним стажем, специалист по дистанционному обучению и разработке учебных программ.', avatar: 'ЕС' },
    { name: 'Дмитрий Козлов', role: 'Product Manager', bio: 'Эксперт в управлении продуктами, создал более 20 успешных образовательных продуктов.', avatar: 'ДК' }
  ];

  const values = [
    { icon: '', title: 'Качество', desc: 'Только актуальные знания от практикующих экспертов' },
    { icon: '', title: 'Инновации', desc: 'Современные методики и технологии обучения' },
    { icon: '', title: 'Поддержка', desc: 'Персональное сопровождение каждого студента' },
    { icon: '', title: 'Результат', desc: 'Быстрый выход на рынок труда' }
  ];

  return (
    <AboutContainer>
      <Container>
        <PageHeader>
          <div className="title-section">
            <h1>О платформе</h1>
          </div>
          <div className="subtitle-section">
            <p>Миссия, ценности и команда Корочки.есть</p>
          </div>
        </PageHeader>

        <MissionSection>
          <MissionLeft>
            <h2>Наша миссия — сделать IT-образование доступным</h2>
            <p>«Корочки.есть» — инновационная образовательная платформа, созданная для того, чтобы качественное IT-образование стало доступным для каждого, независимо от местоположения и начального уровня.</p>
            <p>Мы верим, что современные технологии должны служить развитию человеческого потенциала и помогать людям строить успешную карьеру в digital-сфере.</p>
          </MissionLeft>
          <MissionRight>
            {stats.map((stat, index) => (
              <div key={index} className="stat-block">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-desc">{stat.desc}</div>
              </div>
            ))}
          </MissionRight>
        </MissionSection>

        <ValuesSection>
          <TeamTitle>Наши ценности</TeamTitle>
          <ValuesGrid>
            {values.map((value, index) => (
              <ValueCard key={index}>
                <div className="value-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.desc}</p>
              </ValueCard>
            ))}
          </ValuesGrid>
        </ValuesSection>

        <TeamSection>
          <TeamTitle>Команда профессионалов</TeamTitle>
          <TeamGrid>
            {teamMembers.map((member, index) => (
              <TeamCard key={index}>
                <TeamAvatar>{member.avatar}</TeamAvatar>
                <TeamInfo>
                  <h3>{member.name}</h3>
                  <div className="role">{member.role}</div>
                  <div className="bio">{member.bio}</div>
                </TeamInfo>
              </TeamCard>
            ))}
          </TeamGrid>
        </TeamSection>
      </Container>
    </AboutContainer>
  );
};

export default About;