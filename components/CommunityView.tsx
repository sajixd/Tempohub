import React, { useState } from 'react';
import { 
    MessageSquare, Users, Home, Bell, Mail, Search, 
    MoreHorizontal, Heart, MessageCircle, Share2, 
    Image as ImageIcon, Send, CheckCircle2, Pin,
    BarChart2, User as UserIcon, Plus, Radio
} from 'lucide-react';
import { Card, Button, Input, Badge } from './UI';

// --- Types ---
interface User {
    id: string;
    name: string;
    handle: string;
    avatar: string;
    bio?: string;
    isVerified?: boolean;
}

interface Post {
    id: string;
    author: User;
    content: string;
    image?: string;
    timestamp: string;
    likes: number;
    comments: number;
    isLiked?: boolean;
    type: 'text' | 'image' | 'poll';
    pollOptions?: { id: string; text: string; votes: number }[];
    totalVotes?: number;
    isPinned?: boolean;
}

interface Message {
    id: string;
    senderId: string;
    text: string;
    timestamp: string;
}

interface Chat {
    id: string;
    user: User;
    lastMessage: string;
    unread: number;
    messages: Message[];
}

// --- Mock Data ---
const CURRENT_USER: User = {
    id: 'me',
    name: 'Alex Raver',
    handle: '@alex_techno',
    avatar: 'https://picsum.photos/200/200?random=99',
    bio: 'Techno enthusiast 🎵 | Night owl 🦉'
};

const MOCK_USERS: User[] = [
    { id: '1', name: 'Sarah Jenkins', handle: '@sarah_j', avatar: 'https://picsum.photos/200/200?random=1' },
    { id: '2', name: 'Mike Chen', handle: '@chen_beats', avatar: 'https://picsum.photos/200/200?random=2' },
    { id: '3', name: 'TempoHub Admin', handle: '@admin', avatar: 'https://picsum.photos/200/200?random=3', isVerified: true },
];

const INITIAL_POSTS: Post[] = [
    {
        id: '101',
        author: MOCK_USERS[2],
        content: 'Which genre should we feature for next week\'s spotlight event?',
        timestamp: '1h ago',
        likes: 156,
        comments: 42,
        type: 'poll',
        pollOptions: [
            { id: 'opt1', text: 'Industrial Techno', votes: 65 },
            { id: 'opt2', text: 'Deep House', votes: 20 },
            { id: 'opt3', text: 'Drum & Bass', votes: 15 }
        ],
        totalVotes: 100,
        isPinned: true
    },
    {
        id: '1',
        author: MOCK_USERS[0],
        content: 'Just secured tickets for the Cyberpunk Bunker event! Who else is going? 🎫✨ #TempoHub',
        timestamp: '2h ago',
        likes: 24,
        comments: 5,
        type: 'text'
    },
    {
        id: '2',
        author: MOCK_USERS[1],
        content: 'The visuals at last night\'s show were absolutely insane. Unmatched vibe.',
        image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000&auto=format&fit=crop',
        timestamp: '4h ago',
        likes: 89,
        comments: 12,
        type: 'image'
    }
];

const MOCK_CHATS: Chat[] = [
    {
        id: 'c1',
        user: MOCK_USERS[0],
        lastMessage: 'Are you going to the afterparty?',
        unread: 2,
        messages: [
            { id: 'm1', senderId: '1', text: 'Hey Alex!', timestamp: '10:00 AM' },
            { id: 'm2', senderId: 'me', text: 'Yo Sarah, what\'s up?', timestamp: '10:05 AM' },
            { id: 'm3', senderId: '1', text: 'Are you going to the afterparty?', timestamp: '10:06 AM' }
        ]
    },
    {
        id: 'c2',
        user: MOCK_USERS[1],
        lastMessage: 'Sent you the track ID.',
        unread: 0,
        messages: []
    }
];

const VERIFIED_UPDATES = [
    { id: 'u1', text: 'Server maintenance scheduled for 3 AM EST.', date: 'Today' },
    { id: 'u2', text: 'New "Dark Mode" features are live!', date: 'Yesterday' }
];

// --- Components ---

