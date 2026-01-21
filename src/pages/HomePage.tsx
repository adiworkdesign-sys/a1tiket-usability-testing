import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { useBooking } from '@/contexts/BookingContext';
import { stations } from '@/data/stations';
import { ArrowRightLeft, Calendar, Users, Search, Sparkles } from 'lucide-react';

export default function HomePage() {
    const navigate = useNavigate();
    const { origin, destination, date, passengers, setOrigin, setDestination, setDate, setPassengers } = useBooking();

    const [showOriginPicker, setShowOriginPicker] = useState(false);
    const [showDestPicker, setShowDestPicker] = useState(false);

    const handleSearch = () => {
        // Validate all required fields
        if (!origin) {
            alert('Pilih stasiun keberangkatan terlebih dahulu');
            return;
        }
        if (!destination) {
            alert('Pilih stasiun tujuan terlebih dahulu');
            return;
        }
        if (!date || date.trim() === '') {
            alert('Pilih tanggal keberangkatan terlebih dahulu');
            return;
        }

        // Validate date is not in the past
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
            alert('Tanggal keberangkatan tidak boleh di masa lalu');
            return;
        }

        navigate('/search-results');
    };

    const swapStations = () => {
        const temp = origin;
        setOrigin(destination);
        setDestination(temp);
    };

    return (
        <AppLayout>
            <div className="p-5 space-y-6">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-2"
                >
                    <h1 className="text-3xl font-bold">Pesan Tiket Kereta</h1>
                    <p className="text-muted-foreground">
                        Lihat apa yang kamu dapatkan. Setiap saat.
                    </p>
                </motion.div>

                {/* Search Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-card rounded-2xl border p-5 shadow-soft space-y-4"
                >
                    {/* Origin & Destination */}
                    <div className="relative">
                        <div className="space-y-3">
                            {/* Origin */}
                            <button
                                onClick={() => setShowOriginPicker(!showOriginPicker)}
                                className="w-full p-4 bg-muted rounded-xl text-left hover:bg-muted/80 transition"
                            >
                                <p className="text-xs text-muted-foreground mb-1">Dari</p>
                                <p className="font-semibold">
                                    {origin ? `${origin.name} (${origin.city})` : 'Pilih stasiun keberangkatan'}
                                </p>
                            </button>

                            {/* Destination */}
                            <button
                                onClick={() => setShowDestPicker(!showDestPicker)}
                                className="w-full p-4 bg-muted rounded-xl text-left hover:bg-muted/80 transition"
                            >
                                <p className="text-xs text-muted-foreground mb-1">Ke</p>
                                <p className="font-semibold">
                                    {destination ? `${destination.name} (${destination.city})` : 'Pilih stasiun tujuan'}
                                </p>
                            </button>
                        </div>

                        {/* Swap Button */}
                        <motion.button
                            onClick={swapStations}
                            whileTap={{ scale: 0.9, rotate: 180 }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-background border rounded-full shadow-sm z-10"
                        >
                            <ArrowRightLeft className="w-4 h-4 rotate-90" />
                        </motion.button>
                    </div>

                    {/* Date & Passengers */}
                    <div className="grid grid-cols-2 gap-3">
                        {/* Date */}
                        <div className="p-4 bg-muted rounded-xl">
                            <p className="text-xs text-muted-foreground mb-1">Tanggal</p>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    min={new Date().toISOString().split('T')[0]}
                                    className="bg-transparent border-none outline-none text-sm font-medium w-full cursor-pointer"
                                />
                            </div>
                        </div>

                        {/* Passengers */}
                        <div className="p-4 bg-muted rounded-xl">
                            <p className="text-xs text-muted-foreground mb-1">Penumpang</p>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Users className="w-4 h-4 text-primary" />
                                    <span className="text-sm font-medium">{passengers} Dewasa</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <motion.button
                                        whileTap={{ scale: 0.85 }}
                                        onClick={() => setPassengers(Math.max(1, passengers - 1))}
                                        className="w-6 h-6 rounded-full bg-background border border-border flex items-center justify-center text-sm font-medium hover:bg-accent disabled:opacity-50"
                                        disabled={passengers <= 1}
                                    >
                                        -
                                    </motion.button>
                                    <motion.button
                                        whileTap={{ scale: 0.85 }}
                                        onClick={() => setPassengers(Math.min(4, passengers + 1))}
                                        className="w-6 h-6 rounded-full bg-background border border-border flex items-center justify-center text-sm font-medium hover:bg-accent disabled:opacity-50"
                                        disabled={passengers >= 4}
                                    >
                                        +
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Search Button */}
                    <Button onClick={handleSearch} className="w-full h-12" size="lg">
                        <Search className="w-4 h-4 mr-2" />
                        Cari Kereta
                    </Button>
                </motion.div>

                {/* Promo Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="gradient-primary rounded-2xl p-5 text-white"
                >
                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-white/20 rounded-lg">
                            <Sparkles className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold mb-1">Raih Koin Setiap Perjalanan!</h3>
                            <p className="text-sm opacity-90">
                                Laporkan arah duduk kursi setelah perjalanan dan dapatkan hingga 50 Koin
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Features */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-4"
                >
                    <h2 className="font-bold text-lg">Kenapa A1 TIKET?</h2>
                    <div className="grid grid-cols-2 gap-3">
                        {[
                            { icon: '🎯', title: 'Arah Kursi', desc: 'Tahu kursi hadap mana' },
                            { icon: '🔒', title: 'Harga Pasti', desc: 'Tanpa biaya tersembunyi' },
                            { icon: '🪙', title: 'Raih Koin', desc: 'Reward tiap perjalanan' },
                            { icon: '⚡', title: 'Cepat & Mudah', desc: 'Pesan dalam 3 menit' },
                        ].map((feature, idx) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.4 + idx * 0.1 }}
                                className="p-4 bg-muted rounded-xl"
                            >
                                <span className="text-3xl block mb-2">{feature.icon}</span>
                                <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
                                <p className="text-xs text-muted-foreground">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Simple Station Picker Modals */}
            {showOriginPicker && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-end" onClick={() => setShowOriginPicker(false)}>
                    <div className="bg-background w-full rounded-t-3xl p-5 max-h-[80vh] overflow-auto" onClick={e => e.stopPropagation()}>
                        <h3 className="font-bold text-lg mb-4">Pilih Stasiun Keberangkatan</h3>
                        <div className="space-y-2">
                            {stations.map(station => (
                                <button
                                    key={station.code}
                                    onClick={() => {
                                        setOrigin(station);
                                        setShowOriginPicker(false);
                                    }}
                                    className="w-full p-4 text-left hover:bg-muted rounded-xl transition"
                                >
                                    <p className="font-semibold">{station.name}</p>
                                    <p className="text-sm text-muted-foreground">{station.city}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {showDestPicker && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-end" onClick={() => setShowDestPicker(false)}>
                    <div className="bg-background w-full rounded-t-3xl p-5 max-h-[80vh] overflow-auto" onClick={e => e.stopPropagation()}>
                        <h3 className="font-bold text-lg mb-4">Pilih Stasiun Tujuan</h3>
                        <div className="space-y-2">
                            {stations.map(station => (
                                <button
                                    key={station.code}
                                    onClick={() => {
                                        setDestination(station);
                                        setShowDestPicker(false);
                                    }}
                                    className="w-full p-4 text-left hover:bg-muted rounded-xl transition"
                                >
                                    <p className="font-semibold">{station.name}</p>
                                    <p className="text-sm text-muted-foreground">{station.city}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
