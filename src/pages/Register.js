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
  max-width: 480px;
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
  gap: 20px;
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
  border-bottom: 1px solid ${props => props.$error ? '#FF4444' : (props.$success ? '#00FF88' : '#2A2A2A')};
  color: #EDEDED;
  font-size: 15px;
  transition: all 0.2s;
  
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
  font-size: 12px;
  margin-top: 6px;
`;

const SuccessMessage = styled.div`
  color: #00FF88;
  font-size: 12px;
  margin-top: 6px;
`;

const Hint = styled.div`
  color: #555555;
  font-size: 11px;
  margin-top: 4px;
`;

const Register = () => {
  const [formData, setFormData] = useState({
    login: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phone: '',
    email: ''
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const formatPhoneNumber = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length === 0) return '';
    if (numbers.length <= 1) return `8(${numbers}`;
    if (numbers.length <= 4) return `8(${numbers.slice(1, 4)}`;
    if (numbers.length <= 7) return `8(${numbers.slice(1, 4)})${numbers.slice(4, 7)}`;
    if (numbers.length <= 9) return `8(${numbers.slice(1, 4)})${numbers.slice(4, 7)}-${numbers.slice(7, 9)}`;
    return `8(${numbers.slice(1, 4)})${numbers.slice(4, 7)}-${numbers.slice(7, 9)}-${numbers.slice(9, 11)}`;
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^8\(\d{3}\)\d{3}-\d{2}-\d{2}$/;
    return phoneRegex.test(phone);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.login) newErrors.login = 'Введите логин';
    else if (!/^[a-zA-Z0-9]{6,}$/.test(formData.login)) 
      newErrors.login = 'Логин: только латиница и цифры, не менее 6 символов';
    
    if (!formData.password) newErrors.password = 'Введите пароль';
    else if (formData.password.length < 8) 
      newErrors.password = 'Пароль: минимум 8 символов';
    
    if (formData.password !== formData.confirmPassword) 
      newErrors.confirmPassword = 'Пароли не совпадают';
    
    if (!formData.fullName) newErrors.fullName = 'Введите ФИО';
    else if (!/^[а-яА-ЯёЁ\s]+$/.test(formData.fullName)) 
      newErrors.fullName = 'ФИО: только буквы кириллицы и пробелы';
    
    if (!formData.phone) {
      newErrors.phone = 'Введите номер телефона';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Неверный формат. Пример: 8(999)123-45-67';
    }
    
    if (!formData.email) newErrors.email = 'Введите email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) 
      newErrors.email = 'Неверный формат email';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormData({ ...formData, phone: formatted });
    if (errors.phone) {
      setErrors({ ...errors, phone: '' });
    }
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
    if (field === 'phone' && formData.phone) {
      if (!validatePhone(formData.phone)) {
        setErrors({ ...errors, phone: 'Неверный формат. Пример: 8(999)123-45-67' });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allFields = ['login', 'password', 'confirmPassword', 'fullName', 'phone', 'email'];
    setTouched(allFields.reduce((acc, f) => ({ ...acc, [f]: true }), {}));
    
      if (validateForm()) {
    setIsLoading(true);
    const result = await signup(formData.email, formData.password, {
      login: formData.login,
      fullName: formData.fullName,
      phone: formData.phone
    });
    
    if (result.success) {
      navigate('/login');
    } else {
      setErrors({ general: result.error || 'Ошибка регистрации' });
    }
    setIsLoading(false);
  }
  };

  const isFormValid = () => {
    return formData.login && /^[a-zA-Z0-9]{6,}$/.test(formData.login) &&
           formData.password && formData.password.length >= 8 &&
           formData.password === formData.confirmPassword &&
           formData.fullName && /^[а-яА-ЯёЁ\s]+$/.test(formData.fullName) &&
           formData.phone && validatePhone(formData.phone) &&
           formData.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
  };

  return (
    <Container>
      <Card>
        <Title>Регистрация</Title>
        <Subtitle>Создайте аккаунт на портале "Корочки.есть"</Subtitle>
        
        <Form onSubmit={handleSubmit}>
          {errors.general && <ErrorMessage>{errors.general}</ErrorMessage>}
          
          <InputGroup>
            <Label>Логин *</Label>
            <Input 
              $error={touched.login && errors.login}
              $success={touched.login && !errors.login && formData.login}
              value={formData.login}
              onChange={e => handleChange('login', e.target.value)}
              onBlur={() => handleBlur('login')}
              placeholder="login123"
            />
            {touched.login && errors.login && <ErrorMessage>{errors.login}</ErrorMessage>}
            {touched.login && !errors.login && formData.login && <SuccessMessage>✓ Корректный логин</SuccessMessage>}
            <Hint>Только латиница и цифры, минимум 6 символов</Hint>
          </InputGroup>
          
          <InputGroup>
            <Label>Пароль *</Label>
            <Input 
              type="password"
              $error={touched.password && errors.password}
              $success={touched.password && !errors.password && formData.password}
              value={formData.password}
              onChange={e => handleChange('password', e.target.value)}
              onBlur={() => handleBlur('password')}
              placeholder="********"
            />
            {touched.password && errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
            {touched.password && !errors.password && formData.password && formData.password.length >= 8 && 
              <SuccessMessage>✓ Надёжный пароль</SuccessMessage>
            }
            <Hint>Минимум 8 символов</Hint>
          </InputGroup>
          
          <InputGroup>
            <Label>Подтвердите пароль *</Label>
            <Input 
              type="password"
              $error={touched.confirmPassword && errors.confirmPassword}
              $success={touched.confirmPassword && !errors.confirmPassword && formData.confirmPassword && formData.password === formData.confirmPassword}
              value={formData.confirmPassword}
              onChange={e => handleChange('confirmPassword', e.target.value)}
              onBlur={() => handleBlur('confirmPassword')}
              placeholder="********"
            />
            {touched.confirmPassword && errors.confirmPassword && <ErrorMessage>{errors.confirmPassword}</ErrorMessage>}
            {touched.confirmPassword && !errors.confirmPassword && formData.confirmPassword && formData.password === formData.confirmPassword && 
              <SuccessMessage>✓ Пароли совпадают</SuccessMessage>
            }
          </InputGroup>
          
          <InputGroup>
            <Label>ФИО *</Label>
            <Input 
              $error={touched.fullName && errors.fullName}
              $success={touched.fullName && !errors.fullName && formData.fullName}
              value={formData.fullName}
              onChange={e => handleChange('fullName', e.target.value)}
              onBlur={() => handleBlur('fullName')}
              placeholder="Иванов Иван Иванович"
            />
            {touched.fullName && errors.fullName && <ErrorMessage>{errors.fullName}</ErrorMessage>}
            {touched.fullName && !errors.fullName && formData.fullName && <SuccessMessage>✓ Корректное ФИО</SuccessMessage>}
            <Hint>Только буквы кириллицы и пробелы</Hint>
          </InputGroup>
          
          <InputGroup>
            <Label>Телефон *</Label>
            <Input 
              $error={touched.phone && errors.phone}
              $success={touched.phone && !errors.phone && formData.phone && validatePhone(formData.phone)}
              value={formData.phone}
              onChange={handlePhoneChange}
              onBlur={() => handleBlur('phone')}
              placeholder="8(999)123-45-67"
              maxLength="16"
            />
            {touched.phone && errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}
            {touched.phone && !errors.phone && formData.phone && validatePhone(formData.phone) && 
              <SuccessMessage>✓ Номер корректный</SuccessMessage>
            }
            <Hint>Формат: 8(XXX)XXX-XX-XX (например, 8(999)123-45-67)</Hint>
          </InputGroup>
          
          <InputGroup>
            <Label>Email *</Label>
            <Input 
              type="email"
              $error={touched.email && errors.email}
              $success={touched.email && !errors.email && formData.email}
              value={formData.email}
              onChange={e => handleChange('email', e.target.value)}
              onBlur={() => handleBlur('email')}
              placeholder="your@email.com"
            />
            {touched.email && errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
            {touched.email && !errors.email && formData.email && <SuccessMessage>✓ Корректный email</SuccessMessage>}
          </InputGroup>
          
          <Button type="submit" disabled={isLoading || !isFormValid()}>
            {isLoading ? 'Создание...' : 'Создать пользователя'}
          </Button>
          
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