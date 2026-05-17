import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HomeContainer = styled.div`
  min-height: 100vh;
  padding-top: 80px;
`;

const Hero = styled.section`
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 80px 24px;
`;

const HeroContent = styled.div`
  max-width: 800px;
`;

const Badge = styled.div`
  display: inline-block;
  padding: 4px 12px;
  background: #1A1A1A;
  border: 1px solid #2A2A2A;
  font-size: 12px;
  color: #00FF88;
  margin-bottom: 24px;
`;

const Title = styled.h1`
  font-size: 72px;
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -2px;
  margin-bottom: 24px;
  
  @media (max-width: 768px) {
    font-size: 48px;
  }
`;

const Highlight = styled.span`
  color: #00FF88;
`;

const Subtitle = styled.p`
  font-size: 18px;
  color: #888888;
  margin-bottom: 48px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const CTAButton = styled(Link)`
  display: inline-block;
  padding: 14px 40px;
  background: #00FF88;
  color: #0A0A0A;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.2s;
  
  &:hover {
    background: #00CC6E;
    transform: translateY(-2px);
  }
`;

const CoursesPreview = styled.section`
  padding: 80px 24px;
  background: #111111;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 64px;
`;

const SectionTitle = styled.h2`
  font-size: 36px;
  font-weight: 600;
  letter-spacing: -1px;
  margin-bottom: 16px;
`;

const SectionSubtitle = styled.p`
  color: #888888;
  font-size: 16px;
`;

const CoursesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const CourseCard = styled(Link)`
  background: #1A1A1A;
  padding: 32px;
  transition: all 0.2s;
  border: 1px solid #2A2A2A;
  
  &:hover {
    border-color: #00FF88;
    transform: translateY(-4px);
  }
`;

const CourseCategory = styled.div`
  font-size: 12px;
  color: #00FF88;
  margin-bottom: 16px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const CourseTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 12px;
`;

const CoursePrice = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #00FF88;
  margin-top: 24px;
`;

const Home = () => {
  const previewCourses = [
    { id: 1, title: 'Веб-разработка на React', category: 'Программирование', price: 29900 },
    { id: 2, title: 'Python для анализа данных', category: 'Программирование', price: 31900 },
    { id: 3, title: 'UX/UI Дизайн', category: 'Дизайн', price: 34900 }
  ];

  return (
    <HomeContainer>
      <Hero>
        <HeroContent>
          <Badge>Онлайн-образование</Badge>
          <Title>
            Начни карьеру в <Highlight>IT</Highlight>
          </Title>
          <Subtitle>
            Практические курсы от экспертов. Получи востребованную профессию и работай удалённо.
          </Subtitle>
          <CTAButton to="/courses">Смотреть курсы</CTAButton>
        </HeroContent>
      </Hero>

      <CoursesPreview>
        <SectionHeader>
          <SectionTitle>Популярные курсы</SectionTitle>
          <SectionSubtitle>Выбери направление и начни обучение</SectionSubtitle>
        </SectionHeader>
        <CoursesGrid>
          {previewCourses.map(course => (
            <CourseCard key={course.id} to={`/course/${course.id}`}>
              <CourseCategory>{course.category}</CourseCategory>
              <CourseTitle>{course.title}</CourseTitle>
              <CoursePrice>{course.price.toLocaleString()} ₽</CoursePrice>
            </CourseCard>
          ))}
        </CoursesGrid>
      </CoursesPreview>
    </HomeContainer>
  );
};

export default Home;