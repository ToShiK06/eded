import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const ReviewsContainer = styled.div`
  min-height: 100vh;
  background: #F5F0E8;
  padding: 100px 24px 60px;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 50px;
  padding-bottom: 30px;
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
    font-size: 18px;
    color: #4A4A4A;
    max-width: 400px;
  }
`;

// Статистика в виде горизонтальных полос
const StatsSection = styled.div`
  margin-bottom: 60px;
`;

const StatsGrid = styled.div`
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const StatCard = styled.div`
  flex: 1;
  background: #FFFFFF;
  border: 1px solid #D5CDC0;
  padding: 30px;
  text-align: center;
  
  .stat-number {
    font-size: 42px;
    font-weight: 500;
    color: #2A2A2A;
    margin-bottom: 8px;
  }
  
  .stat-label {
    color: #4A4A4A;
    font-size: 13px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;

// Фильтры в виде radio кнопок
const FilterSection = styled.div`
  margin-bottom: 40px;
`;

const FilterTitle = styled.h3`
  font-size: 14px;
  font-weight: 500;
  color: #1A1A1A;
  margin-bottom: 16px;
  letter-spacing: 1px;
`;

const FilterOptions = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const FilterRadio = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  
  input {
    width: 16px;
    height: 16px;
    cursor: pointer;
    accent-color: #2A2A2A;
  }
  
  span {
    color: ${props => props.checked ? '#2A2A2A' : '#4A4A4A'};
    font-size: 14px;
    font-weight: ${props => props.checked ? '500' : '400'};
  }
`;

// Отзывы в виде списка с аватарами
const ReviewsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 60px;
`;

const ReviewCard = styled.div`
  background: #FFFFFF;
  border: 1px solid #D5CDC0;
  padding: 32px;
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.5s ease-out;
  
  &:hover {
    border-color: #2A2A2A;
  }
`;

const ReviewHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const ReviewAvatar = styled.div`
  width: 50px;
  height: 50px;
  background: #EDE5DB;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  color: #2A2A2A;
`;

const ReviewMeta = styled.div`
  flex: 1;
  
  h3 {
    font-size: 18px;
    font-weight: 500;
    color: #1A1A1A;
    margin-bottom: 4px;
  }
  
  .course {
    color: #2A2A2A;
    font-size: 13px;
    margin-bottom: 4px;
  }
  
  .date {
    color: #808080;
    font-size: 12px;
  }
`;

const ReviewRating = styled.div`
  color: #2A2A2A;
  font-size: 16px;
  letter-spacing: 2px;
`;

const ReviewText = styled.p`
  color: #4A4A4A;
  line-height: 1.7;
  font-size: 15px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #EDE5DB;
`;

// Форма добавления отзыва
const AddReviewSection = styled.div`
  background: #FFFFFF;
  border: 1px solid #D5CDC0;
  padding: 40px;
  
  h2 {
    font-size: 24px;
    font-weight: 500;
    color: #1A1A1A;
    margin-bottom: 8px;
  }
  
  p {
    color: #4A4A4A;
    margin-bottom: 30px;
    font-size: 14px;
  }
`;

const RatingStars = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  
  .star {
    font-size: 28px;
    cursor: pointer;
    color: ${props => props.$hovered ? '#2A2A2A' : '#D5CDC0'};
    transition: all 0.2s ease;
    
    &:hover {
      color: #2A2A2A;
    }
  }
`;

const ReviewForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormInput = styled.input`
  width: 100%;
  padding: 14px 16px;
  background: #F5F0E8;
  border: 1px solid #D5CDC0;
  color: #1A1A1A;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #2A2A2A;
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 14px 16px;
  background: #F5F0E8;
  border: 1px solid #D5CDC0;
  color: #1A1A1A;
  font-size: 14px;
  resize: vertical;
  min-height: 100px;
  font-family: inherit;
  
  &:focus {
    outline: none;
    border-color: #2A2A2A;
  }
`;

const SubmitButton = styled.button`
  padding: 14px 32px;
  background: #2A2A2A;
  border: none;
  color: #FFFFFF;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  align-self: flex-start;
  
  &:hover {
    background: #1A1A1A;
  }
`;

const Reviews = () => {
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const categories = [
    { id: 'all', label: 'Все отзывы' },
    { id: 'programming', label: 'Программирование' },
    { id: 'design', label: 'Дизайн' },
    { id: 'marketing', label: 'Маркетинг' },
    { id: 'management', label: 'Менеджмент' }
  ];

  const reviews = [
    { id: 1, name: 'Анна Козлова', avatar: 'АК', course: 'Fullstack JavaScript', category: 'programming', rating: 5, date: '15 декабря 2024', text: 'Прошла курс Fullstack JavaScript и уже через 2 месяца нашла работу джуном! Преподаватели - настоящие профессионалы, много практики и поддержки. Очень благодарна команде Корочки.есть!' },
    { id: 2, name: 'Дмитрий Соколов', avatar: 'ДС', course: 'UX/UI Дизайн', category: 'design', rating: 5, date: '10 декабря 2024', text: 'Отличный курс для начинающих дизайнеров. Все очень структурированно, много реальных кейсов. Преподаватель всегда на связи и помогает.' },
    { id: 3, name: 'Мария Иванова', avatar: 'МИ', course: 'Digital Marketing', category: 'marketing', rating: 4, date: '5 декабря 2024', text: 'Очень полезный курс, много практических инструментов. Немного не хватило времени на некоторые темы, но в целом очень довольна. Рекомендую!' },
    { id: 4, name: 'Сергей Петров', avatar: 'СП', course: 'Python для анализа данных', category: 'programming', rating: 5, date: '28 ноября 2024', text: 'Курс превзошел ожидания! Отличный баланс теории и практики. Теперь уверенно работаю с данными.' }
  ];

  const getCategoryFilter = (categoryId) => {
    if (categoryId === 'all') return true;
    const map = { programming: 'Программирование', design: 'Дизайн', marketing: 'Маркетинг', management: 'Менеджмент' };
    return reviews.filter(r => r.category === categoryId);
  };

  const filteredReviews = selectedCategory === 'all' 
    ? reviews 
    : reviews.filter(review => {
        const map = { programming: 'Программирование', design: 'Дизайн', marketing: 'Маркетинг', management: 'Менеджмент' };
        return review.category === selectedCategory;
      });

  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <ReviewsContainer>
      <Container>
        <PageHeader>
          <h1>Отзывы студентов</h1>
          <p>Что говорят выпускники о наших курсах</p>
        </PageHeader>

        <StatsSection>
          <StatsGrid>
            <StatCard><div className="stat-number">4.9/5</div><div className="stat-label">Средняя оценка</div></StatCard>
            <StatCard><div className="stat-number">2,500+</div><div className="stat-label">Отзывов</div></StatCard>
            <StatCard><div className="stat-number">95%</div><div className="stat-label">Рекомендуют</div></StatCard>
            <StatCard><div className="stat-number">10,000+</div><div className="stat-label">Выпускников</div></StatCard>
          </StatsGrid>
        </StatsSection>

        <FilterSection>
          <FilterTitle>ФИЛЬТР ПО КАТЕГОРИЯМ</FilterTitle>
          <FilterOptions>
            {categories.map(cat => (
              <FilterRadio key={cat.id} checked={selectedCategory === cat.id}>
                <input
                  type="radio"
                  name="category"
                  value={cat.id}
                  checked={selectedCategory === cat.id}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                />
                <span>{cat.label}</span>
              </FilterRadio>
            ))}
          </FilterOptions>
        </FilterSection>

        <ReviewsList>
          {filteredReviews.map(review => (
            <ReviewCard key={review.id}>
              <ReviewHeader>
                <ReviewAvatar>{review.avatar}</ReviewAvatar>
                <ReviewMeta>
                  <h3>{review.name}</h3>
                  <div className="course">{review.course}</div>
                  <div className="date">{review.date}</div>
                </ReviewMeta>
                <ReviewRating>{renderStars(review.rating)}</ReviewRating>
              </ReviewHeader>
              <ReviewText>"{review.text}"</ReviewText>
            </ReviewCard>
          ))}
        </ReviewsList>

        <AddReviewSection>
          <h2>Оставить отзыв</h2>
          <p>Поделитесь своим опытом обучения</p>
          
          <ReviewForm>
            <FormRow>
              <FormInput type="text" placeholder="Ваше имя" />
              <FormInput type="email" placeholder="Email" />
            </FormRow>
            
            <FormInput type="text" placeholder="Название курса" />
            
            <RatingStars $hovered={hoverRating}>
              {[1, 2, 3, 4, 5].map(star => (
                <span
                  key={star}
                  className="star"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  style={{ color: star <= (hoverRating || rating) ? '#2A2A2A' : '#D5CDC0' }}
                >
                  ★
                </span>
              ))}
            </RatingStars>
            
            <FormTextarea placeholder="Ваш отзыв..." />
            
            <SubmitButton type="submit">Отправить отзыв</SubmitButton>
          </ReviewForm>
        </AddReviewSection>
      </Container>
    </ReviewsContainer>
  );
};

export default Reviews;