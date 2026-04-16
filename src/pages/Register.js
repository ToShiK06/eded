// Register.js
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
  max-width: 520px;
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
  gap: 20px;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
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
  border: 1px solid ${props => props.$hasError ? '#ef4444' : (props.$isValid ? '#2A2A2A' : '#D5CDC0')};
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

const ErrorMessage = styled.div`
  color: #ef4444;
  font-size: 13px;
  margin-top: 6px;
`;

const SuccessMessage = styled.div`
  color: #2A2A2A;
  font-size: 14px;
  padding: 12px;
  background: rgba(42, 42, 42, 0.05);
  border: 1px solid rgba(42, 42, 42, 0.2);
  text-align: center;
  margin-bottom: 20px;
`;

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const { signup } = useAuth()
  const navigate = useNavigate()

  const validateEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const isPasswordValid = formData.password.length >= 6
  const passwordsMatch = formData.password === formData.confirmPassword

  const validateForm = () => {
    const newErrors = {}
    if (!formData.firstName.trim()) newErrors.firstName = 'Имя обязательно'
    if (!formData.lastName.trim()) newErrors.lastName = 'Фамилия обязательна'
    if (!formData.email.trim()) newErrors.email = 'Email обязателен'
    else if (!validateEmail(formData.email)) newErrors.email = 'Неверный email'
    if (!formData.password) newErrors.password = 'Пароль обязателен'
    else if (!isPasswordValid) newErrors.password = 'Минимум 6 символов'
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Подтвердите пароль'
    else if (!passwordsMatch) newErrors.confirmPassword = 'Пароли не совпадают'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleBlur = field => {
    setTouched(prev => ({ ...prev, [field]: true }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const allFields = ['firstName', 'lastName', 'email', 'password', 'confirmPassword']
    setTouched(allFields.reduce((acc, f) => ({ ...acc, [f]: true }), {}))

    if (validateForm()) {
      setIsLoading(true)
      setSuccessMessage('')

      try {
        const result = await signup(formData.email, formData.password, {
          firstName: formData.firstName,
          lastName: formData.lastName,
        })

        if (result.success) {
          setSuccessMessage('Регистрация успешна! Перенаправляем...')
          setTimeout(() => navigate('/courses'), 2000)
        } else {
          setErrors({ general: 'Ошибка при создании аккаунта' })
        }
      } catch (error) {
        setErrors({ general: 'Ошибка при создании аккаунта' })
      } finally {
        setIsLoading(false)
      }
    }
  }

  const isFormValid = formData.firstName.trim() && formData.lastName.trim() &&
    validateEmail(formData.email) && isPasswordValid && passwordsMatch

  return (
    <AuthContainer>
      <AuthCard>
        <AuthTitle>Регистрация</AuthTitle>
        <AuthSubtitle>Создайте новый аккаунт</AuthSubtitle>

        <AuthForm onSubmit={handleSubmit}>
          {errors.general && <ErrorMessage>{errors.general}</ErrorMessage>}
          {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}

          <FormRow>
            <FormGroup>
              <FormLabel>Имя</FormLabel>
              <FormInput
                type="text"
                name="firstName"
                placeholder="Иван"
                value={formData.firstName}
                onChange={handleChange}
                onBlur={() => handleBlur('firstName')}
                $hasError={touched.firstName && errors.firstName}
                $isValid={touched.firstName && !errors.firstName && formData.firstName}
              />
              {touched.firstName && errors.firstName && <ErrorMessage>{errors.firstName}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <FormLabel>Фамилия</FormLabel>
              <FormInput
                type="text"
                name="lastName"
                placeholder="Иванов"
                value={formData.lastName}
                onChange={handleChange}
                onBlur={() => handleBlur('lastName')}
                $hasError={touched.lastName && errors.lastName}
                $isValid={touched.lastName && !errors.lastName && formData.lastName}
              />
              {touched.lastName && errors.lastName && <ErrorMessage>{errors.lastName}</ErrorMessage>}
            </FormGroup>
          </FormRow>

          <FormGroup>
            <FormLabel>Email</FormLabel>
            <FormInput
              type="email"
              name="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              onBlur={() => handleBlur('email')}
              $hasError={touched.email && errors.email}
              $isValid={touched.email && !errors.email && validateEmail(formData.email)}
            />
            {touched.email && errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <FormLabel>Пароль</FormLabel>
            <FormInput
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              onBlur={() => handleBlur('password')}
              $hasError={touched.password && errors.password}
              $isValid={touched.password && !errors.password && isPasswordValid}
            />
            {touched.password && errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <FormLabel>Подтвердите пароль</FormLabel>
            <FormInput
              type="password"
              name="confirmPassword"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={() => handleBlur('confirmPassword')}
              $hasError={touched.confirmPassword && errors.confirmPassword}
              $isValid={touched.confirmPassword && !errors.confirmPassword && passwordsMatch}
            />
            {touched.confirmPassword && errors.confirmPassword && <ErrorMessage>{errors.confirmPassword}</ErrorMessage>}
          </FormGroup>

          <SubmitButton type="submit" disabled={isLoading || !isFormValid}>
            {isLoading ? 'Регистрация...' : 'Создать аккаунт'}
          </SubmitButton>

          <AuthFooter>
            Уже есть аккаунт?
            <AuthLink to="/login">Войти</AuthLink>
          </AuthFooter>
        </AuthForm>
      </AuthCard>
    </AuthContainer>
  )
}

export default Register