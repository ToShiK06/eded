
import React, { useState } from 'react'
import styled from 'styled-components'
import { useAuth } from '../context/AuthContext'

const Container = styled.div`
  max-width: 800px;
  margin: 100px auto 60px;
  padding: 0 24px;
`

const ProfileHeader = styled.div`
  text-align: left;
  margin-bottom: 50px;
  padding-bottom: 30px;
  border-bottom: 1px solid #2A2A2A;
`

const ProfileTitle = styled.h1`
  font-size: 36px;
  font-weight: 500;
  color: #FFFFFF;
  letter-spacing: -0.02em;
`

const ProfileCard = styled.div`
  background: #141414;
  border: 1px solid #2A2A2A;
  padding: 40px;
`

const AvatarSection = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 30px;
  padding-bottom: 30px;
  border-bottom: 1px solid #2A2A2A;
`

const Avatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #D4C5B0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0A0A0A;
  font-size: 32px;
  font-weight: 500;
`

const AvatarInfo = styled.div`
  flex: 1;
`

const AvatarName = styled.h3`
  font-size: 22px;
  font-weight: 500;
  color: #FFFFFF;
  margin-bottom: 6px;
`

const AvatarEmail = styled.p`
  color: #B0B0B0;
  font-size: 14px;
`

const FormGroup = styled.div`
  margin-bottom: 24px;
`

const Label = styled.label`
  display: block;
  color: #FFFFFF;
  margin-bottom: 8px;
  font-weight: 500;
  font-size: 14px;
`

const Input = styled.input`
  width: 100%;
  padding: 14px 16px;
  background: #0A0A0A;
  border: 1px solid #2A2A2A;
  color: #FFFFFF;
  font-size: 15px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #D4C5B0;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const Button = styled.button`
  padding: 14px 32px;
  background: #D4C5B0;
  border: none;
  color: #0A0A0A;
  font-weight: 500;
  font-size: 15px;
  transition: all 0.3s ease;

  &:hover {
    background: #C4B5A0;
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`

const Message = styled.div`
  padding: 14px;
  margin-bottom: 24px;
  text-align: center;
  font-size: 14px;

  &.success {
    background: rgba(212, 197, 176, 0.1);
    color: #D4C5B0;
    border: 1px solid rgba(212, 197, 176, 0.3);
  }

  &.error {
    background: rgba(239, 68, 68, 0.1);
    color: #ef4444;
    border: 1px solid rgba(239, 68, 68, 0.3);
  }
`

const Profile = () => {
  const { currentUser, userData, updateUserProfile } = useAuth()
  const [formData, setFormData] = useState({
    displayName: userData?.displayName || '',
    phone: userData?.phone || '',
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setMessage({ type: '', text: '' })

    try {
      await updateUserProfile(formData)
      setMessage({ type: 'success', text: 'Профиль успешно обновлен!' })
    } catch (error) {
      setMessage({ type: 'error', text: 'Ошибка при обновлении профиля' })
    } finally {
      setLoading(false)
    }
  }

  const getInitials = () => {
    if (userData?.displayName) {
      return userData.displayName.split(' ').map(n => n[0]).join('').toUpperCase()
    }
    return currentUser?.email[0].toUpperCase() || 'U'
  }

  return (
    <Container>
      <ProfileHeader>
        <ProfileTitle>Настройки профиля</ProfileTitle>
      </ProfileHeader>

      <ProfileCard>
        <AvatarSection>
          <Avatar>{getInitials()}</Avatar>
          <AvatarInfo>
            <AvatarName>{userData?.displayName || 'Пользователь'}</AvatarName>
            <AvatarEmail>{currentUser?.email}</AvatarEmail>
          </AvatarInfo>
        </AvatarSection>

        {message.text && (
          <Message className={message.type}>{message.text}</Message>
        )}

        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="email">Email адрес</Label>
            <Input type="email" id="email" value={currentUser?.email || ''} disabled />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="displayName">Имя и фамилия</Label>
            <Input
              type="text"
              id="displayName"
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
              placeholder="Введите ваше имя"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="phone">Телефон</Label>
            <Input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+7 (999) 123-45-67"
            />
          </FormGroup>

          <Button type="submit" disabled={loading}>
            {loading ? 'Сохранение...' : 'Сохранить изменения'}
          </Button>
        </form>
      </ProfileCard>
    </Container>
  )
}

export default Profile