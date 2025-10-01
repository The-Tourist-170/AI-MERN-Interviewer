import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCandidateDetailAPI } from '../api/apiService';
import { fetchCandidatesStart, fetchCandidateDetailSuccess, fetchCandidatesFailure, clearSelectedCandidate } from '../redux/candidatesSlice';
import PageWrapper from '../components/PageWrapper';
import Spinner from '../components/Spinner';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ArrowLeft, MessageSquare, ClipboardList, Star, TrendingUp, Code, BrainCircuit } from 'lucide-react';
import StretchCard from "../components/StretchCard";
import UnfoldOnScroll from '../components/UnfoldOnScroll'; // Adjust the path if needed

const CandidateDetail = () => {
    const { candidateId } = useParams();
    const dispatch = useDispatch();
    const { selectedCandidate: candidate, isLoading, error } = useSelector((state) => state.candidates);
    console.log(candidate);

    useEffect(() => {
        dispatch(fetchCandidatesStart());
        const loadDetails = async () => {
            try {
                const data = await fetchCandidateDetailAPI(candidateId);
                dispatch(fetchCandidateDetailSuccess(data));
            } catch (err) {
                dispatch(fetchCandidatesFailure(err.message));
            }
        };
        loadDetails();

        return () => {
            dispatch(clearSelectedCandidate());
        }
    }, [candidateId, dispatch]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 0.9 }
    };

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen"><Spinner size="lg" /></div>;
    }

    if (error) {
        return <div className="text-center text-red-400 p-8">{error}</div>;
    }

    if (!candidate) return null;

    const experienceData = candidate.experienceBreakdown
        ? Object.entries(candidate.experienceBreakdown)
            .map(([name, value]) => ({
                name,
                value: Number(value) || 0
            }))
            .filter(item => item.value > 0)
        : [];

    const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE', '#00C49F'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <PageWrapper>
            <div className="max-w-5xl mx-auto">
                <Link to="/" className="p-2 flex items-center gap-2 text-primary glass mb-6 w-fit">
                    <ArrowLeft size={20} /> Back to Dashboard
                </Link>

                <motion.div variants={containerVariants} initial="hidden" animate="visible">
                    <motion.div variants={itemVariants} className="bg-primary/30 p-8 mb-8 rounded-2xl">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                            <div>
                                <h1 className="text-4xl font-extrabold text-white">{candidate.name}</h1>
                                <div className="flex items-center gap-4 mt-2 text-text-muted">
                                    <span>{candidate.email}</span>
                                    <span>&bull;</span>
                                    <span>{candidate.phone}</span>
                                </div>
                            </div>
                            <div className="text-center bg-purple-300/30 border-3 border-primary/40 p-4 rounded-xl">
                                <p className="text-sm font-bold text-white uppercase">Final Score</p>
                                <p className="text-5xl font-bold text-secondary">{candidate.score}</p>
                            </div>
                        </div>
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold text-secondary flex items-center gap-2"><Star size={20} /> AI Summary</h3>
                            <p className="mt-2 text-text-muted">{candidate.summary}</p>
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="bg-primary/30 rounded-xl p-8 mb-8">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-white"><ClipboardList className="text-primary" /> Resume Analysis</h2>

                        <div className="space-y-8">
                            <div className="grid md:grid-cols-2 gap-8">
                                <StretchCard>
                                    <div className='rounded-xl bg-slate-500/40 px-4 py-2'>
                                        <h3 className="font-semibold text-lg text-green-400 mb-3 flex items-center gap-2"><TrendingUp size={20} /> Strengths</h3>
                                        <ul className="space-y-2 list-disc list-inside text-white/80 ">
                                            {candidate.strengths?.map((item, index) => <li key={`strength-${index}`}>{item}</li>)}
                                        </ul>
                                    </div>
                                </StretchCard>

                                <StretchCard>
                                    <div className='rounded-xl bg-slate-500/40 px-4 py-2 h-full'>
                                        <h3 className="font-semibold text-lg text-red-400 mb-3 flex items-center gap-2"><TrendingUp size={20} className="rotate-180" /> Weaknesses</h3>
                                        <ul className="space-y-2 list-disc list-inside text-white/80">
                                            {candidate.weaknesses?.map((item, index) => <li key={`weakness-${index}`}>{item}</li>)}
                                        </ul>
                                    </div>
                                </StretchCard>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8">

                                <StretchCard>
                                    <div className='rounded-xl bg-slate-500/40 p-4'>
                                        <h3 className="font-semibold text-lg text-secondary mb-3 flex items-center gap-2"><Code size={20} /> Skill Ratings</h3>
                                        <div className="space-y-3">
                                            {candidate.skillRatings && Object.entries(candidate.skillRatings).map(([skill, rating]) => (
                                                <div key={skill}>
                                                    <div className="flex justify-between items-center mb-1">
                                                        <span className="text-text-muted">{skill}</span>
                                                        <span className="font-bold text-secondary">{rating}/10</span>
                                                    </div>
                                                    <div className="w-full bg-glass-border rounded-full h-2.5">
                                                        <div className="bg-primary h-2.5 rounded-full" style={{ width: `${rating * 10}%` }}></div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </StretchCard>

                                <StretchCard>
                                    <div className='rounded-xl bg-slate-500/40 p-4'>
                                        <h3 className="font-semibold text-lg text-secondary mb-3 flex items-center gap-2"><BrainCircuit size={20} /> Experience Breakdown</h3>
                                        <div style={{ width: '100%', height: 250 }}>
                                            <ResponsiveContainer>
                                                <PieChart>
                                                    <Pie
                                                        data={experienceData}
                                                        cx="50%"
                                                        cy="50%"
                                                        labelLine={false}
                                                        label={renderCustomizedLabel}
                                                        outerRadius={80}
                                                        fill="#8884d8"
                                                        dataKey="value"
                                                    >
                                                        {experienceData.map((entry, index) => (
                                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                        ))}
                                                    </Pie>
                                                    <Tooltip
                                                        contentStyle={{ background: 'rgba(26, 26, 26, 0.9)', borderColor: '#444', borderRadius: '0.5rem' }}
                                                    />
                                                    <Legend />
                                                </PieChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>
                                </StretchCard>
                            </div>
                        </div>
                    </motion.div>

                    <UnfoldOnScroll className="bg-primary/30 rounded-xl p-8">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
                            <MessageSquare className="text-primary" /> Interview Transcript
                        </h2>
                        <div className="space-y-6">
                            {candidate.questions?.map((turn, index) => (
                                <div key={index} className="space-y-2">
                                    <p className="font-bold text-secondary">Q: {turn.questionText}</p>
                                    <p className="text-white/80 pl-6 border-l-2 border-glass-border bg-white/20 w-fit px-4">A: {turn.candidateAnswer}</p>
                                </div>
                            ))}
                        </div>
                    </UnfoldOnScroll>
                </motion.div>
            </div>
        </PageWrapper>
    );
};

export default CandidateDetail;