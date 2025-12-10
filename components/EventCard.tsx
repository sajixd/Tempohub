import React from 'react';
import { Calendar, MapPin, Users, Sparkles, ArrowRight } from 'lucide-react';
import { EventData } from '../types';
import { Card, Badge, Button } from './UI';

interface EventCardProps {
    event: EventData;
    onViewDetails: () => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onViewDetails }) => {
    return (
        <Card className="h-full flex flex-col" onClick={onViewDetails}>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-surface">
                <img 
                    src={event.imageUrl} 
                    alt={event.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-60" />
                
                <div className="absolute top-3 right-3 flex gap-2">
                    {event.isAiGenerated && (
                        <Badge variant="ai">
                            <Sparkles className="w-3 h-3 mr-1" />
                            AI Generated
                        </Badge>
                    )}
                </div>
            </div>

            <div className="flex flex-col flex-1 p-4">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-primary flex items-center">
                        <Calendar className="w-3 h-3 mr-1.5" />
                        {new Date(event.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit' })}
                    </span>
                    <span className="text-xs text-text-muted flex items-center">
                        <Users className="w-3 h-3 mr-1.5" />
                        {event.attendees}
                    </span>
                </div>

                <h3 className="text-lg font-semibold text-text mb-2 leading-tight group-hover:text-primary transition-colors">
                    {event.title}
                </h3>
                
                <p className="text-sm text-text-muted line-clamp-2 mb-4 flex-1">
                    {event.description}
                </p>

                <div className="mb-4 pt-2">
                     <Button 
                        variant="ghost" 
                        className="w-full text-xs py-2.5 h-10 font-semibold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-[length:200%_auto] hover:bg-right transition-[background-position] duration-500 rounded-lg shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 border-0 group/btn"
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent card click if we keep card clickable
                            onViewDetails();
                        }}
                    >
                        View Details
                        <ArrowRight className="w-3.5 h-3.5 ml-2 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </Button>
                </div>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                    <div className="flex items-center text-xs text-text-muted">
                        <MapPin className="w-3 h-3 mr-1.5" />
                        <span className="truncate max-w-[120px]">{event.location}</span>
                    </div>
                    
                    <div className="flex -space-x-2">
                         {/* Fake avatars for "social proof" feel */}
                         {[...Array(3)].map((_, i) => (
                             <div key={i} className="w-6 h-6 rounded-full border border-surface bg-surface overflow-hidden ring-2 ring-background">
                                 <img src={`https://picsum.photos/30/30?random=${i + Number(event.id)}`} alt="User" className="w-full h-full object-cover opacity-80" />
                             </div>
                         ))}
                    </div>
                </div>
            </div>
        </Card>
    );
};