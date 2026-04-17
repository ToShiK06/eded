import React, { useState, useMemo, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { useInfiniteScroll } from '../hooks/useInfiniteScroll'
import { LoadMoreLoader } from '../components/common/Loader'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`

const scaleIn = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
`

// Модальное окно - обновленные стили
const PaymentModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: ${props => (props.$isOpen ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: ${fadeIn} 0.3s ease-out;
  padding: 20px;
`

const PaymentModal = styled.div`
  background: #FFFFFF;
  padding: 40px;
  width: 100%;
  max-width: 700px;
  border: 1px solid #D5CDC0;
  position: relative;
  animation: ${scaleIn} 0.3s ease-out;
  z-index: 10000;
`

const ModalContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`

const LeftColumn = styled.div`
  padding-right: 20px;
  border-right: 1px solid #D5CDC0;

  @media (max-width: 768px) {
    padding-right: 0;
    border-right: none;
    border-bottom: 1px solid #D5CDC0;
    padding-bottom: 20px;
  }
`

const RightColumn = styled.div`
  padding-left: 20px;

  @media (max-width: 768px) {
    padding-left: 0;
  }
`

const CourseInfoSidebar = styled.div`
  text-align: left;
  margin-bottom: 20px;
`

const CourseTitleSidebar = styled.h2`
  font-size: 24px;
  font-weight: 500;
  color: #1A1A1A;
  margin-bottom: 12px;
  line-height: 1.3;
`

const CourseCategorySidebar = styled.div`
  display: inline-block;
  background: #EDE5DB;
  color: #2A2A2A;
  padding: 4px 12px;
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 16px;
  letter-spacing: 0.5px;
`

const PriceDisplay = styled.div`
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid #D5CDC0;
`

const CurrentPrice = styled.div`
  font-size: 32px;
  font-weight: 500;
  color: #2A2A2A;
  margin-bottom: 8px;
`

const OriginalPrice = styled.div`
  font-size: 14px;
  color: #808080;
  text-decoration: line-through;
  margin-bottom: 8px;
`

const DiscountBadge = styled.div`
  background: #2A2A2A;
  color: #FFFFFF;
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 500;
  display: inline-block;
`

const ModalHeaderCompact = styled.div`
  text-align: center;
  margin-bottom: 30px;
  grid-column: 1 / -1;
`

const ModalTitleCompact = styled.h2`
  font-size: 28px;
  font-weight: 500;
  color: #1A1A1A;
  margin-bottom: 8px;
  letter-spacing: -0.02em;
`

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 20px;
  background: transparent;
  border: none;
  font-size: 24px;
  color: #808080;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #2A2A2A;
  }
`

const ModalSubtitle = styled.p`
  color: #4A4A4A;
  font-size: 14px;
`

const CoursePriceInline = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;

  .current {
    font-size: 28px;
    font-weight: 500;
    color: #2A2A2A;
  }

  .original {
    font-size: 14px;
    color: #808080;
    text-decoration: line-through;
  }

  .discount {
    background: #2A2A2A;
    color: #FFFFFF;
    padding: 4px 8px;
    font-size: 11px;
    font-weight: 500;
  }
`

const PaymentMethods = styled.div`
  margin-bottom: 24px;
`

const PaymentMethod = styled.div`
  background: #F5F0E8;
  border: 1px solid ${props => (props.$selected ? '#2A2A2A' : '#D5CDC0')};
  padding: 16px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 12px;

  &:hover {
    border-color: #2A2A2A;
    background: #EDE5DB;
  }

  &:last-child {
    margin-bottom: 0;
  }
`

const MethodInfo = styled.div`
  flex: 1;

  h4 {
    color: #1A1A1A;
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 4px;
  }

  p {
    color: #4A4A4A;
    font-size: 12px;
    line-height: 1.4;
  }
`

const PaymentForm = styled.div`
  margin-bottom: 24px;
`

const FormGroup = styled.div`
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`

const FormLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #1A1A1A;
  font-weight: 500;
  font-size: 13px;
`

const FormInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  background: #F5F0E8;
  border: 1px solid #D5CDC0;
  color: #1A1A1A;
  font-size: 14px;
  transition: all 0.3s ease;
  outline: none;

  &:focus {
    border-color: #2A2A2A;
  }

  &::placeholder {
    color: #808080;
  }
`

const PhoneInputContainer = styled.div`
  position: relative;

  input {
    width: 100%;
  }
`

const SubmitButton = styled.button`
  width: 100%;
  padding: 14px;
  background: ${props => (props.$isCash ? '#2A2A2A' : '#2A2A2A')};
  border: none;
  color: #FFFFFF;
  font-weight: 500;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 16px;

  &:hover {
    background: #1A1A1A;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const SuccessMessageStyled = styled.div`
  background: rgba(42, 42, 42, 0.05);
  border: 1px solid rgba(42, 42, 42, 0.2);
  padding: 20px;
  text-align: center;
  margin-bottom: 20px;

  h4 {
    color: #2A2A2A;
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 8px;
  }

  p {
    color: #4A4A4A;
    font-size: 13px;
    line-height: 1.5;
  }
`

// Основные стили страницы курсов
const CoursesContainer = styled.div`
  min-height: 100vh;
  background: #F5F0E8;
  padding: 100px 24px 60px;
`

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 1px solid #D5CDC0;
  flex-wrap: wrap;
  gap: 20px;
  
  h1 {
    font-size: 48px;
    font-weight: 500;
    color: #1A1A1A;
    letter-spacing: -0.02em;
  }
  
  p {
    font-size: 16px;
    color: #4A4A4A;
    max-width: 400px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`

const ControlsSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  flex-wrap: wrap;
  gap: 20px;
`

const SearchBox = styled.div`
  flex: 1;
  max-width: 300px;

  input {
    width: 100%;
    padding: 12px 16px;
    background: #FFFFFF;
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
`

const CategoryFilters = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`

const CategoryButton = styled.button`
  padding: 8px 20px;
  background: ${props => (props.active ? '#2A2A2A' : '#FFFFFF')};
  border: 1px solid ${props => (props.active ? '#2A2A2A' : '#D5CDC0')};
  color: ${props => (props.active ? '#FFFFFF' : '#4A4A4A')};
  font-weight: 500;
  font-size: 13px;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    border-color: #2A2A2A;
    color: ${props => (props.active ? '#FFFFFF' : '#2A2A2A')};
  }
`

const ResultsInfo = styled.div`
  margin-bottom: 30px;
  color: #4A4A4A;
  font-size: 14px;
  letter-spacing: 0.5px;
`

const CoursesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const CourseCard = styled.div`
  background: #FFFFFF;
  border: 1px solid #D5CDC0;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: row;
  animation: ${fadeIn} 0.5s ease-out;
  overflow: hidden;

  &:hover {
    border-color: #2A2A2A;
    transform: translateY(-4px);
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const CourseImage = styled.div`
  width: 120px;
  background: #EDE5DB;
  flex-shrink: 0;
  
  @media (max-width: 768px) {
    width: 100%;
    height: 100px;
  }
`

const CourseContent = styled.div`
  padding: 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
`

const CourseCategory = styled.div`
  color: #2A2A2A;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 12px;
`

const CourseTitle = styled.h3`
  font-size: 20px;
  font-weight: 500;
  color: #1A1A1A;
  margin-bottom: 12px;
  line-height: 1.3;
`

const CourseDescription = styled.p`
  color: #4A4A4A;
  line-height: 1.6;
  margin-bottom: 16px;
  font-size: 13px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const CourseMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  color: #808080;
  font-size: 12px;
`

const CoursePrice = styled.div`
  margin-bottom: 16px;
  
  .current {
    font-size: 24px;
    font-weight: 500;
    color: #2A2A2A;
  }
  
  .original {
    font-size: 13px;
    color: #808080;
    text-decoration: line-through;
    margin-left: 10px;
  }
  
  .discount {
    font-size: 12px;
    color: #2A2A2A;
    margin-left: 8px;
  }
`

const EnrollButton = styled.button`
  padding: 12px;
  background: #2A2A2A;
  border: none;
  color: #FFFFFF;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.3s ease;
  cursor: pointer;
  margin-top: auto;

  &:hover {
    background: #1A1A1A;
  }
`

const NoResults = styled.div`
  text-align: center;
  padding: 60px;
  background: #FFFFFF;
  border: 1px solid #D5CDC0;
  
  h3 {
    color: #1A1A1A;
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 10px;
  }
  
  p {
    color: #4A4A4A;
    font-size: 14px;
  }
`

const allCourses = [
  { id: 1, title: 'Веб-разработка на React', category: 'Программирование', description: 'Освойте современную фронтенд-разработку с использованием React, Redux и современных инструментов', duration: '3 месяца', students: 1250, price: 29900, originalPrice: 39900 },
  { id: 2, title: 'Python для анализа данных', category: 'Программирование', description: 'Изучите Python и библиотеки для анализа данных: Pandas, NumPy, Matplotlib', duration: '4 месяца', students: 2100, price: 31900, originalPrice: 41900 },
  { id: 3, title: 'Мобильная разработка iOS', category: 'Программирование', description: 'Создание приложений для iOS на Swift с нуля до публикации в App Store', duration: '4 месяца', students: 630, price: 38900, originalPrice: 48900 },
  { id: 4, title: 'Fullstack JavaScript', category: 'Программирование', description: 'Полный курс по JavaScript: от основ до создания полноценных веб-приложений', duration: '5 месяцев', students: 1800, price: 34900, originalPrice: 44900 },
  { id: 5, title: 'UX/UI Дизайн', category: 'Дизайн', description: 'Научитесь создавать интуитивные и красивые интерфейсы для веб и мобильных приложений', duration: '4 месяца', students: 890, price: 34900, originalPrice: 44900 },
  { id: 6, title: 'Графический дизайн', category: 'Дизайн', description: 'Освойте Adobe Photoshop, Illustrator и создавайте профессиональные дизайны', duration: '3 месяца', students: 1250, price: 29900, originalPrice: 39900 },
  { id: 7, title: 'Digital-маркетинг', category: 'Маркетинг', description: 'Полный курс по digital-маркетингу: SMM, контекстная реклама, SEO и аналитика', duration: '2 месяца', students: 1560, price: 25900, originalPrice: 35900 },
  { id: 8, title: 'SMM Продвижение', category: 'Маркетинг', description: 'Эффективное продвижение в социальных сетях: Instagram, VK, Telegram', duration: '2 месяца', students: 1340, price: 22900, originalPrice: 32900 },
  { id: 9, title: 'Project Management', category: 'Менеджмент', description: 'Управление проектами по методологии Agile, Scrum и классическим подходам', duration: '2 месяца', students: 740, price: 27900, originalPrice: 37900 },
  { id: 10, title: 'Data Analytics', category: 'Аналитика', description: 'Анализ данных с помощью SQL, Python и визуализация в Tableau', duration: '4 месяца', students: 670, price: 34900, originalPrice: 44900 }
]

const PaymentModalComponent = ({ isOpen, onClose, course, onPurchaseSuccess }) => {
  const { currentUser, purchaseCourse } = useAuth()
  const [selectedMethod, setSelectedMethod] = useState('phone')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'

      return () => {
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.width = ''
        document.body.style.overflow = ''
        window.scrollTo(0, scrollY)
      }
    }
  }, [isOpen])

  const paymentMethods = [
    { id: 'phone', name: 'По номеру телефона', description: 'Оплата через СМС или мобильный оператор' },
    { id: 'cash', name: 'Наличными', description: 'Оплата в офисе или курьеру' },
  ]

  const formatPhoneNumber = value => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length === 0) return ''
    if (numbers.length <= 1) return `+7 (${numbers}`
    if (numbers.length <= 4) return `+7 (${numbers.slice(1, 4)}`
    if (numbers.length <= 7) return `+7 (${numbers.slice(1, 4)}) ${numbers.slice(4, 7)}`
    if (numbers.length <= 9) return `+7 (${numbers.slice(1, 4)}) ${numbers.slice(4, 7)}-${numbers.slice(7, 9)}`
    return `+7 (${numbers.slice(1, 4)}) ${numbers.slice(4, 7)}-${numbers.slice(7, 9)}-${numbers.slice(9, 11)}`
  }

  const handlePayment = async () => {
    setIsProcessing(true)
    setError('')

    try {
      const result = await purchaseCourse(course.id.toString(), {
        title: course.title,
        price: course.price,
        category: course.category,
        description: course.description,
      })

      if (result.success) {
        setIsSuccess(true)
        setTimeout(() => {
          onClose()
          if (onPurchaseSuccess) onPurchaseSuccess()
        }, 2000)
      } else {
        setError(result.message || 'Ошибка при покупке курса')
      }
    } catch (error) {
      console.error('Ошибка покупки курса:', error)
      setError('Ошибка при покупке курса. Попробуйте еще раз.')
    } finally {
      setIsProcessing(false)
    }
  }

  if (!isOpen) return null

  const calculateDiscountN = (price, originalPrice) => Math.round((1 - price / originalPrice) * 100)

  return (
    <PaymentModalOverlay $isOpen={isOpen} onClick={onClose}>
      <PaymentModal onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}>✕</CloseButton>

        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '12px', marginBottom: '20px', color: '#ef4444', textAlign: 'center', fontSize: '13px' }}>
            {error}
          </div>
        )}

        {isSuccess ? (
          <>
            <ModalHeaderCompact>
              <ModalTitleCompact>Курс успешно приобретен!</ModalTitleCompact>
              <ModalSubtitle>Доступ к курсу открыт</ModalSubtitle>
            </ModalHeaderCompact>

            <SuccessMessageStyled>
              <h4>Поздравляем!</h4>
              <p>Курс "{course?.title}" теперь доступен в вашем личном кабинете. Вы можете начать обучение прямо сейчас!</p>
            </SuccessMessageStyled>

            <ModalContent>
              <LeftColumn>
                <CourseInfoSidebar>
                  <CourseCategorySidebar>{course?.category || 'Программирование'}</CourseCategorySidebar>
                  <CourseTitleSidebar>{course?.title || 'Название курса'}</CourseTitleSidebar>
                  <PriceDisplay>
                    <CurrentPrice>{course?.price?.toLocaleString() || '0'} ₽</CurrentPrice>
                    {course?.originalPrice > course?.price && (
                      <>
                        <OriginalPrice>{course?.originalPrice?.toLocaleString() || '0'} ₽</OriginalPrice>
                        <DiscountBadge>-{calculateDiscountN(course?.price || 0, course?.originalPrice || 0)}%</DiscountBadge>
                      </>
                    )}
                  </PriceDisplay>
                </CourseInfoSidebar>
              </LeftColumn>
              <RightColumn>
                <p style={{ color: '#4A4A4A', marginBottom: '16px', fontSize: '14px' }}>
                  Курс добавлен в ваш личный кабинет. Начните обучение прямо сейчас!
                </p>
              </RightColumn>
            </ModalContent>
          </>
        ) : (
          <>
            <ModalHeaderCompact>
              <ModalTitleCompact>Оформление заявки</ModalTitleCompact>
              <ModalSubtitle>Выберите удобный способ оплаты</ModalSubtitle>
            </ModalHeaderCompact>

            <ModalContent>
              <LeftColumn>
                <CourseInfoSidebar>
                  <CourseCategorySidebar>{course?.category || 'Программирование'}</CourseCategorySidebar>
                  <CourseTitleSidebar>{course?.title || 'Название курса'}</CourseTitleSidebar>
                  <PriceDisplay>
                    <CurrentPrice>{course?.price?.toLocaleString() || '0'} ₽</CurrentPrice>
                    {course?.originalPrice > course?.price && (
                      <>
                        <OriginalPrice>{course?.originalPrice?.toLocaleString() || '0'} ₽</OriginalPrice>
                        <DiscountBadge>-{calculateDiscountN(course?.price || 0, course?.originalPrice || 0)}%</DiscountBadge>
                      </>
                    )}
                  </PriceDisplay>
                </CourseInfoSidebar>
              </LeftColumn>

              <RightColumn>
                <PaymentMethods>
                  <FormLabel>Способ оплаты</FormLabel>
                  {paymentMethods.map(method => (
                    <PaymentMethod key={method.id} $selected={selectedMethod === method.id} onClick={() => setSelectedMethod(method.id)}>
                      <MethodInfo>
                        <h4>{method.name}</h4>
                        <p>{method.description}</p>
                      </MethodInfo>
                    </PaymentMethod>
                  ))}
                </PaymentMethods>

                {selectedMethod === 'phone' ? (
                  <PaymentForm>
                    <FormGroup>
                      <FormLabel>Номер телефона</FormLabel>
                      <PhoneInputContainer>
                        <FormInput
                          type="tel"
                          placeholder="+7 (___) ___-__-__"
                          value={phoneNumber}
                          onChange={e => setPhoneNumber(formatPhoneNumber(e.target.value))}
                          maxLength="16"
                        />
                      </PhoneInputContainer>
                    </FormGroup>
                  </PaymentForm>
                ) : (
                  <PaymentForm>
                    <FormGroup>
                      <FormLabel>Ваше имя</FormLabel>
                      <FormInput type="text" placeholder="Иван Иванов" />
                    </FormGroup>
                    <FormGroup>
                      <FormLabel>Номер телефона</FormLabel>
                      <PhoneInputContainer>
                        <FormInput
                          type="tel"
                          placeholder="+7 (___) ___-__-__"
                          value={phoneNumber}
                          onChange={e => setPhoneNumber(formatPhoneNumber(e.target.value))}
                          maxLength="16"
                        />
                      </PhoneInputContainer>
                    </FormGroup>
                  </PaymentForm>
                )}

                <SubmitButton onClick={handlePayment} disabled={isProcessing} $isCash={selectedMethod === 'cash'}>
                  {isProcessing ? 'Оформление покупки...' : (selectedMethod === 'phone' ? 'Купить курс' : 'Оформить заявку')}
                </SubmitButton>
              </RightColumn>
            </ModalContent>
          </>
        )}
      </PaymentModal>
    </PaymentModalOverlay>
  )
}

const Courses = () => {
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState('Все')
  const [searchQuery, setSearchQuery] = useState('')
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState(null)

  const categories = ['Все', 'Программирование', 'Дизайн', 'Маркетинг', 'Менеджмент', 'Аналитика']

  const filteredCourses = useMemo(() => {
    return allCourses.filter(course => {
      const matchesCategory = selectedCategory === 'Все' || course.category === selectedCategory
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery])

  const { visibleItems: visibleCourses, loadMoreRef, loading, hasMore } = useInfiniteScroll(filteredCourses, 6)

  const calculateDiscount = (price, originalPrice) => Math.round((1 - price / originalPrice) * 100)

  const handleEnrollClick = course => {
    if (!currentUser) {
      navigate('/register')
      return
    }
    setSelectedCourse(course)
    setIsPaymentModalOpen(true)
  }

  const handlePurchaseSuccess = () => {
    console.log('Курс успешно куплен!')
  }

  return (
    <CoursesContainer>
      <Container>
        <PageHeader>
          <h1>Курсы</h1>
          <p>Выберите направление и начните свой путь в IT</p>
        </PageHeader>

        <ControlsSection>
          <SearchBox>
            <input type="text" placeholder="Поиск курсов..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          </SearchBox>
          <CategoryFilters>
            {categories.map(category => (
              <CategoryButton key={category} active={selectedCategory === category} onClick={() => setSelectedCategory(category)}>
                {category}
              </CategoryButton>
            ))}
          </CategoryFilters>
        </ControlsSection>

        <ResultsInfo>Найдено: {filteredCourses.length} курсов</ResultsInfo>

        {filteredCourses.length === 0 ? (
          <NoResults>
            <h3>Курсы не найдены</h3>
            <p>Попробуйте изменить параметры поиска</p>
          </NoResults>
        ) : (
          <>
            <CoursesGrid>
              {visibleCourses.map(course => (
                <CourseCard key={course.id}>
                  <CourseImage />
                  <CourseContent>
                    <CourseCategory>{course.category}</CourseCategory>
                    <CourseTitle>{course.title}</CourseTitle>
                    <CourseDescription>{course.description}</CourseDescription>
                    <CourseMeta>
                      <span>{course.duration}</span>
                      <span>{course.students} студентов</span>
                    </CourseMeta>
                    <CoursePrice>
                      <span className="current">{course.price.toLocaleString()} ₽</span>
                      {course.originalPrice > course.price && (
                        <>
                          <span className="original">{course.originalPrice.toLocaleString()} ₽</span>
                          <span className="discount">-{calculateDiscount(course.price, course.originalPrice)}%</span>
                        </>
                      )}
                    </CoursePrice>
                    <EnrollButton onClick={() => handleEnrollClick(course)}>
                      {currentUser ? 'Купить курс' : 'Зарегистрироваться'}
                    </EnrollButton>
                  </CourseContent>
                </CourseCard>
              ))}
            </CoursesGrid>
            {loading && <LoadMoreLoader />}
            {hasMore && !loading && <div ref={loadMoreRef} style={{ height: '1px' }} />}
          </>
        )}

        <PaymentModalComponent
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          course={selectedCourse}
          onPurchaseSuccess={handlePurchaseSuccess}
        />
      </Container>
    </CoursesContainer>
  )
}

export default Courses