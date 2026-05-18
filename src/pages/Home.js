import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Container = styled.div`
  min-height: 100vh;
  background: #0A0A0A;
`;

const SliderSection = styled.section`
  padding: 100px 24px 60px;
  background: #0A0A0A;
  
  @media (max-width: 768px) {
    padding: 80px 16px 40px;
  }
`;

const SliderContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
`;

const SliderWrapper = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: translateX(-${props => props.$index * 100}%);
`;

const Slide = styled.div`
  min-width: 100%;
  height: 400px;
  position: relative;
  background: #1A1A1A;
  
  @media (max-width: 768px) {
    height: 250px;
  }
`;

const SlideImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const SlideOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  padding: 40px 24px 24px;
  color: white;
  
  @media (max-width: 768px) {
    padding: 20px 16px 16px;
  }
`;

const SlideTitle = styled.h3`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 8px;
  
  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const SlideText = styled.p`
  font-size: 14px;
  opacity: 0.9;
  
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const SliderButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.6);
  color: #00FF88;
  border: 1px solid #00FF88;
  padding: 12px 18px;
  cursor: pointer;
  font-size: 18px;
  z-index: 10;
  transition: all 0.2s;
  border-radius: 50%;
  
  &:hover {
    background: #00FF88;
    color: #0A0A0A;
  }
  
  &:first-of-type {
    left: 15px;
  }
  
  &:last-of-type {
    right: 15px;
  }
  
  @media (max-width: 768px) {
    padding: 8px 12px;
    font-size: 14px;
  }
`;

const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 20px;
`;

const Dot = styled.button`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${props => props.$active ? '#00FF88' : '#2A2A2A'};
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: '#00FF88';
  }
`;

const Content = styled.div`
  max-width: 800px;
  margin: 60px auto 0;
  text-align: center;
  padding: 0 24px 60px;
  animation: ${fadeIn} 0.6s ease;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 700;
  color: #00FF88;
  margin-bottom: 24px;
  
  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const Subtitle = styled.p`
  font-size: 18px;
  color: #888888;
  margin-bottom: 32px;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const Button = styled(Link)`
  display: inline-block;
  padding: 14px 40px;
  background: #00FF88;
  color: #0A0A0A;
  font-weight: 600;
  font-size: 16px;
  border-radius: 8px;
  transition: all 0.2s;
  
  &:hover {
    background: #00CC6E;
    transform: translateY(-2px);
  }
`;

// Разные тематические фото для IT
const slides = [
  {
    id: 1,
    image: 'https://picsum.photos/id/0/1000/400',
    title: 'Основы алгоритмизации и программирования',
    text: 'Научитесь мыслить алгоритмически и создавать эффективный код'
  },
  {
    id: 2,
    image: 'https://picsum.photos/id/20/1000/400',
    title: 'Основы веб-дизайна',
    text: 'Создавайте красивые и функциональные веб-сайты'
  },
  {
    id: 3,
    image: 'https://picsum.photos/id/42/1000/400',
    title: 'Основы проектирования баз данных',
    text: 'Проектируйте эффективные структуры данных'
  },
  {
    id: 4,
    image: 'https://picsum.photos/id/26/1000/400',
    title: 'Получи официальный документ',
    text: 'После обучения вы получите удостоверение установленного образца'
  }
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <Container>
      <SliderSection>
        <SliderContainer>
          <SliderWrapper $index={currentIndex}>
            {slides.map((slide) => (
              <Slide key={slide.id}>
                <SlideImage src={slide.image} alt={slide.title} />
                <SlideOverlay>
                  <SlideTitle>{slide.title}</SlideTitle>
                  <SlideText>{slide.text}</SlideText>
                </SlideOverlay>
              </Slide>
            ))}
          </SliderWrapper>
          <SliderButton onClick={prevSlide}>←</SliderButton>
          <SliderButton onClick={nextSlide}>→</SliderButton>
        </SliderContainer>
        <DotsContainer>
          {slides.map((_, idx) => (
            <Dot
              key={idx}
              $active={currentIndex === idx}
              onClick={() => goToSlide(idx)}
            />
          ))}
        </DotsContainer>
      </SliderSection>
      
      <Content>
        <Title>Корочки.есть</Title>
        <Subtitle>
          Информационная система для записи на онлайн курсы<br/>
          дополнительного профессионального образования
        </Subtitle>
        <Button to="/register">Начать обучение</Button>
      </Content>
    </Container>
  );
};

export default Home;