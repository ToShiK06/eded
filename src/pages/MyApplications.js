import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useApplications } from '../context/ApplicationContext';
import { useAuth } from '../context/AuthContext';

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
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 600;
  color: #00FF88;
`;

const NewButton = styled(Link)`
  padding: 12px 24px;
  background: #00FF88;
  color: #0A0A0A;
  font-weight: 600;
  text-decoration: none;
  border-radius: 4px;
  &:hover { background: #00CC6E; }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  text-align: left;
  padding: 16px;
  background: #1A1A1A;
  color: #888888;
  border-bottom: 1px solid #2A2A2A;
`;

const Td = styled.td`
  padding: 16px;
  border-bottom: 1px solid #2A2A2A;
  color: #EDEDED;
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 4px 12px;
  background: ${props => {
    if (props.status === 'Новая') return '#FF4444';
    if (props.status === 'Идет обучение') return '#FFAA00';
    if (props.status === 'Обучение завершено') return '#00FF88';
    return '#555';
  }};
  color: #0A0A0A;
  font-size: 12px;
  border-radius: 4px;
`;

const ReviewButton = styled.button`
  padding: 8px 16px;
  background: transparent;
  border: 1px solid #00FF88;
  color: #00FF88;
  font-size: 12px;
  cursor: pointer;
  border-radius: 4px;
  &:hover { background: #00FF88; color: #0A0A0A; }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #1A1A1A;
  padding: 40px;
  max-width: 500px;
  width: 90%;
  border: 1px solid #2A2A2A;
  border-radius: 8px;
`;

const ModalTitle = styled.h3`
  color: #00FF88;
  margin-bottom: 16px;
  font-size: 24px;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 12px;
  background: #2A2A2A;
  border: 1px solid #3A3A3A;
  color: #EDEDED;
  min-height: 100px;
  margin: 16px 0;
  border-radius: 4px;
  resize: vertical;
  &:focus { outline: none; border-color: #00FF88; }
`;

const Star = styled.span`
  font-size: 28px;
  cursor: pointer;
  color: ${props => props.active ? '#FFAA00' : '#444444'};
  margin-right: 8px;
`;

const ModalButton = styled.button`
  width: 100%;
  padding: 12px;
  background: #00FF88;
  color: #0A0A0A;
  font-weight: 600;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 16px;
  &:hover { background: #00CC6E; }
  &:disabled { opacity: 0.5; }
`;

const MyApplications = () => {
  const { getUserApplications, addReview } = useApplications();
  const { currentUser } = useAuth();
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);

  const load = async () => {
    setLoading(true);
    const data = await getUserApplications();
    console.log('Мои заявки:', data);
    setApps(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleReview = async () => {
    if (!reviewText.trim()) {
      alert('Напишите отзыв');
      return;
    }
    setSubmitting(true);
    const res = await addReview(selected.id, reviewText, rating);
    if (res.success) {
      alert('Спасибо за отзыв!');
      setSelected(null);
      setReviewText('');
      setRating(5);
      load();
    } else {
      alert('Ошибка');
    }
    setSubmitting(false);
  };

  if (!currentUser || currentUser.role === 'admin') {
    return <Container><Wrapper>Страница только для клиентов</Wrapper></Container>;
  }

  if (loading) return <Container><Wrapper>Загрузка...</Wrapper></Container>;

  return (
    <Container>
      <Wrapper>
        <Header>
          <Title>Мои заявки</Title>
          <NewButton to="/new-application">+ Новая заявка</NewButton>
        </Header>

        {apps.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 60, color: '#555' }}>
            Нет заявок. Создайте новую!
          </div>
        ) : (
          <Table>
            <thead>
              <tr><Th>Курс</Th><Th>Дата</Th><Th>Оплата</Th><Th>Статус</Th><Th>Отзыв</Th></tr>
            </thead>
            <tbody>
              {apps.map(app => (
                <tr key={app.id}>
                  <Td>{app.courseName}</Td>
                  <Td>{app.startDate}</Td>
                  <Td>{app.paymentMethod === 'phone' ? 'По номеру телефона' : 'Наличными'}</Td>
                  <Td><StatusBadge status={app.status}>{app.status}</StatusBadge></Td>
                  <Td>
                    {app.status === 'Обучение завершено' && !app.hasReview && (
                      <ReviewButton onClick={() => setSelected(app)}>Оставить отзыв</ReviewButton>
                    )}
                    {app.hasReview && <span style={{ color: '#00FF88' }}>✓ {app.rating}★</span>}
                    {app.status !== 'Обучение завершено' && !app.hasReview && <span style={{ color: '#555' }}>—</span>}
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Wrapper>

      {selected && (
        <Modal onClick={() => setSelected(null)}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <ModalTitle>Отзыв на курс</ModalTitle>
            <p><strong>{selected.courseName}</strong></p>
            <div style={{ margin: '16px 0' }}>
              <div>Оценка:</div>
              <div>
                {[1,2,3,4,5].map(s => (
                  <Star key={s} active={s <= rating} onClick={() => setRating(s)}>★</Star>
                ))}
              </div>
            </div>
            <Textarea 
              placeholder="Ваш отзыв..."
              value={reviewText}
              onChange={e => setReviewText(e.target.value)}
            />
            <ModalButton onClick={handleReview} disabled={submitting}>
              {submitting ? 'Отправка...' : 'Отправить отзыв'}
            </ModalButton>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default MyApplications;