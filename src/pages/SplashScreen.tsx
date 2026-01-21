import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function SplashScreen() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/home');
        }, 2500);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="min-h-screen gradient-primary flex flex-col items-center justify-center p-6">
            {/* Logo Animation */}
            <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                    type: 'spring',
                    stiffness: 200,
                    damping: 15,
                    duration: 0.8
                }}
                className="mb-8"
            >
                <div className="w-24 h-24 rounded-3xl bg-white/20 backdrop-blur-lg border-2 border-white/30 flex items-center justify-center shadow-2xl">
                    <span className="text-6xl font-bold text-white">A1</span>
                </div>
            </motion.div>

            {/* App Name */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-center mb-12"
            >
                <h1 className="text-4xl font-bold text-white mb-2">A1 TIKET</h1>
                <p className="text-white/80 text-lg">Perjalanan Lebih Pasti</p>
            </motion.div>

            {/* Loading Bar */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="w-48 h-1 bg-white/30 rounded-full overflow-hidden"
            >
                <motion.div
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{
                        repeat: Infinity,
                        duration: 1.5,
                        ease: 'easeInOut'
                    }}
                    className="h-full w-1/2 bg-white rounded-full"
                />
            </motion.div>

            {/* Tagline */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="absolute bottom-8 text-white/60 text-sm"
            >
                Powered by PT Kereta Api Indonesia
            </motion.p>
        </div>
    );
}
