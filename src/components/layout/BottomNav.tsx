import { Home, Ticket, Tag, UserCircle } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const navItems = [
    { icon: Home, label: 'Home', path: '/home' },
    { icon: Ticket, label: 'Tiketku', path: '/tickets' },
    { icon: Tag, label: 'Promo', path: '/promos' },
    { icon: UserCircle, label: 'Akun', path: '/account' },
];

export const BottomNav = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container max-w-lg mx-auto px-4">
                <div className="grid grid-cols-4 h-16">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        const Icon = item.icon;

                        return (
                            <motion.button
                                key={item.path}
                                onClick={() => navigate(item.path)}
                                className={cn(
                                    'flex flex-col items-center justify-center gap-1 relative',
                                    isActive ? 'text-primary' : 'text-muted-foreground'
                                )}
                                whileTap={{ scale: 0.9 }}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-primary rounded-b-full"
                                    />
                                )}
                                <Icon className="w-5 h-5" />
                                <span className="text-xs font-medium">{item.label}</span>
                            </motion.button>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
};
