import React from 'react';
import type { Transcription, AlignedWord } from '../types';
import { AlertCircle, Info } from 'lucide-react';

interface TranscriptViewerProps {
    transcription: Transcription;
    activeTime: number; // current time in seconds (from AudioPlayer)
}

const TranscriptViewer: React.FC<TranscriptViewerProps> = ({ transcription, activeTime }) => {

    // Group adjacent threat words into blocks? Or just render the whole string. 
    // The spec implies individual word pills or continuous text where threat words are badges.
    // Let's render the words as a flow.

    return (
        <div className="bg-[var(--color-surface-card)] border border-[var(--color-surface-border)] rounded-2xl p-6 shadow-sm flex flex-col h-[400px] select-none font-sans text-[var(--color-text-main)] w-full transition-colors">

            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
                <div>
                    <h3 className="font-display font-medium text-lg text-[var(--color-text-main)]">
                        Time-Aligned Transcription Tray
                    </h3>
                    <p className="text-xs text-[var(--color-text-muted)] mt-1 font-light">
                        Live semantic mapping with threat indicators
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold text-zinc-500 bg-zinc-50 px-2 py-1 rounded-md border border-zinc-200">
                        {transcription.language}
                    </span>
                </div>
            </div>

            {/* Transcript Word Flow area */}
            <div className="flex-1 overflow-y-auto mt-6 pr-2">
                <div className="flex flex-wrap gap-2 text-sm leading-8">
                    {transcription.aligned_words.map((wordObj: AlignedWord, idx: number) => {
                        const isActivelyPlaying = activeTime >= wordObj.start_time && activeTime <= wordObj.end_time;

                        return (
                            <span
                                key={idx}
                                id={`word-${idx}`}
                                title={`Self-Attention: ${wordObj.cross_attention_weight.toFixed(2)}`}
                                className={`
                                    relative inline-flex items-center px-1 rounded-md transition-colors duration-75 group cursor-help
                                    ${isActivelyPlaying ? 'bg-zinc-200 text-black font-semibold' : 'text-zinc-800'}
                                    ${wordObj.is_threat_word ? 'border border-[var(--color-severe-critical)] bg-red-50 text-[var(--color-severe-critical)] font-medium px-2 shadow-sm' : ''}
                                `}
                            >
                                {wordObj.is_threat_word && (
                                    <AlertCircle size={10} className="mr-1 inline stroke-[2.5]" />
                                )}
                                {wordObj.word}

                                {/* Hover Tooltip for Threat Words */}
                                {wordObj.is_threat_word && (
                                    <div className="absolute bottom-full left-1/2 -tranzinc-x-1/2 mb-1 w-max hidden group-hover:block bg-zinc-800 text-white text-[9px] font-mono px-2 py-1 rounded shadow-lg z-10">
                                        weight: {wordObj.cross_attention_weight.toFixed(3)}
                                    </div>
                                )}
                            </span>
                        );
                    })}
                </div>
            </div>

            {/* Info indicator */}
            <div className="mt-4 border-t border-zinc-100 pt-4 flex items-center gap-1.5 text-[10px] text-zinc-400 uppercase tracking-widest font-bold">
                <Info size={12} />
                <span>Hover active threat words for MuRIL model attention weights</span>
            </div>
        </div>
    );
};

export default TranscriptViewer;
