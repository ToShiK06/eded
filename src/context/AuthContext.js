import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const signup = async (email, password, additionalData) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        login: additionalData.login,
        fullName: additionalData.fullName,
        phone: additionalData.phone,
        role: 'user',
        createdAt: new Date().toISOString()
      });
      
      console.log('✅ Регистрация успешна! UID:', user.uid);
      return { success: true };
    } catch (error) {
      console.error('Ошибка:', error);
      return { success: false, error: error.message };
    }
  };

  
  const login = async (loginOrEmail, password) => {
    try {
      
      if (loginOrEmail === 'admin@admin.da' && password === 'Admin123') {
        const adminUser = {
          uid: 'admin',
          email: 'admin@admin.da',
          login: 'admin',
          fullName: 'Администратор',
          role: 'admin'
        };
        setCurrentUser(adminUser);
        setUserData(adminUser);
        localStorage.setItem('current_user', JSON.stringify(adminUser));
        console.log('✅ Вход админа');
        return { success: true };
      }

      
      let email = loginOrEmail;
      if (!email.includes('@')) {
        email = `${loginOrEmail}@temp.com`;
      }
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const userDataFromDb = userDoc.exists() ? userDoc.data() : {};
      
      const fullUser = {
        uid: user.uid,
        email: user.email,
        ...userDataFromDb,
        role: 'user'
      };
      
      console.log('✅ Вход пользователя! UID:', user.uid);
      console.log('Полные данные:', fullUser);
      
      setCurrentUser(fullUser);
      setUserData(fullUser);
      localStorage.setItem('current_user', JSON.stringify(fullUser));
      return { success: true };
    } catch (error) {
      console.error('Ошибка входа:', error);
      return { success: false };
    }
  };

  
  const logout = async () => {
    try {
      if (currentUser?.uid !== 'admin') {
        await signOut(auth);
      }
      setCurrentUser(null);
      setUserData(null);
      localStorage.removeItem('current_user');
      console.log('✅ Выход');
      return { success: true };
    } catch (error) {
      return { success: false };
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const fullUser = {
          uid: user.uid,
          email: user.email,
          ...(userDoc.exists() ? userDoc.data() : {}),
          role: 'user'
        };
        setCurrentUser(fullUser);
        setUserData(fullUser);
        localStorage.setItem('current_user', JSON.stringify(fullUser));
      } else {
        const saved = localStorage.getItem('current_user');
        if (saved && JSON.parse(saved).role === 'admin') {
          const admin = JSON.parse(saved);
          setCurrentUser(admin);
          setUserData(admin);
        } else {
          setCurrentUser(null);
          setUserData(null);
        }
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = { currentUser, userData, loading, signup, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};