import React from 'react';
import { Loader2 } from 'lucide-react';

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'ghost', isLoading?: boolean }> = ({ 
    children, 
    className = '', 
    variant = 'primary', 
    isLoading = false,
    ...props 
}) => {
    const baseStyle = "inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95";
    
    // Updated variants for light/dark compatibility
    const variants = {
        primary: "bg-text text-background hover:opacity-90 focus:ring-text ring-offset-background shadow-sm",
        secondary: "bg-surface text-text hover:bg-black/5 dark:hover:bg-white/10 border border-border focus:ring-text-muted ring-offset-background",
        ghost: "bg-transparent text-text-muted hover:text-text hover:bg-black/5 dark:hover:bg-white/5 focus:ring-text-muted ring-offset-background"
    };

    return (
        <button 
            className={`${baseStyle} ${variants[variant]} ${className}`}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {children}
        </button>
    );
};

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ className = '', ...props }) => {
    return (
        <input 
            className={`w-full bg-surface/50 border border-border rounded-lg px-4 py-2.5 text-text placeholder-text-muted focus:border-primary/50 focus:ring-1 focus:ring-primary/50 focus:outline-none transition-all duration-200 backdrop-blur-sm ${className}`}
            {...props}
        />
    );
};

export const TextArea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = ({ className = '', ...props }) => {
    return (
        <textarea 
            className={`w-full bg-surface/50 border border-border rounded-lg px-4 py-2.5 text-text placeholder-text-muted focus:border-primary/50 focus:ring-1 focus:ring-primary/50 focus:outline-none transition-all duration-200 backdrop-blur-sm resize-none ${className}`}
            {...props}
        />
    );
};

export const Card: React.FC<{ children: React.ReactNode, className?: string, onClick?: () => void }> = ({ children, className = '', onClick }) => {
    return (
        <div 
            onClick={onClick}
            className={`group relative overflow-hidden rounded-2xl border border-border bg-surface/80 p-1 backdrop-blur-xl transition-all duration-300 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 dark:hover:shadow-primary/10 ${onClick ? 'cursor-pointer' : ''} ${className}`}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none dark:from-white/5" />
            {children}
        </div>
    );
};

export const Badge: React.FC<{ children: React.ReactNode, variant?: 'default' | 'ai' }> = ({ children, variant = 'default' }) => {
    const styles = {
        default: "bg-surface text-text-muted border-border border",
        ai: "bg-indigo-500/10 text-indigo-500 dark:text-indigo-300 border-indigo-500/20 shadow-[0_0_10px_-3px_rgba(99,102,241,0.3)] border"
    };
    
    return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium backdrop-blur-md ${styles[variant]}`}>
            {children}
        </span>
    );
};