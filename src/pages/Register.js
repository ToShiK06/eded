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
`;

const Card = styled.div`
  max-width: 440px;
  width: 100%;
  padding: 48px;
  background: #1A1A1A;
  border: 1px solid #2A2A2A;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 600;
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
  gap: 20px;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
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
  border-bottom: 1px solid #2A2A2A;
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
  
  &:hover {
    text-decoration: underline;
  }
`;

const ErrorMessage = styled.div`
  color: #FF4444;
  font-size: 13px;
  margin-top: 8px;
`;

const Register = () => {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'Укажите имя';
    if (!formData.lastName) newErrors.lastName = 'Укажите фамилию';
    if (!formData.email) newErrors.email = 'Укажите email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Неверный email';
    if (!formData.password) newErrors.password = 'Укажите пароль';
    else if (formData.password.length < 6) newErrors.password = 'Минимум 6 символов';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Пароли не совпадают';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        const result = await signup(formData.email, formData.password, { firstName: formData.firstName, lastName: formData.lastName });
        if (result.success) navigate('/dashboard');
        else setErrors({ general: 'Ошибка регистрации' });
      } catch {
        setErrors({ general: 'Ошибка регистрации' });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Container>
      <Card>
        <Title>Регистрация</Title>
        <Subtitle>Создайте аккаунт</Subtitle>
        
        <Form onSubmit={handleSubmit}>
          {errors.general && <ErrorMessage>{errors.general}</ErrorMessage>}
          
          <FormRow>
            <InputGroup>
              <Label>Имя</Label>
              <Input name="firstName" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} />
              {errors.firstName && <ErrorMessage>{errors.firstName}</ErrorMessage>}
            </InputGroup>
            <InputGroup>
              <Label>Фамилия</Label>
              <Input name="lastName" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} />
              {errors.lastName && <ErrorMessage>{errors.lastName}</ErrorMessage>}
            </InputGroup>
          </FormRow>
          
          <InputGroup>
            <Label>Email</Label>
            <Input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          </InputGroup>
          
          <InputGroup>
            <Label>Пароль</Label>
            <Input type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
            {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
          </InputGroup>
          
          <InputGroup>
            <Label>Подтвердите пароль</Label>
            <Input type="password" value={formData.confirmPassword} onChange={e => setFormData({...formData, confirmPassword: e.target.value})} />
            {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword}</ErrorMessage>}
          </InputGroup>
          
          <Button type="submit" disabled={isLoading}>{isLoading ? 'Регистрация...' : 'Создать аккаунт'}</Button>
          
          <Footer>
            Уже есть аккаунт?
            <StyledLink to="/login">Войти</StyledLink>
          </Footer>
        </Form>
      </Card>
    </Container>
  );
};

export default Register;