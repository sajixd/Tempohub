import React, { useState } from 'react';
import { X, Mail, Lock, ArrowRight, Github } from 'lucide-react';
import { Button, Input } from './UI';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLogin: () => void;
    initialView?: 'login' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin, initialView = 'login' }) => {
    const [view, setView] = useState<'login' | 'signup'>(initialView);
    const [isLoading, setIsLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            onLogin();
            onClose();
        }, 1500);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity" 
                onClick={onClose}
            />
            
            <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl animate-slide-up">
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500" />
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="p-8 relative">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-bold text-text">
                            {view === 'login' ? 'Welcome Back' : 'Join TempoHub'}
                        </h2>
                        <button onClick={onClose} className="text-text-muted hover:text-text transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-text-muted">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                                <Input type="email" placeholder="you@example.com" className="pl-10" required />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-text-muted">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                                <Input type="password" placeholder="••••••••" className="pl-10" required />
                            </div>
                        </div>

                        <Button 
                            className="w-full mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 border-0 text-white shadow-lg shadow-indigo-500/20" 
                            isLoading={isLoading}
                            type="submit"
                        >
                            {view === 'login' ? 'Sign In' : 'Create Account'}
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </form>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-border"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-surface px-2 text-text-muted">Or continue with</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <Button variant="secondary" className="w-full" type="button">
                            <Github className="w-4 h-4 mr-2" />
                            GitHub
                        </Button>
                        <Button variant="secondary" className="w-full" type="button">
                            <span className="font-bold mr-2">G</span>
                            Google
                        </Button>
                    </div>

                    <p className="mt-6 text-center text-sm text-text-muted">
                        {view === 'login' ? "Don't have an account? " : "Already have an account? "}
                        <button 
                            type="button"
                            onClick={() => setView(view === 'login' ? 'signup' : 'login')}
                            className="text-primary hover:text-indigo-400 font-medium transition-colors"
                        >
                            {view === 'login' ? 'Sign up' : 'Log in'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};