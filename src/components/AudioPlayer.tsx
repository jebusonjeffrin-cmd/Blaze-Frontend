import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import Waveform from './Waveform';

interface AudioPlayerProps {
    waveform: number[];
    durationSec: number; // Duration of case call in seconds
    onTimeUpdate: (time: number) => void;
    seekTime: number; // Prop to force seeking from outside (e.g. clicking transcript)
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ waveform, durationSec, onTimeUpdate, seekTime }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [speed, setSpeed] = useState(1);
    const [muted, setMuted] = useState(false);

    const timerRef = useRef<number | null>(null);

    // Sync with parental seek request (like from clicking a timestamp in the transcript)
    useEffect(() => {
        if (seekTime >= 0 && seekTime <= durationSec) {
            setCurrentTime(seekTime);
            onTimeUpdate(seekTime);
        }
    }, [seekTime, durationSec, onTimeUpdate]);

    // Handle play/pause timer logic
    useEffect(() => {
        if (isPlaying) {
            const intervalMs = 1000 / speed;
            timerRef.current = window.setInterval(() => {
                setCurrentTime((prev) => {
                    if (prev >= durationSec) {
                        setIsPlaying(false);
                        if (timerRef.current) clearInterval(timerRef.current);
                        return durationSec;
                    }
                    const next = prev + 1;
                    onTimeUpdate(next);
                    return next;
                });
            }, intervalMs);
        } else {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        }

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isPlaying, durationSec, speed, onTimeUpdate]);

    const togglePlay = () => setIsPlaying(!isPlaying);

    const handleReset = () => {
        setCurrentTime(0);
        onTimeUpdate(0);
        setIsPlaying(false);
    };

    const handleSeek = (time: number) => {
        const rounded = Math.round(time);
        setCurrentTime(rounded);
        onTimeUpdate(rounded);
    };

    return (
        <div className="bg-white border border-zinc-100 rounded-2xl p-5 shadow-sm shadow-zinc-100/30 space-y-4">
            {/* Waveform Player component */}
            <Waveform
                waveform={waveform}
                currentTime={currentTime}
                duration={durationSec}
                onSeek={handleSeek}
            />

            {/* Scrubber Controls */}
            <div className="flex items-center justify-between border-t border-zinc-100 pt-4 gap-4 flex-wrap sm:flex-nowrap">
                {/* Play/Pause controls */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={togglePlay}
                        className="w-10 h-10 rounded-xl bg-lime-600 hover:bg-lime-700 active:scale-95 text-white flex items-center justify-center transition-all shadow-md shadow-lime-500/10 cursor-pointer"
                        aria-label={isPlaying ? 'Pause call playback' : 'Play call playback'}
                    >
                        {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
                    </button>

                    <button
                        onClick={handleReset}
                        className="w-9 h-9 rounded-lg bg-zinc-50 hover:bg-zinc-100 text-zinc-500 flex items-center justify-center transition-colors cursor-pointer"
                        aria-label="Restart call audio"
                    >
                        <RotateCcw size={15} />
                    </button>
                </div>

                {/* Speed Adjustment Controls */}
                <div className="flex items-center gap-4">
                    {/* Audio volume mute togglers */}
                    <button
                        onClick={() => setMuted(!muted)}
                        className="p-1 px-2.5 text-xs text-zinc-500 rounded-lg hover:bg-zinc-50 flex items-center gap-1.5 transition-colors border border-zinc-100"
                        aria-label={muted ? 'Unmute' : 'Mute'}
                    >
                        {muted ? <VolumeX size={14} className="text-red-500" /> : <Volume2 size={14} />}
                        <span className="hidden sm:inline font-mono">
                            {muted ? 'MUTED' : 'LIVE'}
                        </span>
                    </button>

                    {/* Speed settings */}
                    <div className="flex items-center gap-1 text-[11px] font-mono text-zinc-400 bg-zinc-50 border border-zinc-100 p-0.5 rounded-lg">
                        {[1, 1.5, 2].map((val) => (
                            <button
                                key={val}
                                onClick={() => setSpeed(val)}
                                className={`px-2.5 py-1 rounded-md font-semibold font-mono transition-colors ${speed === val
                                    ? 'bg-white text-lime-700 shadow-xs'
                                    : 'hover:text-zinc-700 text-zinc-400'
                                    }`}
                            >
                                {val}x
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AudioPlayer;
