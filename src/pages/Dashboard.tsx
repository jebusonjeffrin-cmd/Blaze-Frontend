import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Activity,
    AlertTriangle,
    ArrowRight,
    TrendingUp,
    Headphones
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
                return 'bg-[var(--color-severe-critical-bg)] text-white';
            case 'HIGH':
                return 'bg-[var(--color-severe-high-bg)] text-white';
            case 'MODERATE':
                return 'border border-[var(--color-surface-border)] text-[var(--color-text-main)]';
            case 'LOW':
                return 'bg-[var(--color-surface-dark)] text-white';
        }
    };

    const totalAnalyses = 18;
    const highRiskCount = cases.filter(c => c.svi.risk_category === 'HIGH').length + 3;
    const criticalCount = cases.filter(c => c.svi.risk_category === 'CRITICAL').length + 1;
    const processingCount = 0;

    return (
        <div className="space-y-12 animate-fade-in text-[var(--color-text-main)] font-sans">
            {/* Minimal Editorial Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[var(--color-surface-border)] pb-8 pt-4">
                <div>
                    <h2 className="font-sans font-black text-6xl tracking-tighter leading-none mb-4">
                        NHAA Console
                    </h2>
                    <p className="text-[var(--color-text-main)] text-xl font-medium tracking-tight">
                        Real-time multimodal intake and response processing network.
                    </p>
                </div>

                <div
                    onClick={() => navigate('/analysis')}
                    className="inline-flex items-center gap-3 bg-[var(--color-surface-dark)] text-white hover:bg-[var(--color-accent-violet)] px-8 py-4 text-sm font-bold uppercase tracking-widest transition-colors cursor-pointer group"
                >
                    <span>New Intake Sequence</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
            </div>

            {/* Brutalist Metrics Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 border-b border-[var(--color-surface-border)]">
                <div className="p-8 border-r border-[var(--color-surface-border)] hover:bg-[var(--color-surface-accent-bg)] transition-colors group">
                    <p className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-widest mb-6 border-b border-[var(--color-surface-border)]/20 pb-2">Total Intakes</p>
                    <div className="flex justify-between items-end">
                        <h4 className="font-sans font-black text-6xl tracking-tighter">{totalAnalyses}</h4>
                        <Activity size={24} className="text-[var(--color-text-muted)] mb-2" />
                    </div>
                </div>

                <div className="p-8 border-r border-[var(--color-surface-border)] hover:bg-[var(--color-surface-accent-bg)] transition-colors group">
                    <p className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-widest mb-6 border-b border-[var(--color-surface-border)]/20 pb-2">Priority Triage</p>
                    <div className="flex justify-between items-end">
                        <h4 className="font-sans font-black text-6xl tracking-tighter text-[var(--color-accent-violet)]">{highRiskCount}</h4>
                        <AlertTriangle size={24} className="text-[var(--color-text-muted)] mb-2" />
                    </div>
                </div>

                <div className="p-8 border-r border-[var(--color-surface-border)] bg-[var(--color-severe-critical-bg)] text-white group overflow-hidden relative">
                    <p className="text-xs font-bold uppercase tracking-widest mb-6 border-b border-white/20 pb-2 relative z-10">Emergency Alerts</p>
                    <div className="flex justify-between items-end relative z-10">
                        <h4 className="font-sans font-black text-6xl tracking-tighter">{criticalCount}</h4>
                        <TrendingUp size={24} className="mb-2" />
                    </div>
                    {/* Decorative geometry */}
                    <div className="absolute right-0 bottom-0 w-32 h-32 border-l border-t border-white/20 translate-x-1/2 translate-y-1/2 rounded-full"></div>
                </div>

                <div className="p-8 hover:bg-[var(--color-surface-accent-bg)] transition-colors group">
                    <p className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-widest mb-6 border-b border-[var(--color-surface-border)]/20 pb-2">Active Listeners</p>
                    <div className="flex justify-between items-end">
                        <h4 className="font-sans font-black text-6xl tracking-tighter text-[var(--color-text-muted)]">{processingCount}</h4>
                        <Headphones size={24} className="text-[var(--color-text-light)] mb-2" />
                    </div>
                </div>
            </div>

            {/* Flat Ledger Section */}
            <div className="pt-8">
                <div className="flex items-end justify-between border-b-2 border-[var(--color-surface-dark)] pb-4 mb-4">
                    <h3 className="font-sans font-black text-3xl tracking-tighter uppercase">
                        Ledger Index
                    </h3>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left font-sans">
                        <thead>
                            <tr className="text-[var(--color-text-main)] font-bold text-xs uppercase tracking-widest border-b border-[var(--color-surface-border)]">
                                <th className="py-4 pr-6 w-1/4">Identifier</th>
                                <th className="py-4 px-6 w-1/6">Origin</th>
                                <th className="py-4 px-6 w-1/4">Classification Matrix</th>
                                <th className="py-4 px-6 w-1/6">Severity Index</th>
                                <th className="py-4 pl-6 text-right w-1/6">Routing</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--color-surface-border)]">
                            {cases.map((item) => (
                                <tr
                                    key={item.case_id}
                                    onClick={() => navigate(`/analysis/${item.case_id}`)}
                                    className="hover:bg-[var(--color-surface-accent-bg)] transition-colors cursor-pointer group"
                                >
                                    <td className="py-6 pr-6">
                                        <div className="flex flex-col">
                                            <span className="font-black text-xl tracking-tight leading-none group-hover:text-[var(--color-accent-violet)] transition-colors">
                                                {item.case_id}
                                            </span>
                                            <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--color-text-muted)] mt-2">
                                                {item.filename}
                                            </span>
                                        </div>
                                    </td>

                                    <td className="py-6 px-6">
                                        <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-main)]">
                                            {item.transcription.language}
                                        </span>
                                    </td>

                                    <td className="py-6 px-6">
                                        <span className="text-sm font-bold tracking-tight text-[var(--color-text-main)]">
                                            {item.classification.predicted_class.short_name}
                                        </span>
                                    </td>

                                    <td className="py-6 px-6">
                                        <div className="flex items-center gap-3">
                                            <span className="text-2xl font-black tracking-tighter">
                                                {Math.round(item.svi.score)}
                                            </span>
                                            <span className={`px-2 py-1 text-[9px] font-black uppercase tracking-widest ${getRiskBadgeStyles(item.svi.risk_category)}`}>
                                                {item.svi.risk_category.replace('_', ' ')}
                                            </span>
                                        </div>
                                    </td>

                                    <td className="py-6 pl-6 text-right">
                                        <button
                                            className="w-10 h-10 border border-[var(--color-surface-border)] text-[var(--color-text-main)] hover:bg-[var(--color-surface-dark)] hover:text-white flex items-center justify-center transition-colors ml-auto rounded-full group-hover:bg-[var(--color-surface-dark)] group-hover:text-white"
                                        >
                                            <ArrowRight size={16} className="-rotate-45" />
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
