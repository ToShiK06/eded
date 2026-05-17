import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApplications } from '../context/ApplicationContext';
import { useAuth } from '../context/AuthContext';

const Container = styled.div`
  min-height: 100vh;
  padding: 100px 24px 80px;
  background: #0A0A0A;
`;

const Wrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 600;
  color: #00FF88;
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  color: #888888;
  margin-bottom: 40px;
`;

const Form = styled.form`
  background: #1A1A1A;
  padding: 40px;
  border: 1px solid #2A2A2A;
  border-radius: 8px;
`;

const FormGroup = styled.div`
  margin-bottom: 24px;
`;

const Label = styled.label`
  display: block;
  font-size: 13px;
  margin-bottom: 8px;
  color: #888888;
`;

const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Select = styled.select`
  width: 100%;
  padding: 14px 16px;
  background: #2A2A2A;
  border: 1px solid #3A3A3A;
  border-radius: 8px;
  color: #EDEDED;
  font-size: 15px;
  cursor: pointer;
  appearance: none;
  
  &:focus {
    outline: none;
    border-color: #00FF88;
  }
  
  option {
    background: #2A2A2A;
    padding: 12px;
  }
`;

const SelectArrow = styled.div`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #00FF88;
  pointer-events: none;
  font-size: 12px;
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 24px;
  margin-top: 8px;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #EDEDED;
  font-size: 14px;
  cursor: pointer;
  
  input {
    accent-color: #00FF88;
    width: 16px;
    height: 16px;
  }
`;

const DateInput = styled.input`
  width: 100%;
  padding: 14px 16px;
  background: #2A2A2A;
  border: 1px solid ${props => props.$error ? '#FF4444' : '#3A3A3A'};
  border-radius: 8px;
  color: #EDEDED;
  font-size: 15px;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #00FF88;
  }
  
  &::-webkit-calendar-picker-indicator {
    filter: invert(1);
    cursor: pointer;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 14px;
  background: #00FF88;
  color: #0A0A0A;
  font-weight: 600;
  font-size: 15px;
  margin-top: 16px;
  cursor: pointer;
  border-radius: 8px;
  border: none;
  
  &:hover {
    background: #00CC6E;
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const SuccessMessage = styled.div`
  background: rgba(0, 255, 136, 0.1);
  border: 1px solid #00FF88;
  padding: 16px;
  text-align: center;
  color: #00FF88;
  margin-bottom: 24px;
  border-radius: 8px;
`;

const ErrorMessage = styled.div`
  background: rgba(255, 68, 68, 0.1);
  border: 1px solid #FF4444;
  padding: 16px;
  text-align: center;
  color: #FF4444;
  margin-bottom: 24px;
  border-radius: 8px;
`;

const Hint = styled.div`
  color: #555555;
  font-size: 11px;
  margin-top: 6px;
`;

const ApplicationForm = () => {
  const { coursesList, createApplication } = useApplications();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const params = new URLSearchParams(location.search);
  const courseFromUrl = params.get('course');
  
  const [formData, setFormData] = useState({
    courseName: courseFromUrl || '',
    startDate: '',
    paymentMethod: 'phone'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [dateError, setDateError] = useState('');
  
  const today = new Date();
  const minDate = today.toISOString().split('T')[0];
  
  const maxDateObj = new Date();
  maxDateObj.setMonth(maxDateObj.getMonth() + 2);
  const maxDate = maxDateObj.toISOString().split('T')[0];

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    const selected = new Date(selectedDate);
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    
    const maxDateLimit = new Date();
    maxDateLimit.setMonth(maxDateLimit.getMonth() + 2);
    
    if (selected < todayDate) {
      setDateError('Нельзя выбрать прошедшую дату');
      setFormData({ ...formData, startDate: '' });
    } else if (selected > maxDateLimit) {
      setDateError('Дата не может быть позже чем через 2 месяца');
      setFormData({ ...formData, startDate: '' });
    } else {
      setDateError('');
      setFormData({ ...formData, startDate: selectedDate });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.courseName) {
      setError('Выберите курс');
      return;
    }
    if (!formData.startDate) {
      setError('Выберите дату начала обучения');
      return;
    }
    if (!currentUser) {
      setError('Необходимо войти в систему');
      navigate('/login');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    const result = await createApplication(formData);
    
    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        navigate('/applications');
      }, 2000);
    } else {
      setError(result.error || 'Ошибка при отправке заявки');
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>Новая заявка</Title>
        <Subtitle>Заполните форму для записи на курс</Subtitle>
        
        <Form onSubmit={handleSubmit}>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && <SuccessMessage>Заявка отправлена на рассмотрение!</SuccessMessage>}
          
          <FormGroup>
            <Label>Наименование курса *</Label>
            <SelectWrapper>
              <Select 
                value={formData.courseName} 
                onChange={e => setFormData({...formData, courseName: e.target.value})}
                required
              >
                <option value="">Выберите курс</option>
                {coursesList.map(course => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </Select>
              <SelectArrow>▼</SelectArrow>
            </SelectWrapper>
          </FormGroup>
          
          <FormGroup>
            <Label>Желаемая дата начала обучения *</Label>
            <DateInput 
              type="date" 
              value={formData.startDate} 
              onChange={handleDateChange}
              min={minDate}
              max={maxDate}
              $error={!!dateError}
              required
            />
            {dateError && <ErrorMessage>{dateError}</ErrorMessage>}
            <Hint>Доступный период: с {minDate} по {maxDate}</Hint>
          </FormGroup>
          
          <FormGroup>
            <Label>Способ оплаты *</Label>
            <RadioGroup>
              <RadioLabel>
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="phone" 
                  checked={formData.paymentMethod === 'phone'} 
                  onChange={e => setFormData({...formData, paymentMethod: e.target.value})}
                />
                По номеру телефона
              </RadioLabel>
              <RadioLabel>
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="cash" 
                  checked={formData.paymentMethod === 'cash'} 
                  onChange={e => setFormData({...formData, paymentMethod: e.target.value})}
                />
                Наличными
              </RadioLabel>
            </RadioGroup>
          </FormGroup>
          
          <Button type="submit" disabled={isSubmitting || !!dateError}>
            {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
          </Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default ApplicationForm;