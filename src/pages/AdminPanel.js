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
  max-width: 1400px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 600;
  color: #00FF88;
  margin-bottom: 8px;
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 32px 0;
  flex-wrap: wrap;
  gap: 16px;
`;

const SearchInput = styled.input`
  padding: 10px 16px;
  background: #1A1A1A;
  border: 1px solid #2A2A2A;
  border-radius: 8px;
  color: #EDEDED;
  width: 250px;
  
  &:focus {
    outline: none;
    border-color: #00FF88;
  }
`;

const FilterSelect = styled.select`
  padding: 10px 16px;
  background: #1A1A1A;
  border: 1px solid #2A2A2A;
  border-radius: 8px;
  color: #EDEDED;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #00FF88;
  }
`;

const Stats = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`;

const StatCard = styled.div`
  background: #1A1A1A;
  padding: 16px 24px;
  border-radius: 12px;
  border: 1px solid #2A2A2A;
  
  .number {
    font-size: 28px;
    font-weight: 700;
    color: #00FF88;
  }
  
  .label {
    font-size: 12px;
    color: #888888;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  overflow-x: auto;
  display: block;
  
  @media (max-width: 768px) {
    display: block;
    overflow-x: auto;
  }
`;

const Thead = styled.thead`
  @media (max-width: 768px) {
    display: none;
  }
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
  
  @media (max-width: 768px) {
    display: block;
    text-align: right;
    padding: 10px 16px;
    
    &:before {
      content: attr(data-label);
      float: left;
      font-weight: bold;
      color: #00FF88;
    }
  }
`;

const Select = styled.select`
  padding: 6px 12px;
  background: #2A2A2A;
  border: 1px solid #3A3A3A;
  color: #EDEDED;
  border-radius: 6px;
  cursor: pointer;
  
  @media (max-width: 768px) {
    width: auto;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 32px;
  flex-wrap: wrap;
`;

const PageButton = styled.button`
  padding: 8px 12px;
  background: ${props => props.active ? '#00FF88' : '#1A1A1A'};
  color: ${props => props.active ? '#0A0A0A' : '#EDEDED'};
  border: 1px solid #2A2A2A;
  border-radius: 6px;
  cursor: pointer;
  
  &:hover {
    border-color: #00FF88;
  }
`;

const AdminPanel = () => {
  const { getAllApplications, updateApplicationStatus } = useApplications();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [apps, setApps] = useState([]);
  const [filteredApps, setFilteredApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Все');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const load = async () => {
    const data = await getAllApplications();
    setApps(data);
    setFilteredApps(data);
    setLoading(false);
  };

  useEffect(() => {
    if (!currentUser || currentUser.role !== 'admin') {
      navigate('/');
      return;
    }
    load();
  }, [currentUser]);

  useEffect(() => {
    let filtered = apps;
    
    if (searchTerm) {
      filtered = filtered.filter(app => 
        app.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.userLogin?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.courseName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== 'Все') {
      filtered = filtered.filter(app => app.status === statusFilter);
    }
    
    setFilteredApps(filtered);
    setCurrentPage(1);
  }, [searchTerm, statusFilter, apps]);

  const handleStatus = async (id, status) => {
    await updateApplicationStatus(id, status);
    load();
  };

  const totalPages = Math.ceil(filteredApps.length / itemsPerPage);
  const paginatedApps = filteredApps.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const stats = {
    total: apps.length,
    new: apps.filter(a => a.status === 'Новая').length,
    inProgress: apps.filter(a => a.status === 'Идет обучение').length,
    completed: apps.filter(a => a.status === 'Обучение завершено').length,
    reviews: apps.filter(a => a.hasReview).length
  };

  if (loading) return <Container><Wrapper>Загрузка...</Wrapper></Container>;

  return (
    <Container>
      <Wrapper>
        <Title>Админ панель</Title>
        
        <Stats>
          <StatCard><div className="number">{stats.total}</div><div className="label">Всего заявок</div></StatCard>
          <StatCard><div className="number">{stats.new}</div><div className="label">Новые</div></StatCard>
          <StatCard><div className="number">{stats.inProgress}</div><div className="label">В обучении</div></StatCard>
          <StatCard><div className="number">{stats.completed}</div><div className="label">Завершено</div></StatCard>
          <StatCard><div className="number">{stats.reviews}</div><div className="label">С отзывами</div></StatCard>
        </Stats>
        
        <Controls>
          <SearchInput 
            type="text" 
            placeholder="Поиск по имени, логину, курсу..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <FilterSelect value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option>Все</option>
            <option>Новая</option>
            <option>Идет обучение</option>
            <option>Обучение завершено</option>
          </FilterSelect>
        </Controls>

        <Table as="div">
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <Thead as="thead">
              <tr>
                <Th>Клиент</Th>
                <Th>Курс</Th>
                <Th>Дата</Th>
                <Th>Оплата</Th>
                <Th>Статус</Th>
                <Th>Отзыв</Th>
              </tr>
            </Thead>
            <tbody>
              {paginatedApps.map(app => (
                <tr key={app.id}>
                  <Td data-label="Клиент">
                    {app.userName}<br/><small style={{color:'#555'}}>{app.userLogin}</small>
                  </Td>
                  <Td data-label="Курс">{app.courseName}</Td>
                  <Td data-label="Дата">{app.startDate}</Td>
                  <Td data-label="Оплата">{app.paymentMethod === 'phone' ? 'По номеру телефона' : 'Наличными'}</Td>
                  <Td data-label="Статус">
                    <Select value={app.status} onChange={e => handleStatus(app.id, e.target.value)}>
                      <option>Новая</option>
                      <option>Идет обучение</option>
                      <option>Обучение завершено</option>
                    </Select>
                  </Td>
                  <Td data-label="Отзыв">
                    {app.hasReview ? `${app.rating}★` : '—'}
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </Table>
        
        {totalPages > 1 && (
          <Pagination>
            <PageButton onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>«</PageButton>
            <PageButton onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} disabled={currentPage === 1}>‹</PageButton>
            {[...Array(totalPages)].map((_, i) => (
              <PageButton key={i} active={currentPage === i + 1} onClick={() => setCurrentPage(i + 1)}>
                {i + 1}
              </PageButton>
            ))}
            <PageButton onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} disabled={currentPage === totalPages}>›</PageButton>
            <PageButton onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>»</PageButton>
          </Pagination>
        )}
      </Wrapper>
    </Container>
  );
};

export default AdminPanel;