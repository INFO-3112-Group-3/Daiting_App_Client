import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Heart, Loader2 } from 'lucide-react'; // For a nice spinner
import * as api from "../utils/api";
import MatchDetailModal from '../components/MatchDetailModal';

export default function MatchesPage({ userId }) {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true); // Start as true
    const [selectedMatchData, setSelectedMatchData] = useState(null);

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                setLoading(true);
                const data = await api.matches.getAccepted(userId);
                setMatches(data);
            } catch (err) {
                console.error("Error loading matches:", err);
            } finally {
                setLoading(false); // Stop loading regardless of result
            }
        };
        fetchMatches();
    }, [userId]);

    // 1. Loading State
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-white">
                <Loader2 className="animate-spin text-rose mb-4" size={40} />
                <p className="text-zinc-400 animate-pulse">Retrieving your matches...</p>
            </div>
        );
    }

    // 2. Empty State (only shows after loading is finished)
    if (matches.length === 0) {
        return (
            <div className="text-center text-white py-20">
                <h1 className="text-2xl font-bold">No matches yet</h1>
                <p className="text-zinc-400">Keep swiping to find your pair programmer!</p>
            </div>
        );
    }

    return (
        <section className="mx-auto max-w-6xl px-6 py-16">
            <h1 className="text-3xl font-bold text-white mb-8">Your Connections</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {matches.map((item) => (
                    <motion.div 
                        key={item.profile.id}
                        whileHover={{ scale: 1.02, translateY: -5 }}
                        onClick={() => setSelectedMatchData(item)}
                        className="glass cursor-pointer overflow-hidden rounded-2xl border border-white/10 hover:border-rose/50 transition-colors"
                    >
                        <img src={item.profile.profilePicture || '/default-avatar.png'} className="h-48 w-full object-cover" />
                        <div className="p-4 bg-gradient-to-t from-black/80 to-transparent">
                            <h3 className="font-semibold text-white">{item.profile.firstName}</h3>
                            <div className="flex items-center gap-1 mt-1">
                                <Star size={12} className={item.rating > 0 ? "fill-rose text-rose" : "text-zinc-500"} />
                                <span className="text-[10px] text-zinc-400">
                                    {item.rating > 0 ? `Rated ${item.rating}/5` : 'Not rated'}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <MatchDetailModal 
                open={!!selectedMatchData} 
                onClose={() => setSelectedMatchData(null)} 
                matchData={selectedMatchData}
                currentUserId={userId}
            />
        </section>
    );
}