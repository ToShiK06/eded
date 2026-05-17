import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const ContactsContainer = styled.div`
  min-height: 100vh;
  background: #FFFFFF;
  padding: 100px 24px 80px;
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 64px;
  
  h1 {
    font-size: 48px;
    font-weight: 600;
    color: #111111;
    margin-bottom: 16px;
    letter-spacing: -0.02em;
  }
  
  p {
    font-size: 18px;
    color: #555555;
    max-width: 600px;
    margin: 0 auto;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  margin-bottom: 80px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 48px;
  }
`;

const ContactForm = styled.form`
  background: #FFFFFF;
  border: 1px solid #EEEEEE;
  padding: 48px;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 32px;
  color: #111111;
`;

const FormGroup = styled.div`
  margin-bottom: 28px;
  
  label {
    display: block;
    color: #111111;
    font-weight: 500;
    margin-bottom: 8px;
    font-size: 13px;
  }
  
  input, textarea, select {
    width: 100%;
    padding: 12px 0;
    background: transparent;
    border: none;
    border-bottom: 1px solid #EEEEEE;
    color: #111111;
    font-size: 14px;
    transition: all 0.2s ease;
    
    &::placeholder {
      color: #CCCCCC;
    }
    
    &:focus {
      outline: none;
      border-bottom-color: #111111;
    }
  }
  
  textarea {
    min-height: 100px;
    resize: vertical;
    font-family: inherit;
  }
  
  select {
    cursor: pointer;
    option {
      color: #111111;
    }
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 14px;
  background: #111111;
  border: none;
  color: #FFFFFF;
  font-weight: 500;
  font-size: 15px;
  transition: all 0.2s ease;
  cursor: pointer;
  margin-top: 8px;
  
  &:hover {
    background: #000000;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const SuccessMessage = styled.div`
  background: #F8F8F8;
  color: #2E7D32;
  padding: 14px;
  text-align: center;
  margin-top: 20px;
  font-size: 13px;
`;

const ContactInfo = styled.div``;

const ContactList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ContactItem = styled.div`
  padding: 24px;
  background: #FFFFFF;
  border: 1px solid #EEEEEE;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #CCCCCC;
  }
  
  h3 {
    color: #111111;
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 12px;
  }
  
  p {
    color: #555555;
    margin-bottom: 4px;
    font-size: 14px;
  }
  
  a {
    color: #111111;
    
    &:hover {
      opacity: 0.7;
    }
  }
`;

const MapSection = styled.div`
  margin: 80px 0;
`;

const MapTitle = styled.h2`
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 32px;
  color: #111111;
`;

const MapPlaceholder = styled.div`
  height: 320px;
  background: #F8F8F8;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #888888;
  font-size: 14px;
  border: 1px solid #EEEEEE;
`;

const FAQSection = styled.div`
  margin-top: 80px;
`;

const FAQTitle = styled.h2`
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 32px;
  color: #111111;
`;

const FAQItem = styled.div`
  border: 1px solid #EEEEEE;
  margin-bottom: 12px;
  
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
  color: #111111;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background 0.2s ease;
  
  &:hover {
    background: #F8F8F8;
  }
  
  .arrow {
    transition: transform 0.2s ease;
    transform: ${props => props.$open ? 'rotate(180deg)' : 'rotate(0deg)'};
    color: #888888;
  }
`;

const FAQAnswer = styled.div`
  padding: ${props => props.$open ? '0 24px 24px 24px' : '0 24px'};
  max-height: ${props => props.$open ? '300px' : '0'};
  overflow: hidden;
  transition: all 0.3s ease;
  color: #555555;
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
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
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
    { title: 'Режим работы', content: ['Пн-Пт: 9:00 - 18:00', 'Сб-Вс: 10:00 - 16:00'] }
  ];

  const faqItems = [
    { question: 'Как записаться на курс?', answer: 'Выберите подходящий курс на странице "Курсы", нажмите "Записаться" и следуйте инструкциям для оформления заявки.' },
    { question: 'Какие документы я получу после обучения?', answer: 'После успешного окончания курса вы получите удостоверение или диплом установленного образца о дополнительном профессиональном образовании.' },
    { question: 'Можно ли оплатить курс в рассрочку?', answer: 'Да, мы предоставляем возможность оплаты в рассрочку на большинство курсов. Подробности уточняйте у наших менеджеров.' },
    { question: 'Есть ли возможность вернуть деньги?', answer: 'Да, мы предоставляем возврат средств в течение 14 дней после начала курса, если обучение не подошло.' },
    { question: 'Сколько длится обучение?', answer: 'Продолжительность обучения зависит от выбранного курса - от 1 до 6 месяцев.' },
    { question: 'Будет ли доступ к материалам после окончания?', answer: 'Да, после завершения обучения у вас остаётся пожизненный доступ ко всем материалам курса.' }
  ];

  return (
    <ContactsContainer>
      <Container>
        <PageHeader>
          <h1>Контакты</h1>
          <p>Есть вопросы? Мы всегда готовы помочь</p>
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
                  <h3>{item.title}</h3>
                  {item.content.map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
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
          <FAQTitle>Часто задаваемые вопросы</FAQTitle>
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