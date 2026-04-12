import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Mail, MessageSquare, Instagram, Linkedin, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';
import * as api from "../utils/api";

const IconMap = {
    "Instagram": Instagram,
    "LinkedIn": Linkedin,
    "Twitter": MessageSquare,
    "GitHub": Globe,
    "Default": MessageSquare
};

export default function MatchDetailModal({ open, onClose, matchData, currentUserId }) {
    // matchData contains { Profile, Rating }
    const profile = matchData?.profile || matchData;
    const [rating, setRating] = useState(0);

    useEffect(() => {
        if (open && matchData?.rating) {
            setRating(matchData.rating);
        } else if (open) {
            setRating(0);
        }
    }, [open, matchData]);

    const handleRate = async (val) => {
        setRating(val);
        await api.matches.rate(currentUserId, profile.id, val);
    };

    const ContactIcon = IconMap[profile?.contactMethod] || IconMap.Default;

    return (
        <AnimatePresence>
            {open && profile && (
                <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <motion.div className="glass w-full max-w-md rounded-3xl p-8 text-white relative shadow-2xl">
                        
                        <button onClick={onClose} className="absolute right-6 top-6 text-zinc-400 hover:text-white transition-colors">
                            <X size={24} />
                        </button>

                        <div className="text-center">
                            <div className="relative mx-auto h-24 w-24">
                                <img src={profile.profilePicture || '/default-avatar.png'} 
                                     className="h-24 w-24 rounded-full border-2 border-rose object-cover" />
                                <div className="absolute -bottom-1 -right-1 bg-green-500 h-4 w-4 rounded-full border-2 border-black"></div>
                            </div>
                            <h2 className="mt-4 text-2xl font-bold">{profile.firstName} {profile.lastName}</h2>
                            <p className="text-rose font-medium text-sm">{profile.headline || 'Software Engineer'}</p>
                        </div>

                        <div className="mt-8 space-y-3">
                            <p className="text-xs uppercase tracking-widest text-zinc-500">Contact Details</p>
                            <div className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/5">
                                <Mail className="text-cyan" size={18} />
                                <span className="text-sm truncate">{profile.email}</span>
                            </div>
                            {profile.contactMethod && (
                                <div className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/5">
                                    <ContactIcon className="text-rose" size={18} />
                                    <div className="flex flex-col">
                                        <span className="text-[10px] text-zinc-500 uppercase">{profile.contactMethod}</span>
                                        <span className="text-sm font-medium">{profile.contactInfo}</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="mt-8 text-center pt-6 border-t border-white/10">
                            <p className="text-xs uppercase tracking-widest text-zinc-500 mb-3">Rate your connection</p>
                            <div className="flex justify-center gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star 
                                        key={star}
                                        size={28}
                                        className={`cursor-pointer transition-all hover:scale-110 ${star <= rating ? 'fill-rose text-rose' : 'text-zinc-600'}`}
                                        onClick={() => handleRate(star)}
                                    />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}