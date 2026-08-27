import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import {
    ArrowLeft,
    Clock,
    Languages,
    HelpCircle,
    ShieldCheck,
    AlertTriangle,
    ChevronRight,
    TrendingUp,
    FileAudio
} from 'lucide-react';
import type { CaseAssessment } from '../types';
import { analysisService } from '../services/analysisService';

// Import components
import AudioPlayer from '../components/AudioPlayer';
import ProcessingPipeline from '../components/ProcessingPipeline';
import TranscriptViewer from '../components/TranscriptViewer';
import SpeechAnalysis from '../components/SpeechAnalysis';
import EmotionIndicators from '../components/EmotionIndicators';
import VulnerabilityIndicators from '../components/VulnerabilityIndicators';
import SVIVisualization from '../components/SVIVisualization';
import HumanReview from '../components/HumanReview';

const AnalysisDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [searchParams] = useSearchParams();


    const [item, setItem] = useState<CaseAssessment | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [activeTime, setActiveTime] = useState(0);
    const [seekTime, setSeekTime] = useState(-1);
    const [loading, setLoading] = useState(true);

    // Check if live evaluation was requested
    const triggerAnalyse = searchParams.get('analyse') === 'true';

    useEffect(() => {
        if (!id) return;

        const data = analysisService.getCaseById(id);
        if (!data) {
            setLoading(false);
            return;
        }

        setItem(data);

        // If analysis was triggered and case is not complete or forced
        if (triggerAnalyse && data.status !== 'COMPLETE') {
            setIsProcessing(true);
        } else {
            setIsProcessing(false);
        }

        setLoading(false);
    }, [id, triggerAnalyse]);

    const handlePipelineComplete = () => {
        if (!id || !item) return;

        // Simulate SVI scores generation
        const completedOverrides: Partial<CaseAssessment> = {
            svi: 87,
            risk: 'CRITICAL',
            confidence: 93,
            speechMetrics: {
                ...item.speechMetrics,
                speechStressValue: 89,
            },
            emotions: [
                { name: 'Fear', level: 'HIGH', value: 95 },
                { name: 'Distress', level: 'HIGH', value: 90 },
                { name: 'Sadness', level: 'MEDIUM', value: 68 },
                { name: 'Anger', level: 'LOW', value: 15 },
                { name: 'Neutral', level: 'LOW', value: 5 }
            ],
            vulnerabilities: [
                { label: 'Severe Trauma', key: 'severe-trauma', severity: 'HIGH', confidence: 92 },
                { label: 'Fear', key: 'fear', severity: 'HIGH', confidence: 95 },
                { label: 'Depression Indicators', key: 'depression', severity: 'MEDIUM', confidence: 68 },
                { label: 'Suicidal Ideation Indicators', key: 'suicidal-ideation', severity: 'LOW', confidence: 24 },
                { label: 'Intimidation', key: 'intimidation', severity: 'HIGH', confidence: 91 },
                { label: 'Social Isolation', key: 'social-isolation', severity: 'MEDIUM', confidence: 71 },
                { label: 'Extreme Vulnerability', key: 'extreme-vulnerability', severity: 'HIGH', confidence: 88 }
            ],
            explainability: [
                { id: '01', title: 'Immediate fear language', description: 'Explicit verbal admission of fear when discussing return home ("I am scared to go back home").', evidence: '00:12 Transcript Statement' },
                { id: '02', title: 'Repeated intimidation indicators', description: 'Coercive speech triggers detected ("They told me not to tell anyone"). Indicates severe external pressure.', evidence: '00:20 Transcript Statement' },
                { id: '03', title: 'High speech-stress signals', description: 'Pitch fluctuation patterns and voice tremor signals index stress levels at 89%.', evidence: 'Acoustic Signal Extraction' },
                { id: '04', title: 'Long pauses during sensitive narrative', description: 'Multiple instances of hesitancy pauses exceeding 3.5 seconds when details of threats are referenced.', evidence: 'Pause Cadence Analysis' },
                { id: '05', title: 'Strong trauma-related language', description: 'Language indicating protective actions for dependents due to external threats.', evidence: '00:42 Transcript Statement' },
                { id: '06', title: 'Social isolation indicators', description: 'Mentions of operational confinement ("We have been staying in one room").', evidence: 'Narrative Extraction' }
            ]
        };

        // Update in service layer (db)
        const updated = analysisService.updateCaseStatus(id, 'COMPLETE', completedOverrides);
        setItem(updated);
        setIsProcessing(false);
    };

    const handleSelectTime = (seconds: number) => {
        setSeekTime(seconds);
        // Reset seekTime toggler immediately to allow subsequent seeks to same coordinate
        setTimeout(() => setSeekTime(-1), 100);
    };

    const handleReviewSaved = (updatedCase: CaseAssessment) => {
        setItem(updatedCase);
    };

    const parseDurationToSeconds = (durStr: string): number => {
        const parts = durStr.split(':');
        if (parts.length === 2) {
            return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
        }
        return 272; // default
    };

    if (loading) {
        return (
            <div className="min-h-[60vh] flex flex-col justify-center items-center gap-4">
                <span className="w-10 h-10 border-4 border-slate-100 border-t-teal-600 rounded-full animate-spin"></span>
                <p className="text-sm font-light text-slate-400">Loading analysis workspace...</p>
            </div>
        );
    }

    if (!item) {
        return (
            <div className="min-h-[60vh] flex flex-col justify-center items-center gap-4 text-center max-w-md mx-auto">
                <AlertTriangle size={42} className="text-red-500 stroke-[1.5]" />
                <h3 className="text-lg font-bold text-slate-800 tracking-tight">Case Assessment Not Found</h3>
                <p className="text-xs text-slate-400 font-light mt-1.5 leading-relaxed">
                    The requested record was deleted, archived, or is inaccessible. Please check your credentials or ledger parameters.
                </p>
                <Link
                    to="/dashboard"
                    className="mt-4 text-xs font-semibold text-teal-600 hover:text-teal-700 bg-teal-50 px-4 py-2 rounded-lg"
                >
                    Return to Dashboard
                </Link>
            </div>
        );
    }

    const durationSec = parseDurationToSeconds(item.duration);

    // Return Processing view if pipeline is active
    if (isProcessing) {
        return (
            <div className="min-h-[70vh] flex flex-col justify-center items-center px-4">
                <span className="text-[10px] text-slate-400 font-mono tracking-widest uppercase mb-4">
                    SAHAAYA TRIAGE PIPELINE
                </span>
                <ProcessingPipeline
                    isStarted={isProcessing}
                    onComplete={handlePipelineComplete}
                />
                <p className="text-[10px] text-slate-400 mt-6 max-w-xs text-center leading-normal font-light">
                    Parsing acoustic pitch variances and transcribing content using institutional translation indices...
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-fade-in">

            {/* Detail Header navigation & metadata details */}
            <div className="border-b border-slate-100 pb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="space-y-1.5">
                    <Link
                        to="/dashboard"
                        className="inline-flex items-center gap-1.5 text-xs text-slate-450 hover:text-teal-600 transition-colors font-medium mb-1"
                    >
                        <ArrowLeft size={13} />
                        Back to Triage Ledger
                    </Link>
                    <div className="flex flex-wrap items-center gap-3">
                        <h2 className="font-display font-extrabold text-3xl text-slate-800 tracking-tight leading-none">
                            Case #{item.id}
                        </h2>

                        {item.operatorReview?.isReviewed ? (
                            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-full px-3 py-1 flex items-center gap-1 leading-none shadow-xs">
                                <ShieldCheck size={12} className="stroke-[2.5]" />
                                Reviewed by Operator
                            </span>
                        ) : (
                            <span className="text-[11px] text-slate-400 bg-slate-50 border border-slate-100 rounded-full px-3 py-0.5 leading-none">
                                Pending Verification
                            </span>
                        )}
                    </div>

                    <div className="flex flex-wrap gap-4 text-xs text-slate-400 leading-none pt-1">
                        <span className="flex items-center gap-1">
                            <Clock size={12} />
                            Length: {item.duration}
                        </span>
                        <span className="flex items-center gap-1">
                            <Languages size={12} />
                            Dialect: {item.language}
                        </span>
                        <span className="flex items-center gap-1">
                            Logged at: {item.time}
                        </span>
                    </div>
                </div>

                {/* Operator status overrides review check */}
                {item.status !== 'COMPLETE' && (
                    <button
                        onClick={() => setIsProcessing(true)}
                        className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold py-2.5 px-4 rounded-xl shadow-sm transition-all focus:outline-none flex items-center justify-center gap-2 cursor-pointer"
                    >
                        <TrendingUp size={14} />
                        <span>Process AI Assessment</span>
                    </button>
                )}
            </div>

            {item.status !== 'COMPLETE' ? (
                <div className="bg-white border border-slate-100 rounded-2xl p-12 text-center max-w-lg mx-auto shadow-sm shadow-slate-100/30">
                    <FileAudio className="mx-auto text-slate-300 stroke-[1.2] mb-4 animate-bounce" size={48} />
                    <h3 className="font-display font-bold text-base text-slate-700">Audio Recording Loaded</h3>
                    <p className="text-xs text-slate-400 mt-1 font-light leading-relaxed">
                        Case {item.id} is locked in parse queue. Select "Process AI Assessment" to generate speech, emotional, and vulnerability indices.
                    </p>
                    <button
                        onClick={() => setIsProcessing(true)}
                        className="mt-6 inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 hover:shadow-md transition-all text-white text-xs font-semibold py-2.5 px-6 rounded-xl cursor-pointer"
                    >
                        <span>Process AI Assessment</span>
                        <ChevronRight size={14} />
                    </button>
                </div>
            ) : (
                /* Workspace dashboard */
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* LEFT 7/12 COLUMN: Audio Scrubber & Transcript Scrollbox */}
                    <div className="lg:col-span-7 space-y-6">

                        {/* Audio player timeline */}
                        <AudioPlayer
                            waveform={item.speechMetrics.pitchWaveform}
                            durationSec={durationSec}
                            onTimeUpdate={setActiveTime}
                            seekTime={seekTime}
                        />

                        {/* Transcript Correspondence */}
                        <TranscriptViewer
                            transcript={item.transcript}
                            onSelectTime={handleSelectTime}
                            activeTime={activeTime}
                        />

                        {/* Explainability Node Evidence map */}
                        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm shadow-slate-100/30 select-none">
                            <div className="flex items-center justify-between pb-3 border-b border-slate-100/70 mb-5">
                                <div>
                                    <h3 className="font-display font-bold text-base text-slate-800">
                                        Why is this assessment elevated?
                                    </h3>
                                    <p className="text-xs text-slate-400 mt-0.5 font-light">
                                        Correlating SVI score contributors directly to interaction evidence nodes
                                    </p>
                                </div>
                                <HelpCircle size={15} className="text-slate-400" />
                            </div>

                            {item.explainability.length === 0 ? (
                                <p className="text-xs text-slate-400 italic">No primary elevation data recorded for this score level.</p>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {item.explainability.map((exp) => (
                                        <div
                                            key={exp.id}
                                            className="p-4 bg-slate-50/50 hover:bg-slate-50 border border-slate-100 rounded-xl transition-colors space-y-2"
                                        >
                                            <div className="flex justify-between items-center">
                                                <span className="text-[10px] font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-100">
                                                    NODE {exp.id}
                                                </span>
                                                <span className="text-[9px] font-mono text-slate-400 font-semibold uppercase">
                                                    {exp.evidence}
                                                </span>
                                            </div>

                                            <h4 className="text-xs font-semibold text-slate-800 leading-tight">
                                                {exp.title}
                                            </h4>
                                            <p className="text-[11px] text-slate-405 leading-relaxed font-light">
                                                {exp.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                    </div>

                    {/* RIGHT 5/12 COLUMN: SVI Score, Speech Analytics, Indicators, Review Form */}
                    <div className="lg:col-span-5 space-y-6">

                        {/* Stress vulnerability index centerpiece */}
                        <SVIVisualization
                            score={item.svi}
                            risk={item.risk}
                            confidence={item.confidence}
                        />

                        {/* Speech acoustic graphs */}
                        <SpeechAnalysis metrics={item.speechMetrics} />

                        {/* Detected emotional progress indicators */}
                        <EmotionIndicators emotions={item.emotions} />

                        {/* Semantic vulnerability list */}
                        <VulnerabilityIndicators vulnerabilities={item.vulnerabilities} />

                        {/* Manual Verification Console */}
                        <HumanReview
                            caseId={item.id}
                            initialRisk={item.risk}
                            onReviewSaved={handleReviewSaved}
                        />

                    </div>

                </div>
            )}

        </div>
    );
};

export default AnalysisDetail;
