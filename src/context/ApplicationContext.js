import React, { createContext, useContext, useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs, updateDoc, doc, where } from 'firebase/firestore';
import { useAuth } from './AuthContext';

const ApplicationContext = createContext();

export const useApplications = () => useContext(ApplicationContext);

export const ApplicationProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [refresh, setRefresh] = useState(0);

  const coursesList = [
    'Основы алгоритмизации и программирования',
    'Основы веб-дизайна',
    'Основы проектирования баз данных',
    'JavaScript для начинающих',
    'React.js разработка',
    'Python с нуля до профессионала',
    'Java Core',
    'SQL и работа с базами данных',
    'UI/UX дизайн интерфейсов',
    'Мобильная разработка на Flutter',
    'Веб-разработка на Node.js',
    'Кибербезопасность для начинающих',
    'Машинное обучение и ИИ',
    'Тестирование ПО (QA)',
    'DevOps для начинающих'
  ];

  const getUserEmail = () => {
    if (currentUser?.email && currentUser.email !== 'admin@admin.da') return currentUser.email;
    const saved = localStorage.getItem('current_user');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.email && parsed.email !== 'admin@admin.da') return parsed.email;
    }
    return null;
  };

  const createApplication = async (data) => {
    const userEmail = getUserEmail();
    if (!userEmail) return { success: false, error: 'Ошибка' };

    try {
      await addDoc(collection(db, 'applications'), {
        userId: currentUser?.uid || 'unknown',
        userEmail: userEmail,
        userLogin: currentUser?.login || currentUser?.email?.split('@')[0] || 'user',
        userName: currentUser?.fullName || 'Пользователь',
        courseName: data.courseName,
        startDate: data.startDate,
        paymentMethod: data.paymentMethod,
        status: 'Новая',
        hasReview: false,
        review: '',
        rating: 0,
        reviewDate: null,
        createdAt: new Date().toISOString()
      });
      setRefresh(prev => prev + 1);
      return { success: true };
    } catch (e) {
      console.error(e);
      return { success: false };
    }
  };

  const getUserApplications = async () => {
    const userEmail = getUserEmail();
    if (!userEmail) return [];
    
    try {
      const snapshot = await getDocs(collection(db, 'applications'));
      const allApps = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const userApps = allApps.filter(app => app.userEmail === userEmail);
      return userApps.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } catch (e) {
      console.error(e);
      return [];
    }
  };

  const getAllApplications = async () => {
    if (!currentUser || currentUser.role !== 'admin') return [];
    try {
      const snapshot = await getDocs(collection(db, 'applications'));
      const apps = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return apps.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } catch (e) {
      return [];
    }
  };

  const updateApplicationStatus = async (id, newStatus) => {
    try {
      await updateDoc(doc(db, 'applications', id), { status: newStatus });
      setRefresh(prev => prev + 1);
      return { success: true };
    } catch (e) {
      return { success: false };
    }
  };

  const addReview = async (id, text, rating) => {
    try {
      await updateDoc(doc(db, 'applications', id), {
        review: text,
        rating: rating,
        hasReview: true,
        reviewDate: new Date().toISOString()
      });
      setRefresh(prev => prev + 1);
      return { success: true };
    } catch (e) {
      return { success: false };
    }
  };

  const getAllReviews = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'applications'));
      const allApps = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const reviews = allApps.filter(app => app.hasReview === true);
      return reviews.sort((a, b) => new Date(b.reviewDate) - new Date(a.reviewDate));
    } catch (e) {
      console.error(e);
      return [];
    }
  };

  const deleteReview = async (applicationId) => {
    if (!currentUser || currentUser.role !== 'admin') {
      return { success: false, error: 'Только админ может удалять отзывы' };
    }
    
    try {
      await updateDoc(doc(db, 'applications', applicationId), {
        review: '',
        rating: 0,
        hasReview: false,
        reviewDate: null
      });
      setRefresh(prev => prev + 1);
      return { success: true };
    } catch (e) {
      console.error(e);
      return { success: false };
    }
  };

  return (
    <ApplicationContext.Provider value={{
      coursesList,
      createApplication,
      getUserApplications,
      getAllApplications,
      updateApplicationStatus,
      addReview,
      getAllReviews,
      deleteReview
    }}>
      {children}
    </ApplicationContext.Provider>
  );
};