import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
import { AuthProvider } from './context/AuthContext';
import { ApplicationProvider } from './context/ApplicationContext';
import Header from './components/layout/Header';
import Courses from './pages/Courses';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import ApplicationForm from './pages/ApplicationForm';
import MyApplications from './pages/MyApplications';
import AdminPanel from './pages/AdminPanel';
import Reviews from './pages/Reviews';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AuthProvider>
        <ApplicationProvider>
          <Router>
            <Header />
            <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
              <Routes>
                <Route path="/courses" element={<Courses />} />
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/new-application" element={<ApplicationForm />} />
                <Route path="/applications" element={<MyApplications />} />
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="/reviews" element={<Reviews />} />
              </Routes>
            </Suspense>
          </Router>
        </ApplicationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;