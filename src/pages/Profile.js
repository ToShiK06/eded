import React, { useState } from 'react'
import styled from 'styled-components'
import { useAuth } from '../context/AuthContext'

const Container = styled.div`
  max-width: 800px;
  margin: 100px auto 80px;
  padding: 0 24px;
`

const ProfileHeader = styled.div`
  margin-bottom: 48px;
  padding-bottom: 24px;
  border-bottom: 1px solid #EEEEEE;
`

const ProfileTitle = styled.h1`
  font-size: 32px;
  font-weight: 600;
  color: #111111;
  letter-spacing: -0.02em;
`

const ProfileCard = styled.div`
  background: #FFFFFF;
  border: 1px solid #EEEEEE;
  padding: 48px;
`

const AvatarSection = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 32px;
  padding-bottom: 32px;
  border-bottom: 1px solid #EEEEEE;
`

const Avatar = styled.div`
  width: 80px;
  height: 80px;
  background: #F5F5F5;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #888888;
  font-size: 32px;
  font-weight: 500;
`

const AvatarInfo = styled.div`
  flex: 1;
`

const AvatarName = styled.h3`
  font-size: 20px;
  font-weight: 500;
  color: #111111;
  margin-bottom: 4px;
`

const AvatarEmail = styled.p`
  color: #888888;
  font-size: 14px;
`

const FormGroup = styled.div`
  margin-bottom: 28px;
`

const Label = styled.label`
  display: block;
  color: #111111;
  margin-bottom: 8px;
  font-weight: 500;
  font-size: 13px;
`

const Input = styled.input`
  width: 100%;
  padding: 12px 0;
  background: transparent;
  border: none;
  border-bottom: 1px solid #EEEEEE;
  color: #111111;
  font-size: 15px;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-bottom-color: #111111;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const Button = styled.button`
  padding: 12px 32px;
  background: #111111;
  border: none;
  color: #FFFFFF;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.2s ease;
  margin-top: 8px;

  &:hover {
    background: #000000;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const Message = styled.div`
  padding: 14px;
  margin-bottom: 24px;
  text-align: center;
  font-size: 13px;

  &.success {
    background: #F8F8F8;
    color: #2E7D32;
  }

  &.error {
    background: #F8F8F8;
    color: #D32F2F;
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
      setMessage({ type: 'success', text: 'Профиль успешно обновлён' })
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
              placeholder="Введите ваше полное имя"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="phone">Номер телефона</Label>
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