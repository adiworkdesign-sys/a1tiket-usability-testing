import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useBooking } from '@/contexts/BookingContext';
import { ticketTiers } from '@/data/constants';
import { ArrowLeft, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatCurrency } from '@/lib/utils';

export default function TicketTierPage() {
    const navigate = useNavigate();
    const { selectedTier, setSelectedTier, selectedSchedule, passengers } = useBooking();
    const [selected, setSelected] = useState(selectedTier.id);

    if (!selectedSchedule) {
        navigate('/home');
        return null;
    }

    const handleContinue = () => {
        const tier = ticketTiers.find(t => t.id === selected);
        if (tier) {
            setSelectedTier(tier);
            navigate('/payment');
        }
    };

    const basePrice = selectedSchedule.price * passengers;

    return (
        <AppLayout showBottomNav={false}>
            <div className="min-h-screen">
                {/* Header */}
                <div className="sticky top-16 z-40 bg-background border-b p-4">
                    <div className="flex items-center gap-3">
                        <button onClick={() => navigate(-1)} className="p-2 hover:bg-muted rounded-lg">
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <div>
                            <h1 className="font-bold text-lg">Pilih Paket Tiket</h1>
                            <p className="text-sm text-muted-foreground">
                                Tentukan fleksibilitas perjalanan Anda
                            </p>
                        </div>
                    </div>
                </div>

                <div className="p-4 space-y-4">
                    {/* Info Banner */}
                    <Card className="p-4 bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
                        <p className="text-sm text-blue-900 dark:text-blue-100">
                            💡 <strong>Tips:</strong> Pilih paket Flex atau Premium untuk fleksibilitas lebih jika rencana Anda bisa berubah
                        </p>
                    </Card>

                    {/* Tier Cards */}
                    <div className="space-y-3">
                        {ticketTiers.map((tier, idx) => {
                            const isSelected = selected === tier.id;
                            const totalPrice = basePrice + (tier.price * passengers);

                            return (
                                <motion.div
                                    key={tier.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                >
                                    <Card
                                        className={`relative overflow-hidden cursor-pointer transition-all ${isSelected
                                                ? 'border-primary border-2 shadow-lg'
                                                : 'border-border hover:border-primary/50'
                                            }`}
                                        onClick={() => setSelected(tier.id)}
                                    >
                                        {/* Recommended Badge */}
                                        {tier.id === 'flex' && (
                                            <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                                                ⭐ PALING DIPILIH
                                            </div>
                                        )}

                                        <div className="p-5 space-y-4">
                                            {/* Header */}
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <h3 className="font-bold text-xl">{tier.name}</h3>
                                                    <p className="text-sm text-muted-foreground mt-1">
                                                        {tier.description}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-sm text-muted-foreground">
                                                        {tier.price === 0 ? 'Gratis' : `+${formatCurrency(tier.price)}`}
                                                    </div>
                                                    {tier.price > 0 && (
                                                        <div className="text-xs text-muted-foreground">per orang</div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Features */}
                                            <div className="space-y-2">
                                                {tier.features.map((feature, idx) => (
                                                    <div key={idx} className="flex items-start gap-2">
                                                        <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                                        <span className="text-sm">{feature}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Policy Info */}
                                            <div className="grid grid-cols-2 gap-3 pt-3 border-t">
                                                <div>
                                                    <p className="text-xs text-muted-foreground">Ubah Jadwal</p>
                                                    <p className="font-semibold text-sm">{tier.reschedule}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-muted-foreground">Refund</p>
                                                    <p className="font-semibold text-sm">{tier.refund}</p>
                                                </div>
                                            </div>

                                            {/* Selection Indicator */}
                                            {isSelected && (
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    className="absolute top-4 left-4 w-6 h-6 bg-primary rounded-full flex items-center justify-center"
                                                >
                                                    <Check className="w-4 h-4 text-white" />
                                                </motion.div>
                                            )}
                                        </div>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Price Breakdown */}
                    <Card className="p-5 space-y-3">
                        <h3 className="font-semibold">Rincian Harga</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>Tiket Kereta ({passengers} penumpang)</span>
                                <span>{formatCurrency(basePrice)}</span>
                            </div>
                            {selected !== 'basic' && (
                                <div className="flex justify-between text-sm">
                                    <span>Paket {ticketTiers.find(t => t.id === selected)?.name}</span>
                                    <span>
                                        {formatCurrency(
                                            (ticketTiers.find(t => t.id === selected)?.price || 0) * passengers
                                        )}
                                    </span>
                                </div>
                            )}
                            <div className="pt-2 border-t flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>
                                    {formatCurrency(
                                        basePrice + ((ticketTiers.find(t => t.id === selected)?.price || 0) * passengers)
                                    )}
                                </span>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Bottom Action */}
                <div className="sticky bottom-0 bg-background border-t p-4">
                    <Button onClick={handleContinue} className="w-full" size="lg">
                        Lanjut ke Pembayaran
                    </Button>
                </div>
            </div>
        </AppLayout>
    );
}
