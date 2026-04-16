// Login.js
import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../src/context/AuthContext'

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const AuthContainer = styled.div`
  min-height: 100vh;
  background: #F5F0E8;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 100px 24px;
`;

const AuthCard = styled.div`
  background: #FFFFFF;
  border: 1px solid #D5CDC0;
  padding: 50px;
  width: 100%;
  max-width: 480px;
  animation: ${fadeIn} 0.6s ease-out;

  @media (max-width: 576px) {
    padding: 32px;
  }
`;

const AuthTitle = styled.h1`
  font-size: 32px;
  font-weight: 500;
  color: #1A1A1A;
  margin-bottom: 8px;
  letter-spacing: -0.02em;
`;

const AuthSubtitle = styled.p`
  color: #4A4A4A;
  font-size: 14px;
  margin-bottom: 32px;
`;

const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const FormGroup = styled.div`
  position: relative;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #1A1A1A;
  font-weight: 500;
  font-size: 14px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 14px 16px;
  background: #F5F0E8;
  border: 1px solid ${props => props.$hasError ? '#ef4444' : '#D5CDC0'};
  color: #1A1A1A;
  font-size: 15px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.$hasError ? '#ef4444' : '#2A2A2A'};
  }

  &::placeholder {
    color: #808080;
  }
`;

const SubmitButton = styled.button`
  padding: 16px;
  background: #2A2A2A;
  border: none;
  color: #FFFFFF;
  font-weight: 500;
  font-size: 16px;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  margin-top: 8px;
  cursor: pointer;

  &:hover:not(:disabled) {
    background: #1A1A1A;
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const AuthFooter = styled.div`
  text-align: center;
  margin-top: 8px;
  color: #4A4A4A;
  font-size: 14px;
`;

const AuthLink = styled(Link)`
  color: #2A2A2A;
  text-decoration: none;
  font-weight: 500;
  margin-left: 8px;
  transition: color 0.3s ease;

  &:hover {
    color: #1A1A1A;
  }
`;

const ForgotPassword = styled(Link)`
  display: block;
  text-align: right;
  color: #808080;
  text-decoration: none;
  font-size: 13px;
  margin-top: 8px;
  transition: color 0.3s ease;

  &:hover {
    color: #2A2A2A;
  }
`;

const ErrorMessage = styled.div`
  color: #ef4444;
  font-size: 13px;
  margin-top: 6px;
`;

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const result = await login(email, password)

      if (result.success) {
        if (email === 'admin@admin.da') {
          navigate('/admin')
        } else {
          navigate('/courses')
        }
      } else {
        setError('Неверный email или пароль')
      }
    } catch (error) {
      setError('Ошибка при входе. Проверьте данные')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContainer>
      <AuthCard>
        <AuthTitle>Вход</AuthTitle>
        <AuthSubtitle>Войдите в свой аккаунт</AuthSubtitle>

        <AuthForm onSubmit={handleSubmit}>
          {error && <ErrorMessage>{error}</ErrorMessage>}

          <FormGroup>
            <FormLabel>Email</FormLabel>
            <FormInput
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              disabled={isLoading}
              $hasError={!!error}
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>Пароль</FormLabel>
            <FormInput
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              disabled={isLoading}
              $hasError={!!error}
            />
            <ForgotPassword to="/forgot-password">Забыли пароль?</ForgotPassword>
          </FormGroup>

          <SubmitButton type="submit" disabled={isLoading || !email || !password}>
            {isLoading ? 'Вход...' : 'Войти'}
          </SubmitButton>

          <AuthFooter>
            Нет аккаунта?
            <AuthLink to="/register">Зарегистрироваться</AuthLink>
          </AuthFooter>
        </AuthForm>
      </AuthCard>
    </AuthContainer>
  )
}

export default Login