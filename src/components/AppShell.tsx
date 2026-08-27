import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
    LayoutDashboard,
    Activity,
    Settings as SettingsIcon,
    LogOut,
    ShieldAlert,
    Menu,
    X,
    Headphones,
    User
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
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);

    useEffect(() => {
        const currentOperator = authService.getOperator();
        if (!currentOperator) {
            navigate('/login');
        } else {
            setOperator(currentOperator);
        }
    }, [navigate]);

    const handleLogout = () => {
        authService.logout();
        navigate('/login');
    };

    const navItems = [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { name: 'Voice Analysis', path: '/analysis', icon: Activity },
        { name: 'Settings', path: '/settings', icon: SettingsIcon },
    ];

    const currentPath = location.pathname;

    return (
        <div className="min-h-screen bg-slate-50/50 flex flex-col font-sans">
            {/* Top Header Navigation */}
            <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex items-center justify-between">
                {/* Brand Logo & Name */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-1.5 hover:bg-slate-50 rounded"
                        aria-label="Toggle navigation menu"
                    >
                        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>

                    <Link to="/dashboard" className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-md shadow-teal-600/10">
                            <Headphones size={18} className="stroke-[2.5]" />
                        </div>
                        <div>
                            <span className="font-display font-bold tracking-tight text-lg text-slate-800">
                                SAHAAYA AI
                            </span>
                            <span className="hidden sm:inline-block ml-2 text-xs font-medium px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-100">
                                v1.0
                            </span>
                        </div>
                    </Link>
                </div>

                {/* Global System Status / Title */}
                <div className="hidden lg:flex items-center gap-2 text-xs font-medium text-slate-500 bg-slate-50 px-3.5 py-1.5 rounded-full border border-slate-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>System Triage Engine Active</span>
                    <span className="text-slate-300">|</span>
                    <span>No anomalies detected</span>
                </div>

                {/* Desktop Navigation Links */}
                <nav className="hidden md:flex items-center gap-1.5">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = currentPath.startsWith(item.path);
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${isActive
                                    ? 'bg-teal-50 text-teal-800'
                                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                                    }`}
                            >
                                <Icon size={16} className={isActive ? 'text-teal-600' : 'text-slate-400'} />
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Operator Profile Control */}
                {operator && (
                    <div className="relative">
                        <button
                            onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                            className="flex items-center gap-2.5 text-left p-1 rounded-lg hover:bg-slate-50 transition-colors focus:outline-none"
                            aria-label="Account options menu"
                        >
                            <div className="relative">
                                <img
                                    src={operator.avatarUrl || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=facearea&facepad=2&w=256&h=256&q=80'}
                                    alt={operator.name}
                                    className="w-8 h-8 rounded-full border border-slate-100 object-cover"
                                />
                                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white"></span>
                            </div>
                            <div className="hidden sm:block text-xs">
                                <p className="font-semibold text-slate-800 leading-tight">{operator.name}</p>
                                <p className="text-slate-400 font-normal leading-tight">{operator.id}</p>
                            </div>
                        </button>

                        {/* Account Dropdown Panel */}
                        {userDropdownOpen && (
                            <>
                                <div
                                    className="fixed inset-0 z-30"
                                    onClick={() => setUserDropdownOpen(false)}
                                />
                                <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-100 rounded-xl shadow-lg shadow-slate-100/50 py-1.5 z-40 animate-fade-in focus:outline-none">
                                    <div className="px-4 py-2.5 border-b border-slate-100">
                                        <p className="text-xs text-slate-400">Signed in as</p>
                                        <p className="text-sm font-semibold text-slate-700 leading-snug">{operator.name}</p>
                                        <p className="text-xs text-slate-500 truncate leading-snug">{operator.email}</p>
                                    </div>

                                    <Link
                                        to="/settings"
                                        onClick={() => setUserDropdownOpen(false)}
                                        className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                                    >
                                        <User size={15} />
                                        <span>View Profile</span>
                                    </Link>

                                    <div className="border-t border-slate-100 my-1"></div>

                                    <button
                                        onClick={() => {
                                            setUserDropdownOpen(false);
                                            handleLogout();
                                        }}
                                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors text-left"
                                    >
                                        <LogOut size={15} />
                                        <span>Sign Out</span>
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </header>

            {/* Mobile Drawer Overlay */}
            {mobileMenuOpen && (
                <div className="md:hidden fixed inset-0 z-40 flex">
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-slate-900/35 backdrop-blur-xs transition-opacity"
                        onClick={() => setMobileMenuOpen(false)}
                    />

                    {/* Drawer Menu */}
                    <div className="relative w-64 bg-white min-h-screen shadow-2xl flex flex-col p-5 animate-slide-up">
                        <div className="flex items-center justify-between mb-8">
                            <span className="font-display font-bold text-slate-800">Menu</span>
                            <button
                                onClick={() => setMobileMenuOpen(false)}
                                className="p-1 hover:bg-slate-50 rounded"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <nav className="flex flex-col gap-1 flex-1">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = currentPath.startsWith(item.path);
                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive
                                            ? 'bg-teal-50 text-teal-800'
                                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                                            }`}
                                    >
                                        <Icon size={16} className={isActive ? 'text-teal-600' : 'text-slate-400'} />
                                        <span>{item.name}</span>
                                    </Link>
                                );
                            })}
                        </nav>

                        <div className="border-t border-slate-100 pt-4 flex flex-col gap-3">
                            <div className="flex items-center gap-2.5">
                                <img
                                    src={operator?.avatarUrl || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=facearea&facepad=2&w=256&h=256&q=80'}
                                    alt={operator?.name || 'Operator'}
                                    className="w-9 h-9 rounded-full object-cover"
                                />
                                <div className="text-xs">
                                    <p className="font-semibold text-slate-800 leading-tight">{operator?.name}</p>
                                    <p className="text-slate-400 font-normal leading-tight">{operator?.email}</p>
                                </div>
                            </div>

                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center justify-center gap-2 bg-slate-50 hover:bg-red-50 text-slate-700 hover:text-red-700 font-medium py-2 rounded-lg text-xs transition-colors"
                            >
                                <LogOut size={13} />
                                <span>Log Out</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Workspace Frame */}
            <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6">
                <div className="animate-fade-in">
                    {children}
                </div>
            </main>

            {/* Subtle Footer */}
            <footer className="bg-white border-t border-slate-100 py-3.5 px-6 mt-12 text-center text-xs text-slate-400 flex flex-col sm:flex-row justify-between items-center gap-2 max-w-7xl mx-auto w-full">
                <p>© 2026 Sahaaya AI. All rights reserved.</p>
                <p className="flex items-center gap-2">
                    <ShieldAlert size={12} className="text-slate-400" />
                    <span>Operator Console | Authorized Personnel Only</span>
                </p>
            </footer>
        </div>
    );
};

export default AppShell;
