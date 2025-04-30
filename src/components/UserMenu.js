import React, { useState, useEffect } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import '../styles/UserMenu.css';
import userIcon from '../assets/usericon.webp';

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [progress, setProgress] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const auth = getAuth();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setIsLoading(false);
      if (!user) {
        setProgress([]);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    const fetchUserProgress = async () => {
      if (currentUser) {
        try {
          const q = query(collection(db, 'userProgress'), where('email', '==', currentUser.email));
          const querySnapshot = await getDocs(q);
          const userProgress = querySnapshot.docs.map(doc => doc.data());
          setProgress(userProgress);
        } catch (error) {
          console.error('Error fetching progress:', error);
        }
      }
    };

    fetchUserProgress();
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setProgress([]);
      setIsOpen(false);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (isLoading || !currentUser) {
    return null;
  }

  return (
    <div className="user-menu">
      <button className="user-icon" onClick={() => setIsOpen(!isOpen)}>
        <img src={userIcon} alt="User" className="user-icon-image" />
      </button>
      
      {isOpen && (
        <div className="user-dropdown">
          <div className="user-info">
            <p className="user-name">{currentUser?.displayName || 'User'}</p>
            <p className="user-email">{currentUser?.email}</p>
          </div>
          <div className="user-progress">
            <h4>Your Progress</h4>
            {progress.map((entry, index) => (
              <div key={index}>
                <p>Quiz: {entry.quizName}</p>
                <p>Score: {entry.score}</p>
              </div>
            ))}
          </div>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;