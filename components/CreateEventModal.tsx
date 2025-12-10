import React, { useState } from 'react';
import { X, Sparkles, Plus, Wand2 } from 'lucide-react';
import { Button, Input, TextArea } from './UI';
import { generateEventDetails } from '../services/geminiService';
import { EventData } from '../types';

interface CreateEventModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (event: EventData) => void;
}

export const CreateEventModal: React.FC<CreateEventModalProps> = ({ isOpen, onClose, onCreate }) => {
    const [title, setTitle] = useState('');
    const [context, setContext] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState<'input' | 'generating'>('input');

    if (!isOpen) return null;

    const handleCreate = async () => {
        if (!title.trim()) return;

        setIsLoading(true);
        setStep('generating');

        try {
            // Generate content using Gemini
            const aiData = await generateEventDetails(title, context);

            const newEvent: EventData = {
                id: Date.now().toString(),
                title: title,
                description: aiData.description,
                date: new Date(Date.now() + 86400000 * (Math.floor(Math.random() * 10) + 1)).toISOString(), // Random date in future
                location: aiData.locationSuggestion,
                imageUrl: aiData.imageUrl,
                tags: aiData.tags,
                attendees: Math.floor(Math.random() * 200) + 10,
                isAiGenerated: true
            };

            onCreate(newEvent);
            
            // Reset and close
            setTitle('');
            setContext('');
            setStep('input');
            onClose();

        } catch (error) {
            console.error("Failed to create event", error);
            // In a real app, show toast error
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
                onClick={!isLoading ? onClose : undefined}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl transition-all animate-slide-up">
                
                {/* Decorative gradients */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <div className="p-2 rounded-lg bg-surface border border-border shadow-sm">
                                <Sparkles className="w-5 h-5 text-primary" />
                            </div>
                            <h2 className="text-xl font-semibold text-text">Create Event</h2>
                        </div>
                        <button 
                            onClick={onClose} 
                            disabled={isLoading}
                            className="text-text-muted hover:text-text transition-colors disabled:opacity-50"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {step === 'input' ? (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-text-muted mb-1.5">Event Title</label>
                                <Input 
                                    placeholder="e.g. Cyberpunk Rooftop Mixer" 
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    autoFocus
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-text-muted mb-1.5">Context / Vibe (Optional)</label>
                                <TextArea 
                                    placeholder="Tell the AI more... e.g. 'Dark and mysterious atmosphere, minimal techno music'"
                                    rows={3}
                                    value={context}
                                    onChange={(e) => setContext(e.target.value)}
                                />
                                <p className="text-xs text-text-muted mt-2">
                                    Our AI will generate the description, tags, location, and cover art automatically.
                                </p>
                            </div>

                            <div className="pt-4 flex justify-end gap-3">
                                <Button variant="ghost" onClick={onClose}>Cancel</Button>
                                <Button onClick={handleCreate} disabled={!title}>
                                    <Wand2 className="w-4 h-4 mr-2" />
                                    Generate with AI
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12 space-y-4">
                            <div className="relative">
                                <div className="absolute inset-0 bg-indigo-500 blur-xl opacity-20 animate-pulse" />
                                <div className="relative w-16 h-16 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
                                <Sparkles className="absolute inset-0 m-auto w-6 h-6 text-primary animate-pulse" />
                            </div>
                            <div className="text-center space-y-1">
                                <h3 className="text-lg font-medium text-text">Crafting your event...</h3>
                                <p className="text-sm text-text-muted">Generating 3D cover art and details</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};