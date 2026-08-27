import React, { useRef } from 'react';
import type { MouseEvent } from 'react';

interface WaveformProps {
    waveform: number[]; // Array of heights (0-100)
    currentTime: number; // in seconds
    duration: number; // in seconds
    onSeek: (time: number) => void;
}

const Waveform: React.FC<WaveformProps> = ({ waveform, currentTime, duration, onSeek }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

    const handleClick = (e: MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current || duration === 0) return;

        const rect = containerRef.current.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;

        // Calculate click ratio
        const ratio = clickX / width;
        const seekTime = ratio * duration;

        onSeek(seekTime);
    };

    // Convert seconds to MM:SS format
    const formatTime = (time: number) => {
        if (isNaN(time)) return '00:00';
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="space-y-2 select-none">
            {/* Waveform Visualization Bars */}
            <div
                ref={containerRef}
                onClick={handleClick}
                className="h-16 flex items-end justify-between gap-[2px] cursor-pointer group/wave relative py-2"
                role="slider"
                aria-label="Audio timeline track scrubber"
                aria-valuemin={0}
                aria-valuemax={duration}
                aria-valuenow={currentTime}
            >
                {/* Hover Highlight Layer */}
                <div className="absolute inset-y-0 left-0 bg-teal-500/5 group-hover/wave:block hidden pointer-events-none transition-all rounded-lg" />

                {waveform.map((height, index) => {
                    // Determine if this bar was already played
                    const barPercent = (index / waveform.length) * 100;
                    const isPlayed = barPercent <= progressPercent;

                    return (
                        <div
                            key={index}
                            className={`w-full rounded-full transition-all duration-300 ${isPlayed
                                ? 'bg-teal-600 group-hover/wave:bg-teal-500'
                                : 'bg-slate-200'
                                }`}
                            style={{
                                height: `${Math.max(height, 10)}%`,
                                // Scale highlight on played bars when hovered
                                transform: isPlayed ? 'scaleY(1.02)' : 'none',
                            }}
                        />
                    );
                })}
            </div>

            {/* Scrubber Navigation details */}
            <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 font-semibold px-0.5">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
            </div>
        </div>
    );
};

export default Waveform;
