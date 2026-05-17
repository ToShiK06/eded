import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(10, 10, 10, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #2A2A2A;
  z-index: 1000;
  padding: 16px 24px;
`;

const HeaderContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 20px;
  font-weight: 600;
  letter-spacing: -0.5px;
  color: #00FF88;
  
  span {
    color: #EDEDED;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 32px;
  align-items: center;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  font-size: 14px;
  color: #EDEDED;
  transition: color 0.2s;
  
  &:hover {
    color: #00FF88;
  }
`;

const AuthButton = styled.button`
  padding: 8px 20px;
  background: transparent;
  border: 1px solid #00FF88;
  color: #00FF88;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;
  cursor: pointer;
  
  &:hover {
    background: #00FF88;
    color: #0A0A0A;
  }
`;

const UserMenu = styled.div`
  position: relative;
`;

const UserButton = styled.button`
  padding: 8px 16px;
  background: #1A1A1A;
  border: 1px solid #2A2A2A;
  color: #EDEDED;
  font-size: 14px;
  cursor: pointer;
  
  &:hover {
    border-color: #00FF88;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  background: #1A1A1A;
  border: 1px solid #2A2A2A;
  min-width: 160px;
  z-index: 100;
`;

const DropdownItem = styled(Link)`
  display: block;
  padding: 12px 16px;
  font-size: 14px;
  color: #EDEDED;
  transition: all 0.2s;
  
  &:hover {
    background: #2A2A2A;
    color: #00FF88;
  }
`;

const DropdownButton = styled.button`
  display: block;
  width: 100%;
  text-align: left;
  padding: 12px 16px;
  background: none;
  border: none;
  font-size: 14px;
  color: #FF4444;
  cursor: pointer;
  
  &:hover {
    background: #2A2A2A;
  }
`;

const Header = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setIsOpen(false);
  };

  return (
    <HeaderWrapper>
      <HeaderContainer>
        <Logo to="/">korochki<span>.est</span></Logo>
        <Nav>
          <NavLink to="/courses">Курсы</NavLink>
          {currentUser ? (
            <UserMenu>
              <UserButton onClick={() => setIsOpen(!isOpen)}>
                Аккаунт
              </UserButton>
              {isOpen && (
                <Dropdown>
                  <DropdownItem to="/dashboard">Мои курсы</DropdownItem>
                  <DropdownButton onClick={handleLogout}>Выйти</DropdownButton>
                </Dropdown>
              )}
            </UserMenu>
          ) : (
            <AuthButton onClick={() => navigate('/login')}>Войти</AuthButton>
          )}
        </Nav>
      </HeaderContainer>
    </HeaderWrapper>
  );
};

export default Header;