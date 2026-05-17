import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const ReviewsContainer = styled.div`
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
  }
`;

const StatsSection = styled.div`
  margin-bottom: 64px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  text-align: center;
  padding: 32px;
  background: #F8F8F8;
  
  .stat-number {
    font-size: 40px;
    font-weight: 600;
    color: #111111;
    margin-bottom: 8px;
  }
  
  .stat-label {
    color: #666666;
    font-size: 12px;
    letter-spacing: 1px;
  }
`;

const FilterSection = styled.div`
  margin-bottom: 48px;
`;

const FilterTitle = styled.h3`
  font-size: 12px;
  font-weight: 500;
  color: #888888;
  margin-bottom: 20px;
  letter-spacing: 1px;
`;

const FilterOptions = styled.div`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
`;

const FilterRadio = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  
  input {
    width: 14px;
    height: 14px;
    cursor: pointer;
    accent-color: #111111;
  }
  
  span {
    color: ${props => props.checked ? '#111111' : '#666666'};
    font-size: 14px;
    font-weight: ${props => props.checked ? '500' : '400'};
  }
`;

const ReviewsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 64px;
`;

const ReviewCard = styled.div`
  background: #FFFFFF;
  border: 1px solid #EEEEEE;
  padding: 32px;
  transition: all 0.2s ease;
  animation: ${fadeIn} 0.4s ease-out;
  
  &:hover {
    border-color: #CCCCCC;
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
  width: 48px;
  height: 48px;
  background: #F5F5F5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  color: #888888;
`;

const ReviewMeta = styled.div`
  flex: 1;
  
  h3 {
    font-size: 16px;
    font-weight: 600;
    color: #111111;
    margin-bottom: 4px;
  }
  
  .course {
    color: #888888;
    font-size: 12px;
    margin-bottom: 2px;
  }
  
  .date {
    color: #AAAAAA;
    font-size: 11px;
  }
`;

const ReviewRating = styled.div`
  color: #111111;
  font-size: 14px;
  letter-spacing: 2px;
`;

const ReviewText = styled.p`
  color: #555555;
  line-height: 1.7;
  font-size: 15px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #F0F0F0;
`;

const AddReviewSection = styled.div`
  background: #F8F8F8;
  padding: 48px;
  
  h2 {
    font-size: 24px;
    font-weight: 500;
    color: #111111;
    margin-bottom: 8px;
  }
  
  p {
    color: #555555;
    margin-bottom: 32px;
    font-size: 14px;
  }
`;

const RatingStars = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  
  .star {
    font-size: 24px;
    cursor: pointer;
    color: #DDDDDD;
    transition: color 0.2s ease;
    
    &:hover {
      color: #111111;
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
  padding: 12px 0;
  background: transparent;
  border: none;
  border-bottom: 1px solid #EEEEEE;
  color: #111111;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-bottom-color: #111111;
  }
  
  &::placeholder {
    color: #CCCCCC;
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 12px 0;
  background: transparent;
  border: none;
  border-bottom: 1px solid #EEEEEE;
  color: #111111;
  font-size: 14px;
  resize: vertical;
  min-height: 100px;
  font-family: inherit;
  
  &:focus {
    outline: none;
    border-bottom-color: #111111;
  }
  
  &::placeholder {
    color: #CCCCCC;
  }
`;

const SubmitButton = styled.button`
  padding: 12px 32px;
  background: #111111;
  border: none;
  color: #FFFFFF;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  align-self: flex-start;
  
  &:hover {
    background: #000000;
  }
`;

const Reviews = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
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
    { id: 1, name: 'Анна Козлова', avatar: 'АК', course: 'Fullstack JavaScript', category: 'programming', rating: 5, date: '15 декабря 2024', text: 'Прошла курс Fullstack JavaScript и уже через 2 месяца нашла работу джуниором. Преподаватели — настоящие профессионалы, много практики и поддержки. Очень благодарна команде.' },
    { id: 2, name: 'Дмитрий Соколов', avatar: 'ДС', course: 'UX/UI Дизайн', category: 'design', rating: 5, date: '10 декабря 2024', text: 'Отличный курс для начинающих дизайнеров. Всё очень структурированно, много реальных кейсов. Преподаватель всегда на связи и помогает.' },
    { id: 3, name: 'Мария Иванова', avatar: 'МИ', course: 'Digital-маркетинг', category: 'marketing', rating: 4, date: '5 декабря 2024', text: 'Очень полезный курс, много практических инструментов. Немного не хватило времени на некоторые темы, но в целом очень довольна. Рекомендую!' },
    { id: 4, name: 'Сергей Петров', avatar: 'СП', course: 'Python для анализа данных', category: 'programming', rating: 5, date: '28 ноября 2024', text: 'Курс превзошёл ожидания. Отличный баланс теории и практики. Теперь уверенно работаю с данными.' }
  ];

  const filteredReviews = selectedCategory === 'all' 
    ? reviews 
    : reviews.filter(review => review.category === selectedCategory);

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
            <StatCard><div className="stat-number">4.9/5</div><div className="stat-label">СРЕДНЯЯ ОЦЕНКА</div></StatCard>
            <StatCard><div className="stat-number">2 500+</div><div className="stat-label">ОТЗЫВОВ</div></StatCard>
            <StatCard><div className="stat-number">95%</div><div className="stat-label">РЕКОМЕНДУЮТ</div></StatCard>
            <StatCard><div className="stat-number">10 000+</div><div className="stat-label">ВЫПУСКНИКОВ</div></StatCard>
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
            
            <RatingStars>
              {[1, 2, 3, 4, 5].map(star => (
                <span
                  key={star}
                  className="star"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  style={{ color: star <= (hoverRating || rating) ? '#111111' : '#DDDDDD' }}
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