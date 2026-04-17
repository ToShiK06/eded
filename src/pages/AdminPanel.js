
import React, { useState, useEffect, useCallback } from 'react'
import styled, { keyframes } from 'styled-components'
import { useAuth } from '../context/AuthContext'
import {
	getCourseTitleById,
	allCoursesList,
	validateCourseData,
} from '../utils/courseUtils'

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`

const AdminContainer = styled.div`
  max-width: 1400px;
  margin: 100px auto 60px;
  padding: 0 24px;
  background: #F5F0E8;
`

const AdminHeader = styled.div`
  text-align: left;
  margin-bottom: 40px;
  padding-bottom: 24px;
  border-bottom: 1px solid #D5CDC0;
`

const AdminTitle = styled.h1`
  font-size: 32px;
  font-weight: 500;
  color: #1A1A1A;
  margin-bottom: 8px;
  letter-spacing: -0.02em;
`

const StatsCard = styled.div`
  background: #FFFFFF;
  border: 1px solid #D5CDC0;
  padding: 32px;
  margin-bottom: 30px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
`

const StatItem = styled.div`
  text-align: left;

  .stat-number {
    font-size: 36px;
    font-weight: 500;
    color: #2A2A2A;
    margin-bottom: 8px;
    letter-spacing: -0.02em;
  }

  .stat-label {
    color: #4A4A4A;
    font-size: 13px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`

const DebugSection = styled.div`
  background: #FFFFFF;
  border: 1px solid #D5CDC0;
  padding: 20px;
  margin-bottom: 30px;
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: 13px;
  color: #4A4A4A;
  white-space: pre-wrap;
  max-height: 300px;
  overflow-y: auto;
  line-height: 1.5;
`

const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 30px;
  flex-wrap: wrap;
`

const ActionButton = styled.button`
  padding: 10px 24px;
  background: ${props =>
		props.$variant === 'danger'
			? '#FFFFFF'
			: '#FFFFFF'};
  border: 1px solid
		${props =>
			props.$variant === 'danger'
				? '#ef4444'
				: '#D5CDC0'};
  color: ${props => (props.$variant === 'danger' ? '#ef4444' : '#2A2A2A')};
  font-weight: 500;
  font-size: 13px;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props =>
			props.$variant === 'danger'
				? 'rgba(239, 68, 68, 0.05)'
				: '#EDE5DB'};
    border-color: ${props =>
			props.$variant === 'danger'
				? '#ef4444'
				: '#2A2A2A'};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const SearchSection = styled.div`
  background: #FFFFFF;
  border: 1px solid #D5CDC0;
  padding: 24px;
  margin-bottom: 30px;
`

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  background: #F5F0E8;
  border: 1px solid #D5CDC0;
  color: #1A1A1A;
  font-size: 14px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #2A2A2A;
  }

  &::placeholder {
    color: #808080;
  }
`

const ResultsCount = styled.div`
  margin-bottom: 20px;
  color: #4A4A4A;
  font-size: 13px;
  letter-spacing: 0.5px;
`

const UserCard = styled.div`
  background: #FFFFFF;
  border: 1px solid #D5CDC0;
  padding: 24px;
  margin-bottom: 20px;
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.3s ease-out;

  &:hover {
    border-color: #2A2A2A;
  }
`

const UserEmail = styled.h3`
  font-size: 18px;
  font-weight: 500;
  color: #1A1A1A;
  margin: 0 0 8px 0;
`

const UserMeta = styled.div`
  color: #4A4A4A;
  font-size: 13px;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #D5CDC0;
`

const CourseList = styled.div`
  margin-top: 16px;
`

const CourseListTitle = styled.h4`
  color: #2A2A2A;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
`

const CourseItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #F5F0E8;
  margin-bottom: 8px;
  border: 1px solid #D5CDC0;
  transition: all 0.3s ease;

  &:hover {
    border-color: #2A2A2A;
  }
`

const CourseInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`

const CourseTitle = styled.span`
  color: #1A1A1A;
  font-weight: 500;
  font-size: 14px;
`

const CourseId = styled.span`
  color: #808080;
  font-size: 12px;
  font-family: monospace;
`

const DeleteButton = styled.button`
  padding: 8px 20px;
  background: transparent;
  border: 1px solid #ef4444;
  color: #ef4444;
  font-weight: 500;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  min-width: 90px;

  &:hover {
    background: rgba(239, 68, 68, 0.05);
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`

const NoCoursesMessage = styled.div`
  color: #808080;
  text-align: center;
  padding: 20px;
  font-style: italic;
  font-size: 13px;
  border: 1px dashed #D5CDC0;
  margin-top: 12px;
`

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 40px;
  background: #FFFFFF;
  border: 1px solid #D5CDC0;

  h3 {
    color: #1A1A1A;
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 12px;
  }

  p {
    color: #4A4A4A;
    font-size: 14px;
    margin-bottom: 24px;
  }
`

const LoadingSpinner = styled.div`
  text-align: center;
  padding: 60px;

  .spinner {
    width: 40px;
    height: 40px;
    border: 2px solid #D5CDC0;
    border-top-color: #2A2A2A;
    border-radius: 50%;
    margin: 0 auto;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  p {
    margin-top: 16px;
    color: #4A4A4A;
    font-size: 14px;
  }
`

const ErrorMessage = styled.div`
  background: rgba(239, 68, 68, 0.05);
  border: 1px solid rgba(239, 68, 68, 0.3);
  padding: 16px;
  margin-bottom: 24px;
  color: #ef4444;
  font-size: 14px;
`

const AdminPanel = () => {
	const { currentUser, getAllUsers, deleteUserCourse } = useAuth()
	const [users, setUsers] = useState([])
	const [filteredUsers, setFilteredUsers] = useState([])
	const [searchEmail, setSearchEmail] = useState('')
	const [loading, setLoading] = useState(false)
	const [deletingCourse, setDeletingCourse] = useState(null)
	const [error, setError] = useState('')
	const [debugInfo, setDebugInfo] = useState(
		'Нажмите "Загрузить пользователей" для начала'
	)
	const [stats, setStats] = useState({
		totalUsers: 0,
		totalCourses: 0,
		activeUsers: 0,
	})

	const enrichCourses = useCallback(courses => {
		if (!courses || !Array.isArray(courses)) {
			return []
		}

		return courses
			.map(course => {
				if (!course) {
					return null
				}

				const courseId = course.id ? String(course.id) : 'unknown'
				const courseIdNum = parseInt(courseId)
				const localCourse = allCoursesList.find(c => c.id === courseIdNum)

				return {
					...course,
					id: courseId,
					title: localCourse?.title || course.title || `Курс ${courseId}`,
					description: localCourse?.description || course.description || 'Нет описания',
					category: localCourse?.category || course.category || 'Без категории',
					formattedId: courseId,
					isValid: validateCourseData({ id: courseId, title: localCourse?.title || course.title }),
					duration: localCourse?.duration || 'Не указано',
					price: course.price || localCourse?.price || 0,
					originalPrice: localCourse?.originalPrice || course.price || 0,
					students: localCourse?.students || 0,
					progress: course.progress || 0,
					purchaseDate: course.purchaseDate || new Date().toISOString(),
				}
			})
			.filter(course => course !== null)
	}, [])

	const loadUsers = useCallback(async () => {
		try {
			setLoading(true)
			setError('')
			setDebugInfo('Загрузка пользователей...')

			const usersData = await getAllUsers()

			const enrichedUsers = usersData.map(user => ({
				...user,
				purchasedCourses: enrichCourses(user.purchasedCourses),
				totalCourses: enrichCourses(user.purchasedCourses).length,
			}))

			setUsers(enrichedUsers)
			setFilteredUsers(enrichedUsers)

			const totalCourses = enrichedUsers.reduce((sum, user) => sum + user.totalCourses, 0)
			const activeUsers = enrichedUsers.filter(user => user.totalCourses > 0).length

			setStats({
				totalUsers: enrichedUsers.length,
				totalCourses,
				activeUsers,
			})

			setDebugInfo(
				`Успешно загружено ${enrichedUsers.length} пользователей\n` +
				`Всего пользователей: ${enrichedUsers.length}\n` +
				`Всего курсов: ${totalCourses}\n` +
				`Активных пользователей: ${activeUsers}`
			)
		} catch (error) {
			console.error('Ошибка загрузки пользователей:', error)
			setError(`Ошибка загрузки: ${error?.message || 'Неизвестная ошибка'}`)
			setDebugInfo(`Ошибка загрузки: ${error?.message || 'Неизвестная ошибка'}`)
		} finally {
			setLoading(false)
		}
	}, [getAllUsers, enrichCourses])

	useEffect(() => {
		loadUsers()
	}, [loadUsers])

	const handleDeleteCourse = async (userId, courseId, courseTitle) => {
		if (!userId || !courseId) {
			setError('Ошибка: не указан userId или courseId')
			return
		}

		if (!window.confirm(`Удалить курс "${courseTitle}" у пользователя?`)) {
			return
		}

		try {
			setDeletingCourse(`${userId}-${courseId}`)
			await deleteUserCourse(userId, courseId)
			await loadUsers()
		} catch (error) {
			console.error('Ошибка удаления курса:', error)
			setError(`Ошибка удаления курса: ${error?.message || 'Неизвестная ошибка'}`)
		} finally {
			setDeletingCourse(null)
		}
	}

	const handleClearDebug = () => {
		setDebugInfo('Отладочная информация очищена.\nНажмите "Загрузить пользователей" для обновления.')
		setError('')
	}

	const handleTestCourseData = () => {
		const testInfo =
			`Тест данных курсов:\n` +
			`Локальный список содержит ${allCoursesList.length} курсов.\n\n` +
			`Первые 5 курсов:\n` +
			allCoursesList.slice(0, 5).map(course => `  • ID: ${course.id}, Название: "${course.title}"`).join('\n')

		setDebugInfo(testInfo)
	}

	useEffect(() => {
		if (searchEmail.trim() === '') {
			setFilteredUsers(users)
		} else {
			setFilteredUsers(users.filter(user => user.email.toLowerCase().includes(searchEmail.toLowerCase())))
		}
	}, [searchEmail, users])

	if (loading && users.length === 0) {
		return (
			<AdminContainer>
				<LoadingSpinner>
					<div className="spinner" />
					<p>Загрузка данных...</p>
				</LoadingSpinner>
			</AdminContainer>
		)
	}

	return (
		<AdminContainer>
			<AdminHeader>
				<AdminTitle>Админ панель</AdminTitle>
				<p style={{ color: '#4A4A4A', fontSize: '14px' }}>
					{currentUser?.email || 'Не авторизован'}
				</p>
			</AdminHeader>

			<StatsCard>
				<StatItem>
					<div className="stat-number">{stats.totalUsers}</div>
					<div className="stat-label">Пользователей</div>
				</StatItem>
				<StatItem>
					<div className="stat-number">{stats.totalCourses}</div>
					<div className="stat-label">Куплено курсов</div>
				</StatItem>
				<StatItem>
					<div className="stat-number">{stats.activeUsers}</div>
					<div className="stat-label">Активных</div>
				</StatItem>
			</StatsCard>

			<DebugSection>
				<strong style={{ color: '#2A2A2A' }}>Отладка:</strong>
				<div style={{ marginTop: '8px' }}>{debugInfo}</div>
			</DebugSection>

			{error && <ErrorMessage>{error}</ErrorMessage>}

			<ActionButtons>
				<ActionButton onClick={loadUsers} disabled={loading}>
					{loading ? 'Загрузка...' : 'Загрузить пользователей'}
				</ActionButton>
				<ActionButton onClick={handleTestCourseData}>Тест курсов</ActionButton>
				<ActionButton onClick={handleClearDebug} $variant="danger">
					Очистить отладку
				</ActionButton>
			</ActionButtons>

			<SearchSection>
				<SearchInput
					type="email"
					placeholder="Поиск по email..."
					value={searchEmail}
					onChange={e => setSearchEmail(e.target.value)}
					disabled={loading}
				/>
			</SearchSection>

			<ResultsCount>
				Найдено: {filteredUsers.length} пользователей
				{loading && ' (обновление...)'}
			</ResultsCount>

			{filteredUsers.length === 0 ? (
				<EmptyState>
					<h3>Пользователи не найдены</h3>
					<p>Создайте пользователей через регистрацию на сайте</p>
					<ActionButton onClick={() => (window.location.href = '/register')}>
						Перейти к регистрации
					</ActionButton>
				</EmptyState>
			) : (
				filteredUsers.map(user => (
					<UserCard key={user.id}>
						<UserEmail>{user.email}</UserEmail>
						<UserMeta>
							Имя: {user.displayName || 'Не указано'} | Курсов: {user.totalCourses || 0} |
							Зарегистрирован: {user.createdAt ? new Date(user.createdAt).toLocaleDateString('ru-RU') : 'нет даты'}
						</UserMeta>

						{user.totalCourses > 0 ? (
							<CourseList>
								<CourseListTitle>Купленные курсы ({user.totalCourses})</CourseListTitle>
								{user.purchasedCourses.map((course, index) => (
									<CourseItem key={`${course.id}-${index}`}>
										<CourseInfo>
											<CourseTitle>
												{course.title || `Курс #${course.id}`}
												{!course.isValid && (
													<span style={{ color: '#ef4444', marginLeft: '8px', fontSize: '11px' }}>
														(невалидный)
													</span>
												)}
											</CourseTitle>
											<CourseId>
												ID: {course.id} | {course.category} | {course.duration} |
												{course.purchaseDate ? new Date(course.purchaseDate).toLocaleDateString('ru-RU') : 'нет даты'} |
												{course.price?.toLocaleString('ru-RU') || '0'} ₽ | Прогресс: {course.progress || 0}%
											</CourseId>
										</CourseInfo>
										<DeleteButton
											onClick={() => handleDeleteCourse(user.id, course.id, course.title || `Курс ${course.id}`)}
											disabled={deletingCourse === `${user.id}-${course.id}`}
										>
											{deletingCourse === `${user.id}-${course.id}` ? 'Удаление...' : 'Удалить'}
										</DeleteButton>
									</CourseItem>
								))}
							</CourseList>
						) : (
							<NoCoursesMessage>У пользователя нет купленных курсов</NoCoursesMessage>
						)}
					</UserCard>
				))
			)}
		</AdminContainer>
	)
}

export default AdminPanel