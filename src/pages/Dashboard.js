/* Dashboard.js - обновлен */
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

const Container = styled.div`
  max-width: 1200px;
  margin: 100px auto 60px;
  padding: 0 24px;
`

const DashboardHeader = styled.div`
  text-align: left;
  margin-bottom: 50px;
  padding-bottom: 30px;
  border-bottom: 1px solid #2A2A2A;
`

const WelcomeText = styled.h1`
  font-size: 36px;
  font-weight: 500;
  color: #FFFFFF;
  margin-bottom: 8px;
  letter-spacing: -0.02em;
`

const SectionTitle = styled.h2`
  font-size: 28px;
  font-weight: 500;
  margin-bottom: 30px;
  color: #FFFFFF;
`

const CoursesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 30px;
`

const CourseCard = styled.div`
  background: #141414;
  border: 1px solid #2A2A2A;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;

  &:hover {
    border-color: #D4C5B0;
    transform: translateY(-4px);
  }
`

const CourseContent = styled.div`
  padding: 28px;
  flex: 1;
  display: flex;
  flex-direction: column;
`

const CourseTitle = styled.h3`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 12px;
  color: #FFFFFF;
`

const CourseDescription = styled.p`
  color: #B0B0B0;
  margin-bottom: 20px;
  font-size: 14px;
  line-height: 1.6;
  flex: 1;
`

const ProgressBar = styled.div`
  background: #2A2A2A;
  height: 3px;
  margin-bottom: 10px;
  overflow: hidden;
`

const ProgressFill = styled.div`
  width: ${props => props.progress}%;
  height: 100%;
  background: #D4C5B0;
`

const ProgressText = styled.div`
  font-size: 12px;
  color: #808080;
  text-align: right;
  margin-bottom: 20px;
`

const ActionButton = styled(Link)`
  display: block;
  width: 100%;
  padding: 14px;
  background: #2A2A2A;
  border: none;
  color: #FFFFFF;
  font-weight: 500;
  font-size: 14px;
  text-align: center;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: #D4C5B0;
    color: #0A0A0A;
  }
`

const EmptyState = styled.div`
  text-align: center;
  padding: 60px;
  background: #141414;
  border: 1px solid #2A2A2A;

  h3 {
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 16px;
    color: #FFFFFF;
  }

  p {
    color: #B0B0B0;
    margin-bottom: 30px;
  }
`

const Dashboard = () => {
  const { currentUser, userData, getPurchasedCourses } = useAuth()
  const [purchasedCourses, setPurchasedCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPurchasedCourses = async () => {
      try {
        setLoading(true)
        if (currentUser) {
          const courses = await getPurchasedCourses()
          setPurchasedCourses(Array.isArray(courses) ? courses : [])
        }
      } catch (error) {
        console.error('Ошибка загрузки курсов:', error)
        setPurchasedCourses([])
      } finally {
        setLoading(false)
      }
    }
    fetchPurchasedCourses()
  }, [currentUser, getPurchasedCourses])

  if (loading) {
    return (
      <Container>
        <div style={{ textAlign: 'center', padding: '60px', color: '#B0B0B0' }}>
          Загрузка ваших курсов...
        </div>
      </Container>
    )
  }

  return (
    <Container>
      <DashboardHeader>
        <WelcomeText>
          Добро пожаловать, {userData?.displayName || currentUser?.email?.split('@')[0]}!
        </WelcomeText>
        <p style={{ color: '#B0B0B0', fontSize: '16px' }}>Ваши приобретенные курсы</p>
      </DashboardHeader>

      <SectionTitle>Мои курсы</SectionTitle>

      {purchasedCourses && purchasedCourses.length > 0 ? (
        <CoursesGrid>
          {purchasedCourses.map(course => (
            <CourseCard key={course.id}>
              <CourseContent>
                <CourseTitle>{course.title}</CourseTitle>
                <CourseDescription>{course.description}</CourseDescription>
                <ProgressBar>
                  <ProgressFill progress={course.progress || 0} />
                </ProgressBar>
                <ProgressText>Прогресс: {course.progress || 0}%</ProgressText>
                <ActionButton to={`/course/${course.id}`}>
                  {course.progress > 0 ? 'Продолжить обучение →' : 'Начать обучение →'}
                </ActionButton>
              </CourseContent>
            </CourseCard>
          ))}
        </CoursesGrid>
      ) : (
        <EmptyState>
          <h3>У вас пока нет купленных курсов</h3>
          <p>Начните свой путь к новым знаниям прямо сейчас!</p>
          <ActionButton to="/courses">Выбрать курс</ActionButton>
        </EmptyState>
      )}
    </Container>
  )
}

export default Dashboard