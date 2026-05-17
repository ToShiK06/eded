import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth, db } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

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
      
      await updateProfile(user, {
        displayName: `${additionalData.firstName} ${additionalData.lastName}`
      });
      
      const userDoc = {
        uid: user.uid,
        email: user.email,
        displayName: `${additionalData.firstName} ${additionalData.lastName}`,
        firstName: additionalData.firstName,
        lastName: additionalData.lastName,
        purchasedCourses: [],
        createdAt: new Date().toISOString()
      };
      
      await setDoc(doc(db, 'users', user.uid), userDoc);
      return { success: true };
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, error: error.message };
    }
  };

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        setUserData(userDoc.data());
      }
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUserData(null);
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      return { success: false, error: error.message };
    }
  };

  const purchaseCourse = async (courseId, courseData) => {
    if (!currentUser) return { success: false, message: 'Необходимо войти' };
    
    try {
      const userRef = doc(db, 'users', currentUser.uid);
      const courseToAdd = {
        id: courseId,
        title: courseData.title,
        description: courseData.description,
        price: courseData.price,
        category: courseData.category,
        progress: 0,
        purchaseDate: new Date().toISOString()
      };
      
      await updateDoc(userRef, {
        purchasedCourses: arrayUnion(courseToAdd)
      });
      
      const updatedDoc = await getDoc(userRef);
      setUserData(updatedDoc.data());
      return { success: true };
    } catch (error) {
      console.error('Purchase error:', error);
      return { success: false, message: error.message };
    }
  };

  const getPurchasedCourses = async () => {
    if (!currentUser) return [];
    try {
      const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        return data.purchasedCourses || [];
      }
      return [];
    } catch (error) {
      console.error('Get courses error:', error);
      return [];
    }
  };

  const getAllUsers = async () => {
    try {
      const { getDocs, collection } = await import('firebase/firestore');
      const querySnapshot = await getDocs(collection(db, 'users'));
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Get users error:', error);
      return [];
    }
  };

  const deleteUserCourse = async (userId, courseId) => {
    try {
      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const updatedCourses = (userData.purchasedCourses || []).filter(c => c.id !== courseId);
        await updateDoc(userRef, { purchasedCourses: updatedCourses });
        return { success: true };
      }
      return { success: false };
    } catch (error) {
      console.error('Delete course error:', error);
      return { success: false };
    }
  };

  const updateUserProfile = async (data) => {
    if (!currentUser) return;
    try {
      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, data);
      setUserData(prev => ({ ...prev, ...data }));
      return { success: true };
    } catch (error) {
      console.error('Update profile error:', error);
      return { success: false };
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
      } else {
        setUserData(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userData,
    loading,
    signup,
    login,
    logout,
    purchaseCourse,
    getPurchasedCourses,
    getAllUsers,
    deleteUserCourse,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};