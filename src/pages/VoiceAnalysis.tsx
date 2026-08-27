import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Play, Languages, AlertTriangle, ShieldCheck, Mic, Square } from 'lucide-react';
import type { NHAAPayload } from '../types';
import { analysisService } from '../services/analysisService';

const VoiceAnalysis: React.FC = () => {
    const navigate = useNavigate();
    const [cases, setCases] = useState<NHAAPayload[]>([]);

    // Upload State
    const [dragOver, setDragOver] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);

    // MediaRecorder State
    const [isRecording, setIsRecording] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const timerRef = useRef<number | null>(null);

    useEffect(() => {
        setCases(analysisService.getCases());
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
            stopMicrophoneStream();
        };
    }, []);

    const stopMicrophoneStream = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
    };

    const handleSelectCase = (caseId: string, runSimulation: boolean = false) => {
        if (runSimulation) {
            navigate(`/analysis/${caseId}?analyse=true`);
        } else {
            navigate(`/analysis/${caseId}`);
        }
    };

    // ----- Drag & Drop Logic -----
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
        setTimeout(() => {
            setUploading(false);
            setUploadSuccess(`"${filename}" secured for analysis`);
            setTimeout(() => {
                navigate(`/analysis/NHAA-9C34F4?analyse=true`); // Default pointing to existing mock case for demo
            }, 1000);
        }, 1500);
    };

    // ----- Media Recorder Logic -----
    const toggleRecording = async () => {
        if (isRecording) {
            stopRecording();
        } else {
            await startRecording();
        }
    };

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream;
            const recorder = new MediaRecorder(stream);
            mediaRecorderRef.current = recorder;

            recorder.ondataavailable = () => {
                // In a real app, append chunks to send to backend
            };

            recorder.onstop = () => {
                stopMicrophoneStream();
                // Simulate saving recording and redirecting
                simulateUpload("live_mic_capture.wav");
            };

            recorder.start();
            setIsRecording(true);
            setRecordingTime(0);

            timerRef.current = window.setInterval(() => {
                setRecordingTime(prev => {
                    if (prev >= 44) {
                        stopRecording(); // auto stop at 45s per spec
                        return 45;
                    }
                    return prev + 1;
                });
            }, 1000);

        } catch (err) {
            console.error("Microphone access denied or unavailable", err);
            alert("Microphone permission is required to perform live triage capture.");
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
            mediaRecorderRef.current.stop();
        }
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
        setIsRecording(false);
    };

    const formatTime = (sec: number) => {
        const m = Math.floor(sec / 60).toString().padStart(2, '0');
        const s = (sec % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    return (
        <div className="space-y-8 animate-fade-in text-[var(--color-text-main)] font-sans">

            {/* Page Header */}
            <div className="border-b border-[var(--color-surface-border)] pb-6">
                <h2 className="font-display font-medium text-3xl tracking-tight">
                    Voice Analysis Terminal
                </h2>
                <p className="text-[var(--color-text-muted)] text-sm mt-1.5 font-light">
                    Initiate new multimodality intake via live mic capture or file ingest.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* LEFT COLUMN: Input Panels */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Microphone Capture Box */}
                    <div className="bg-[var(--color-surface-card)] border border-[var(--color-surface-border)] rounded-[32px] p-6 shadow-sm overflow-hidden relative">
                        <h3 className="font-display font-medium text-lg mb-4">
                            Live Microphone Triage
                        </h3>

                        {isRecording ? (
                            <div className="flex flex-col items-center justify-center p-8 bg-red-50 border border-red-100 rounded-[32px]">
                                <div className="text-red-500 mb-4 animate-pulse">
                                    <Mic size={48} />
                                </div>
                                <div className="text-xl font-mono font-bold text-red-600 mb-6">
                                    REC [ {formatTime(recordingTime)} / 00:45 ]
                                </div>

                                {/* CSS Wave Visualizer Mock */}
                                <div className="flex items-center gap-1 h-12 mb-8">
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(i => (
                                        <div
                                            key={i}
                                            className="w-2 bg-red-400 rounded-full animate-pulse"
                                            style={{ height: `${Math.max(10, Math.random() * 100)}%`, animationDelay: `${i * 0.1}s` }}
                                        />
                                    ))}
                                </div>

                                <button
                                    onClick={stopRecording}
                                    className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-full flex items-center gap-2 shadow-lg shadow-red-500/20"
                                >
                                    <Square size={16} className="fill-current" />
                                    <span>Terminate & Process</span>
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center p-8 bg-[var(--color-surface-accent-bg)] border border-[var(--color-surface-border)] rounded-[32px] hover:bg-[var(--color-surface-border)] transition-colors">
                                <button
                                    onClick={toggleRecording}
                                    className="w-20 h-20 bg-[var(--color-text-main)] hover:bg-black text-white rounded-full flex items-center justify-center shadow-xl shadow-black/10 transition-all hover:scale-105 mb-4"
                                >
                                    <Mic size={32} />
                                </button>
                                <p className="font-semibold text-sm">Initialize Microphone Pipeline</p>
                                <p className="text-xs text-[var(--color-text-muted)] mt-1">Requires browser hardware consent.</p>
                            </div>
                        )}
                    </div>

                    {/* File Upload Box */}
                    <div className="bg-[var(--color-surface-card)] border border-[var(--color-surface-border)] rounded-[32px] p-6 shadow-sm">
                        <h3 className="font-display font-medium text-lg mb-4">
                            Batch File Ingest
                        </h3>

                        {uploading ? (
                            <div className="border-2 border-dashed border-lime-200 bg-lime-50/10 rounded-[32px] p-12 text-center flex flex-col items-center justify-center gap-4">
                                <span className="w-10 h-10 border-4 border-[var(--color-surface-border)] border-t-[var(--color-severe-low)] rounded-full animate-spin"></span>
                                <div>
                                    <p className="text-sm font-semibold text-zinc-700">Connecting Audio Pipeline...</p>
                                </div>
                            </div>
                        ) : uploadSuccess ? (
                            <div className="border-2 border-dashed border-green-200 bg-green-50/10 rounded-[32px] p-12 text-center flex flex-col items-center justify-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                    <ShieldCheck size={20} />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-[var(--color-text-main)]">Ingest Sequence Sent</p>
                                    <p className="text-xs text-green-700 mt-1 font-mono">{uploadSuccess}</p>
                                </div>
                            </div>
                        ) : (
                            <label
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                className={`border-2 border-dashed rounded-[32px] p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-3 group relative ${dragOver
                                    ? 'border-blue-500 bg-blue-50/30'
                                    : 'border-[var(--color-surface-border)] hover:border-[var(--color-surface-border)] bg-[var(--color-surface-accent-bg)]'
                                    }`}
                            >
                                <input
                                    type="file"
                                    accept="audio/*"
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    onChange={handleFileChange}
                                />
                                <div className="w-12 h-12 rounded-full bg-white border border-[var(--color-surface-border)] flex items-center justify-center text-[var(--color-text-light)] group-hover:text-blue-600 group-hover:scale-105 transition-all shadow-sm">
                                    <Upload size={18} />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-zinc-700">
                                        Drag and drop historical audio encodings here
                                    </p>
                                    <p className="text-xs text-[var(--color-text-light)] mt-1 font-light">
                                        Supports encrypted WAV/M4A payload bundles
                                    </p>
                                </div>
                            </label>
                        )}

                        <div className="mt-4 flex items-start gap-2.5 bg-[var(--color-surface-accent-bg)] border border-[var(--color-surface-border)] rounded-[32px] p-3 text-xs text-[var(--color-text-muted)] leading-normal font-light">
                            <AlertTriangle size={15} className="text-[var(--color-text-light)] shrink-0 mt-0.5" />
                            <p>
                                NHAA Standard: Audio data is processed in-memory. Residual buffer artifacts are immediately scrubbed upon completion of diagnostic mapping.
                            </p>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: Recent Presets */}
                <div className="space-y-6">
                    <div className="bg-[var(--color-surface-card)] border border-[var(--color-surface-border)] rounded-[32px] p-6 shadow-sm">
                        <h3 className="font-display font-medium text-lg mb-1">
                            Load NHAA Architecture Demo
                        </h3>
                        <p className="text-xs text-[var(--color-text-muted)] font-light mb-6">
                            Bypass ingestion for validated test arrays
                        </p>

                        <div className="space-y-4">
                            {cases.slice(0, 2).map((item) => (
                                <div
                                    key={item.case_id}
                                    className="border border-[var(--color-surface-border)] rounded-[32px] p-4 hover:border-[var(--color-surface-border)] hover:bg-[var(--color-surface-accent-bg)] transition-all group flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="flex items-center justify-between">
                                            <span className="font-display font-semibold text-[var(--color-text-main)] text-sm group-hover:text-blue-700 transition-colors">
                                                {item.case_id}
                                            </span>
                                            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-zinc-200 text-zinc-600 font-bold">
                                                {item.svi.risk_category}
                                            </span>
                                        </div>

                                        <div className="flex gap-4 mt-3 text-xs text-[var(--color-text-muted)] font-light font-mono">
                                            <span className="flex items-center gap-1">
                                                <Languages size={12} />
                                                {item.transcription.language}
                                            </span>
                                        </div>

                                        <p className="text-xs text-zinc-600 mt-3 italic line-clamp-1 border-l-2 border-[var(--color-surface-border)] pl-2">
                                            "{item.transcription.text}"
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-end gap-2 border-t border-[var(--color-surface-border)] pt-3 mt-3">
                                        <button
                                            onClick={() => handleSelectCase(item.case_id, true)}
                                            className="text-[11px] font-semibold text-[var(--color-text-main)] hover:text-white bg-[var(--color-surface-border)] hover:bg-zinc-800 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                                        >
                                            <Play size={11} className="stroke-[2.5]" />
                                            <span>Inject Payload</span>
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
