import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const ContactsContainer = styled.div`
  min-height: 100vh;
  background: #F5F0E8;
  padding: 100px 24px 60px;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

// Хедер с двумя колонками
const PageHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  margin-bottom: 60px;
  padding-bottom: 30px;
  border-bottom: 1px solid #D5CDC0;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  h1 {
    font-size: 48px;
    font-weight: 500;
    color: #1A1A1A;
    letter-spacing: -0.02em;
  }
  
  p {
    font-size: 18px;
    color: #4A4A4A;
    line-height: 1.6;
    align-self: flex-end;
    
    @media (max-width: 768px) {
      align-self: flex-start;
    }
  }
`;

// Форма и контакты поменялись местами
const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  margin-bottom: 80px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 50px;
  }
`;

// Форма теперь слева
const ContactForm = styled.form`
  background: #FFFFFF;
  border: 1px solid #D5CDC0;
  padding: 40px;
  order: 1;
`;

// Контакты справа
const ContactInfo = styled.div`
  order: 2;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 30px;
  color: #1A1A1A;
  letter-spacing: -0.01em;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 40px;
    height: 2px;
    background: #2A2A2A;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 24px;
  
  label {
    display: block;
    color: #1A1A1A;
    font-weight: 500;
    margin-bottom: 8px;
    font-size: 14px;
  }
  
  input, textarea, select {
    width: 100%;
    padding: 14px 16px;
    background: #F5F0E8;
    border: 1px solid #D5CDC0;
    color: #1A1A1A;
    font-size: 14px;
    transition: all 0.3s ease;
    
    &::placeholder {
      color: #808080;
    }
    
    &:focus {
      outline: none;
      border-color: #2A2A2A;
    }
  }
  
  textarea {
    resize: vertical;
    min-height: 120px;
    font-family: inherit;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 16px;
  background: #2A2A2A;
  border: none;
  color: #FFFFFF;
  font-weight: 500;
  font-size: 16px;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    background: #1A1A1A;
    transform: translateY(-2px);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const SuccessMessage = styled.div`
  background: rgba(42, 42, 42, 0.05);
  border: 1px solid rgba(42, 42, 42, 0.2);
  color: #2A2A2A;
  padding: 16px;
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
`;

const ContactList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding: 24px;
  background: #FFFFFF;
  border: 1px solid #D5CDC0;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #2A2A2A;
  }
  
  .content {
    flex: 1;
    
    h3 {
      color: #1A1A1A;
      font-size: 18px;
      font-weight: 500;
      margin-bottom: 8px;
    }
    
    p {
      color: #4A4A4A;
      margin-bottom: 4px;
      font-size: 14px;
    }
    
    a {
      color: #2A2A2A;
      transition: color 0.3s ease;
      
      &:hover {
        color: #1A1A1A;
      }
    }
  }
`;

// Карта теперь внизу, но в другой компоновке
const MapSection = styled.div`
  margin: 80px 0;
`;

const MapTitle = styled.h2`
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 30px;
  color: #1A1A1A;
`;

const MapPlaceholder = styled.div`
  height: 300px;
  background: #FFFFFF;
  border: 1px solid #D5CDC0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4A4A4A;
  font-size: 14px;
`;

// FAQ в аккордеон вместо сетки
const FAQSection = styled.div`
  margin-top: 80px;
`;

const FAQTitle = styled.h2`
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 30px;
  color: #1A1A1A;
`;

const FAQItem = styled.div`
  background: #FFFFFF;
  border: 1px solid #D5CDC0;
  margin-bottom: 16px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const FAQQuestion = styled.button`
  width: 100%;
  padding: 20px 24px;
  background: transparent;
  border: none;
  text-align: left;
  font-size: 16px;
  font-weight: 500;
  color: #1A1A1A;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: #EDE5DB;
  }
  
  .arrow {
    transition: transform 0.3s ease;
    transform: ${props => props.$open ? 'rotate(180deg)' : 'rotate(0deg)'};
  }
`;

const FAQAnswer = styled.div`
  padding: ${props => props.$open ? '0 24px 24px 24px' : '0 24px'};
  max-height: ${props => props.$open ? '200px' : '0'};
  overflow: hidden;
  transition: all 0.3s ease;
  color: #4A4A4A;
  font-size: 14px;
  line-height: 1.6;
`;

