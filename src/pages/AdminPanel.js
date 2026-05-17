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
  max-width: 1280px;
  margin: 100px auto 80px;
  padding: 0 24px;
  background: #FFFFFF;
`

const AdminHeader = styled.div`
  margin-bottom: 40px;
  padding-bottom: 24px;
  border-bottom: 1px solid #EEEEEE;
`

const AdminTitle = styled.h1`
  font-size: 32px;
  font-weight: 600;
  color: #111111;
  margin-bottom: 8px;
  letter-spacing: -0.02em;
`

const StatsCard = styled.div`
  background: #F8F8F8;
  padding: 32px;
  margin-bottom: 32px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
`

const StatItem = styled.div`
  text-align: left;

  .stat-number {
    font-size: 36px;
    font-weight: 600;
    color: #111111;
    margin-bottom: 8px;
    letter-spacing: -0.02em;
  }

  .stat-label {
    color: #666666;
    font-size: 12px;
    letter-spacing: 1px;
  }
`

const DebugSection = styled.div`
  background: #F8F8F8;
  padding: 20px;
  margin-bottom: 32px;
  font-family: 'SF Mono', monospace;
  font-size: 12px;
  color: #555555;
  white-space: pre-wrap;
  max-height: 300px;
  overflow-y: auto;
  line-height: 1.5;
`

const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 32px;
  flex-wrap: wrap;
`

const ActionButton = styled.button`
  padding: 10px 24px;
  background: transparent;
  border: 1px solid #EEEEEE;
  color: #111111;
  font-weight: 500;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #111111;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const SearchSection = styled.div`
  margin-bottom: 32px;
`

const SearchInput = styled.input`
  width: 100%;
  max-width: 320px;
  padding: 12px 0;
  background: transparent;
  border: none;
  border-bottom: 1px solid #EEEEEE;
  color: #111111;
  font-size: 14px;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-bottom-color: #111111;
  }

  &::placeholder {
    color: #CCCCCC;
  }
`

const ResultsCount = styled.div`
  margin-bottom: 24px;
  color: #888888;
  font-size: 13px;
`

const UserCard = styled.div`
  background: #FFFFFF;
  border: 1px solid #EEEEEE;
  padding: 28px;
  margin-bottom: 20px;
  transition: all 0.2s ease;
  animation: ${fadeIn} 0.3s ease-out;

  &:hover {
    border-color: #CCCCCC;
  }
`

const UserEmail = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #111111;
  margin: 0 0 8px 0;
`

const UserMeta = styled.div`
  color: #888888;
  font-size: 12px;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #EEEEEE;
`

const CourseList = styled.div`
  margin-top: 16px;
`

const CourseListTitle = styled.h4`
  color: #666666;
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 12px;
  letter-spacing: 1px;
`

const CourseItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #F0F0F0;
  transition: all 0.2s ease;

  &:last-child {
    border-bottom: none;
  }
`

const CourseInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`

const CourseTitle = styled.span`
  color: #111111;
  font-weight: 500;
  font-size: 14px;
`

const CourseId = styled.span`
  color: #AAAAAA;
  font-size: 11px;
  font-family: monospace;
`

const DeleteButton = styled.button`
  padding: 6px 16px;
  background: transparent;
  border: 1px solid #EEEEEE;
  color: #888888;
  font-weight: 500;
  font-size: 11px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #D32F2F;
    color: #D32F2F;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const NoCoursesMessage = styled.div`
  color: #AAAAAA;
  text-align: center;
  padding: 20px;
  font-style: italic;
  font-size: 13px;
`

const EmptyState = styled.div`
  text-align: center;
  padding: 80px 40px;
  background: #F8F8F8;
  border: 1px solid #EEEEEE;

  h3 {
    color: #111111;
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 12px;
  }

  p {
    color: #555555;
    font-size: 14px;
    margin-bottom: 24px;
  }
