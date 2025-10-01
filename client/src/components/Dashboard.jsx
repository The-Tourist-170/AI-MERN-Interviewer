import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchCandidatesAPI } from '../api/apiService';
import { fetchCandidatesStart, fetchCandidatesSuccess, fetchCandidatesFailure } from '../redux/candidatesSlice';
import PageWrapper from './PageWrapper';
import Spinner from './Spinner';
import { motion } from 'framer-motion';
import { Users, PlusCircle, Star, BookDashed, LayoutDashboardIcon } from 'lucide-react';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list: candidates, isLoading, error } = useSelector((state) => state.candidates);

  useEffect(() => {
    const loadCandidates = async () => {
      dispatch(fetchCandidatesStart());
      try {
        const data = await fetchCandidatesAPI();
        dispatch(fetchCandidatesSuccess(data));
      } catch (err) {
        dispatch(fetchCandidatesFailure(err.message));
      }
    };
    loadCandidates();
  }, [dispatch]);

  const ScoreBadge = ({ score }) => {
    let bgColor = 'bg-red-500/20 text-red-400';
    if (score >= 7) bgColor = 'bg-green-500/20 text-green-400';
    else if (score >= 4) bgColor = 'bg-yellow-500/20 text-yellow-400';

    return (
      <span className={`px-3 py-1 text-sm font-semibold rounded-full ${bgColor}`}>
        {score} / 10
      </span>
    );
  };

  return (
    <PageWrapper>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-white flex items-center gap-3">
          <LayoutDashboardIcon className="w-10 h-10 text-primary" />
          Dashboard
        </h1>
      </div>

      <motion.div
        layout
        className="bg-purple-950 p-2 md:p-4 rounded-3xl"
      >
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Spinner size="lg" />
            </div>
          ) : error ? (
            <div className="text-center text-red-400 p-8">{error}</div>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-purple-800">
                <tr>
                  <th className="p-4 text-sm font-bold uppercase text-gold rounded-l-2xl">Candidate</th>
                  <th className="p-4 text-sm font-bold uppercase text-gold hidden md:table-cell">Summary</th>
                  <th className="p-4 text-sm font-bold uppercase text-gold text-right rounded-r-2xl">Score</th>
                </tr>
              </thead>
              <motion.tbody>
                {candidates.length > 0 ? candidates.map((candidate, index) => (
                  <motion.tr
                    key={candidate.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-glass-border/50 hover:bg-primary/40 cursor-pointer transition-colors"
                    onClick={() => navigate(`/candidate/${candidate.id}`)}
                  >
                    <td className="p-4 text-text-main font-bold">{candidate.name}</td>
                    <td className="p-4 text-text-muted font-bold max-w-lg truncate hidden md:table-cell">{candidate.summary}</td>
                    <td className="p-4 text-right">
                      <ScoreBadge score={candidate.score} />
                    </td>
                  </motion.tr>
                )) : (
                  <tr>
                    <td colSpan="3" className="text-center p-8 text-text-muted">No candidates found. Start a new interview!</td>
                  </tr>
                )}
              </motion.tbody>
            </table>
          )}
        </div>
      </motion.div>
    </PageWrapper>
  );
};

export default Dashboard;