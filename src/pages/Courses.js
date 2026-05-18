import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  min-height: 100vh;
  padding: 100px 24px 80px;
  background: #0A0A0A;
  
  @media (max-width: 768px) {
    padding: 80px 16px 60px;
  }
`;

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 48px;
`;

const Title = styled.h1`
  font-size: 42px;
  font-weight: 700;
  color: #00FF88;
  margin-bottom: 16px;
  letter-spacing: -1px;
  
  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const Subtitle = styled.p`
  font-size: 18px;
  color: #888888;
  max-width: 600px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const CoursesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const CourseCard = styled(Link)`
  background: #1A1A1A;
  border: 1px solid #2A2A2A;
  border-radius: 12px;
  padding: 28px;
  transition: all 0.3s ease;
  text-decoration: none;
  
  &:hover {
    transform: translateY(-4px);
    border-color: #00FF88;
    box-shadow: 0 8px 24px rgba(0, 255, 136, 0.1);
  }
`;

const CourseCategory = styled.div`
  font-size: 12px;
  color: #00FF88;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 12px;
`;

const CourseTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #EDEDED;
  margin-bottom: 12px;
  line-height: 1.4;
`;

const CourseDescription = styled.p`
  font-size: 14px;
  color: #888888;
  line-height: 1.5;
  margin-bottom: 20px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CourseMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  font-size: 13px;
  color: #555555;
`;

const CoursePrice = styled.div`
  font-size: 22px;
  font-weight: 700;
  color: #00FF88;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #2A2A2A;
`;

const Button = styled(Link)`
  display: inline-block;
  width: 100%;
  padding: 12px;
  background: #00FF88;
  color: #0A0A0A;
  text-align: center;
  border-radius: 8px;
  font-weight: 600;
  margin-top: 16px;
  transition: all 0.2s;
  
  &:hover {
    background: #00CC6E;
    transform: translateY(-2px);
  }
`;

const coursesData = [
  { 
    id: 1, 
    title: 'Основы алгоритмизации и программирования', 
    category: 'Программирование', 
    description: 'Изучите основы алгоритмов, структур данных и программирования на Python. Курс для начинающих.', 
    duration: '2 месяца', 
    students: 1560, 
    price: 25900 
  },
  { 
    id: 2, 
    title: 'Основы веб-дизайна', 
    category: 'Дизайн', 
    description: 'Научитесь создавать современные веб-сайты. HTML, CSS, основы UI/UX дизайна.', 
    duration: '2 месяца', 
    students: 1250, 
    price: 29900 
  },
  { 
    id: 3, 
    title: 'Основы проектирования баз данных', 
    category: 'Базы данных', 
    description: 'Проектирование БД, SQL, нормализация, работа с MySQL и PostgreSQL.', 
    duration: '2.5 месяца', 
    students: 890, 
    price: 31900 
  }
];

const Courses = () => {
  return (
    <Container>
      <Wrapper>
        <Header>
          <Title>Выберите курс</Title>
          <Subtitle>Для записи на обучение выберите одну из программ</Subtitle>
        </Header>
        
        <CoursesGrid>
          {coursesData.map(course => (
            <CourseCard key={course.id} to={`/new-application?course=${encodeURIComponent(course.title)}`}>
              <CourseCategory>{course.category}</CourseCategory>
              <CourseTitle>{course.title}</CourseTitle>
              <CourseDescription>{course.description}</CourseDescription>
              <CourseMeta>
                <span>{course.duration}</span>
                <span>{course.students} студентов</span>
              </CourseMeta>
              <CoursePrice>{course.price.toLocaleString()} ₽</CoursePrice>
              <Button to={`/new-application?course=${encodeURIComponent(course.title)}`}>
                Записаться на курс
              </Button>
            </CourseCard>
          ))}
        </CoursesGrid>
      </Wrapper>
    </Container>
  );
};

export default Courses;