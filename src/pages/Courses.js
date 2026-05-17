import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const CoursesContainer = styled.div`
  min-height: 100vh;
  padding: 120px 24px 80px;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: 48px;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 700;
  letter-spacing: -2px;
  margin-bottom: 16px;
`;

const Filters = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 48px;
  padding-bottom: 24px;
  border-bottom: 1px solid #2A2A2A;
`;

const FilterButton = styled.button`
  padding: 8px 20px;
  background: ${props => props.active ? '#00FF88' : 'transparent'};
  border: 1px solid ${props => props.active ? '#00FF88' : '#2A2A2A'};
  color: ${props => props.active ? '#0A0A0A' : '#EDEDED'};
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: #00FF88;
    color: ${props => props.active ? '#0A0A0A' : '#00FF88'};
  }
`;

const SearchInput = styled.input`
  width: 100%;
  max-width: 300px;
  padding: 12px 0;
  background: transparent;
  border: none;
  border-bottom: 1px solid #2A2A2A;
  color: #EDEDED;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-bottom-color: #00FF88;
  }
  
  &::placeholder {
    color: #555555;
  }
`;

const SearchSection = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 32px;
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

const CourseDescription = styled.p`
  color: #888888;
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 24px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CourseMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #555555;
  font-size: 13px;
  margin-bottom: 24px;
`;

const CoursePrice = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #00FF88;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 80px;
  color: #555555;
`;

const allCourses = [
  { id: 1, title: 'Веб-разработка на React', category: 'Программирование', description: 'Полный курс по React: хуки, роутинг, состояние, TypeScript, Next.js', duration: '3 месяца', students: 1250, price: 29900 },
  { id: 2, title: 'Python для анализа данных', category: 'Программирование', description: 'Pandas, NumPy, Matplotlib, визуализация, статистика', duration: '4 месяца', students: 2100, price: 31900 },
  { id: 3, title: 'Мобильная разработка iOS', category: 'Программирование', description: 'Swift, UIKit, SwiftUI, публикация в App Store', duration: '4 месяца', students: 630, price: 38900 },
  { id: 4, title: 'Fullstack JavaScript', category: 'Программирование', description: 'Node.js, Express, MongoDB, React, REST API', duration: '5 месяца', students: 1800, price: 34900 },
  { id: 5, title: 'UX/UI Дизайн', category: 'Дизайн', description: 'Figma, прототипирование, пользовательские исследования', duration: '4 месяца', students: 890, price: 34900 },
  { id: 6, title: 'Графический дизайн', category: 'Дизайн', description: 'Photoshop, Illustrator, типографика, композиция', duration: '3 месяца', students: 1250, price: 29900 },
  { id: 7, title: 'Digital-маркетинг', category: 'Маркетинг', description: 'SMM, контекстная реклама, SEO, аналитика', duration: '2 месяца', students: 1560, price: 25900 },
  { id: 8, title: 'Управление проектами', category: 'Менеджмент', description: 'Agile, Scrum, Jira, командная работа', duration: '2 месяца', students: 740, price: 27900 },
  { id: 9, title: 'Аналитика данных', category: 'Аналитика', description: 'SQL, Tableau, Power BI, бизнес-аналитика', duration: '4 месяца', students: 670, price: 34900 }
];

const Courses = () => {
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [searchQuery, setSearchQuery] = useState('');
  
  const categories = ['Все', 'Программирование', 'Дизайн', 'Маркетинг', 'Менеджмент', 'Аналитика'];

  const filteredCourses = useMemo(() => {
    return allCourses.filter(course => {
      const matchesCategory = selectedCategory === 'Все' || course.category === selectedCategory;
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <CoursesContainer>
      <Container>
        <Header>
          <Title>Курсы</Title>
        </Header>
        
        <Filters>
          {categories.map(cat => (
            <FilterButton 
              key={cat} 
              active={selectedCategory === cat} 
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </FilterButton>
          ))}
        </Filters>
        
        <SearchSection>
          <SearchInput 
            type="text" 
            placeholder="Поиск курсов..." 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </SearchSection>
        
        {filteredCourses.length === 0 ? (
          <EmptyState>Курсы не найдены</EmptyState>
        ) : (
          <CoursesGrid>
            {filteredCourses.map(course => (
              <CourseCard key={course.id} to={`/course/${course.id}`}>
                <CourseCategory>{course.category}</CourseCategory>
                <CourseTitle>{course.title}</CourseTitle>
                <CourseDescription>{course.description}</CourseDescription>
                <CourseMeta>
                  <span>{course.duration}</span>
                  <span>{course.students} студентов</span>
                </CourseMeta>
                <CoursePrice>{course.price.toLocaleString()} ₽</CoursePrice>
              </CourseCard>
            ))}
          </CoursesGrid>
        )}
      </Container>
    </CoursesContainer>
  );
};

export default Courses;