import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    ArrowLeft,
    Clock,
    Languages,
    AlertTriangle,
    Shield
} from 'lucide-react';
import type { NHAAPayload } from '../types';
import { analysisService } from '../services/analysisService';

import AudioPlayer from '../components/AudioPlayer';
import TranscriptViewer from '../components/TranscriptViewer';
import SVIVisualization from '../components/SVIVisualization';

const AnalysisDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [item, setItem] = useState<NHAAPayload | null>(null);
    const [activeTime, setActiveTime] = useState(0);
    const [seekTime] = useState(-1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        const data = analysisService.getCaseById(id);
        if (data) setItem(data);
        setLoading(false);
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-[60vh] flex flex-col justify-center items-center gap-4">
                <span className="w-10 h-10 border-4 border-[var(--color-surface-border)] border-t-[var(--color-severe-low)] rounded-full animate-spin"></span>
                <p className="text-sm font-light text-[var(--color-text-muted)]">Loading NHAA architecture...</p>
            </div>
        );
    }

    if (!item) {
        return (
            <div className="min-h-[60vh] flex flex-col justify-center items-center gap-4 text-center max-w-md mx-auto">
                <AlertTriangle size={42} className="text-red-500 stroke-[1.5]" />
                <h3 className="text-lg font-bold text-[var(--color-text-main)] tracking-tight">Case Assessment Not Found</h3>
                <Link
                    to="/dashboard"
                    className="mt-4 text-xs font-semibold text-white bg-zinc-900 hover:bg-black px-4 py-2 rounded-lg"
                >
                    Return to Central Ledger
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-fade-in text-[var(--color-text-main)] font-sans">

            {/* Header */}
            <div className="border-b border-[var(--color-surface-border)] pb-5 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="space-y-1.5 flex-1">
                    <Link
                        to="/dashboard"
                        className="inline-flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] hover:text-black transition-colors font-semibold mb-1 uppercase tracking-widest"
                    >
                        <ArrowLeft size={13} />
                        Back to Triage Ledger
                    </Link>
                    <div className="flex flex-col sm:flex-row sm:items-end gap-4 mt-2">
                        <h2 className="font-display font-medium text-4xl tracking-tight leading-none">
                            {item.case_id}
                        </h2>
                        <span className="text-xs text-[var(--color-text-muted)] font-mono bg-[var(--color-surface-border)] border border-[var(--color-surface-border)] rounded-md px-2 py-1 leading-none shadow-sm h-fit pb-1.5">
                            {item.filename}
                        </span>
                    </div>

                    <div className="flex flex-wrap gap-4 text-xs font-mono text-[var(--color-text-muted)] mt-4">
                        <span className="flex items-center gap-1.5 font-bold uppercase tracking-widest">
                            <Clock size={12} />
                            271 SECONDS
                        </span>
                        <span className="flex items-center gap-1.5 font-bold uppercase tracking-widest">
                            <Languages size={12} />
                            {item.transcription.language}
                        </span>
                    </div>
                </div>

                <div className="max-w-md bg-transparent border border-[var(--color-surface-border)] p-5 hidden md:block">
                    <p className="text-[10px] font-bold text-[var(--color-text-light)] uppercase tracking-widest mb-1.5">Executive Brief</p>
                    <p className="text-xs text-zinc-700 leading-relaxed font-medium">
                        {item.admin_executive_brief}
                    </p>
                </div>
            </div>

            {/* Layout Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* LEFT 7/12: SVI, Recommendations, Detected Signs */}
                <div className="lg:col-span-7 space-y-6">
                    <SVIVisualization sviData={item.svi} />

                    {/* Statutory Recommendations */}
                    <div className="space-y-4">
                        <h3 className="font-display font-medium text-xl text-[var(--color-text-main)] mb-1">
                            Action Remits & Recommendations
                        </h3>
                        {item.recommendations.map((rec, idx) => (
                            <div key={idx} className="bg-transparent border border-[var(--color-surface-border)] border-l-4 border-l-[var(--color-surface-dark)] p-5 space-y-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--color-surface-border)] border border-[var(--color-surface-border)] text-lg shadow-sm">
                                            {rec.icon}
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest">
                                                {rec.service_domain.replace(/_/g, ' ')}
                                            </div>
                                            <h4 className="font-sans font-semibold text-[var(--color-text-main)] text-sm">{rec.title}</h4>
                                        </div>
                                    </div>
                                    <span className="text-[9px] font-bold text-white uppercase tracking-widest px-2.5 py-1 rounded shadow-sm flex items-center gap-1" style={{ backgroundColor: rec.badge_color }}>
                                        <Clock size={10} className="inline mr-1" />
                                        {rec.urgency}
                                    </span>
                                </div>
                                <p className="text-xs text-zinc-600 leading-relaxed font-medium">{rec.action}</p>

                                {/* Statutory Badge Wrapper */}
                                <div className="mt-2 inline-flex items-center gap-2 bg-zinc-800 text-white rounded-md px-3 py-1.5 shadow-sm">
                                    <Shield size={12} className="text-lime-400" />
                                    <span className="text-[10px] uppercase font-bold tracking-widest font-mono">
                                        {rec.statutory_reference}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Technical Extracted Signs */}
                    <div className="space-y-4 pt-4">
                        <h3 className="font-display font-medium text-lg text-[var(--color-text-main)] mb-1">
                            Algorithmic Substrates
                        </h3>
                        {item.detected_signs.map((sign, idx) => (
                            <div key={idx} className="p-4 bg-transparent border-t border-[var(--color-surface-border)] flex items-start gap-4">
                                <div className="text-[10px] font-bold text-zinc-700 bg-white border border-[var(--color-surface-border)] uppercase tracking-widest px-2 py-0.5 rounded shadow-sm shrink-0">
                                    {sign.type}
                                </div>
                                <div>
                                    <div className="text-[10px] font-bold text-[var(--color-text-light)] uppercase tracking-widest mb-1">{sign.source}</div>
                                    <p className="text-xs font-semibold text-[var(--color-text-main)]">{sign.sign}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT 5/12: Player & Transcript */}
                <div className="lg:col-span-5 space-y-6">
                    {/* Dummy waveform pattern, realistically you map this to item.svi.sub_scores/audio data */}
                    <AudioPlayer
                        waveform={[20, 40, 15, 60, 80, 95, 30, 20, 50, 45, 21, 11, 8, 40, 60, 10, 5, 85, 90, 30]}
                        durationSec={271}
                        onTimeUpdate={setActiveTime}
                        seekTime={seekTime}
                    />

                    <TranscriptViewer
                        transcription={item.transcription}
                        activeTime={activeTime}
                    />
                </div>

            </div>
        </div>
    );
};

export default AnalysisDetail;
