import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeOut = keyframes`
  0% {
    opacity: 1;
    visibility: visible;
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    visibility: hidden;
  }
`;

const progressBar = keyframes`
  0% { width: 0%; }
  100% { width: 100%; }
`;

const PreloaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #F5F0E8;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: ${fadeOut} 0.4s ease-in-out 2.2s forwards;
`;

const PreloaderContent = styled.div`
  text-align: center;
`;

const LogoBox = styled.div`
  width: 80px;
  height: 80px;
  background: #FFFFFF;
  border: 1px solid #D5CDC0;
  margin: 0 auto 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border: 1px solid #2A2A2A;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::before {
    opacity: 1;
  }
`;

const LogoText = styled.div`
  font-size: 28px;
  font-weight: 500;
  color: #2A2A2A;
  letter-spacing: -0.02em;
`;

const CompanyName = styled.div`
  font-size: 24px;
  font-weight: 500;
  color: #1A1A1A;
  margin-bottom: 8px;
  letter-spacing: -0.02em;
`;

const CompanySubtitle = styled.div`
  font-size: 11px;
  color: #808080;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 32px;
`;

const ProgressBarContainer = styled.div`
  width: 240px;
  height: 1px;
  background: #D5CDC0;
  overflow: hidden;
  margin: 0 auto;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: #2A2A2A;
  animation: ${progressBar} 2s ease-in-out forwards;
`;

const Preloader = ({ onLoaded }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    const timer = setTimeout(() => {
      if (onLoaded) onLoaded();
    }, 2200);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onLoaded]);

  return (
    <PreloaderContainer>
      <PreloaderContent>
        <LogoBox>
          <LogoText>К</LogoText>
        </LogoBox>
        <CompanyName>Корочки.есть</CompanyName>
        <CompanySubtitle>Образовательная платформа</CompanySubtitle>
        <ProgressBarContainer>
          <ProgressFill style={{ width: `${progress}%` }} />
        </ProgressBarContainer>
      </PreloaderContent>
    </PreloaderContainer>
  );
};

export default Preloader;