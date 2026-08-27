import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
    Activity,
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
        <div className="min-h-screen bg-[var(--color-surface-base)] flex flex-col font-sans text-[var(--color-text-main)] selection:bg-[var(--color-surface-dark)] selection:text-white">

            {/* Boost Capital Flat Top-Span Navigation */}
            <header className="fixed top-0 left-0 w-full bg-[var(--color-surface-base)]/90 backdrop-blur-md border-b border-[var(--color-surface-border)] px-10 py-5 flex items-center justify-between z-[100]">

                {/* Brand Logo & Name */}
                <Link to="/dashboard" className="flex items-center gap-3">
                    <div className="flex flex-col">
                        <span className="font-sans font-bold tracking-tighter text-[var(--color-text-main)] text-xl leading-none">
                            SAHAAYA AI
                        </span>
                        <span className="text-[10px] font-bold text-[var(--color-accent-violet)] uppercase tracking-[0.2em] mt-1">
                            V3.0 REDESIGN
                        </span>
                    </div>
                </Link>

                {/* Central Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-10 font-bold text-xs uppercase tracking-widest">
                    {navItems.map((item) => {
                        const isActive = currentPath.startsWith(item.path);
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`transition-colors hover:text-[var(--color-accent-violet)] ${isActive
                                    ? 'text-[var(--color-text-main)]'
                                    : 'text-[var(--color-text-muted)]'
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
                        <div className="hidden lg:flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-muted)]">
                            <Shield size={12} className="text-[var(--color-text-main)]" />
                            SYS.SECURE
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="text-right hidden sm:block">
                                <div className="text-xs font-bold uppercase tracking-tight text-[var(--color-text-main)]">{operator.name}</div>
                                <div className="text-[10px] font-bold text-[var(--color-text-muted)] tracking-widest">{operator.id}</div>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="bg-[var(--color-surface-dark)] text-white hover:bg-[var(--color-accent-violet)] text-xs font-bold uppercase tracking-widest px-6 py-2.5 rounded-full transition-colors flex items-center gap-2"
                            >
                                LOGOUT
                            </button>
                        </div>
                    </div>
                )}
            </header>

            {/* Main Workspace Frame */}
            <main className="flex-1 w-full max-w-[1400px] mx-auto px-6 sm:px-10 md:px-12 pt-32 pb-16">
                <div className="animate-fade-in transition-all duration-300 h-full">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default AppShell;
