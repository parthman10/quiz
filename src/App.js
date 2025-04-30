import React, { useState, useEffect } from 'react';
import './App.css';
import './styles/mobile.css';
import QuizContainer from './components/QuizContainer';
import StartScreen from './components/StartScreen';
import Leaderboard from './components/Leaderboard';
import CreateQuiz from './components/CreateQuiz';
import MyQuizzes from './components/MyQuizzes';
import Auth from './components/Auth';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const [currentScreen, setCurrentScreen] = useState('auth');
  const [userScore, setUserScore] = useState(0);
  const [playerName, setPlayerName] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        setCurrentScreen('start');
      } else {
        setCurrentScreen('auth');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const navigateTo = (screen) => {
    if (!user && screen !== 'auth') {
      setCurrentScreen('auth');
      return;
    }
    
    setCurrentScreen(screen);
    if (screen === 'start') {
      setUserScore(0);
      setPlayerName('');
    }
  };

  if (loading) {
    return (
      <div className="App">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="App">
      {currentScreen === 'auth' && (
        <Auth onNavigate={navigateTo} />
      )}
      {currentScreen === 'start' && (
        <StartScreen 
          onNavigate={(screen, params) => setCurrentScreen(screen)} 
          onPlayerNameSubmit={(name) => setPlayerName(name)}
        />
      )}
      {currentScreen === 'quiz' && (
        <QuizContainer
          playerName={playerName}
          onComplete={(score) => {
            setUserScore(score);
            navigateTo('leaderboard');
          }}
          onNavigate={navigateTo}
        />
      )}
      {currentScreen === 'leaderboard' && (
        <Leaderboard 
          playerName={playerName} 
          score={userScore} 
          onNavigate={navigateTo}
        />
      )}
      {currentScreen === 'create' && (
        <CreateQuiz onNavigate={navigateTo} />
      )}
      {currentScreen === 'my-quizzes' && (
        <MyQuizzes onNavigate={navigateTo} />
      )}
    </div>
  );
}

export default App;