`

const LoadingSpinner = styled.div`
  text-align: center;
  padding: 60px;

  .spinner {
    width: 32px;
    height: 32px;
    border: 1px solid #EEEEEE;
    border-top-color: #111111;
    border-radius: 50%;
    margin: 0 auto;
    animation: spin 0.6s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  p {
    margin-top: 16px;
    color: #888888;
    font-size: 14px;
  }
`

const ErrorMessage = styled.div`
  background: #F8F8F8;
  padding: 16px;
  margin-bottom: 24px;
  color: #D32F2F;
  font-size: 13px;
`

const AdminPanel = () => {
  const { currentUser, getAllUsers, deleteUserCourse } = useAuth()
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [searchEmail, setSearchEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [deletingCourse, setDeletingCourse] = useState(null)
  const [error, setError] = useState('')
  const [debugInfo, setDebugInfo] = useState('Click "Load users" to begin')
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
        if (!course) return null

        const courseId = course.id ? String(course.id) : 'unknown'
        const courseIdNum = parseInt(courseId)
        const localCourse = allCoursesList.find(c => c.id === courseIdNum)

        return {
          ...course,
          id: courseId,
          title: localCourse?.title || course.title || `Course ${courseId}`,
          description: localCourse?.description || course.description || 'No description',
          category: localCourse?.category || course.category || 'Uncategorized',
          formattedId: courseId,
          isValid: validateCourseData({ id: courseId, title: localCourse?.title || course.title }),
          duration: localCourse?.duration || 'Not specified',
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
      setDebugInfo('Loading users...')

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
        `Loaded ${enrichedUsers.length} users\n` +
        `Total users: ${enrichedUsers.length}\n` +
        `Total courses: ${totalCourses}\n` +
        `Active users: ${activeUsers}`
      )
    } catch (error) {
      console.error('Error loading users:', error)
      setError(`Error: ${error?.message || 'Unknown error'}`)
      setDebugInfo(`Error: ${error?.message || 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }, [getAllUsers, enrichCourses])

  useEffect(() => {
    loadUsers()
  }, [loadUsers])

  const handleDeleteCourse = async (userId, courseId, courseTitle) => {
    if (!userId || !courseId) {
      setError('Error: userId or courseId missing')
      return
    }

    if (!window.confirm(`Delete course "${courseTitle}" from this user?`)) {
      return
    }

    try {
      setDeletingCourse(`${userId}-${courseId}`)
      await deleteUserCourse(userId, courseId)
      await loadUsers()
    } catch (error) {
      console.error('Error deleting course:', error)
      setError(`Error deleting course: ${error?.message || 'Unknown error'}`)
    } finally {
      setDeletingCourse(null)
    }
  }

  const handleClearDebug = () => {
    setDebugInfo('Debug info cleared.\nClick "Load users" to refresh.')
    setError('')
  }

  const handleTestCourseData = () => {
    const testInfo =
      `Course data test:\n` +
      `Local list contains ${allCoursesList.length} courses.\n\n` +
      `First 5 courses:\n` +
      allCoursesList.slice(0, 5).map(course => `  • ID: ${course.id}, Title: "${course.title}"`).join('\n')

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
          <p>Loading data...</p>
        </LoadingSpinner>
      </AdminContainer>
    )
  }

  return (
    <AdminContainer>
      <AdminHeader>
        <AdminTitle>Admin panel</AdminTitle>
        <p style={{ color: '#888888', fontSize: '14px' }}>
          {currentUser?.email || 'Not authenticated'}
        </p>
      </AdminHeader>

      <StatsCard>
        <StatItem>
          <div className="stat-number">{stats.totalUsers}</div>
          <div className="stat-label">USERS</div>
        </StatItem>
        <StatItem>
          <div className="stat-number">{stats.totalCourses}</div>
          <div className="stat-label">COURSES PURCHASED</div>
        </StatItem>
        <StatItem>
          <div className="stat-number">{stats.activeUsers}</div>
          <div className="stat-label">ACTIVE USERS</div>
        </StatItem>
      </StatsCard>

      <DebugSection>
        <strong style={{ color: '#111111' }}>Debug:</strong>
        <div style={{ marginTop: '8px' }}>{debugInfo}</div>
      </DebugSection>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <ActionButtons>
        <ActionButton onClick={loadUsers} disabled={loading}>
          {loading ? 'Loading...' : 'Load users'}
        </ActionButton>
        <ActionButton onClick={handleTestCourseData}>Test courses</ActionButton>
        <ActionButton onClick={handleClearDebug}>Clear debug</ActionButton>
      </ActionButtons>

      <SearchSection>
        <SearchInput
          type="email"
          placeholder="Search by email..."
          value={searchEmail}
          onChange={e => setSearchEmail(e.target.value)}
          disabled={loading}
        />
      </SearchSection>

      <ResultsCount>
        Found: {filteredUsers.length} users
        {loading && ' (updating...)'}
      </ResultsCount>

      {filteredUsers.length === 0 ? (
        <EmptyState>
          <h3>No users found</h3>
          <p>Create users through the registration page</p>
          <ActionButton onClick={() => (window.location.href = '/register')}>
            Go to registration
          </ActionButton>
        </EmptyState>
      ) : (
        filteredUsers.map(user => (
          <UserCard key={user.id}>
            <UserEmail>{user.email}</UserEmail>
            <UserMeta>
              Name: {user.displayName || 'Not set'} | Courses: {user.totalCourses || 0} |
              Registered: {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'no date'}
            </UserMeta>

            {user.totalCourses > 0 ? (
              <CourseList>
                <CourseListTitle>PURCHASED COURSES ({user.totalCourses})</CourseListTitle>
                {user.purchasedCourses.map((course, index) => (
                  <CourseItem key={`${course.id}-${index}`}>
                    <CourseInfo>
                      <CourseTitle>
                        {course.title || `Course #${course.id}`}
                        {!course.isValid && (
                          <span style={{ color: '#D32F2F', marginLeft: '8px', fontSize: '10px' }}>
                            (invalid)
                          </span>
                        )}
                      </CourseTitle>
                      <CourseId>
                        ID: {course.id} | {course.category} | {course.duration} |
                        {course.purchaseDate ? new Date(course.purchaseDate).toLocaleDateString() : 'no date'} |
                        {course.price?.toLocaleString() || '0'} RUB | Progress: {course.progress || 0}%
                      </CourseId>
                    </CourseInfo>
                    <DeleteButton
                      onClick={() => handleDeleteCourse(user.id, course.id, course.title || `Course ${course.id}`)}
                      disabled={deletingCourse === `${user.id}-${course.id}`}
                    >
                      {deletingCourse === `${user.id}-${course.id}` ? 'Removing...' : 'Remove'}
                    </DeleteButton>
                  </CourseItem>
                ))}
              </CourseList>
            ) : (
              <NoCoursesMessage>No purchased courses</NoCoursesMessage>
            )}
          </UserCard>
        ))
      )}
    </AdminContainer>
  )
}

export default AdminPanel