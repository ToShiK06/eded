import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useApplications } from '../context/ApplicationContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  min-height: 100vh;
  padding: 100px 24px 80px;
  background: #0A0A0A;
`;

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 600;
  color: #00FF88;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 32px;
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

const Select = styled.select`
  padding: 6px 12px;
  background: #2A2A2A;
  border: 1px solid #3A3A3A;
  color: #EDEDED;
  border-radius: 4px;
  cursor: pointer;
`;

const AdminPanel = () => {
  const { getAllApplications, updateApplicationStatus } = useApplications();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const data = await getAllApplications();
    console.log('Все заявки:', data);
    setApps(data);
    setLoading(false);
  };

  useEffect(() => {
    if (!currentUser || currentUser.role !== 'admin') {
      navigate('/');
      return;
    }
    load();
  }, [currentUser]);

  const handleStatus = async (id, status) => {
    await updateApplicationStatus(id, status);
    load();
  };

  if (loading) return <Container><Wrapper>Загрузка...</Wrapper></Container>;

  return (
    <Container>
      <Wrapper>
        <Title>Админ панель</Title>
        <p style={{ color: '#888' }}>Управление заявками</p>

        <Table>
          <thead>
            <tr><Th>Клиент</Th><Th>Курс</Th><Th>Дата</Th><Th>Оплата</Th><Th>Статус</Th><Th>Отзыв</Th></tr>
          </thead>
          <tbody>
            {apps.map(app => (
              <tr key={app.id}>
                <Td>{app.userName}<br/><small>{app.userLogin}</small></Td>
                <Td>{app.courseName}</Td>
                <Td>{app.startDate}</Td>
                <Td>{app.paymentMethod === 'phone' ? 'По номеру телефона' : 'Наличными'}</Td>
                <Td>
                  <Select value={app.status} onChange={e => handleStatus(app.id, e.target.value)}>
                    <option>Новая</option>
                    <option>Идет обучение</option>
                    <option>Обучение завершено</option>
                  </Select>
                </Td>
                <Td>
                  {app.hasReview ? `${app.rating}★` : '—'}
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Wrapper>
    </Container>
  );
};

export default AdminPanel;