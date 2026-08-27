import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    Activity,
    AlertTriangle,
    Clock,
    Languages,
    ArrowRight,
    TrendingUp,
    Headphones,
    CheckCircle2,
    Lock,
    ChevronRight,
    Plus
} from 'lucide-react';
import type { CaseAssessment, RiskCategory } from '../types';
import { analysisService } from '../services/analysisService';

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const [cases, setCases] = useState<CaseAssessment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Load cases from services
        const data = analysisService.getCases();
        setCases(data);
        setLoading(false);
    }, []);

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good morning';
        if (hour < 17) return 'Good afternoon';
        return 'Good evening';
    };

    const getRiskBadgeStyles = (risk: RiskCategory) => {
        switch (risk) {
            case 'CRITICAL':
                return 'bg-red-50 text-red-700 border-red-100 font-semibold';
            case 'HIGH':
                return 'bg-orange-50 text-orange-700 border-orange-100 font-semibold';
            case 'MODERATE':
                return 'bg-amber-50 text-amber-700 border-amber-100 font-medium';
            case 'LOW':
                return 'bg-emerald-50 text-emerald-700 border-emerald-100 font-medium';
        }
    };

    // Pipeline count summary calculations
    const totalAnalyses = 18; // Preset metrics
    const highRiskCount = cases.filter(c => c.risk === 'HIGH').length + 3; // Mocking slightly larger cumulative pool
    const criticalCount = cases.filter(c => c.risk === 'CRITICAL').length + 1;
    const processingCount = cases.filter(c => c.status !== 'COMPLETE').length;

    return (
        <div className="space-y-8 animate-fade-in">

            {/* Welcome Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-6">
                <div>
                    <h2 className="font-display font-bold text-3xl text-slate-800 tracking-tight">
                        {getGreeting()}, Operator.
                    </h2>
                    <p className="text-slate-500 text-sm mt-1.5 font-light">
                        AI-assisted real-time stress and vulnerability assessment portal.
                    </p>
                </div>

                <Link
                    to="/analysis"
                    className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-medium px-5 py-2.5 rounded-xl text-sm transition-all shadow-md shadow-teal-600/10 focus:ring-2 focus:ring-teal-500 hover:scale-[1.01] cursor-pointer"
                >
                    <Plus size={16} className="stroke-[2.5]" />
                    <span>New Voice Analysis</span>
                </Link>
            </div>

            {/* Assessment Pipeline Overview */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm shadow-slate-100/30">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="font-display font-bold text-base text-slate-800">
                            Assessment Pipeline Overview
                        </h3>
                        <p className="text-xs text-slate-400 font-light mt-0.5">
                            Live status tracker of incoming interaction feeds
                        </p>
                    </div>
                    <span className="text-[10px] font-mono bg-indigo-50 border border-indigo-100 text-indigo-700 px-2.5 py-1 rounded-full font-medium">
                        LIVE DISPATCH TRIGGER
                    </span>
                </div>

                {/* Pipeline Flow Container */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-2 relative">

                    {/* Step 1: Received */}
                    <div className="flex flex-col items-center md:items-start p-4 bg-slate-50 rounded-xl border border-slate-100 relative overflow-hidden group">
                        <div className="absolute right-3 top-3 w-8 h-8 rounded-full bg-white flex items-center justify-center border border-slate-100 text-teal-600">
                            <CheckCircle2 size={15} />
                        </div>
                        <span className="text-[10px] font-mono text-slate-400 font-medium">STAGE 01</span>
                        <span className="font-display font-semibold text-slate-700 mt-2 text-sm">RECEIVED</span>
                        <p className="text-xs text-slate-400 mt-1 font-light text-center md:text-left">
                            Call connection stable. Audio feed hooked into parser.
                        </p>
                    </div>

                    {/* Connect 1-2 */}
                    <div className="hidden md:flex items-center justify-center text-slate-300 absolute left-[23.5%] top-[40%] z-10">
                        <ArrowRight size={16} />
                    </div>

                    {/* Step 2: Transcribing */}
                    <div className="flex flex-col items-center md:items-start p-4 bg-slate-50 rounded-xl border border-slate-100 relative overflow-hidden group">
                        <div className="absolute right-3 top-3 w-8 h-8 rounded-full bg-white flex items-center justify-center border border-slate-100 text-teal-600">
                            <CheckCircle2 size={15} />
                        </div>
                        <span className="text-[10px] font-mono text-slate-400 font-medium">STAGE 02</span>
                        <span className="font-display font-semibold text-slate-700 mt-2 text-sm">TRANSCRIBING</span>
                        <p className="text-xs text-slate-400 mt-1 font-light text-center md:text-left">
                            Translating speech dialects into text parameters.
                        </p>
                    </div>

                    {/* Connect 2-3 */}
                    <div className="hidden md:flex items-center justify-center text-slate-300 absolute left-[48.5%] top-[40%] z-10">
                        <ArrowRight size={16} className="animate-pulse text-teal-400" />
                    </div>

                    {/* Step 3: Analysing */}
                    <div className="flex flex-col items-center md:items-start p-4 bg-teal-50/20 rounded-xl border border-teal-100 relative overflow-hidden group">
                        <div className="absolute right-3 top-3 w-8 h-8 rounded-full bg-white flex items-center justify-center border border-teal-100 text-teal-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-ping"></span>
                        </div>
                        <span className="text-[10px] font-mono text-teal-600 font-semibold">STAGE 03</span>
                        <span className="font-display font-semibold text-slate-800 mt-2 text-sm">ANALYSING</span>
                        <p className="text-xs text-slate-500 mt-1 font-light text-center md:text-left">
                            Evaluating speech pause structures & emotions.
                        </p>
                    </div>

                    {/* Connect 3-4 */}
                    <div className="hidden md:flex items-center justify-center text-slate-300 absolute left-[73.5%] top-[40%] z-10">
                        <ArrowRight size={16} />
                    </div>

                    {/* Step 4: Assessment Ready */}
                    <div className="flex flex-col items-center md:items-start p-4 bg-slate-50 rounded-xl border border-slate-100 relative overflow-hidden group">
                        <div className="absolute right-3 top-3 w-8 h-8 rounded-full bg-white flex items-center justify-center border border-slate-100 text-slate-400">
                            <Clock size={14} />
                        </div>
                        <span className="text-[10px] font-mono text-slate-400 font-medium">STAGE 04</span>
                        <span className="font-display font-semibold text-slate-700 mt-2 text-sm">ASSESSMENT READY</span>
                        <p className="text-xs text-slate-400 mt-1 font-light text-center md:text-left">
                            Triage analytics generated. Pending operator sign-off.
                        </p>
                    </div>

                </div>
            </div>

            {/* Metrics Summary cards - limited to four highly relevant */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

                {/* Card 1: Total Analyses */}
                <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm shadow-slate-100/30 flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                        <Activity size={20} />
                    </div>
                    <div>
                        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Total Analyses</p>
                        <h4 className="font-display font-bold text-2xl text-slate-800 mt-0.5">{totalAnalyses}</h4>
                    </div>
                </div>

                {/* Card 2: High Risk */}
                <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm shadow-slate-100/30 flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                        <AlertTriangle size={20} />
                    </div>
                    <div>
                        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">High Risk</p>
                        <h4 className="font-display font-bold text-2xl text-slate-800 mt-0.5">{highRiskCount}</h4>
                    </div>
                </div>

                {/* Card 3: Critical */}
                <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm shadow-slate-100/30 flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-red-600 shrink-0">
                        <TrendingUp size={20} />
                    </div>
                    <div>
                        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Critical Risk</p>
                        <h4 className="font-display font-bold text-2xl text-slate-800 mt-0.5">{criticalCount}</h4>
                    </div>
                </div>

                {/* Card 4: Active Processing */}
                <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm shadow-slate-100/30 flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 shrink-0">
                        <Headphones size={20} className="animate-pulse" />
                    </div>
                    <div>
                        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Processing</p>
                        <h4 className="font-display font-bold text-2xl text-slate-800 mt-0.5">{processingCount}</h4>
                    </div>
                </div>

            </div>

            {/* RECENT ANALYSES Ledger Section */}
            <div className="bg-white border border-slate-100 rounded-2xl shadow-sm shadow-slate-100/30 overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h3 className="font-display font-bold text-base text-slate-800">
                            Recent Case Assessments
                        </h3>
                        <p className="text-xs text-slate-400 mt-0.5 font-light">
                            Triage ledger listing analysed tele-interactions. Click a case to review details.
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <span className="text-xs text-slate-400 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                            <Clock size={12} strokeWidth={2} />
                            Recent 24 Hours
                        </span>
                    </div>
                </div>

                {loading ? (
                    <div className="p-16 text-center">
                        <span className="w-8 h-8 border-4 border-slate-100 border-t-teal-600 rounded-full animate-spin inline-block"></span>
                        <p className="text-xs text-slate-400 mt-3 font-light">Loading analysis history ledger...</p>
                    </div>
                ) : cases.length === 0 ? (
                    <div className="p-16 text-center max-w-sm mx-auto">
                        <Activity className="mx-auto text-slate-300 stroke-[1.5]" size={42} />
                        <h3 className="text-sm font-semibold text-slate-700 mt-4">No cases logged</h3>
                        <p className="text-xs text-slate-400 mt-1 font-light">
                            Create an assessment by selecting an audio recording from the Voice Analysis module.
                        </p>
                        <Link
                            to="/analysis"
                            className="inline-block mt-4 text-xs font-semibold text-teal-600 hover:text-teal-700"
                        >
                            Go to Voice Analysis &rarr;
                        </Link>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm border-collapse">
                            <thead>
                                <tr className="bg-slate-50/55 border-b border-slate-100 text-slate-400 font-semibold text-[11px] uppercase tracking-wider">
                                    <th className="py-4 px-6 font-semibold">Case ID</th>
                                    <th className="py-4 px-3 font-semibold">Logged Time</th>
                                    <th className="py-4 px-3 font-semibold">Dialect</th>
                                    <th className="py-4 px-3 font-semibold">Length</th>
                                    <th className="py-4 px-3 font-semibold text-center">SVI Score</th>
                                    <th className="py-4 px-4 font-semibold text-center">Risk Level</th>
                                    <th className="py-4 px-4 font-semibold text-center">Operator Review</th>
                                    <th className="py-4 px-6 text-right font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100/70">
                                {cases.map((item) => (
                                    <tr
                                        key={item.id}
                                        onClick={() => navigate(`/analysis/${item.id}`)}
                                        className="hover:bg-slate-50/70 transition-colors cursor-pointer group"
                                    >
                                        {/* Case ID */}
                                        <td className="py-4 px-6">
                                            <span className="font-display font-semibold text-slate-800 group-hover:text-teal-700 transition-colors">
                                                {item.id}
                                            </span>
                                        </td>

                                        {/* Time */}
                                        <td className="py-4 px-3 text-slate-500 font-light whitespace-nowrap">
                                            {item.time}
                                        </td>

                                        {/* Language */}
                                        <td className="py-4 px-3 text-slate-600 whitespace-nowrap">
                                            <div className="flex items-center gap-1.5">
                                                <Languages size={13} className="text-slate-400" />
                                                <span>{item.language}</span>
                                            </div>
                                        </td>

                                        {/* Duration */}
                                        <td className="py-4 px-3 text-slate-500 font-mono text-xs">
                                            {item.duration}
                                        </td>

                                        {/* SVI */}
                                        <td className="py-4 px-3 text-center">
                                            <div className="inline-flex items-center gap-1">
                                                <span className="font-mono font-bold text-slate-800">{item.status === 'COMPLETE' ? item.svi : '-'}</span>
                                                <span className="text-[10px] text-slate-400">/100</span>
                                            </div>
                                        </td>

                                        {/* Risk Badge */}
                                        <td className="py-4 px-4 text-center">
                                            {item.status === 'COMPLETE' ? (
                                                <span className={`inline-block px-3 py-1 text-xs rounded-full border ${getRiskBadgeStyles(item.risk)}`}>
                                                    {item.risk}
                                                </span>
                                            ) : (
                                                <span className="inline-block px-3 py-1 text-xs rounded-full bg-slate-100 text-slate-400 border border-slate-100 animate-pulse font-normal">
                                                    Evaluating
                                                </span>
                                            )}
                                        </td>

                                        {/* Operator Review status */}
                                        <td className="py-4 px-4 text-center">
                                            {item.operatorReview?.isReviewed ? (
                                                <div className="inline-flex items-center gap-1 text-emerald-600 text-xs font-medium bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                                                    <span>Reviewed</span>
                                                </div>
                                            ) : item.status === 'COMPLETE' ? (
                                                <span className="text-[11px] text-slate-400 font-light flex items-center justify-center gap-1">
                                                    <Lock size={11} />
                                                    Pending Review
                                                </span>
                                            ) : (
                                                <span className="text-[11px] text-slate-400 font-light">In Queue</span>
                                            )}
                                        </td>

                                        {/* Actions */}
                                        <td className="py-3 px-6 text-right">
                                            <button
                                                aria-label={`Open details for case ${item.id}`}
                                                className="p-1 px-3 bg-slate-50 group-hover:bg-teal-50 group-hover:text-teal-700 text-slate-500 rounded-lg text-xs font-semibold inline-flex items-center gap-1 transition-all"
                                            >
                                                <span>Review</span>
                                                <ChevronRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

        </div>
    );
};

export default Dashboard;
