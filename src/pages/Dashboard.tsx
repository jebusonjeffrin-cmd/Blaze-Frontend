import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Activity,
    AlertTriangle,
    ArrowRight,
    TrendingUp,
    Headphones,
    Plus
} from 'lucide-react';
import type { NHAAPayload, RiskCategory } from '../types';
import { analysisService } from '../services/analysisService';

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const [cases, setCases] = useState<NHAAPayload[]>([]);

    useEffect(() => {
        const data = analysisService.getCases();
        setCases(data);
    }, []);

    const getRiskBadgeStyles = (risk: RiskCategory) => {
        switch (risk) {
            case 'CRITICAL':
                return 'bg-[var(--color-severe-critical-bg)] text-[var(--color-severe-critical)] border-[var(--color-severe-critical)] shadow-[0_0_15px_rgba(220,38,38,0.1)] ring-1 ring-inset ring-red-200';
            case 'HIGH':
                return 'bg-[var(--color-severe-high-bg)] text-[var(--color-severe-high)] border-orange-200 ring-1 ring-inset ring-orange-300';
            case 'MODERATE':
                return 'bg-[var(--color-severe-moderate-bg)] text-[var(--color-severe-moderate)] border-amber-200 ring-1 ring-inset ring-amber-300';
            case 'LOW':
                return 'bg-[var(--color-severe-low-bg)] text-[var(--color-severe-low)] border-green-200 ring-1 ring-inset ring-green-300';
        }
    };

    const totalAnalyses = 18;
    const highRiskCount = cases.filter(c => c.svi.risk_category === 'HIGH').length + 3;
    const criticalCount = cases.filter(c => c.svi.risk_category === 'CRITICAL').length + 1;
    const processingCount = 0; // Assuming all returned are complete for now

    return (
        <div className="space-y-8 animate-fade-in text-[var(--color-text-main)] font-sans">
            {/* Welcome Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[var(--color-surface-border)] pb-6">
                <div>
                    <h2 className="font-display font-medium text-3xl tracking-tight">
                        NHAA Triage Console
                    </h2>
                    <p className="text-[var(--color-text-muted)] text-sm mt-1.5 font-light">
                        Multimodal Assessment and Rapid Response Interface.
                    </p>
                </div>

                <div
                    onClick={() => navigate('/analysis')}
                    className="inline-flex items-center gap-2 bg-[var(--color-accent-violet)] text-white hover:bg-[var(--color-accent-violet-hover)] font-medium px-5 py-2.5 rounded-full text-sm transition-all shadow-lg shadow-[var(--color-accent-violet)]/20 focus:ring-2 focus:ring-[var(--color-accent-violet)] hover:scale-[1.02] cursor-pointer"
                >
                    <Plus size={16} className="stroke-[2.5]" />
                    <span>New Case Sequence</span>
                </div>
            </div>

            {/* Metrics Summary cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[var(--color-surface-card)] border text-[var(--color-text-main)] border-[var(--color-surface-border)] rounded-[32px] p-5 shadow-sm flex flex-col justify-between hover:border-[var(--color-surface-border)] transition-colors group">
                    <div className="flex justify-between items-start">
                        <div className="w-10 h-10 rounded-full bg-[var(--color-surface-border)] flex items-center justify-center text-zinc-600">
                            <Activity size={18} />
                        </div>
                    </div>
                    <div className="mt-6">
                        <h4 className="font-display font-medium text-4xl">{totalAnalyses}</h4>
                        <p className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mt-1">Total Intakes</p>
                    </div>
                </div>

                <div className="bg-[var(--color-surface-card)] border text-[var(--color-text-main)] border-[var(--color-surface-border)] rounded-[32px] p-5 shadow-sm flex flex-col justify-between hover:border-orange-300 transition-colors group">
                    <div className="flex justify-between items-start">
                        <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
                            <AlertTriangle size={18} />
                        </div>
                    </div>
                    <div className="mt-6">
                        <h4 className="font-display font-medium text-4xl text-[var(--color-severe-high)]">{highRiskCount}</h4>
                        <p className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mt-1">Priority Triage</p>
                    </div>
                </div>

                <div className="bg-[var(--color-surface-dark)] border-[var(--color-surface-darker)] text-white border rounded-[32px] p-5 shadow-[0_12px_24px_rgba(27,19,64,0.15)] flex flex-col justify-between transition-colors group relative overflow-hidden">
                    <div className="absolute -right-12 -top-12 w-32 h-32 bg-[var(--color-accent-violet)] rounded-full blur-3xl opacity-50"></div>
                    <div className="flex justify-between items-start relative z-10">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-white border border-white/20 bg-white/10 shadow-sm">
                            <TrendingUp size={18} />
                        </div>
                    </div>
                    <div className="mt-6 relative z-10">
                        <h4 className="font-display font-medium text-4xl">{criticalCount}</h4>
                        <p className="text-[10px] font-semibold text-indigo-200 uppercase tracking-wider mt-1">Emergency Alerts</p>
                    </div>
                </div>

                <div className="bg-[var(--color-surface-card)] border border-[var(--color-surface-border)] text-[var(--color-text-main)] rounded-[32px] p-5 shadow-sm flex flex-col justify-between group">
                    <div className="flex justify-between items-start">
                        <div className="w-10 h-10 rounded-full bg-white border border-[var(--color-surface-border)] flex items-center justify-center text-zinc-700 shadow-sm">
                            <Headphones size={18} />
                        </div>
                    </div>
                    <div className="mt-6">
                        <h4 className="font-display font-medium text-4xl text-[var(--color-text-light)]">{processingCount}</h4>
                        <p className="text-[10px] font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mt-1">Active Listeners</p>
                    </div>
                </div>
            </div>

            {/* RECENT ANALYSES Ledger Section */}
            <div className="bg-[var(--color-surface-card)] border border-[var(--color-surface-border)] rounded-[32px] shadow-sm overflow-hidden p-2">
                <div className="p-5 px-6 border-b border-[var(--color-surface-border)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h3 className="font-display font-medium text-lg text-[var(--color-text-main)]">
                            Case Assessment Ledger
                        </h3>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm border-collapse">
                        <thead>
                            <tr className="bg-[var(--color-surface-accent-bg)] border-b border-[var(--color-surface-border)] text-[var(--color-text-muted)] font-bold text-[10px] uppercase tracking-widest">
                                <th className="py-5 px-8">NHAA ID</th>
                                <th className="py-5 px-4 text-center">Dialect</th>
                                <th className="py-5 px-4 text-center">Top Classification</th>
                                <th className="py-5 px-4 text-center">SVI Score</th>
                                <th className="py-5 px-4 text-center">Triage Stage</th>
                                <th className="py-5 px-6 text-right">Route</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100">
                            {cases.map((item) => (
                                <tr
                                    key={item.case_id}
                                    onClick={() => navigate(`/analysis/${item.case_id}`)}
                                    className="hover:bg-[var(--color-surface-accent-bg)] transition-all cursor-pointer group"
                                >
                                    <td className="py-5 px-8">
                                        <div className="flex flex-col">
                                            <span className="font-display font-semibold text-[var(--color-text-main)] group-hover:text-blue-600 transition-colors">
                                                {item.case_id}
                                            </span>
                                            <span className="text-[10px] uppercase tracking-wider font-mono text-[var(--color-text-light)] mt-0.5">{item.filename}</span>
                                        </div>
                                    </td>

                                    <td className="py-5 px-4 text-center">
                                        <span className="text-[11px] font-semibold text-zinc-600 bg-white px-2.5 py-1 rounded-md border border-[var(--color-surface-border)] shadow-sm">
                                            {item.transcription.language}
                                        </span>
                                    </td>

                                    <td className="py-5 px-4 text-center">
                                        <span className="text-xs font-medium text-zinc-700">
                                            {item.classification.predicted_class.short_name}
                                        </span>
                                    </td>

                                    <td className="py-5 px-4 text-center">
                                        <div className="inline-flex items-end font-mono">
                                            <span className="text-lg font-bold text-[var(--color-text-main)]">{item.svi.score}</span>
                                        </div>
                                    </td>

                                    <td className="py-5 px-4 text-center">
                                        <span className={`inline-block px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-full ${getRiskBadgeStyles(item.svi.risk_category)}`}>
                                            {item.svi.risk_category.replace('_', ' ')}
                                        </span>
                                    </td>

                                    <td className="py-5 px-8 text-right">
                                        <button
                                            className="w-8 h-8 rounded-full bg-[var(--color-surface-border)] hover:bg-[var(--color-text-main)] text-zinc-600 hover:text-white inline-flex items-center justify-center transition-all group-hover:bg-[var(--color-text-main)] group-hover:text-white"
                                        >
                                            <ArrowRight size={14} className="-rotate-45" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
