import React, { useState, useMemo } from 'react'
import styled, { keyframes } from 'styled-components'
import { useInfiniteScroll } from '../hooks/useInfiniteScroll'
import { LoadMoreLoader } from '../components/common/Loader'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const CoursesContainer = styled.div`
  min-height: 100vh;
  background: #F5F0E8;
  padding: 100px 24px 60px;
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

// Хедер с фильтрами в одной строке
const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 1px solid #D5CDC0;
  flex-wrap: wrap;
  gap: 20px;
  
  h1 {
    font-size: 48px;
    font-weight: 500;
    color: #1A1A1A;
    letter-spacing: -0.02em;
  }
  
  p {
    font-size: 16px;
    color: #4A4A4A;
    max-width: 400px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

// Поиск и фильтры в одной строке
const ControlsSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  flex-wrap: wrap;
  gap: 20px;
`;

const SearchBox = styled.div`
  flex: 1;
  max-width: 300px;

  input {
    width: 100%;
    padding: 12px 16px;
    background: #FFFFFF;
    border: 1px solid #D5CDC0;
    color: #1A1A1A;
    font-size: 14px;
    transition: all 0.3s ease;

    &::placeholder {
      color: #808080;
    }

    &:focus {
      outline: none;
      border-color: #2A2A2A;
    }
  }
`;

const CategoryFilters = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const CategoryButton = styled.button`
  padding: 8px 20px;
  background: ${props => props.active ? '#2A2A2A' : '#FFFFFF'};
  border: 1px solid ${props => props.active ? '#2A2A2A' : '#D5CDC0'};
  color: ${props => props.active ? '#FFFFFF' : '#4A4A4A'};
  font-weight: 500;
  font-size: 13px;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    border-color: #2A2A2A;
    color: ${props => props.active ? '#FFFFFF' : '#2A2A2A'};
  }
`;

// Сетка курсов 2 колонки для десктопа
const CoursesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CourseCard = styled.div`
  background: #FFFFFF;
  border: 1px solid #D5CDC0;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: row;
  animation: ${fadeIn} 0.5s ease-out;
  overflow: hidden;

  &:hover {
    border-color: #2A2A2A;
    transform: translateY(-4px);
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const CourseImage = styled.div`
  width: 120px;
  background: #EDE5DB;
  flex-shrink: 0;
  
  @media (max-width: 768px) {
    width: 100%;
    height: 100px;
  }
`;

const CourseContent = styled.div`
  padding: 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const CourseCategory = styled.div`
  color: #2A2A2A;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 12px;
`;

const CourseTitle = styled.h3`
  font-size: 20px;
  font-weight: 500;
  color: #1A1A1A;
  margin-bottom: 12px;
  line-height: 1.3;
`;

const CourseDescription = styled.p`
  color: #4A4A4A;
  line-height: 1.6;
  margin-bottom: 16px;
  font-size: 13px;
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
  color: #808080;
  font-size: 12px;
`;

const CoursePrice = styled.div`
  margin-bottom: 16px;
  
  .current {
    font-size: 24px;
    font-weight: 500;
    color: #2A2A2A;
  }
  
  .original {
    font-size: 13px;
    color: #808080;
    text-decoration: line-through;
    margin-left: 10px;
  }
`;

const EnrollButton = styled.button`
  padding: 12px;
  background: #2A2A2A;
  border: none;
  color: #FFFFFF;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.3s ease;
  cursor: pointer;
  margin-top: auto;

  &:hover {
    background: #1A1A1A;
  }
`;

