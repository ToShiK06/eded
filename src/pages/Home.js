import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 120px 24px;
  background: #0A0A0A;
`;

const Content = styled.div`
  max-width: 800px;
`;

const Title = styled.h1`
  font-size: 56px;
  font-weight: 700;
  color: #00FF88;
  margin-bottom: 24px;
  @media (max-width: 768px) { font-size: 40px; }
`;

const Subtitle = styled.p`
  font-size: 18px;
  color: #888888;
  margin-bottom: 48px;
  line-height: 1.6;
`;

const Button = styled(Link)`
  display: inline-block;
  padding: 14px 40px;
  background: #00FF88;
  color: #0A0A0A;
  font-weight: 600;
  font-size: 16px;
  &:hover { background: #00CC6E; }
`;

const Home = () => {
  return (
    <Container>
      <Content>
        <Title>Корочки.есть</Title>
        <Subtitle>
          Информационная система для записи на онлайн курсы<br/>
          дополнительного профессионального образования
        </Subtitle>
        <Button to="/register">Начать</Button>
      </Content>
    </Container>
  );
};

export default Home;