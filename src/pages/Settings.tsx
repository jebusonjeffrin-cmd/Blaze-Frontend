import React, { useState, useEffect } from 'react';
import { ShieldCheck, User, Bell, Cpu, Shield, Key, RefreshCw } from 'lucide-react';
import type { Operator } from '../types';
import { authService } from '../services/authService';

const Settings: React.FC = () => {
    const [operator, setOperator] = useState<Operator | null>(null);
    const [savedSuccess, setSavedSuccess] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        const current = authService.getOperator();
        if (current) {
            setOperator(current);
            setName(current.name);
            setEmail(current.email);
        }
    }, []);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        if (!operator) return;

        const updated: Operator = {
            ...operator,
            name,
            email
        };

        localStorage.setItem('sahaaya_operator', JSON.stringify(updated));
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 2500);
    };

    return (
        <div className="space-y-8 animate-fade-in select-none">

            {/* Header */}
            <div className="border-b border-[var(--color-surface-border)] pb-6">
                <h2 className="font-display font-bold text-3xl text-[var(--color-text-main)] tracking-tight">
                    System Settings
                </h2>
                <p className="text-[var(--color-text-muted)] text-sm mt-1.5 font-light">
                    Configure operator profile variables, triage notice channels, and review core service engine versions.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                {/* Left Columns - Configuration Fields */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Profile form card */}
                    <div className="bg-white border border-[var(--color-surface-border)] rounded-2xl p-6 shadow-sm shadow-zinc-100/30">
                        <h3 className="font-display font-semibold text-base text-[var(--color-text-main)] border-b border-[var(--color-surface-border)] pb-3 mb-6 flex items-center gap-2">
                            <User size={16} className="text-[var(--color-text-light)]" />
                            Operator Profile Settings
                        </h3>

                        <form onSubmit={handleSave} className="space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-zinc-650 uppercase tracking-wider mb-2">
                                        Operator Display Name
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="block w-full px-4 py-3 bg-[var(--color-surface-accent-bg)] border border-[var(--color-surface-border)] rounded-2xl text-[var(--color-text-main)] text-sm placeholder-zinc-400 focus:bg-white focus:border-lime-500 focus:ring-1 focus:ring-lime-500 transition-all outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-zinc-650 uppercase tracking-wider mb-2">
                                        Operator ID Code
                                    </label>
                                    <input
                                        type="text"
                                        disabled
                                        value={operator?.id || 'OP-0000'}
                                        className="block w-full px-4 py-3 bg-[var(--color-surface-border)] border border-[var(--color-surface-border)] rounded-2xl text-[var(--color-text-light)] text-sm cursor-not-allowed outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-zinc-650 uppercase tracking-wider mb-2">
                                    Institutional Email Address
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full px-4 py-3 bg-[var(--color-surface-accent-bg)] border border-[var(--color-surface-border)] rounded-2xl text-[var(--color-text-main)] text-sm placeholder-zinc-400 focus:bg-white focus:border-lime-500 focus:ring-1 focus:ring-lime-500 transition-all outline-none"
                                />
                            </div>

                            <div className="pt-2 flex items-center gap-3">
                                <button
                                    type="submit"
                                    className="px-6 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white font-medium rounded-2xl text-sm transition-all focus:outline-none flex items-center justify-center gap-2 cursor-pointer"
                                >
                                    <ShieldCheck size={15} />
                                    <span>Update Profile Details</span>
                                </button>
                                {savedSuccess && (
                                    <span className="text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-2 text-xs font-semibold animate-fade-in">
                                        ✓ Profile Saved
                                    </span>
                                )}
                            </div>
                        </form>
                    </div>

                    {/* Security details card */}
                    <div className="bg-white border border-[var(--color-surface-border)] rounded-2xl p-6 shadow-sm shadow-zinc-100/30">
                        <h3 className="font-display font-semibold text-base text-[var(--color-text-main)] border-b border-[var(--color-surface-border)] pb-3 mb-6 flex items-center gap-2">
                            <Shield size={16} className="text-[var(--color-text-light)]" />
                            Security & Credentialing
                        </h3>

                        <div className="space-y-4">
                            <div className="p-4 bg-[var(--color-surface-accent-bg)]/50 border border-[var(--color-surface-border)] rounded-2xl flex items-start justify-between gap-4">
                                <div className="space-y-1">
                                    <p className="text-xs font-semibold text-zinc-700">AES-256 Analysis Frame Keying</p>
                                    <p className="text-[11px] text-[var(--color-text-light)] font-light leading-normal">
                                        Audio telemetry streams are signed on key frames. Regenerating keys will sign off other devices.
                                    </p>
                                </div>
                                <button className="px-3 py-1.5 bg-white border border-[var(--color-surface-border)] hover:border-[var(--color-surface-border)] text-zinc-600 font-semibold text-[11px] rounded-lg shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer shrink-0">
                                    <Key size={12} />
                                    Renew Key
                                </button>
                            </div>

                            <div className="flex items-center justify-between text-xs py-1 px-1.5">
                                <span className="text-[var(--color-text-muted)] font-medium font-sans">Automatic Station Lockout</span>
                                <span className="font-semibold text-zinc-700 bg-[var(--color-surface-accent-bg)] border border-[var(--color-surface-border)] px-2 py-0.5 rounded">
                                    20 Minutes of Inactivity
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Notification settings card */}
                    <div className="bg-white border border-[var(--color-surface-border)] rounded-2xl p-6 shadow-sm shadow-zinc-100/30">
                        <h3 className="font-display font-semibold text-base text-[var(--color-text-main)] border-b border-[var(--color-surface-border)] pb-3 mb-6 flex items-center gap-2">
                            <Bell size={16} className="text-[var(--color-text-light)]" />
                            Notification alert streams
                        </h3>

                        <div className="space-y-4">
                            <label className="flex items-start gap-3 cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    defaultChecked
                                    className="mt-0.5 w-4 h-4 rounded text-lime-600 border-[var(--color-surface-border)] focus:ring-lime-500 accent-lime-600"
                                />
                                <div>
                                    <span className="text-xs font-semibold text-zinc-700">Audit Desk Audio Alerts</span>
                                    <p className="text-[11px] text-[var(--color-text-light)] font-light mt-0.5">
                                        Pulsing notification beep triggers when a Case rises to Critical classification queue.
                                    </p>
                                </div>
                            </label>

                            <label className="flex items-start gap-3 cursor-pointer select-none border-t border-[var(--color-surface-border)] pt-3.5">
                                <input
                                    type="checkbox"
                                    defaultChecked
                                    className="mt-0.5 w-4 h-4 rounded text-lime-600 border-[var(--color-surface-border)] focus:ring-lime-500 accent-lime-600"
                                />
                                <div>
                                    <span className="text-xs font-semibold text-zinc-700">Supervisor Dispatch Integration</span>
                                    <p className="text-[11px] text-[var(--color-text-light)] font-light mt-0.5">
                                        Forwards review notes context instantly to regional support coordinators when flagged.
                                    </p>
                                </div>
                            </label>
                        </div>
                    </div>

                </div>

                {/* Right Column - Tech Specifications Specsheet */}
                <div className="space-y-6">
                    <div className="bg-zinc-900 border border-[var(--color-surface-border)] rounded-2xl p-6 shadow-md text-white overflow-hidden relative">
                        <div className="absolute inset-0 bg-[radial-gradient(#ffffff04_1px,transparent_1px)] bg-[size:16px_16px] opacity-60"></div>

                        <h3 className="font-display font-bold text-base border-b border-neutral-800 pb-3 mb-5 flex items-center gap-2 relative z-10">
                            <Cpu size={16} className="text-lime-400" />
                            System Information
                        </h3>

                        <div className="space-y-4 text-xs relative z-10">
                            <div className="flex justify-between py-1.5 border-b border-neutral-800/60">
                                <span className="text-zinc-405 font-light">Product Core</span>
                                <span className="font-semibold text-lime-400">SAHAAYA AI Console</span>
                            </div>
                            <div className="flex justify-between py-1.5 border-b border-neutral-800/60">
                                <span className="text-zinc-405 font-light">Triage Model Core</span>
                                <span className="font-semibold font-mono text-zinc-300">v1.2.4-stable</span>
                            </div>
                            <div className="flex justify-between py-1.5 border-b border-neutral-800/60">
                                <span className="text-zinc-405 font-light">Acoustic Parser</span>
                                <span className="font-semibold font-mono text-zinc-300">v2.0-speech</span>
                            </div>
                            <div className="flex justify-between py-1.5 border-b border-neutral-800/60">
                                <span className="text-zinc-405 font-light">NLP Dialects index</span>
                                <span className="font-semibold font-mono text-zinc-300">v1.0 (Hindi/Tamil/Eng)</span>
                            </div>
                            <div className="flex justify-between py-1.5">
                                <span className="text-zinc-405 font-light">Assessment Engine</span>
                                <span className="font-semibold text-lime-400 flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping"></span>
                                    Active v1.0
                                </span>
                            </div>
                        </div>

                        <div className="mt-8 pt-4 border-t border-neutral-800 text-[10px] text-[var(--color-text-muted)] font-mono flex items-center justify-between relative z-10">
                            <span>SECURITY CERTIFICATE: LEVEL 3</span>
                            <RefreshCw size={10} className="text-[var(--color-text-muted)]" />
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default Settings;
