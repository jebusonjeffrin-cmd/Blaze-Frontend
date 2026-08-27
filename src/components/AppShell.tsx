import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
    Activity,
    LogOut,
    Shield,
    Database,
    Network
} from 'lucide-react';
import type { Operator } from '../types';
import { authService } from '../services/authService';

interface AppShellProps {
    children: React.ReactNode;
}

const AppShell: React.FC<AppShellProps> = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [operator, setOperator] = useState<Operator | null>(null);

    useEffect(() => {
        const currentOperator = authService.getOperator();
        if (!currentOperator) navigate('/login');
        else setOperator(currentOperator);
    }, [navigate]);

    const handleLogout = () => {
        authService.logout();
        navigate('/login');
    };

    const navItems = [
        { name: 'Dashboard', path: '/dashboard', icon: Activity },
        { name: 'Voice Analysis', path: '/analysis', icon: Network },
        { name: 'Settings', path: '/settings', icon: Database },
    ];

    const currentPath = location.pathname;

    return (
        <div className="min-h-screen bg-[var(--color-surface-base)] flex flex-col font-sans text-[var(--color-text-main)] selection:bg-[var(--color-accent-violet)] selection:text-white">

            {/* Connectr V2 Full Span Navigation */}
            <header className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur-xl border-b border-[var(--color-surface-border)] px-8 py-3 flex items-center justify-between z-[100] shadow-sm">

                {/* Brand Logo & Name */}
                <Link to="/dashboard" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-full bg-[var(--color-accent-violet)] overflow-hidden flex items-center justify-center relative shadow-sm">
                        <Activity size={18} className="text-white relative z-10" />
                        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-display font-bold tracking-tight text-[var(--color-text-main)] text-lg leading-tight">
                            Sahaaya AI
                        </span>
                        <span className="text-[10px] font-semibold text-[var(--color-accent-violet)] tracking-widest mt-0.5">V2.0 CONNECT</span>
                    </div>
                </Link>

                {/* Central Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8 font-medium text-sm">
                    {navItems.map((item) => {
                        const isActive = currentPath.startsWith(item.path);
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`transition-all pb-1 hover:text-[var(--color-accent-violet)] ${isActive
                                        ? 'text-[var(--color-accent-violet)] border-b-2 border-[var(--color-accent-violet)]'
                                        : 'text-[var(--color-text-muted)] border-b-2 border-transparent'
                                    }`}
                            >
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* Operator Session Metrics / Logout */}
                {operator && (
                    <div className="flex items-center gap-6">
                        <div className="hidden lg:flex items-center gap-2 text-xs font-semibold text-[var(--color-text-muted)] bg-[var(--color-surface-accent-bg)] px-3 py-1.5 rounded-full border border-[var(--color-surface-border)]">
                            <Shield size={12} className="text-[var(--color-accent-violet)]" />
                            Sys.Secure
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <div className="text-sm font-bold text-[var(--color-text-main)]">{operator.name}</div>
                                <div className="text-[10px] font-semibold text-[var(--color-text-light)] uppercase tracking-wider">{operator.id}</div>
                            </div>
                            <div className="w-9 h-9 rounded-full bg-[var(--color-surface-dark)] flex items-center justify-center text-white text-sm font-bold shadow-md">
                                {operator.name.charAt(0)}
                            </div>
                            <button
                                onClick={handleLogout}
                                className="w-9 h-9 flex items-center justify-center rounded-full bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all ml-1 shadow-sm"
                                title="Terminate Session"
                            >
                                <LogOut size={14} />
                            </button>
                        </div>
                    </div>
                )}
            </header>

            {/* Main Workspace Frame */}
            <main className="flex-1 w-full max-w-[1300px] mx-auto px-4 sm:px-6 md:px-8 pt-24 pb-16">
                <div className="animate-fade-in transition-all duration-300 h-full">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default AppShell;
