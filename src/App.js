import React, { useState, Suspense, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { theme } from './styles/theme'
import { GlobalStyles } from './styles/GlobalStyles'
import styled from 'styled-components'

import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import AdminRoute from './components/AdminRoute'
import Preloader from './components/layout/Preloader'
import Header from './components/layout/Header'

const Home = React.lazy(() => import('./pages/Home'))
const Courses = React.lazy(() => import('./pages/Courses'))
const CourseDetail = React.lazy(() => import('./pages/CourseDetail'))
const Login = React.lazy(() => import('./pages/Login'))
const Register = React.lazy(() => import('./pages/Register'))
const Dashboard = React.lazy(() => import('./pages/Dashboard'))
const AdminPanel = React.lazy(() => import('./pages/AdminPanel'))

const MainContent = styled.main`
  min-height: 100vh;
`

const ScrollToTop = () => {
  const { pathname } = useLocation()
  useEffect(() => window.scrollTo(0, 0), [pathname])
  return null
}

function App() {
  const [isLoaded, setIsLoaded] = useState(false)

  if (!isLoaded) {
    return <Preloader onLoaded={() => setIsLoaded(true)} />
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AuthProvider>
        <Router>
          <Header />
          <MainContent>
            <ScrollToTop />
            <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/courses' element={<Courses />} />
                <Route path='/course/:id' element={<CourseDetail />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path='/admin' element={<AdminRoute><AdminPanel /></AdminRoute>} />
              </Routes>
            </Suspense>
          </MainContent>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App