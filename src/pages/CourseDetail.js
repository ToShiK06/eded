import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const DetailContainer = styled.div`
  min-height: 100vh;
  padding: 120px 24px 80px;
`;

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: #888888;
  font-size: 14px;
  margin-bottom: 40px;
  cursor: pointer;
  
  &:hover {
    color: #00FF88;
  }
`;

const CourseHeader = styled.div`
  margin-bottom: 48px;
`;

const Category = styled.div`
  font-size: 12px;
  color: #00FF88;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 16px;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 700;
  letter-spacing: -2px;
  margin-bottom: 24px;
`;

const Description = styled.p`
  font-size: 18px;
  color: #888888;
  line-height: 1.6;
  margin-bottom: 32px;
`;

const CourseInfo = styled.div`
  display: flex;
  gap: 32px;
  margin-bottom: 32px;
  padding-bottom: 32px;
  border-bottom: 1px solid #2A2A2A;
`;

const InfoItem = styled.div`
  .label {
    font-size: 12px;
    color: #555555;
    margin-bottom: 4px;
  }
  .value {
    font-size: 18px;
    font-weight: 600;
  }
`;

const PriceBlock = styled.div`
  background: #1A1A1A;
  padding: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 48px;
  border: 1px solid #2A2A2A;
`;

const Price = styled.div`
  font-size: 36px;
  font-weight: 700;
  color: #00FF88;
`;

const EnrollButton = styled.button`
  padding: 14px 48px;
  background: #00FF88;
  color: #0A0A0A;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  
  &:hover {
    background: #00CC6E;
  }
`;

const Section = styled.div`
  margin-bottom: 48px;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 24px;
`;

const ProgramList = styled.ul`
  list-style: none;
`;

const ProgramItem = styled.li`
  padding: 16px 0;
  border-bottom: 1px solid #2A2A2A;
  color: #888888;
  
  span {
    color: #00FF88;
    margin-right: 12px;
  }
`;

const allCourses = {
  1: { id: 1, title: 'Веб-разработка на React', category: 'Программирование', description: 'Полный курс по React: от основ до профессиональной разработки. Изучите современный React с хуками, роутингом, управлением состоянием, TypeScript и Next.js.', duration: '3 месяца', students: 1250, price: 29900, program: ['Основы JavaScript и ES6+', 'React компоненты и хуки', 'Управление состоянием (Redux, Zustand)', 'Маршрутизация React Router', 'TypeScript в React', 'Next.js и серверный рендеринг', 'Тестирование React приложений', 'Деплой и оптимизация'] },
  2: { id: 2, title: 'Python для анализа данных', category: 'Программирование', description: 'Освойте Python и библиотеки для анализа данных. Станьте аналитиком данных с нуля.', duration: '4 месяца', students: 2100, price: 31900, program: ['Python основы', 'NumPy для вычислений', 'Pandas для анализа', 'Визуализация Matplotlib/Seaborn', 'Статистика для аналитики', 'Работа с базами данных SQL'] }
};

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const course = allCourses[id];
  
  if (!course) return <DetailContainer><Container>Курс не найден</Container></DetailContainer>;
  
  const handleEnroll = () => {
    if (!currentUser) {
      navigate('/register');
    } else {
      navigate(`/checkout/${course.id}`);
    }
  };
  
  return (
    <DetailContainer>
      <Container>
        <BackButton onClick={() => navigate('/courses')}>← Назад к курсам</BackButton>
        
        <CourseHeader>
          <Category>{course.category}</Category>
          <Title>{course.title}</Title>
          <Description>{course.description}</Description>
        </CourseHeader>
        
        <CourseInfo>
          <InfoItem><div className="label">Длительность</div><div className="value">{course.duration}</div></InfoItem>
          <InfoItem><div className="label">Студентов</div><div className="value">{course.students}</div></InfoItem>
          <InfoItem><div className="label">Формат</div><div className="value">Онлайн</div></InfoItem>
        </CourseInfo>
        
        <PriceBlock>
          <Price>{course.price.toLocaleString()} ₽</Price>
          <EnrollButton onClick={handleEnroll}>
            {currentUser ? 'Купить курс' : 'Записаться'}
          </EnrollButton>
        </PriceBlock>
        
        <Section>
          <SectionTitle>Программа курса</SectionTitle>
          <ProgramList>
            {course.program.map((item, idx) => (
              <ProgramItem key={idx}><span>0{idx + 1}</span> {item}</ProgramItem>
            ))}
          </ProgramList>
        </Section>
      </Container>
    </DetailContainer>
  );
};

export default CourseDetail;