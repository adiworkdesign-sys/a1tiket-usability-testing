import { Bell, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export const Header = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between px-4 max-w-lg mx-auto">
                {/* Logo */}
                <motion.div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => navigate('/home')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center text-white font-bold text-sm">
                        A1
                    </div>
                    <span className="font-bold text-lg">TIKET</span>
                </motion.div>

                {/* Right Side */}
                <div className="flex items-center gap-3">
                    {/* Coin Balance */}
                    {user && (
                        <motion.div
                            className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/30 px-3 py-1.5 rounded-full cursor-pointer"
                            onClick={() => navigate('/coins')}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="text-lg">🪙</span>
                            <span className="font-semibold text-sm">{user.coinBalance}</span>
                        </motion.div>
                    )}

                    {/* Notifications */}
                    <motion.button
                        className="relative p-2 rounded-full hover:bg-muted"
                        onClick={() => navigate('/notifications')}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                    </motion.button>

                    {/* User Avatar */}
                    <motion.button
                        className="w-9 h-9 rounded-full bg-gradient-primary flex items-center justify-center text-white font-semibold text-sm"
                        onClick={() => navigate('/account')}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        {user ? user.name.charAt(0).toUpperCase() : <User className="w-5 h-5" />}
                    </motion.button>
                </div>
            </div>
        </header>
    );
};
