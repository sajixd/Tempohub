import React, { useState } from 'react';
import { X, Calendar, MapPin, Users, Tag, Share2, ArrowUpRight, CheckCircle2, Lock } from 'lucide-react';
import { Button, Badge } from './UI';
import { EventData } from '../types';

interface EventDetailsModalProps {
    event: EventData | null;
    onClose: () => void;
    isLoggedIn?: boolean;
    onLoginRequest?: () => void;
}

export const EventDetailsModal: React.FC<EventDetailsModalProps> = ({ event, onClose, isLoggedIn = false, onLoginRequest }) => {
    const [isRegistered, setIsRegistered] = useState(false);
    
    // Reset registration state when opening new event
    // In a real app this would check backend status
    React.useEffect(() => {
        setIsRegistered(false);
    }, [event?.id]);

    if (!event) return null;

    const handleAction = () => {
        if (!isLoggedIn) {
            onLoginRequest?.();
        } else {
            setIsRegistered(true);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
            <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
                onClick={onClose}
            />
            <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-border bg-background shadow-2xl animate-slide-up no-scrollbar flex flex-col md:flex-row overflow-hidden">
                
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/50 text-text/70 hover:bg-background/80 hover:text-text backdrop-blur-md transition-all border border-border"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Image Section */}
                <div className="w-full md:w-1/2 h-64 md:h-auto relative">
                    <img 
                        src={event.imageUrl} 
                        alt={event.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent md:bg-gradient-to-r md:from-background md:via-transparent md:to-transparent" />
                </div>

                {/* Content Section */}
                <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col bg-background">
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                        {event.tags.map(tag => (
                            <Badge key={tag}>{tag}</Badge>
                        ))}
                        {event.isAiGenerated && <Badge variant="ai">AI Generated</Badge>}
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold text-text mb-6 leading-tight">
                        {event.title}
                    </h2>

                    <div className="space-y-4 mb-8">
                        <div className="flex items-center text-text-muted">
                            <div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center mr-4 border border-border">
                                <Calendar className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-wider opacity-70">Date & Time</p>
                                <p className="font-medium text-text">{new Date(event.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute:'2-digit' })}</p>
                            </div>
                        </div>
                        <div className="flex items-center text-text-muted">
                            <div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center mr-4 border border-border">
                                <MapPin className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-wider opacity-70">Location</p>
                                <p className="font-medium text-text">{event.location}</p>
                            </div>
                        </div>
                        <div className="flex items-center text-text-muted">
                            <div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center mr-4 border border-border">
                                <Users className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-wider opacity-70">Attendees</p>
                                <p className="font-medium text-text">{event.attendees + (isRegistered ? 1 : 0)} registered</p>
                            </div>
                        </div>
                    </div>

                    <div className="prose prose-sm max-w-none mb-8 text-text-muted leading-relaxed border-t border-border pt-6">
                        <p className="text-lg text-text mb-2">{event.description}</p>
                        <p>
                            Join us for an unforgettable experience. This event brings together the best minds and creatives in the field. Don't miss out on the opportunity to network and explore new horizons.
                        </p>
                    </div>

                    <div className="mt-auto flex items-center gap-3">
                        <Button 
                            className={`flex-1 py-3 text-base h-12 transition-all duration-300 ${isRegistered ? 'bg-green-500/10 text-green-500 border border-green-500/20 hover:bg-green-500/20' : ''}`}
                            onClick={handleAction}
                            disabled={isRegistered}
                        >
                            {isRegistered ? (
                                <>
                                    <CheckCircle2 className="w-4 h-4 mr-2" />
                                    You're Attending
                                </>
                            ) : !isLoggedIn ? (
                                <>
                                    <Lock className="w-4 h-4 mr-2 opacity-70" />
                                    Login to Attend
                                </>
                            ) : (
                                <>
                                    Get Tickets
                                    <ArrowUpRight className="w-4 h-4 ml-2" />
                                </>
                            )}
                        </Button>
                        <Button variant="secondary" className="px-4 h-12">
                            <Share2 className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};