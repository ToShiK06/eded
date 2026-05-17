import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const AboutContainer = styled.div`
  min-height: 100vh;
  background: #FFFFFF;
  padding: 100px 24px 80px;
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 64px;
  
  h1 {
    font-size: 48px;
    font-weight: 600;
    color: #111111;
    margin-bottom: 16px;
    letter-spacing: -0.02em;
  }
  
  p {
    font-size: 18px;
    color: #555555;
    max-width: 600px;
    margin: 0 auto;
  }
`;

const MissionSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  margin-bottom: 80px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const MissionContent = styled.div`
  h2 {
    font-size: 32px;
    font-weight: 600;
    color: #111111;
    margin-bottom: 24px;
    letter-spacing: -0.02em;
  }
  
  p {
    font-size: 16px;
    color: #555555;
    line-height: 1.7;
    margin-bottom: 20px;
  }
`;

const StatsGrid = styled.div`
  background: #F8F8F8;
  padding: 48px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
`;

const StatBlock = styled.div`
  .value {
    font-size: 40px;
    font-weight: 600;
    color: #111111;
    margin-bottom: 8px;
  }
  
  .label {
    color: #666666;
    font-size: 13px;
    letter-spacing: 0.5px;
  }
`;

const TeamSection = styled.section`
  margin: 80px 0;
`;

const SectionTitle = styled.h2`
  font-size: 32px;
  font-weight: 600;
  color: #111111;
  margin-bottom: 48px;
  text-align: center;
  letter-spacing: -0.02em;
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const TeamCard = styled.div`
  text-align: center;
`;

const TeamAvatar = styled.div`
  width: 120px;
  height: 120px;
  background: #F5F5F5;
  border-radius: 50%;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: 500;
  color: #AAAAAA;
`;

const TeamName = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #111111;
  margin-bottom: 8px;
`;

const TeamRole = styled.div`
  color: #888888;
  font-size: 13px;
  margin-bottom: 12px;
`;

const TeamBio = styled.p`
  color: #555555;
  font-size: 14px;
  line-height: 1.6;
`;

const ValuesSection = styled.section`
  margin: 80px 0;
`;

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const ValueCard = styled.div`
  text-align: center;
  padding: 40px 24px;
  background: #FFFFFF;
  border: 1px solid #EEEEEE;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #CCCCCC;
    transform: translateY(-4px);
  }
  
  h3 {
    font-size: 20px;
    font-weight: 500;
    color: #111111;
    margin-bottom: 16px;
  }
  
  p {
    color: #555555;
    font-size: 14px;
    line-height: 1.6;
  }
`;

const About = () => {
  const stats = [
    { value: '10 000+', label: 'ВЫПУСКНИКОВ' },
    { value: '150+', label: 'КУРСОВ' },
    { value: '95%', label: 'ДОВОЛЬНЫ' },
    { value: '50+', label: 'ЭКСПЕРТОВ' }
  ];

  const teamMembers = [
    { name: 'Анна Петрова', role: 'Основатель и CEO', bio: 'Более 15 лет в EdTech, экс-руководитель образовательных программ.', avatar: 'АП' },
    { name: 'Максим Иванов', role: 'Технический директор', bio: 'Fullstack разработчик с 10-летним опытом.', avatar: 'МИ' },
    { name: 'Елена Смирнова', role: 'Руководитель образования', bio: 'Педагог с 12-летним стажем, эксперт в дистанционном обучении.', avatar: 'ЕС' },
    { name: 'Дмитрий Козлов', role: 'Продуктовый менеджер', bio: 'Эксперт в управлении продуктами, создал более 20 успешных продуктов.', avatar: 'ДК' }
  ];

  const values = [
    { title: 'Качество', description: 'Только актуальные знания от практикующих экспертов' },
    { title: 'Инновации', description: 'Современные методики и технологии обучения' },
    { title: 'Поддержка', description: 'Персональное сопровождение каждого студента' },
    { title: 'Результат', description: 'Быстрый выход на рынок труда' }
  ];

  return (
    <AboutContainer>
      <Container>
        <PageHeader>
          <h1>О платформе</h1>
          <p>Наша миссия, ценности и команда</p>
        </PageHeader>

        <MissionSection>
          <MissionContent>
            <h2>Делаем IT-образование доступным</h2>
            <p>Корочки.есть — инновационная образовательная платформа, созданная для того, чтобы качественное IT-образование стало доступным для каждого, независимо от местоположения и начального уровня.</p>
            <p>Мы верим, что современные технологии должны служить развитию человеческого потенциала и помогать людям строить успешную карьеру в digital-сфере.</p>
          </MissionContent>
          <StatsGrid>
            {stats.map((stat, index) => (
              <StatBlock key={index}>
                <div className="value">{stat.value}</div>
                <div className="label">{stat.label}</div>
              </StatBlock>
            ))}
          </StatsGrid>
        </MissionSection>

        <ValuesSection>
          <SectionTitle>Наши ценности</SectionTitle>
          <ValuesGrid>
            {values.map((value, index) => (
              <ValueCard key={index}>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </ValueCard>
            ))}
          </ValuesGrid>
        </ValuesSection>

        <TeamSection>
          <SectionTitle>Команда профессионалов</SectionTitle>
          <TeamGrid>
            {teamMembers.map((member, index) => (
              <TeamCard key={index}>
                <TeamAvatar>{member.avatar}</TeamAvatar>
                <TeamName>{member.name}</TeamName>
                <TeamRole>{member.role}</TeamRole>
                <TeamBio>{member.bio}</TeamBio>
              </TeamCard>
            ))}
          </TeamGrid>
        </TeamSection>
      </Container>
    </AboutContainer>
  );
};

export default About;