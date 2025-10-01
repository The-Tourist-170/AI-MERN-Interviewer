import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import NewInterview from './NewInterview';
import CandidateDetail from './CandidateDetail';
import Logo from './components/Logo';
import WelcomeBackModal from './components/WelcomeBackModal';
import { resetInterview } from './redux/interviewSlice';
import { useTabSync } from './hooks/useTabSync';
import Home from './pages/Home';
import IntervieweeChat from './IntervieweeChat';

function AppContent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useTabSync(); 

  const interviewStatus = useSelector((state) => state.interview.status);
  const sessionId = useSelector((state) => state.interview.sessionId);
  const [showResumeModal, setShowResumeModal] = useState(false);

  useEffect(() => {
    if (interviewStatus === 'IN_PROGRESS') {
      setShowResumeModal(true);
    }
  }, []); 

  const handleResume = () => {
    setShowResumeModal(false);
    navigate(`/interview/active/${sessionId}`);
  };

  const handleStartNew = () => {
    setShowResumeModal(false);
    dispatch(resetInterview());
    localStorage.removeItem('interviewState');
    navigate('/interview/new');
  };

  return (
    <>
      <WelcomeBackModal
        isOpen={showResumeModal}
        onResume={handleResume}
        onStartNew={handleStartNew}
      />
      <header className="py-4 px-8 bg-purple-950/40 w-full">
        <Logo />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/interview/new" element={<NewInterview />} />
          <Route path="/interview/active" element={<IntervieweeChat />} />
          <Route path="/candidate/:candidateId" element={<CandidateDetail />} />
        </Routes>
      </main>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;