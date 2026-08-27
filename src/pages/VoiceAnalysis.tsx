import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Play, Languages, Clock, AlertTriangle, ShieldCheck, ChevronRight } from 'lucide-react';
import type { CaseAssessment } from '../types';
import { analysisService } from '../services/analysisService';

const VoiceAnalysis: React.FC = () => {
    const navigate = useNavigate();
    const [cases, setCases] = useState<CaseAssessment[]>([]);
    const [dragOver, setDragOver] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);

    useEffect(() => {
        setCases(analysisService.getCases());
    }, []);

    const handleSelectCase = (caseId: string, runSimulation: boolean = false) => {
        if (runSimulation) {
            // Set status back to RECEIVED to trigger processing animation
            analysisService.updateCaseStatus(caseId, 'RECEIVED', { svi: 0, confidence: 0 });
            navigate(`/analysis/${caseId}?analyse=true`);
        } else {
            navigate(`/analysis/${caseId}`);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = () => {
        setDragOver(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            simulateUpload(files[0].name);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            simulateUpload(files[0].name);
        }
    };

    const simulateUpload = (filename: string) => {
        setUploading(true);
        setUploadSuccess(null);

        // Simulate audio parsing upload latencies
        setTimeout(() => {
            // Create new case as RECEIVED in the database
            const newCase = analysisService.createCaseFromAudio(filename, 272, 'Hindi');
            setUploading(false);
            setUploadSuccess(`"${filename}" successfully uploaded as Case ${newCase.id}`);

            // Update local case state
            setCases(analysisService.getCases());

            // Stagger navigate to start processing
            setTimeout(() => {
                navigate(`/analysis/${newCase.id}?analyse=true`);
            }, 1000);
        }, 1500);
    };

    return (
        <div className="space-y-8 animate-fade-in">

            {/* Page Header */}
            <div className="border-b border-slate-100 pb-6">
                <h2 className="font-display font-bold text-3xl text-slate-800 tracking-tight">
                    Voice Analysis Portal
                </h2>
                <p className="text-slate-500 text-sm mt-1.5 font-light">
                    Analyse recorded interactions, speech pacing details and pitch variations for trauma indicators.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* LEFT COLUMN: Upload Panel */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Upload Box */}
                    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm shadow-slate-100/30">
                        <h3 className="font-display font-bold text-base text-slate-800 mb-4">
                            Ingest Audio Call Recording
                        </h3>

                        {uploading ? (
                            <div className="border-2 border-dashed border-teal-200 bg-teal-50/10 rounded-xl p-12 text-center flex flex-col items-center justify-center gap-4">
                                <span className="w-10 h-10 border-4 border-slate-100 border-t-teal-600 rounded-full animate-spin"></span>
                                <div>
                                    <p className="text-sm font-semibold text-slate-700">Connecting Audio Pipeline...</p>
                                    <p className="text-xs text-slate-400 mt-1 font-light">Validating waveforms and noise floors</p>
                                </div>
                            </div>
                        ) : uploadSuccess ? (
                            <div className="border-2 border-dashed border-emerald-200 bg-emerald-50/10 rounded-xl p-12 text-center flex flex-col items-center justify-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                                    <ShieldCheck size={20} />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-slate-800">Upload Secured</p>
                                    <p className="text-xs text-emerald-700 mt-1 font-mono">{uploadSuccess}</p>
                                </div>
                                <p className="text-[10px] text-slate-400 mt-2">Redirecting to Live Triage Dashboard...</p>
                            </div>
                        ) : (
                            <label
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-3 group relative ${dragOver
                                    ? 'border-teal-500 bg-teal-50/30 scale-[0.99]'
                                    : 'border-slate-200 hover:border-slate-300 bg-slate-50/50 hover:bg-slate-50'
                                    }`}
                            >
                                <input
                                    type="file"
                                    accept="audio/*"
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    onChange={handleFileChange}
                                />
                                <div className="w-12 h-12 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-teal-600 group-hover:scale-105 transition-all shadow-sm">
                                    <Upload size={18} />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-slate-700">
                                        Drag and drop digital helpline audio recordings here
                                    </p>
                                    <p className="text-xs text-slate-400 mt-1 font-light">
                                        Supports MP3, WAV, M4A call recordings up to 50MB
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    className="mt-2 text-xs font-semibold px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 shadow-xs hover:border-slate-300 transition-colors"
                                >
                                    Browse Files
                                </button>
                            </label>
                        )}

                        {/* Disclaimer info */}
                        <div className="mt-4 flex items-start gap-2.5 bg-slate-50 border border-slate-100 rounded-xl p-3 text-xs text-slate-400 leading-normal font-light">
                            <AlertTriangle size={15} className="text-slate-400 shrink-0 mt-0.5" />
                            <p>
                                Ensure compliance: Only voice data collected under helpline consent waivers may be parsed. Raw voice files are processed locally and are deleted immediately upon browser session closing.
                            </p>
                        </div>
                    </div>

                </div>

                {/* RIGHT COLUMN: Preset Case Samples */}
                <div className="space-y-6">
                    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm shadow-slate-100/30">
                        <h3 className="font-display font-bold text-base text-slate-800 mb-1">
                            Select Preset Sample Call
                        </h3>
                        <p className="text-xs text-slate-400 font-light mb-6">
                            Load realistic interactions to demo analysis indicators.
                        </p>

                        <div className="space-y-4">
                            {cases.slice(0, 3).map((item) => (
                                <div
                                    key={item.id}
                                    className="border border-slate-100 rounded-xl p-4 hover:border-teal-100 hover:bg-teal-50/10 transition-all group flex flex-col justify-between h-42"
                                >
                                    <div>
                                        {/* ID & Language */}
                                        <div className="flex items-center justify-between">
                                            <span className="font-display font-semibold text-slate-800 text-sm group-hover:text-teal-700 transition-colors">
                                                {item.id}
                                            </span>
                                            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-500 font-medium">
                                                {item.language}
                                            </span>
                                        </div>

                                        {/* Meta stats */}
                                        <div className="flex gap-4 mt-3 text-xs text-slate-400 font-light">
                                            <span className="flex items-center gap-1">
                                                <Clock size={12} />
                                                {item.duration}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Languages size={12} />
                                                {item.language === 'Tamil' ? 'Tamil Dialect' : item.language === 'English' ? 'Standard English' : 'Hindi Dialect'}
                                            </span>
                                        </div>

                                        {/* Custom summary preview */}
                                        <p className="text-xs text-slate-500 mt-3.5 italic line-clamp-1 border-l-2 border-slate-100 pl-2">
                                            "{item.transcript[0]?.text}"
                                        </p>
                                    </div>

                                    {/* Trigger buttons */}
                                    <div className="flex items-center justify-end gap-2 border-t border-slate-100/60 pt-3 mt-3">
                                        <button
                                            onClick={() => handleSelectCase(item.id, true)}
                                            className="text-[11px] font-semibold text-teal-600 hover:text-teal-700 bg-teal-50 hover:bg-teal-100/60 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                                        >
                                            <Play size={11} className="stroke-[2.5]" />
                                            <span>Analyse Live</span>
                                        </button>
                                        <button
                                            onClick={() => handleSelectCase(item.id, false)}
                                            className="text-[11px] font-semibold text-slate-500 hover:text-slate-800 px-2 py-1.5 rounded h-8 transition-colors flex items-center"
                                        >
                                            <span>Skip to Results</span>
                                            <ChevronRight size={12} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default VoiceAnalysis;
