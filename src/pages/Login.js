import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 120px 24px;
  background: #0A0A0A;
`;

const Card = styled.div`
  max-width: 400px;
  width: 100%;
  padding: 48px;
  background: #1A1A1A;
  border: 1px solid #2A2A2A;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 600;
  color: #00FF88;
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  color: #888888;
  font-size: 14px;
  margin-bottom: 32px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const InputGroup = styled.div``;

const Label = styled.label`
  display: block;
  font-size: 13px;
  margin-bottom: 8px;
  color: #888888;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 0;
  background: transparent;
  border: none;
  border-bottom: 1px solid ${props => props.$error ? '#FF4444' : '#2A2A2A'};
  color: #EDEDED;
  font-size: 15px;
  
  &:focus {
    outline: none;
    border-bottom-color: #00FF88;
  }
`;

const Button = styled.button`
  padding: 14px;
  background: #00FF88;
  color: #0A0A0A;
  font-weight: 600;
  font-size: 15px;
  margin-top: 16px;
  cursor: pointer;
  
  &:hover {
    background: #00CC6E;
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Footer = styled.div`
  text-align: center;
  margin-top: 24px;
  font-size: 13px;
  color: #888888;
`;

const StyledLink = styled(Link)`
  color: #00FF88;
  margin-left: 8px;
`;

const ErrorMessage = styled.div`
  color: #FF4444;
  font-size: 13px;
  text-align: center;
  margin-bottom: 16px;
`;

const Login = () => {
  const [loginInput, setLoginInput] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, userData } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    const result = await login(loginInput, password);
    if (result.success) {
      if (userData?.role === 'admin' || loginInput === 'Admin') navigate('/admin');
      else navigate('/applications');
    } else {
      setError('Неверный логин или пароль');
    }
    setIsLoading(false);
  };

  return (
    <Container>
      <Card>
        <Title>Авторизация</Title>
        <Subtitle>Войдите в систему "Корочки.есть"</Subtitle>
        <Form onSubmit={handleSubmit}>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <InputGroup>
            <Label>Логин или Email</Label>
            <Input $error={error} value={loginInput} 
              onChange={e => setLoginInput(e.target.value)} required />
          </InputGroup>
          <InputGroup>
            <Label>Пароль</Label>
            <Input type="password" $error={error} value={password}
              onChange={e => setPassword(e.target.value)} required />
          </InputGroup>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Вход...' : 'Войти'}
          </Button>
          <Footer>
            Еще не зарегистрированы? <StyledLink to="/register">Регистрация</StyledLink>
          </Footer>
        </Form>
      </Card>
    </Container>
  );
};

export default Login;