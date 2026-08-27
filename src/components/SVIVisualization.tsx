import React from 'react';
import type { RiskCategory } from '../types';
import { ShieldAlert, Info } from 'lucide-react';

interface SVIVisualizationProps {
    score: number; // 0-100
    risk: RiskCategory;
    confidence: number; // percentage
}

const SVIVisualization: React.FC<SVIVisualizationProps> = ({ score, risk, confidence }) => {
    const getRiskColor = (cat: RiskCategory) => {
        switch (cat) {
            case 'CRITICAL': return 'bg-red-500 text-red-50 hover:bg-red-600';
            case 'HIGH': return 'bg-orange-500 text-orange-50 hover:bg-orange-600';
            case 'MODERATE': return 'bg-amber-500 text-amber-50 hover:bg-amber-600';
            case 'LOW': return 'bg-emerald-600 text-emerald-50 hover:bg-emerald-700';
        }
    };

    const getRiskBorderColor = (cat: RiskCategory) => {
        switch (cat) {
            case 'CRITICAL': return 'border-red-200';
            case 'HIGH': return 'border-orange-200';
            case 'MODERATE': return 'border-amber-200';
            case 'LOW': return 'border-emerald-250';
        }
    };

    const getRiskDescription = (cat: RiskCategory) => {
        switch (cat) {
            case 'CRITICAL': return 'High critical vulnerability indicators detected. Human intervention recommended immediately.';
            case 'HIGH': return 'Significant trauma and distress indicators detected. Elevated priority triage suggested.';
            case 'MODERATE': return 'Moderate symptoms identified. Monitor case details and schedule call follow-up.';
            case 'LOW': return 'Conversational signals stable. Standard low-priority dispatch.';
        }
    };

    // Determine tick positioning percentage on the gauge axis
    const positionPercent = Math.min(Math.max(score, 0), 100);

    return (
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm shadow-slate-100/30 flex flex-col justify-between h-full select-none">
            <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-widest leading-none">
                        Stress Vulnerability Index
                    </h3>
                    <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                        <Info size={11} />
                        AI-Assisted Assessment
                    </span>
                </div>

                {/* Score & Risk Badge Display */}
                <div className="flex items-baseline justify-between gap-4 mt-2">
                    <div className="flex items-baseline">
                        <span className="font-display font-extrabold text-5xl sm:text-6xl text-slate-800 tracking-tighter">
                            {score}
                        </span>
                        <span className="text-slate-400 font-medium text-lg ml-1">/100</span>
                    </div>

                    <div className="flex flex-col items-end gap-1.5">
                        <span className={`px-4 py-1.5 text-xs font-bold rounded-lg border transition-colors shadow-xs ${getRiskColor(risk)} ${getRiskBorderColor(risk)}`}>
                            {risk}
                        </span>
                        <div className="flex items-center gap-1 text-[11px] font-mono text-slate-500">
                            <span>Conf:</span>
                            <span className="font-bold text-slate-700">{confidence}%</span>
                        </div>
                    </div>
                </div>

                {/* Gradient Risk Spectrum Gauge */}
                <div className="relative mt-8 mb-6">
                    {/* Progress bar line */}
                    <div className="h-2 w-full bg-slate-100 rounded-full flex overflow-hidden">
                        <div className="w-1/4 h-full bg-emerald-500/80"></div>
                        <div className="w-1/4 h-full bg-amber-400/80 border-l border-white/60"></div>
                        <div className="w-1/4 h-full bg-orange-400/80 border-l border-white/60"></div>
                        <div className="w-1/4 h-full bg-red-400/80 border-l border-white/60"></div>
                    </div>

                    {/* Indicator slider tick */}
                    <div
                        className="absolute -top-1.5 -translate-x-1/2 flex flex-col items-center transition-all duration-700 ease-out"
                        style={{ left: `${positionPercent}%` }}
                    >
                        <div className="w-5 h-5 rounded-full bg-white border-2 border-slate-800 shadow-md flex items-center justify-center">
                            <div className="w-2.5 h-2.5 rounded-full bg-slate-800 animate-ping opacity-25"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-800 absolute"></div>
                        </div>
                    </div>

                    {/* Scale Axis Indicators */}
                    <div className="flex justify-between mt-3 text-[10px] font-mono text-slate-400 font-medium">
                        <span>LOW (0)</span>
                        <span>MODERATE (25)</span>
                        <span>HIGH (50)</span>
                        <span>CRITICAL (75+)</span>
                    </div>
                </div>
            </div>

            {/* Description Panel & Warning Banner */}
            <div className="border-t border-slate-150 pt-5 mt-4 space-y-4">
                <div className="flex items-start gap-2.5">
                    <div className="p-1 px-1.5 bg-slate-50 text-slate-400 rounded-md shrink-0">
                        <ShieldAlert size={15} />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-slate-700 uppercase tracking-wider leading-none">
                            Level Outcome
                        </p>
                        <p className="text-xs text-slate-500 mt-1 font-light leading-relaxed">
                            {getRiskDescription(risk)}
                        </p>
                    </div>
                </div>

                {/* Small Safety Wording Banner */}
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-[11px] text-slate-400 leading-normal font-light">
                    <p className="font-semibold text-slate-500 uppercase tracking-widest text-[9px] mb-1">
                        Safety Guidance Note
                    </p>
                    This assessment represents acoustic and semantic markers detected via speech indicators. It of itself does not constitute or replace biological or clinical diagnoses. Review evidence nodes.
                </div>
            </div>

        </div>
    );
};

export default SVIVisualization;
