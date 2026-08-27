import React, { useEffect, useState } from 'react';
import type { RiskCategory, SviData } from '../types';
import { ShieldAlert } from 'lucide-react';

interface SVIVisualizationProps {
    sviData: SviData;
}

const SVIVisualization: React.FC<SVIVisualizationProps> = ({ sviData }) => {
    const [offset, setOffset] = useState(364.4); // 2 * Math.PI * 58 circumference
    const radius = 58;
    const circumference = 2 * Math.PI * radius;

    useEffect(() => {
        // SVG math animation trigger
        const progressOffset = circumference - (sviData.score / 100) * circumference;
        setOffset(progressOffset);
    }, [sviData.score, circumference]);

    const getRiskTokenClasses = (cat: RiskCategory) => {
        switch (cat) {
            case 'CRITICAL': return 'bg-[var(--color-severe-critical-bg)] text-[var(--color-severe-critical)] border-[var(--color-severe-critical)]';
            case 'HIGH': return 'bg-[var(--color-severe-high-bg)] text-[var(--color-severe-high)] border-[var(--color-severe-high)]';
            case 'MODERATE': return 'bg-[var(--color-severe-moderate-bg)] text-[var(--color-severe-moderate)] border-[var(--color-severe-moderate)]';
            case 'LOW': return 'bg-[var(--color-severe-low-bg)] text-[var(--color-severe-low)] border-[var(--color-severe-low)]';
        }
    };

    const safetyOverrideBadge = sviData.safety_overrides.length > 0;

    return (
        <div className="bg-[var(--color-surface-card)] border border-[var(--color-surface-border)] rounded-[20px] p-6 lg:p-8 shadow-sm flex flex-col justify-between h-full select-none text-[var(--color-text-main)] w-full font-sans transition-colors">

            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="font-sans text-[11px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest leading-none mb-1">
                        Stress Vulnerability Index
                    </h3>
                    <p className="text-xs text-[var(--color-text-light)]">Live algorithmic measurement</p>
                </div>

                {safetyOverrideBadge && (
                    <span className="text-[9px] font-mono font-bold text-[var(--color-severe-critical)] bg-red-50 border border-red-200 px-2 py-1 rounded shadow-sm animate-pulse">
                        SAFEGUARD OVERRIDE ENGAGED
                    </span>
                )}
            </div>

            <div className="flex flex-col md:flex-row items-center gap-10 lg:gap-14 mt-4">

                {/* SVG Circular Gauge Core Configuration based on NHAA Specs */}
                <div className="relative flex items-center justify-center shrink-0">
                    <svg className="w-48 h-48 transform -rotate-90">
                        {/* Track ring */}
                        <circle
                            cx="96" cy="96" r={radius}
                            stroke="var(--color-surface-base)"
                            strokeWidth="14"
                            fill="transparent"
                        />
                        {/* Progress ring */}
                        <circle
                            cx="96" cy="96" r={radius}
                            stroke={sviData.risk_color}
                            strokeWidth="14"
                            fill="transparent"
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            strokeDashoffset={offset}
                            className="transition-all duration-[1.5s] ease-out shadow-lg"
                        />
                    </svg>

                    {/* Centered Scoring Block */}
                    <div className="absolute flex flex-col items-center justify-center text-center inset-0">
                        <span className="font-display font-semibold text-5xl text-[var(--color-text-main)] tracking-tighter">
                            {sviData.score}
                        </span>
                        <div className={`mt-1 px-3 py-1 text-[9px] uppercase font-bold tracking-widest rounded-md border ${getRiskTokenClasses(sviData.risk_category)}`}>
                            {sviData.risk_category}
                        </div>
                    </div>
                </div>

                {/* Sub-Scores Matrix Side Panel */}
                <div className="w-full space-y-4">
                    <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-3">Model Vectors</h4>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-medium text-zinc-700">Linguistic Threat</span>
                                <span className="text-xs font-mono font-bold">{sviData.sub_scores.linguistic_threat}</span>
                            </div>
                            <div className="w-full bg-[var(--color-surface-base)] h-1.5 rounded-full overflow-hidden">
                                <div className="h-full bg-zinc-400" style={{ width: `${sviData.sub_scores.linguistic_threat}%` }}></div>
                            </div>
                        </div>

                        <div className="space-y-3 mt-3">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-medium text-zinc-700">Vocal Distress (Prosody)</span>
                                <span className="text-xs font-mono font-bold">{sviData.sub_scores.vocal_distress}</span>
                            </div>
                            <div className="w-full bg-[var(--color-surface-base)] h-1.5 rounded-full overflow-hidden">
                                <div className="h-full bg-zinc-400" style={{ width: `${sviData.sub_scores.vocal_distress}%` }}></div>
                            </div>
                        </div>

                        <div className="space-y-3 mt-3">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-medium text-zinc-700">Acoustic Panic Patterns</span>
                                <span className="text-xs font-mono font-bold">{sviData.sub_scores.acoustic_panic}</span>
                            </div>
                            <div className="w-full bg-[var(--color-surface-base)] h-1.5 rounded-full overflow-hidden">
                                <div className="h-full bg-zinc-400" style={{ width: `${sviData.sub_scores.acoustic_panic}%` }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Warning statutory / policy banner */}
            <div className="border-t border-[var(--color-surface-border)] pt-5 mt-6 relative z-10 w-full">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-zinc-50 border border-zinc-200 shadow-inner">
                    <div className="text-[var(--color-text-main)] shrink-0">
                        <ShieldAlert size={18} strokeWidth={2} />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-none">
                            System Evaluation Brief
                        </p>
                        <p className="text-xs text-zinc-700 mt-2 font-medium leading-relaxed">
                            NHAA Triage assessment complete. System identifies score {sviData.score} mapping to {sviData.risk_category} risk quadrant. Refer to sub-factors for tactical planning.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SVIVisualization;
