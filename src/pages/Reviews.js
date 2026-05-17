import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useApplications } from '../context/ApplicationContext';
import { useAuth } from '../context/AuthContext';

const Container = styled.div`
  min-height: 100vh;
  padding: 100px 24px 80px;
  background: #0A0A0A;
`;

const Wrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: 600;
  color: #00FF88;
  margin-bottom: 16px;
`;

const Subtitle = styled.p`
  color: #888888;
  margin-bottom: 48px;
`;

const ReviewsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ReviewCard = styled.div`
  background: #1A1A1A;
  padding: 28px;
  border: 1px solid #2A2A2A;
  border-radius: 8px;
  
  &:hover {
    border-color: #00FF88;
  }
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  flex-wrap: wrap;
  gap: 12px;
`;

const UserName = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #00FF88;
`;

const Rating = styled.div`
  font-size: 18px;
  color: #FFAA00;
  letter-spacing: 2px;
`;

const CourseInfo = styled.div`
  font-size: 13px;
  color: #888888;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #2A2A2A;
`;

const ReviewText = styled.p`
  color: #EDEDED;
  line-height: 1.6;
  font-size: 15px;
  margin-bottom: 20px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px;
  background: #1A1A1A;
  border-radius: 8px;
  color: #888;
`;

const DeleteButton = styled.button`
  background: transparent;
  border: 1px solid #FF4444;
  color: #FF4444;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  width: 100%;
  margin-top: 16px;
  
  &:hover {
    background: #FF4444;
    color: #0A0A0A;
  }
`;

const Reviews = () => {
  const { getAllReviews, deleteReview } = useApplications();
  const { currentUser } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadReviews = async () => {
    setLoading(true);
    const data = await getAllReviews();
    console.log('Загружено отзывов:', data.length);
    setReviews(data);
    setLoading(false);
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Удалить этот отзыв?')) {
      const result = await deleteReview(id);
      if (result.success) {
        alert('Отзыв удалён');
        loadReviews();
      } else {
        alert('Ошибка удаления');
      }
    }
  };

  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  const isAdmin = currentUser?.role === 'admin';

  if (loading) return <Container><Wrapper>Загрузка...</Wrapper></Container>;

  return (
    <Container>
      <Wrapper>
        <Title>Отзывы студентов</Title>
        <Subtitle>Что говорят о качестве обучения</Subtitle>

        {reviews.length === 0 ? (
          <EmptyState>
            Пока нет отзывов
          </EmptyState>
        ) : (
          <ReviewsGrid>
            {reviews.map(review => (
              <ReviewCard key={review.id}>
                <ReviewHeader>
                  <UserName>{review.userName || review.userLogin}</UserName>
                  <Rating>{renderStars(review.rating)}</Rating>
                </ReviewHeader>
                <CourseInfo>
                  Курс: {review.courseName}
                </CourseInfo>
                <ReviewText>"{review.review}"</ReviewText>
                {isAdmin && (
                  <DeleteButton onClick={() => handleDelete(review.id)}>
                    🗑 Удалить отзыв
                  </DeleteButton>
                )}
              </ReviewCard>
            ))}
          </ReviewsGrid>
        )}
      </Wrapper>
    </Container>
  );
};

export default Reviews;