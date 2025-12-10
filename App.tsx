
import React, { useState, useEffect } from 'react';
import { Plus, Search, Command, Zap, Filter, LayoutGrid, List as ListIcon, User, LogOut, Sparkles, ArrowRight, Sun, Moon } from 'lucide-react';
import { EventCard } from './components/EventCard';
import { CreateEventModal } from './components/CreateEventModal';
import { EventDetailsModal } from './components/EventDetailsModal';
import { AuthModal } from './components/AuthModal';
import { CommunityView } from './components/CommunityView';
import { Button, Input } from './components/UI';
import { EventData } from './types';

// Initial Mock Data with music-focused events
const INITIAL_EVENTS: EventData[] = [
    {
        id: '1',
        title: 'Cyberpunk Techno Bunker',
        description: 'Hard techno and industrial beats in an underground concrete void. Dress code: All black.',
        date: new Date(Date.now() + 100000000).toISOString(),
        location: 'Sector 7 Warehouse',
        imageUrl: 'https://images.unsplash.com/photo-1571266028243-371695039989?q=80&w=1000&auto=format&fit=crop',
        tags: ['Techno', 'Electronic', 'Nightlife'],
        attendees: 1240,
        isAiGenerated: false
    },
    {
        id: '2',
        title: 'Midnight Jazz Collective',
        description: 'A smooth, smoky evening featuring the city\'s top saxophonists and improv artists.',
        date: new Date(Date.now() + 200000000).toISOString(),
        location: 'The Blue Note Lounge',
        imageUrl: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=1000&auto=format&fit=crop',
        tags: ['Jazz', 'Live Music', 'Chill'],
        attendees: 350,
        isAiGenerated: false
    },
    {
        id: '3',
        title: 'Neon Indie Rock Showcase',
        description: 'Discover the next big alternative bands before they go mainstream. Lo-fi vibes and craft drinks.',
        date: new Date(Date.now() + 300000000).toISOString(),
        location: 'Electric Avenue Hall',
        imageUrl: 'https://images.unsplash.com/photo-1459749411177-0473ef7161cf?q=80&w=1000&auto=format&fit=crop',
        tags: ['Indie', 'Rock', 'Alternative'],
        attendees: 800,
        isAiGenerated: false
    },
    {
        id: '4',
        title: 'Symphony of the Future',
        description: 'A neoclassical experience blending a 50-piece orchestra with ambient electronic synthesizers.',
        date: new Date(Date.now() + 400000000).toISOString(),
        location: 'Grand Opera House',
        imageUrl: 'https://images.unsplash.com/photo-1507838153414-b4b713384ebd?q=80&w=1000&auto=format&fit=crop',
        tags: ['Classical', 'Ambient', 'Experimental'],
        attendees: 1500,
        isAiGenerated: false
    },
    {
        id: '5',
        title: 'Deep House Sunset Session',
        description: 'Melodic house music on the rooftop as the sun goes down. Tropical vibes.',
        date: new Date(Date.now() + 150000000).toISOString(),
        location: 'Skyline Terrace',
        imageUrl: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=1000&auto=format&fit=crop',
        tags: ['Electronic', 'House', 'Rooftop'],
        attendees: 620,
        isAiGenerated: false
    },
    {
        id: '6',
        title: 'Underground Hip-Hop Battle',
        description: 'Raw lyrical talent and classic boom-bap beats. The city\'s best MCs compete.',
        date: new Date(Date.now() + 250000000).toISOString(),
        location: 'The Basement',
        imageUrl: 'https://images.unsplash.com/photo-1525362081669-2b4764d5d668?q=80&w=1000&auto=format&fit=crop',
        tags: ['Hip Hop', 'Rap', 'Urban'],
        attendees: 900,
        isAiGenerated: false
    }
];

const CATEGORIES = ['All', 'Techno', 'Jazz', 'Electronic', 'Rock', 'Indie', 'Classical', 'Hip Hop', 'Ambient'];