const Contacts = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
    
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const contactItems = [
    { title: 'Телефон', content: ['+7 (123) 555-55-55', 'Бесплатный звонок по России'] },
    { title: 'Email', content: ['info@korochki.est - общие вопросы', 'support@korochki.est - техподдержка'] },
    { title: 'Адрес', content: ['Великий Новгород', 'Бизнес-центр'] },
    { title: 'Время работы', content: ['Пн-Пт: 9:00 - 18:00', 'Сб-Вс: 10:00 - 16:00'] }
  ];

  const faqItems = [
    { question: 'Как записаться на курс?', answer: 'Выберите подходящий курс на странице "Курсы", нажмите "Записаться" и следуйте инструкциям для оформления заявки.' },
    { question: 'Какие документы я получу после обучения?', answer: 'После успешного окончания курса вы получите удостоверение или диплом установленного образца о дополнительном профессиональном образовании.' },
    { question: 'Можно ли оплатить курс в рассрочку?', answer: 'Да, мы предоставляем возможность оплаты в рассрочку на большинство курсов. Подробности уточняйте у наших менеджеров.' },
    { question: 'Есть ли возможность вернуть деньги?', answer: 'Да, мы предоставляем возврат средств в течение 14 дней после начала курса, если обучение не подошло.' },
    { question: 'Сколько длится обучение на курсах?', answer: 'Продолжительность обучения зависит от выбранного курса - от 1 до 6 месяцев. Каждый курс имеет четкий учебный план и график занятий.' },
    { question: 'Предоставляется ли доступ к материалам после окончания курса?', answer: 'Да, после завершения обучения у вас остается пожизненный доступ ко всем материалам курса, включая видеоуроки, презентации и дополнительные ресурсы.' }
  ];

  return (
    <ContactsContainer>
      <Container>
        <PageHeader>
          <h1>Контакты</h1>
          <p>Есть вопросы? Мы всегда рады помочь и ответим в ближайшее время</p>
        </PageHeader>

        <ContentGrid>
          <ContactForm onSubmit={handleSubmit}>
            <SectionTitle>Напишите нам</SectionTitle>
            
            <FormGroup>
              <label htmlFor="name">Имя *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Ваше имя"
              />
            </FormGroup>
            
            <FormGroup>
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
              />
            </FormGroup>
            
            <FormGroup>
              <label htmlFor="phone">Телефон</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+7 (___) ___-__-__"
              />
            </FormGroup>
            
            <FormGroup>
              <label htmlFor="subject">Тема *</label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Выберите тему</option>
                <option value="course">Вопрос по курсу</option>
                <option value="payment">Оплата и документы</option>
                <option value="technical">Техническая поддержка</option>
                <option value="other">Другое</option>
              </select>
            </FormGroup>
            
            <FormGroup>
              <label htmlFor="message">Сообщение *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Расскажите о вашем вопросе..."
              />
            </FormGroup>
            
            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Отправка...' : 'Отправить сообщение'}
            </SubmitButton>
            
            {isSubmitted && (
              <SuccessMessage>
                Спасибо! Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.
              </SuccessMessage>
            )}
          </ContactForm>

          <ContactInfo>
            <SectionTitle>Контактная информация</SectionTitle>
            <ContactList>
              {contactItems.map((item, index) => (
                <ContactItem key={index}>
                  <div className="content">
                    <h3>{item.title}</h3>
                    {item.content.map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                </ContactItem>
              ))}
            </ContactList>
          </ContactInfo>
        </ContentGrid>

        <MapSection>
          <MapTitle>Мы на карте</MapTitle>
          <MapPlaceholder>
            Интерактивная карта будет здесь
          </MapPlaceholder>
        </MapSection>

        <FAQSection>
          <FAQTitle>Частые вопросы</FAQTitle>
          {faqItems.map((item, index) => (
            <FAQItem key={index}>
              <FAQQuestion onClick={() => toggleFaq(index)} $open={openFaq === index}>
                {item.question}
                <span className="arrow">▼</span>
              </FAQQuestion>
              <FAQAnswer $open={openFaq === index}>
                {item.answer}
              </FAQAnswer>
            </FAQItem>
          ))}
        </FAQSection>
      </Container>
    </ContactsContainer>
  );
};

export default Contacts;