export const CommunityView: React.FC = () => {
    const [activeView, setActiveView] = useState<'feed' | 'messages' | 'groups' | 'profile' | 'updates'>('feed');

    return (
        <div className="max-w-6xl mx-auto px-0 md:px-4 py-0 md:py-6 h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] min-h-[500px] relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full pb-16 md:pb-0">
                
                {/* Left Sidebar - Navigation (Desktop) */}
                <div className="hidden lg:flex lg:col-span-3 flex-col gap-4 h-full">
                    <Card className="p-4 flex flex-col gap-1">
                        <NavButton icon={<Home />} label="Home Feed" active={activeView === 'feed'} onClick={() => setActiveView('feed')} />
                        <NavButton icon={<Mail />} label="Messages" active={activeView === 'messages'} onClick={() => setActiveView('messages')} badge={2} />
                        <NavButton icon={<Users />} label="Groups" active={activeView === 'groups'} onClick={() => setActiveView('groups')} />
                        <NavButton icon={<UserIcon />} label="Profile" active={activeView === 'profile'} onClick={() => setActiveView('profile')} />
                    </Card>

                    <Card className="p-5 mt-auto">
                        <div className="flex items-center gap-3 mb-4">
                            <img src={CURRENT_USER.avatar} alt="Profile" className="w-12 h-12 rounded-full border border-border" />
                            <div className="overflow-hidden">
                                <h3 className="font-bold text-text truncate">{CURRENT_USER.name}</h3>
                                <p className="text-xs text-text-muted truncate">{CURRENT_USER.handle}</p>
                            </div>
                        </div>
                        <div className="flex justify-between text-sm text-text-muted text-center">
                            <div>
                                <span className="block font-bold text-text">142</span>
                                <span className="text-xs">Following</span>
                            </div>
                            <div>
                                <span className="block font-bold text-text">8.5k</span>
                                <span className="text-xs">Followers</span>
                            </div>
                            <div>
                                <span className="block font-bold text-text">34</span>
                                <span className="text-xs">Events</span>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Center Content - Scrollable */}
                <div className="col-span-1 lg:col-span-6 h-full flex flex-col overflow-hidden md:rounded-2xl border-x md:border border-border bg-background/50 backdrop-blur-sm shadow-xl">
                    {activeView === 'feed' && <Feed />}
                    {activeView === 'messages' && <Messages />}
                    {activeView === 'groups' && <Groups />}
                    {activeView === 'profile' && <div className="p-10 text-center text-text-muted">Profile View (Coming Soon)</div>}
                    {activeView === 'updates' && (
                        <div className="p-4 space-y-4">
                            <h2 className="text-lg font-bold text-text flex items-center mb-4">
                                <CheckCircle2 className="w-5 h-5 mr-2 text-primary" />
                                Verified Updates
                            </h2>
                            {VERIFIED_UPDATES.map(update => (
                                <Card key={update.id} className="p-4 border-l-4 border-l-primary">
                                    <p className="text-sm text-text leading-snug">{update.text}</p>
                                    <p className="text-xs text-text-muted mt-2">{update.date}</p>
                                </Card>
                            ))}
                            <div className="mt-8">
                                <h3 className="font-bold text-text mb-3 text-sm">Who to follow</h3>
                                <div className="space-y-3">
                                    {MOCK_USERS.map(user => (
                                        <Card key={user.id} className="p-3 flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full bg-surface" />
                                                <div className="text-xs">
                                                    <p className="font-medium text-text">{user.name}</p>
                                                    <p className="text-text-muted">{user.handle}</p>
                                                </div>
                                            </div>
                                            <Button variant="secondary" className="h-7 px-2 text-xs">Follow</Button>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Sidebar - Updates & Suggestions (Desktop) */}
                <div className="hidden lg:flex lg:col-span-3 flex-col gap-4 h-full overflow-y-auto no-scrollbar">
                    {/* Verified Updates */}
                    <Card className="p-4 border-l-4 border-l-primary">
                        <h3 className="font-bold text-text mb-3 flex items-center">
                            <CheckCircle2 className="w-4 h-4 mr-2 text-primary" />
                            Verified Updates
                        </h3>
                        <div className="space-y-4">
                            {VERIFIED_UPDATES.map(update => (
                                <div key={update.id} className="relative pl-4 border-l border-border">
                                    <div className="absolute -left-[1px] top-1.5 w-1.5 h-1.5 rounded-full bg-primary" />
                                    <p className="text-sm text-text leading-snug">{update.text}</p>
                                    <p className="text-xs text-text-muted mt-1">{update.date}</p>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Who to Follow */}
                    <Card className="p-4">
                        <h3 className="font-bold text-text mb-3 text-sm">Who to follow</h3>
                        <div className="space-y-3">
                            {MOCK_USERS.map(user => (
                                <div key={user.id} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full bg-surface" />
                                        <div className="text-xs">
                                            <p className="font-medium text-text">{user.name}</p>
                                            <p className="text-text-muted">{user.handle}</p>
                                        </div>
                                    </div>
                                    <Button variant="secondary" className="h-7 px-2 text-xs">Follow</Button>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>

            {/* Mobile Bottom Nav */}
            <div className="fixed bottom-0 left-0 right-0 h-16 bg-surface/90 backdrop-blur-md border-t border-border flex lg:hidden items-center justify-around z-50 pb-safe">
                <MobileNavBtn icon={<Home />} label="Feed" active={activeView === 'feed'} onClick={() => setActiveView('feed')} />
                <MobileNavBtn icon={<Mail />} label="Msgs" active={activeView === 'messages'} onClick={() => setActiveView('messages')} badge={2} />
                <MobileNavBtn icon={<Users />} label="Groups" active={activeView === 'groups'} onClick={() => setActiveView('groups')} />
                <MobileNavBtn icon={<Radio />} label="Updates" active={activeView === 'updates'} onClick={() => setActiveView('updates')} />
                <MobileNavBtn icon={<UserIcon />} label="Profile" active={activeView === 'profile'} onClick={() => setActiveView('profile')} />
            </div>
        </div>
    );
};

// --- Sub-Components ---

const NavButton: React.FC<{ icon: React.ReactNode, label: string, active?: boolean, onClick: () => void, badge?: number }> = ({ icon, label, active, onClick, badge }) => (
    <button 
        onClick={onClick}
        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${active ? 'bg-primary/10 text-primary font-medium' : 'text-text-muted hover:bg-surface hover:text-text'}`}
    >
        <div className="flex items-center gap-3">
            {React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement<{ className?: string }>, { className: "w-5 h-5" }) : icon}
            <span>{label}</span>
        </div>
        {badge && (
            <span className="bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{badge}</span>
        )}
    </button>
);

const MobileNavBtn: React.FC<{ icon: React.ReactNode, label: string, active?: boolean, onClick: () => void, badge?: number }> = ({ icon, label, active, onClick, badge }) => (
    <button 
        onClick={onClick}
        className={`flex flex-col items-center justify-center w-full h-full relative ${active ? 'text-primary' : 'text-text-muted hover:text-text'}`}
    >
        {React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement<{ className?: string }>, { className: "w-5 h-5 mb-0.5" }) : icon}
        <span className="text-[10px] font-medium">{label}</span>
        {badge && (
            <span className="absolute top-2 right-4 bg-primary text-white text-[9px] font-bold px-1 py-[1px] rounded-full min-w-[14px] flex justify-center">{badge}</span>
        )}
    </button>
);

const Feed: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
    const [newPostText, setNewPostText] = useState('');

    const handlePost = () => {
        if (!newPostText.trim()) return;
        const newPost: Post = {
            id: Date.now().toString(),
            author: CURRENT_USER,
            content: newPostText,
            timestamp: 'Just now',
            likes: 0,
            comments: 0,
            type: 'text'
        };
        setPosts([newPost, ...posts]);
        setNewPostText('');
    };

    const toggleLike = (id: string) => {
        setPosts(posts.map(p => p.id === id ? { ...p, isLiked: !p.isLiked, likes: p.isLiked ? p.likes - 1 : p.likes + 1 } : p));
    };

    return (
        <div className="flex flex-col h-full bg-background">
            {/* Header */}
            <div className="p-4 border-b border-border sticky top-0 bg-background/80 backdrop-blur-md z-10 flex justify-between items-center">
                <h2 className="text-lg font-bold text-text">Home</h2>
                <Bell className="w-5 h-5 text-text-muted hover:text-text cursor-pointer" />
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto no-scrollbar">
                
                {/* Post Creator */}
                <div className="p-4 border-b border-border">
                    <div className="flex gap-3">
                        <img src={CURRENT_USER.avatar} alt="Me" className="w-10 h-10 rounded-full" />
                        <div className="flex-1">
                            <textarea 
                                placeholder="What's happening?" 
                                className="w-full bg-transparent border-none focus:ring-0 text-text placeholder-text-muted resize-none text-lg min-h-[60px]"
                                value={newPostText}
                                onChange={(e) => setNewPostText(e.target.value)}
                            />
                            <div className="flex justify-between items-center mt-2">
                                <div className="flex gap-2 text-primary">
                                    <button className="p-2 rounded-full hover:bg-primary/10 transition-colors"><ImageIcon className="w-5 h-5" /></button>
                                    <button className="p-2 rounded-full hover:bg-primary/10 transition-colors"><BarChart2 className="w-5 h-5" /></button>
                                </div>
                                <Button 
                                    className="rounded-full px-6" 
                                    disabled={!newPostText.trim()}
                                    onClick={handlePost}
                                >
                                    Post
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Posts Feed */}
                <div>
                    {posts.map(post => (
                        <div key={post.id} className="p-4 border-b border-border hover:bg-surface/30 transition-colors cursor-pointer">
                            {post.isPinned && (
                                <div className="flex items-center text-text-muted text-xs mb-2 ml-12">
                                    <Pin className="w-3 h-3 mr-1 fill-text-muted" /> Pinned by Admin
                                </div>
                            )}
                            <div className="flex gap-3">
                                <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full" />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-1.5 truncate">
                                            <span className="font-bold text-text truncate">{post.author.name}</span>
                                            {post.author.isVerified && <CheckCircle2 className="w-3.5 h-3.5 text-primary fill-primary/20" />}
                                            <span className="text-text-muted text-sm truncate">{post.author.handle}</span>
                                            <span className="text-text-muted text-xs">• {post.timestamp}</span>
                                        </div>
                                        <button className="text-text-muted hover:text-text"><MoreHorizontal className="w-4 h-4" /></button>
                                    </div>
                                    
                                    <p className="text-text mt-1 text-sm leading-relaxed whitespace-pre-wrap">{post.content}</p>
                                    
                                    {post.image && (
                                        <div className="mt-3 rounded-xl overflow-hidden border border-border">
                                            <img src={post.image} alt="Post" className="w-full h-auto max-h-[400px] object-cover" />
                                        </div>
                                    )}

                                    {post.type === 'poll' && post.pollOptions && (
                                        <div className="mt-3 space-y-2">
                                            {post.pollOptions.map(opt => {
                                                const percentage = Math.round((opt.votes / (post.totalVotes || 1)) * 100);
                                                return (
                                                    <div key={opt.id} className="relative h-8 bg-surface rounded-md overflow-hidden cursor-pointer group border border-border">
                                                        <div 
                                                            className="absolute top-0 left-0 h-full bg-primary/20 transition-all duration-500"
                                                            style={{ width: `${percentage}%` }}
                                                        />
                                                        <div className="absolute inset-0 flex items-center justify-between px-3 z-10">
                                                            <span className="text-xs font-medium text-text">{opt.text}</span>
                                                            <span className="text-xs text-text-muted">{percentage}%</span>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                            <p className="text-xs text-text-muted mt-1">{post.totalVotes} votes • Final results</p>
                                        </div>
                                    )}

                                    <div className="flex items-center justify-between mt-3 max-w-md">
                                        <button className="flex items-center gap-2 text-text-muted hover:text-blue-400 transition-colors group">
                                            <div className="p-1.5 rounded-full group-hover:bg-blue-400/10"><MessageCircle className="w-4 h-4" /></div>
                                            <span className="text-xs">{post.comments}</span>
                                        </button>
                                        <button 
                                            className={`flex items-center gap-2 transition-colors group ${post.isLiked ? 'text-pink-500' : 'text-text-muted hover:text-pink-500'}`}
                                            onClick={(e) => { e.stopPropagation(); toggleLike(post.id); }}
                                        >
                                            <div className="p-1.5 rounded-full group-hover:bg-pink-500/10">
                                                <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />
                                            </div>
                                            <span className="text-xs">{post.likes}</span>
                                        </button>
                                        <button className="flex items-center gap-2 text-text-muted hover:text-green-400 transition-colors group">
                                            <div className="p-1.5 rounded-full group-hover:bg-green-400/10"><Share2 className="w-4 h-4" /></div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const Messages: React.FC = () => {
    const [selectedChat, setSelectedChat] = useState<string | null>(null);
    const [newMessage, setNewMessage] = useState('');

    const activeChat = MOCK_CHATS.find(c => c.id === selectedChat);

    return (
        <div className="flex h-full bg-background">
            {/* Conversations List */}
            <div className={`w-full ${selectedChat ? 'hidden lg:block lg:w-1/3' : 'block'} border-r border-border flex flex-col`}>
                <div className="p-4 border-b border-border font-bold text-lg text-text">Messages</div>
                <div className="overflow-y-auto flex-1">
                    {MOCK_CHATS.map(chat => (
                        <div 
                            key={chat.id} 
                            onClick={() => setSelectedChat(chat.id)}
                            className={`p-4 flex items-center gap-3 cursor-pointer hover:bg-surface/50 transition-colors ${selectedChat === chat.id ? 'bg-surface/80 border-l-2 border-primary' : ''}`}
                        >
                            <img src={chat.user.avatar} alt={chat.user.name} className="w-12 h-12 rounded-full" />
                            <div className="flex-1 overflow-hidden">
                                <div className="flex justify-between items-center">
                                    <h4 className="font-semibold text-text truncate">{chat.user.name}</h4>
                                    {chat.unread > 0 && <span className="bg-primary text-white text-[10px] px-1.5 rounded-full">{chat.unread}</span>}
                                </div>
                                <p className={`text-sm truncate ${chat.unread > 0 ? 'text-text font-medium' : 'text-text-muted'}`}>{chat.lastMessage}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Window */}
            <div className={`flex-1 flex flex-col ${!selectedChat ? 'hidden lg:flex' : 'flex'}`}>
                {activeChat ? (
                    <>
                        <div className="p-4 border-b border-border flex items-center gap-3 bg-surface/30">
                            <Button variant="ghost" className="lg:hidden p-0 w-8 h-8" onClick={() => setSelectedChat(null)}>{'<'}</Button>
                            <img src={activeChat.user.avatar} alt={activeChat.user.name} className="w-8 h-8 rounded-full" />
                            <span className="font-bold text-text">{activeChat.user.name}</span>
                        </div>
                        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-background/50">
                            {activeChat.messages.length === 0 ? (
                                <div className="text-center text-text-muted mt-10">Say hello! 👋</div>
                            ) : (
                                activeChat.messages.map(msg => (
                                    <div key={msg.id} className={`flex ${msg.senderId === 'me' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm ${msg.senderId === 'me' ? 'bg-primary text-white rounded-br-none' : 'bg-surface text-text rounded-bl-none'}`}>
                                            {msg.text}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                        <div className="p-4 border-t border-border bg-surface/30">
                            <div className="flex gap-2">
                                <Input 
                                    placeholder="Type a message..." 
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    className="bg-background"
                                />
                                <Button className="px-3" disabled={!newMessage.trim()}><Send className="w-4 h-4" /></Button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-text-muted">
                        Select a conversation to start messaging
                    </div>
                )}
            </div>
        </div>
    );
};

const Groups: React.FC = () => {
    const groups = [
        { id: 1, name: 'Techno Lovers NYC', members: '2.3k', desc: 'The underground scene.' },
        { id: 2, name: 'Jazz & Chill', members: '850', desc: 'Smooth vibes only.' },
        { id: 3, name: 'Festival Squad 2025', members: '1.1k', desc: 'Planning the trip.' },
    ];

    return (
        <div className="flex flex-col h-full bg-background p-4">
             <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-text">Groups</h2>
                <Button variant="secondary" className="h-8 text-xs"><Plus className="w-4 h-4 mr-2" /> Create Group</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {groups.map(g => (
                    <Card key={g.id} className="p-5 hover:border-primary/50 transition-colors cursor-pointer group">
                        <div className="flex items-start justify-between mb-2">
                             <div className="w-12 h-12 rounded-lg bg-surface border border-border flex items-center justify-center font-bold text-xl text-primary">
                                 {g.name[0]}
                             </div>
                             <Button variant="ghost" className="h-8 text-xs opacity-0 group-hover:opacity-100 transition-opacity">Join</Button>
                        </div>
                        <h3 className="font-bold text-text truncate">{g.name}</h3>
                        <p className="text-xs text-text-muted mb-3">{g.members} members</p>
                        <p className="text-sm text-text-muted line-clamp-2">{g.desc}</p>
                    </Card>
                ))}
            </div>
        </div>
    );
};