const allCourses = [
  { id: 1, title: 'Веб-разработка на React', category: 'Программирование', description: 'Освойте современную фронтенд-разработку с использованием React, Redux и современных инструментов', duration: '3 месяца', students: 1250, price: 29900, originalPrice: 39900 },
  { id: 2, title: 'Python для анализа данных', category: 'Программирование', description: 'Изучите Python и библиотеки для анализа данных: Pandas, NumPy, Matplotlib', duration: '4 месяца', students: 2100, price: 31900, originalPrice: 41900 },
  { id: 3, title: 'Мобильная разработка iOS', category: 'Программирование', description: 'Создание приложений для iOS на Swift с нуля до публикации в App Store', duration: '4 месяца', students: 630, price: 38900, originalPrice: 48900 },
  { id: 4, title: 'Fullstack JavaScript', category: 'Программирование', description: 'Полный курс по JavaScript: от основ до создания полноценных веб-приложений', duration: '5 месяцев', students: 1800, price: 34900, originalPrice: 44900 },
  { id: 5, title: 'UX/UI Дизайн', category: 'Дизайн', description: 'Научитесь создавать интуитивные и красивые интерфейсы для веб и мобильных приложений', duration: '4 месяца', students: 890, price: 34900, originalPrice: 44900 },
  { id: 6, title: 'Графический дизайн', category: 'Дизайн', description: 'Освойте Adobe Photoshop, Illustrator и создавайте профессиональные дизайны', duration: '3 месяца', students: 1250, price: 29900, originalPrice: 39900 },
  { id: 7, title: 'Digital-маркетинг', category: 'Маркетинг', description: 'Полный курс по digital-маркетингу: SMM, контекстная реклама, SEO и аналитика', duration: '2 месяца', students: 1560, price: 25900, originalPrice: 35900 },
  { id: 8, title: 'SMM Продвижение', category: 'Маркетинг', description: 'Эффективное продвижение в социальных сетях: Instagram, VK, Telegram', duration: '2 месяца', students: 1340, price: 22900, originalPrice: 32900 }
]

const Courses = () => {
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState('Все')
  const [searchQuery, setSearchQuery] = useState('')

  const categories = ['Все', 'Программирование', 'Дизайн', 'Маркетинг', 'Менеджмент', 'Аналитика']

  const filteredCourses = useMemo(() => {
    return allCourses.filter(course => {
      const matchesCategory = selectedCategory === 'Все' || course.category === selectedCategory
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery])

  const { visibleItems: visibleCourses, loadMoreRef, loading, hasMore } = useInfiniteScroll(filteredCourses, 6)

  const handleEnrollClick = course => {
    if (!currentUser) {
      navigate('/register')
      return
    }
  }

  return (
    <CoursesContainer>
      <Container>
        <PageHeader>
          <h1>Курсы</h1>
          <p>Выберите направление и начните свой путь в IT</p>
        </PageHeader>

        <ControlsSection>
          <SearchBox>
            <input
              type="text"
              placeholder="Поиск курсов..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </SearchBox>
          <CategoryFilters>
            {categories.map(category => (
              <CategoryButton
                key={category}
                active={selectedCategory === category}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </CategoryButton>
            ))}
          </CategoryFilters>
        </ControlsSection>

        {filteredCourses.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', background: '#FFFFFF', border: '1px solid #D5CDC0' }}>
            <h3 style={{ color: '#1A1A1A', marginBottom: '10px' }}>Курсы не найдены</h3>
            <p style={{ color: '#4A4A4A' }}>Попробуйте изменить параметры поиска</p>
          </div>
        ) : (
          <>
            <CoursesGrid>
              {visibleCourses.map(course => (
                <CourseCard key={course.id}>
                  <CourseImage />
                  <CourseContent>
                    <CourseCategory>{course.category}</CourseCategory>
                    <CourseTitle>{course.title}</CourseTitle>
                    <CourseDescription>{course.description}</CourseDescription>
                    <CourseMeta>
                      <span>{course.duration}</span>
                      <span>{course.students} студентов</span>
                    </CourseMeta>
                    <CoursePrice>
                      <span className="current">{course.price.toLocaleString()} ₽</span>
                      {course.originalPrice > course.price && (
                        <span className="original">{course.originalPrice.toLocaleString()} ₽</span>
                      )}
                    </CoursePrice>
                    <EnrollButton onClick={() => handleEnrollClick(course)}>
                      {currentUser ? 'Купить курс' : 'Зарегистрироваться'}
                    </EnrollButton>
                  </CourseContent>
                </CourseCard>
              ))}
            </CoursesGrid>
            {loading && <LoadMoreLoader />}
            {hasMore && !loading && <div ref={loadMoreRef} style={{ height: '1px' }} />}
          </>
        )}
      </Container>
    </CoursesContainer>
  )
}

export default Courses