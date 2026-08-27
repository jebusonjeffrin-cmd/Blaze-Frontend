import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Eye, EyeOff, AlertTriangle } from 'lucide-react';
import { authService } from '../services/authService';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [emailOrId, setEmailOrId] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!emailOrId || !password) {
            setError('Please fill in all authorized vendor credentials.');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            await authService.login(emailOrId, password);
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.message || 'Authentication failed. Please verify credentials.');
        } finally {
            setLoading(false);
        }
    };

    const waveBarsCount = 24;

    return (
        <div className="min-h-screen bg-[var(--color-surface-base)] flex flex-col md:flex-row text-[var(--color-text-main)] font-sans selection:bg-[var(--color-surface-dark)] selection:text-white">

            {/* LEFT SIDE: Charcoal Brutalist Info Panel */}
            <div className="md:w-7/12 bg-[var(--color-surface-dark)] text-white flex flex-col justify-between p-8 sm:p-12 md:p-16 border-r border-[var(--color-surface-border)]">

                {/* Top Header */}
                <div className="flex items-center gap-3 animate-fade-in border-b border-[var(--color-surface-border)] pb-8">
                    <div>
                        <h1 className="font-sans font-black tracking-tighter text-4xl leading-none">SAHAAYA AI</h1>
                        <p className="text-[10px] text-[var(--color-accent-violet)] font-bold tracking-widest uppercase mt-1">SECURED PLATFORM v3.0</p>
                    </div>
                </div>

                {/* Middle Core Branding & Waveform Visual */}
                <div className="my-16 md:my-auto max-w-xl">
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-sans font-black tracking-tighter mb-8 leading-none">
                        Triage Intelligence Processing.
                    </h2>
                    <p className="text-[var(--color-text-light)] text-sm sm:text-base leading-relaxed mb-12 font-medium">
                        Algorithmic extraction of semantic and acoustic distress vectors directly mapped from raw intake signals to streamline critical operational routing.
                    </p>

                    {/* Flat Brutalist Waveform */}
                    <div className="border border-[var(--color-surface-border)] p-6 bg-[var(--color-surface-darker)]">
                        <div className="flex items-center justify-between mb-8 border-b border-[var(--color-surface-border)] pb-4">
                            <span className="text-[10px] font-bold text-[var(--color-text-muted)] flex items-center gap-2 uppercase tracking-widest">
                                <span className="w-2 h-2 bg-[var(--color-accent-violet)]"></span>
                                Live System Telemetry
                            </span>
                            <span className="text-[9px] font-bold text-[var(--color-text-muted)] tracking-widest uppercase">VOICE → SIGNAL → ROUTE</span>
                        </div>

                        <div className="h-20 flex items-end justify-between gap-1 px-2 border-b border-[var(--color-surface-border)] pb-2">
                            {Array.from({ length: waveBarsCount }).map((_, index) => {
                                const baseHeight = [
                                    30, 45, 60, 25, 40, 85, 95, 45, 65, 30, 50, 75,
                                    80, 50, 35, 60, 90, 70, 40, 20, 55, 30, 45, 25
                                ][index] || 40;
                                const delay = (index * 0.05).toFixed(2);
                                return (
                                    <div
                                        key={index}
                                        className="flex-1 bg-[var(--color-accent-violet)]"
                                        style={{
                                            height: `${baseHeight}%`,
                                            animation: 'waveform 1.4s ease-in-out infinite',
                                            animationDelay: `${delay}s`,
                                            transformOrigin: 'bottom',
                                        }}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Bottom Security Banner */}
                <div className="flex items-start gap-4 border-t border-[var(--color-surface-border)] pt-8 text-[10px] uppercase font-bold tracking-widest text-[var(--color-text-muted)] leading-relaxed">
                    <Shield size={20} className="text-[var(--color-text-muted)] shrink-0" />
                    <p>
                        Encryption standard AES-256 active. All transmissions audited.
                    </p>
                </div>
            </div>

            {/* RIGHT SIDE: Operator Authentication Form */}
            <div className="md:w-5/12 bg-[var(--color-surface-base)] flex flex-col justify-center p-8 sm:p-12 md:p-16">
                <div className="max-w-md w-full mx-auto">
                    {/* Header */}
                    <div className="mb-12 border-b-4 border-[var(--color-surface-dark)] pb-4">
                        <h3 className="font-sans font-black text-4xl text-[var(--color-text-main)] tracking-tighter">
                            SIGN IN
                        </h3>
                        <p className="text-xs text-[var(--color-text-muted)] font-bold tracking-widest uppercase mt-2">
                            Awwwards / Boost Capital Theme
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {error && (
                            <div className="border border-red-500 p-4 flex items-start gap-3 text-red-700 bg-red-50 animate-fade-in">
                                <AlertTriangle size={18} className="shrink-0 mt-0.5 text-red-600" />
                                <div>
                                    <p className="font-bold text-xs uppercase tracking-widest">Access Denied</p>
                                    <p className="text-red-900/90 text-sm mt-1">{error}</p>
                                </div>
                            </div>
                        )}

                        {/* Email/Operator ID Field */}
                        <div className="relative group">
                            <label
                                htmlFor="operator-id"
                                className="block text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest mb-1"
                            >
                                Operator Link
                            </label>
                            <input
                                id="operator-id"
                                name="operator-id"
                                type="text"
                                required
                                placeholder="operator@sahaaya.ai"
                                value={emailOrId}
                                onChange={(e) => setEmailOrId(e.target.value)}
                                className="block w-full py-4 bg-transparent border-b-2 border-[var(--color-surface-border)] text-[var(--color-text-main)] font-semibold text-lg placeholder-[var(--color-text-light)] focus:border-[var(--color-accent-violet)] transition-colors outline-none"
                            />
                        </div>

                        {/* Password Field */}
                        <div className="relative group">
                            <div className="flex justify-between items-baseline mb-1">
                                <label
                                    htmlFor="password"
                                    className="block text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest"
                                >
                                    Security Key
                                </label>
                                <a href="#reset" className="text-[10px] font-bold tracking-widest text-[var(--color-text-light)] hover:text-[var(--color-accent-violet)] transition-colors uppercase" onClick={(e) => e.preventDefault()}>
                                    Forgot ?
                                </a>
                            </div>
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full py-4 pr-10 bg-transparent border-b-2 border-[var(--color-surface-border)] text-[var(--color-text-main)] font-semibold text-lg placeholder-[var(--color-text-light)] focus:border-[var(--color-accent-violet)] transition-colors outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-2 flex items-center text-[var(--color-text-muted)] hover:text-[var(--color-surface-dark)]"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[var(--color-surface-dark)] text-white hover:bg-[var(--color-accent-violet)] disabled:bg-zinc-300 font-bold tracking-widest uppercase py-5 px-6 text-sm transition-colors flex items-center justify-center gap-3 cursor-pointer"
                            >
                                {loading ? (
                                    <>
                                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                        <span>Authorizing...</span>
                                    </>
                                ) : (
                                    <span>Initiate Connection</span>
                                )}
                            </button>
                        </div>
                    </form>

                    {/* Footer details */}
                    <div className="mt-16 text-[9px] text-[var(--color-text-muted)] font-bold flex flex-col gap-2 border-t border-[var(--color-surface-border)] pt-8">
                        <span className="text-[var(--color-text-main)] tracking-widest uppercase">
                            RESTRICTED CLEARANCE ONLY
                        </span>
                        <p>Unauthorized access attempts logged strictly per NHAA mandate §8a. Protocol enforcement algorithms active.</p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Login;