const App: React.FC = () => {
    const [events, setEvents] = useState<EventData[]>(INITIAL_EVENTS);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [selectedCategory, setSelectedCategory] = useState('All');
    
    // View State
    const [currentView, setCurrentView] = useState<'home' | 'community'>('home');

    // Auth State
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [authModalView, setAuthModalView] = useState<'login' | 'signup'>('login');

    // Theme State
    const [isDarkMode, setIsDarkMode] = useState(true);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    // Apply theme class to HTML element
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    // Filter events based on search and category
    const filteredEvents = events.filter(e => {
        const matchesSearch = e.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              e.description.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesCategory = selectedCategory === 'All' || 
                                e.tags.some(tag => tag.toLowerCase() === selectedCategory.toLowerCase()) || 
                                e.tags.includes(selectedCategory);

        return matchesSearch && matchesCategory;
    });

    const handleCreateEvent = (newEvent: EventData) => {
        setEvents([newEvent, ...events]);
    };

    const handleAuthAction = (view: 'login' | 'signup') => {
        setAuthModalView(view);
        setIsAuthModalOpen(true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    return (
        <div className="min-h-screen bg-background text-text bg-gradient-animate selection:bg-indigo-500/30 flex flex-col transition-colors duration-300">
            
            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => {
                        window.scrollTo(0,0);
                        setCurrentView('home');
                    }}>
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                            <Zap className="w-5 h-5 text-white fill-white" />
                        </div>
                        <span className="font-bold text-lg tracking-tight text-text">TempoHub</span>
                    </div>

                    <div className="flex items-center gap-3">
                         {/* Theme Toggle */}
                         <button 
                            onClick={toggleTheme}
                            className="p-2 rounded-full text-text-muted hover:text-text hover:bg-surface transition-all"
                            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                        >
                            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>

                        <div className="h-6 w-px bg-border mx-1"></div>

                        {isLoggedIn ? (
                            <>
                                <Button variant="secondary" className="hidden sm:flex" onClick={() => setIsCreateModalOpen(true)}>
                                    <Plus className="w-4 h-4 mr-2" />
                                    Create
                                </Button>
                                <div className="group relative">
                                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 p-[1px] cursor-pointer">
                                        <div className="w-full h-full rounded-full bg-surface flex items-center justify-center overflow-hidden">
                                             <img src="https://picsum.photos/100/100" alt="Profile" className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity" />
                                        </div>
                                    </div>
                                    {/* Dropdown for Logout */}
                                    <div className="absolute right-0 mt-2 w-48 py-1 bg-surface border border-border rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right z-50">
                                        <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-text-muted hover:text-text hover:bg-black/5 dark:hover:bg-white/5 flex items-center">
                                            <LogOut className="w-4 h-4 mr-2" />
                                            Sign Out
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <Button variant="ghost" className="hidden sm:flex" onClick={() => handleAuthAction('login')}>
                                    Log In
                                </Button>
                                <Button variant="primary" onClick={() => handleAuthAction('signup')}>
                                    Sign Up
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            <main className="flex-1 pt-16">
                
                {/* Community CTA Section - Only Show on Home */}
                {currentView === 'home' && (
                    <div className="relative border-b border-border bg-surface/50 dark:bg-[#08080a] transition-colors duration-300">
                        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent pointer-events-none" />
                        <div className="max-w-7xl mx-auto px-4 py-16 md:py-20 flex flex-col items-center text-center relative z-10">
                            <div className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-indigo-500/10 text-indigo-500 dark:text-indigo-300 border border-indigo-500/20 mb-6 backdrop-blur-md">
                                <Sparkles className="w-3 h-3 mr-2" />
                                The Future of Music Events
                            </div>
                            <h1 className="text-5xl md:text-7xl font-bold text-text mb-6 tracking-tight">
                                Feel the Rhythm of <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">TempoHub</span>
                            </h1>
                            <p className="text-lg md:text-xl text-text-muted max-w-2xl mb-8 leading-relaxed">
                                Connect with music lovers, attend exclusive underground gigs, and experience the next generation of sound.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                                <button 
                                    onClick={() => setCurrentView('community')}
                                    className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-text hover:text-white transition-all duration-200 bg-indigo-600 rounded-full hover:bg-indigo-500 hover:scale-105 hover:shadow-[0_0_20px_-5px_rgba(79,70,229,0.5)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 ring-offset-background text-white overflow-hidden"
                                >
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                        <div className="w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-700"></div>
                                    </div>
                                    
                                    {/* Visualizer Effect */}
                                    <div className="flex items-end gap-1 h-4 mr-3 opacity-80">
                                        <div className="w-1 bg-white rounded-t-sm music-bar-1"></div>
                                        <div className="w-1 bg-white rounded-t-sm music-bar-2"></div>
                                        <div className="w-1 bg-white rounded-t-sm music-bar-3"></div>
                                        <div className="w-1 bg-white rounded-t-sm music-bar-4"></div>
                                    </div>

                                    Join Community Now
                                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {currentView === 'community' ? (
                     <CommunityView />
                ) : (
                    /* Main Content Area */
                    <div className="max-w-7xl mx-auto px-4 py-12">
                        {/* Filter & Search Header */}
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                            <div className="space-y-1">
                                <h2 className="text-2xl font-bold text-text">Discover</h2>
                                <p className="text-text-muted text-sm">Find your next sonic experience</p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 flex-1 md:justify-end">
                                <div className="relative w-full max-w-md group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Search className="h-4 w-4 text-text-muted group-focus-within:text-primary transition-colors" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Search events..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="block w-full pl-10 pr-4 py-2.5 bg-surface border border-border rounded-lg text-sm text-text placeholder-text-muted focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                                    />
                                </div>
                                
                                {/* Hidden on mobile (hidden md:flex) */}
                                <div className="hidden md:flex items-center gap-1 bg-surface p-1 rounded-lg border border-border">
                                    <button 
                                        onClick={() => setViewMode('grid')}
                                        className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-background text-text shadow-sm' : 'text-text-muted hover:text-text'}`}
                                    >
                                        <LayoutGrid className="w-4 h-4" />
                                    </button>
                                    <button 
                                        onClick={() => setViewMode('list')}
                                        className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-background text-text shadow-sm' : 'text-text-muted hover:text-text'}`}
                                    >
                                        <ListIcon className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Centered Category Filter Bar */}
                        <div className="mb-10 flex flex-col items-center">
                            <h3 className="text-xs font-semibold text-text-muted mb-4 uppercase tracking-widest opacity-70">
                                Filter by Categories
                            </h3>
                            <div className="w-full overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 flex justify-center">
                                <div className="flex items-center gap-2">
                                    {CATEGORIES.map((category) => (
                                        <button
                                            key={category}
                                            onClick={() => setSelectedCategory(category)}
                                            className={`
                                                relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap border
                                                ${selectedCategory === category 
                                                    ? 'bg-primary border-primary text-white shadow-lg shadow-primary/25 scale-105' 
                                                    : 'bg-surface border-border text-text-muted hover:text-text hover:border-primary/30 hover:bg-surface/80'}
                                            `}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Event Grid */}
                        <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                            {filteredEvents.map((event) => (
                                <div key={event.id} className="animate-fade-in">
                                    <EventCard 
                                        event={event} 
                                        onViewDetails={() => setSelectedEvent(event)}
                                    />
                                </div>
                            ))}
                            
                            {filteredEvents.length === 0 && (
                                <div className="col-span-full py-24 text-center rounded-2xl border border-border bg-surface/30 backdrop-blur-sm border-dashed">
                                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-surface mb-6 border border-border">
                                        <Search className="w-8 h-8 text-text-muted/50" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-text mb-2">No events found</h3>
                                    <p className="text-text-muted max-w-md mx-auto">
                                        We couldn't find any events matching "{searchQuery}" {selectedCategory !== 'All' ? `in ${selectedCategory}` : ''}.
                                        <br />Try adjusting your filters or create a new event.
                                    </p>
                                    <Button 
                                        variant="secondary" 
                                        className="mt-6"
                                        onClick={() => {
                                            setSearchQuery('');
                                            setSelectedCategory('All');
                                        }}
                                    >
                                        Clear Filters
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </main>

            <CreateEventModal 
                isOpen={isCreateModalOpen} 
                onClose={() => setIsCreateModalOpen(false)} 
                onCreate={handleCreateEvent}
            />
            
            <EventDetailsModal
                event={selectedEvent}
                onClose={() => setSelectedEvent(null)}
                isLoggedIn={isLoggedIn}
                onLoginRequest={() => {
                    setSelectedEvent(null);
                    handleAuthAction('login');
                }}
            />

            <AuthModal 
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
                onLogin={() => setIsLoggedIn(true)}
                initialView={authModalView}
            />
        </div>
    );
};

export default App;
