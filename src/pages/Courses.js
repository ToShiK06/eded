import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  min-height: 100vh;
  padding: 100px 24px 80px;
  background: #0A0A0A;
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
`;

const Subtitle = styled.p`
  font-size: 18px;
  color: #888888;
  max-width: 600px;
  margin: 0 auto;
`;

const SearchSection = styled.div`
  margin-bottom: 40px;
`;

const SearchInput = styled.input`
  width: 100%;
  max-width: 400px;
  padding: 14px 20px;
  background: #1A1A1A;
  border: 1px solid #2A2A2A;
  border-radius: 8px;
  color: #EDEDED;
  font-size: 15px;
  
  &:focus {
    outline: none;
    border-color: #00FF88;
  }
  
  &::placeholder {
    color: #555555;
  }
`;

const CategoryFilter = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 1px solid #2A2A2A;
`;

const CategoryButton = styled.button`
  padding: 8px 20px;
  background: ${props => props.active ? '#00FF88' : 'transparent'};
  border: 1px solid ${props => props.active ? '#00FF88' : '#2A2A2A'};
  color: ${props => props.active ? '#0A0A0A' : '#EDEDED'};
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: #00FF88;
    color: ${props => props.active ? '#0A0A0A' : '#00FF88'};
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
  -webkit-line-clamp: 2;
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
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px;
  color: #555555;
`;

const coursesData = [
  { id: 1, title: 'Основы алгоритмизации и программирования', category: 'Программирование', description: 'Изучите основы алгоритмов, структур данных и программирования на Python. Курс для начинающих.', duration: '2 месяца', students: 1560, price: 25900 },
  { id: 2, title: 'Основы веб-дизайна', category: 'Дизайн', description: 'Научитесь создавать современные веб-сайты. HTML, CSS, основы UI/UX дизайна.', duration: '2 месяца', students: 1250, price: 29900 },
  { id: 3, title: 'Основы проектирования баз данных', category: 'Базы данных', description: 'Проектирование БД, SQL, нормализация, работа с MySQL и PostgreSQL.', duration: '2.5 месяца', students: 890, price: 31900 },
  { id: 4, title: 'JavaScript для начинающих', category: 'Программирование', description: 'Полный курс по JavaScript: от основ до асинхронности и работы с API.', duration: '2 месяца', students: 2100, price: 27900 },
  { id: 5, title: 'React.js разработка', category: 'Программирование', description: 'Создание современных веб-приложений на React: хуки, роутинг, состояние, TypeScript.', duration: '3 месяца', students: 1850, price: 34900 },
  { id: 6, title: 'Python с нуля до профессионала', category: 'Программирование', description: 'Изучите Python: от синтаксиса до создания веб-приложений и ботов.', duration: '3 месяца', students: 3200, price: 32900 },
  { id: 7, title: 'Java Core', category: 'Программирование', description: 'Освойте Java: ООП, коллекции, многопоточность, работа с файлами.', duration: '3 месяца', students: 950, price: 33900 },
  { id: 8, title: 'SQL и работа с базами данных', category: 'Базы данных', description: 'Полный курс по SQL: SELECT, JOIN, подзапросы, индексы, оптимизация.', duration: '2 месяца', students: 1430, price: 26900 },
  { id: 9, title: 'UI/UX дизайн интерфейсов', category: 'Дизайн', description: 'Проектирование удобных интерфейсов: Figma, прототипирование, пользовательские сценарии.', duration: '2.5 месяца', students: 780, price: 29900 },
  { id: 10, title: 'Мобильная разработка на Flutter', category: 'Мобильные', description: 'Создание кроссплатформенных приложений для iOS и Android на Flutter.', duration: '3 месяца', students: 620, price: 35900 },
  { id: 11, title: 'Веб-разработка на Node.js', category: 'Программирование', description: 'Backend разработка на Node.js: Express, MongoDB, REST API, авторизация.', duration: '2.5 месяца', students: 1100, price: 32900 },
  { id: 12, title: 'Кибербезопасность для начинающих', category: 'Безопасность', description: 'Основы защиты информации: шифрование, безопасность сетей, уязвимости.', duration: '2 месяца', students: 540, price: 29900 },
  { id: 13, title: 'Машинное обучение и ИИ', category: 'Аналитика', description: 'Введение в ML: Pandas, NumPy, Scikit-learn, нейронные сети.', duration: '4 месяца', students: 890, price: 39900 },
  { id: 14, title: 'Тестирование ПО (QA)', category: 'Тестирование', description: 'Ручное и автоматизированное тестирование: JUnit, Selenium, тест-дизайн.', duration: '2 месяца', students: 670, price: 24900 },
  { id: 15, title: 'DevOps для начинающих', category: 'DevOps', description: 'CI/CD, Docker, Kubernetes, облачные технологии, мониторинг.', duration: '2.5 месяца', students: 430, price: 34900 }
];

const Courses = () => {
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [searchQuery, setSearchQuery] = useState('');
  
  const categories = ['Все', 'Программирование', 'Дизайн', 'Базы данных', 'Мобильные', 'Безопасность', 'Аналитика', 'Тестирование', 'DevOps'];

  const filteredCourses = coursesData.filter(course => {
    const matchesCategory = selectedCategory === 'Все' || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Container>
      <Wrapper>
        <Header>
          <Title>Каталог курсов</Title>
          <Subtitle>Выберите программу обучения и начните свой путь в IT</Subtitle>
        </Header>
        
        <SearchSection>
          <SearchInput 
            type="text" 
            placeholder="Поиск курсов..." 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </SearchSection>
        
        <CategoryFilter>
          {categories.map(cat => (
            <CategoryButton 
              key={cat} 
              active={selectedCategory === cat} 
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </CategoryButton>
          ))}
        </CategoryFilter>
        
        {filteredCourses.length === 0 ? (
          <EmptyState>Курсы не найдены</EmptyState>
        ) : (
          <CoursesGrid>
            {filteredCourses.map(course => (
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
        )}
      </Wrapper>
    </Container>
  );
};

export default Courses;