import React, { useState, useEffect, useRef } from 'react'
import styled, { keyframes } from 'styled-components'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: #FFFFFF;
  border-bottom: 1px solid #D5CDC0;
  z-index: 1000;
  animation: ${slideDown} 0.5s ease-out;
  height: 70px;
  display: flex;
  align-items: center;
`

const Nav = styled.nav`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  flex-shrink: 0;

  &:hover {
    opacity: 0.8;
  }
`

const LogoText = styled.div`
  .main {
    font-size: 22px;
    font-weight: 500;
    color: #1A1A1A;
    letter-spacing: -0.02em;
  }
`

const NavLinks = styled.div`
  display: flex;
  gap: 32px;
  align-items: center;
  margin-left: 60px;

  @media (max-width: 968px) {
    display: none;
  }
`

const NavLink = styled(Link)`
  color: ${props => props.active ? '#1A1A1A' : '#4A4A4A'};
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: ${props => props.active ? '100%' : '0'};
    height: 1px;
    background: #2A2A2A;
    transition: width 0.3s ease;
  }

  &:hover {
    color: #1A1A1A;
    
    &::after {
      width: 100%;
    }
  }
`

const AuthSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
  margin-left: auto;

  @media (max-width: 968px) {
    display: none;
  }
`

const AuthButton = styled(Link)`
  padding: 8px 24px;
  font-weight: 500;
  font-size: 14px;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;

  &.login {
    background: transparent;
    border: 1px solid #D5CDC0;
    color: #2A2A2A;

    &:hover {
      border-color: #2A2A2A;
    }
  }

  &.register {
    background: #2A2A2A;
    border: none;
    color: #FFFFFF;

    &:hover {
      background: #1A1A1A;
    }
  }
`

const UserMenu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`

const UserAvatar = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: #EDE5DB;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2A2A2A;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid #D5CDC0;

  &:hover {
    border-color: #2A2A2A;
  }
`

const UserDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 12px;
  background: #FFFFFF;
  border: 1px solid #D5CDC0;
  padding: 12px;
  min-width: 240px;
  z-index: 1001;
  animation: ${slideDown} 0.2s ease-out;
`

const UserInfo = styled.div`
  padding: 8px 8px 12px 8px;
  border-bottom: 1px solid #D5CDC0;
  margin-bottom: 8px;
`

const UserName = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #1A1A1A;
  margin-bottom: 4px;
`

const UserEmail = styled.div`
  color: #4A4A4A;
  font-size: 12px;
`

const DropdownItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  color: #4A4A4A;
  text-decoration: none;
  font-size: 13px;
  transition: all 0.2s ease;

  &:hover {
    background: #EDE5DB;
    color: #1A1A1A;
  }
`

const LogoutButton = styled.button`
  width: 100%;
  padding: 10px 12px;
  background: transparent;
  border: 1px solid #D5CDC0;
  color: #ef4444;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 4px;

  &:hover {
    background: rgba(239, 68, 68, 0.05);
    border-color: #ef4444;
  }
`

const MobileMenuButton = styled.button`
  display: none;
  background: transparent;
  border: 1px solid #D5CDC0;
  padding: 8px;
  color: #1A1A1A;
  font-size: 20px;
  transition: all 0.3s ease;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-left: auto;
  cursor: pointer;

  &:hover {
    border-color: #2A2A2A;
    color: #2A2A2A;
  }

  @media (max-width: 968px) {
    display: flex;
  }
`

const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #FFFFFF;
  z-index: 2000;
  padding: 24px;
  display: flex;
  flex-direction: column;
  animation: ${slideDown} 0.3s ease-out;
`

const MobileMenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
`

const CloseButton = styled.button`
  background: transparent;
  border: 1px solid #D5CDC0;
  width: 40px;
  height: 40px;
  color: #1A1A1A;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #2A2A2A;
    color: #2A2A2A;
  }
`

const MobileNavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
`

const MobileNavItem = styled(Link)`
  padding: 16px;
  background: #F5F0E8;
  border: 1px solid #D5CDC0;
  color: #1A1A1A;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    border-color: #2A2A2A;
    color: #2A2A2A;
  }
`

const MobileAuthSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 24px;
`

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { currentUser, userData, logout } = useAuth()

  const userMenuRef = useRef(null)
  const mobileMenuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = event => {
      if (userDropdownOpen && userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserDropdownOpen(false)
      }
      if (mobileMenuOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setMobileMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [userDropdownOpen, mobileMenuOpen])

  useEffect(() => {
    setMobileMenuOpen(false)
    setUserDropdownOpen(false)
  }, [location])

  const handleLogout = async () => {
    try {
      await logout()
      setUserDropdownOpen(false)
      setMobileMenuOpen(false)
      navigate('/')
    } catch (error) {
      console.error('Ошибка при выходе:', error)
    }
  }

  const getInitials = () => {
    if (userData?.displayName) {
      return userData.displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    }
    return currentUser?.email[0].toUpperCase() || 'U'
  }

  const navItems = [
    { path: '/courses', text: 'Курсы' },
    { path: '/about', text: 'О нас' },
    { path: '/reviews', text: 'Отзывы' },
    { path: '/contacts', text: 'Контакты' },
  ]

  return (
    <>
      <HeaderContainer>
        <Nav>
          <Logo to="/">
            <LogoText>
              <div className="main">Корочки.есть</div>
            </LogoText>
          </Logo>

          <NavLinks>
            {navItems.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                active={location.pathname === item.path ? 1 : 0}
              >
                {item.text}
              </NavLink>
            ))}
          </NavLinks>

          <AuthSection>
            {currentUser ? (
              <UserMenu ref={userMenuRef}>
                <UserAvatar onClick={() => setUserDropdownOpen(!userDropdownOpen)}>
                  {getInitials()}
                </UserAvatar>

                {userDropdownOpen && (
                  <UserDropdown>
                    <UserInfo>
                      <UserName>{userData?.displayName || 'Пользователь'}</UserName>
                      <UserEmail>{currentUser.email}</UserEmail>
                    </UserInfo>
                    {currentUser?.email === 'admin@admin.da' && (
                      <DropdownItem to="/admin" onClick={() => setUserDropdownOpen(false)}>
                        Админ панель
                      </DropdownItem>
                    )}
                    <DropdownItem to="/dashboard" onClick={() => setUserDropdownOpen(false)}>
                      Личный кабинет
                    </DropdownItem>
                    <DropdownItem to="/profile" onClick={() => setUserDropdownOpen(false)}>
                      Настройки
                    </DropdownItem>
                    <LogoutButton onClick={handleLogout}>Выйти</LogoutButton>
                  </UserDropdown>
                )}
              </UserMenu>
            ) : (
              <>
                <AuthButton to="/login" className="login">Войти</AuthButton>
                <AuthButton to="/register" className="register">Регистрация</AuthButton>
              </>
            )}
          </AuthSection>

          <MobileMenuButton onClick={() => setMobileMenuOpen(true)}>☰</MobileMenuButton>
        </Nav>
      </HeaderContainer>

      {mobileMenuOpen && (
        <MobileMenu ref={mobileMenuRef}>
          <MobileMenuHeader>
            <Logo to="/" onClick={() => setMobileMenuOpen(false)}>
              <LogoText><div className="main">Корочки.есть</div></LogoText>
            </Logo>
            <CloseButton onClick={() => setMobileMenuOpen(false)}>✕</CloseButton>
          </MobileMenuHeader>

          <MobileNavLinks>
            {navItems.map(item => (
              <MobileNavItem key={item.path} to={item.path} onClick={() => setMobileMenuOpen(false)}>
                {item.text}
              </MobileNavItem>
            ))}
            {currentUser && (
              <>
                <MobileNavItem to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                  Личный кабинет
                </MobileNavItem>
                <MobileNavItem to="/profile" onClick={() => setMobileMenuOpen(false)}>
                  Настройки
                </MobileNavItem>
              </>
            )}
          </MobileNavLinks>

          <MobileAuthSection>
            {currentUser ? (
              <LogoutButton onClick={handleLogout} style={{ padding: '16px', fontSize: '14px' }}>
                Выйти
              </LogoutButton>
            ) : (
              <>
                <AuthButton to="/login" className="login" style={{ textAlign: 'center', padding: '12px' }}>
                  Войти
                </AuthButton>
                <AuthButton to="/register" className="register" style={{ textAlign: 'center', padding: '12px' }}>
                  Регистрация
                </AuthButton>
              </>
            )}
          </MobileAuthSection>
        </MobileMenu>
      )}
    </>
  )
}

export default Header