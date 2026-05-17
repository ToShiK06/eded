import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Container = styled.div`
  min-height: 100vh;
  padding: 120px 24px 80px;
`;

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: 600;
  letter-spacing: -1px;
  margin-bottom: 48px;
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
  padding: 32px;
  border: 1px solid #2A2A2A;
  transition: all 0.2s;
  
  &:hover {
    border-color: #00FF88;
    transform: translateY(-4px);
  }
`;

const CourseTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
`;

const ProgressBar = styled.div`
  background: #2A2A2A;
  height: 4px;
  margin: 20px 0 12px;
`;

const ProgressFill = styled.div`
  width: ${props => props.progress}%;
  height: 100%;
  background: #00FF88;
`;

const ProgressText = styled.div`
  font-size: 12px;
  color: #555555;
  text-align: right;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 80px;
  background: #1A1A1A;
  border: 1px solid #2A2A2A;
  
  h3 {
    margin-bottom: 16px;
  }
  
  p {
    color: #888888;
    margin-bottom: 32px;
  }
`;

const Button = styled(Link)`
  display: inline-block;
  padding: 12px 32px;
  background: #00FF88;
  color: #0A0A0A;
  font-weight: 600;
  
  &:hover {
    background: #00CC6E;
  }
`;

const Dashboard = () => {
  const { currentUser, userData, getPurchasedCourses } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      if (currentUser) {
        const purchased = await getPurchasedCourses();
        setCourses(purchased || []);
      }
      setLoading(false);
    };
    fetch();
  }, [currentUser, getPurchasedCourses]);

  if (loading) return <Container><Wrapper style={{ textAlign: 'center', color: '#555' }}>Загрузка...</Wrapper></Container>;

  return (
    <Container>
      <Wrapper>
        <Title>Мои курсы, {userData?.displayName || currentUser?.email?.split('@')[0]}</Title>
        
        {courses.length === 0 ? (
          <EmptyState>
            <h3>У вас пока нет курсов</h3>
            <p>Выберите курс и начните обучение</p>
            <Button to="/courses">Смотреть курсы</Button>
          </EmptyState>
        ) : (
          <CoursesGrid>
            {courses.map(course => (
              <CourseCard key={course.id} to={`/course/${course.id}`}>
                <CourseTitle>{course.title}</CourseTitle>
                <ProgressBar>
                  <ProgressFill progress={course.progress || 0} />
                </ProgressBar>
                <ProgressText>Прогресс: {course.progress || 0}%</ProgressText>
              </CourseCard>
            ))}
          </CoursesGrid>
        )}
      </Wrapper>
    </Container>
  );
};

export default Dashboard;