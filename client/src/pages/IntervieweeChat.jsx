import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { submitAnswerAPI } from '../api/apiService';
import { submitAnswer, nextQuestionReceived, interviewFailed, resetInterview } from '../redux/interviewSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Loader2, Home } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import Timer from '../components/Timer';

const DIFFICULTY_TIMES = {
  EASY: 40,
  MEDIUM: 80,
  HARD: 180,
  DEFAULT: 60,
};

const IntervieweeChat = () => {
  const { sessionId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentAnswer, setCurrentAnswer] = useState('');
  const currentAnswerRef = useRef(currentAnswer);
  const isLoadingRef = useRef(false);

  const { questions, answers, difficulty, status, isLoading, error } = useSelector((state) => state.interview);
  const chatEndRef = useRef(null);

  const currentQuestion = questions.length > answers.length ? questions[questions.length - 1] : null;

  const timerDuration = useMemo(() => {
    const diff = difficulty?.toUpperCase() || 'DEFAULT';
    return DIFFICULTY_TIMES[diff] || DIFFICULTY_TIMES.DEFAULT;
  }, [currentQuestion]);

  useEffect(() => {
    currentAnswerRef.current = currentAnswer;
  }, [currentAnswer]);

  useEffect(() => {
    isLoadingRef.current = isLoading;
  }, [isLoading]);

  useEffect(() => {
    if (!sessionId || status === 'IDLE') {
      navigate('/interview/new');
    }
  }, [sessionId, status, navigate]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [questions, answers]);

  const handleAnswerSubmit = useCallback(async (e, { isAutoSubmit = false } = {}) => {
    if (e) e.preventDefault();

    let answerToSubmit = currentAnswerRef.current.trim();
    const displayAnswer = answerToSubmit || ''; // Keep what to show in UI

    const isLastQuestion = questions.length === answers.length + 1;

    if ((!isAutoSubmit && !answerToSubmit) || isLoadingRef.current || (status === 'COMPLETED' && !isLastQuestion) ) {
      return;
    }

    // If the answer is empty, send a placeholder to the API, but keep the display answer empty.
    const apiAnswer = answerToSubmit || "(No answer provided)";

    // Dispatch the answer that should be displayed in the chat.
    // If empty, it will show an empty user message bubble before moving on.
    dispatch(submitAnswer({ answer: displayAnswer }));
    setCurrentAnswer('');

    try {
      const data = await submitAnswerAPI(sessionId, apiAnswer);
      dispatch(nextQuestionReceived(data));
    } catch (err) {
      dispatch(interviewFailed(err.message));
      toast.error(err.message);
    }
  }, [dispatch, sessionId, status]);

  const handleTimeUp = useCallback(() => {
    handleAnswerSubmit(null, { isAutoSubmit: true });
  }, [handleAnswerSubmit, questions.length, answers.length]);

  const handleGoToDashboard = () => {
    dispatch(resetInterview());
    window.location.href = '/';
  };

  const messages = questions.flatMap((q, i) =>
    answers[i] ? [{ type: 'bot', text: q }, { type: 'user', text: answers[i] }] : [{ type: 'bot', text: q }]
  );

  return (
    <div>
      <Toaster position="top-center" toastOptions={{
        style: { background: '#1a1a1a', color: '#fff' }
      }} />
      <div className='fixed w-full'>
        <div className="m-8 max-w-[calc(100vw-40%)] mx-auto h-[calc(100vh-9rem)] flex flex-col">
          <div className="flex-1 bg-purple-600/20 flex flex-col p-4 overflow-hidden rounded-xl shadow-2xl shadow-fuchsia-950/50 ">
            <div className="flex-1 overflow-y-auto pr-2 space-y-6">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  className={`flex items-start gap-3 ${msg.type === 'user' ? 'justify-end' : ''}`}
                >
                  {msg.type === 'bot' && <div className="flex-shrink-0 w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                    <Bot className="text-secondary" />
                  </div>}
                  <div className={`max-w-md p-2 rounded-2xl ${msg.type === 'bot' ? 'bg-gold/30 rounded-tl-none' : 'bg-primary rounded-tr-none text-white'}`}>
                    <p>{msg.text}</p>
                  </div>
                  {msg.type === 'user' && <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-500/50 flex items-center justify-center">
                    <User className='text-slate-900' />
                  </div>}
                </motion.div>
              ))}
              <div ref={chatEndRef} />
            </div>
            <AnimatePresence>
              {status === 'COMPLETED' ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mt-4"
                >
                  <button
                    onClick={handleGoToDashboard}
                    className="flex items-center justify-center gap-2 mx-auto px-6 py-3 bg-secondary hover:bg-secondary/80 text-dark font-bold rounded-xl shadow-lg shadow-secondary/20 transition-all duration-300"
                  >
                    <Home /> Home
                  </button>
                </motion.div>
              ) : (
                <div className="mt-4 pt-4">
                  <form onSubmit={handleAnswerSubmit} className="flex items-center gap-3">
                    <input
                      type="text"
                      value={currentAnswer}
                      onChange={(e) => setCurrentAnswer(e.target.value)}
                      placeholder="Type your answer..."
                      disabled={isLoading}
                      className="flex-1 bg-slate-950/40 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-primary focus:outline-none disabled:opacity-50"
                    />
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      type="submit"
                      disabled={isLoading || !currentAnswer.trim()}
                      className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white disabled:bg-primary/50"
                    >
                      {isLoading ? <Loader2 className="animate-spin" /> : <Send />}
                    </motion.button>
                  </form>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <div className='w-[20vw] fixed my-[15%] right-0 p-2'>
        {currentQuestion && status !== 'COMPLETED' && (
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col items-center gap-4">
              <Timer key={currentQuestion.questionId} duration={timerDuration} onTimeUp={handleTimeUp} difficulty={difficulty} />
              <span className="text-sm font-semibold text-secondary bg-primary/20 px-3 py-1 rounded-full">{difficulty}</span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default IntervieweeChat;