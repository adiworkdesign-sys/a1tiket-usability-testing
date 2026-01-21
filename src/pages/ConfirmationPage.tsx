import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useBooking } from '@/contexts/BookingContext';
import { CheckCircle, Download, Home, Ticket } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatCurrency, formatDate } from '@/lib/utils';
import Confetti from 'react-confetti';

export default function ConfirmationPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const bookingCode = searchParams.get('code');
    const { selectedSchedule, selectedSeats, resetBooking } = useBooking();

    useEffect(() => {
        // Reset booking after showing confirmation
        return () => {
            // Don't reset immediately, user might want to view details
        };
    }, []);

    if (!selectedSchedule || !bookingCode) {
        navigate('/home');
        return null;
    }

    const handleViewTicket = () => {
        navigate(`/e-ticket?code=${bookingCode}`);
    };

    const handleBackToHome = () => {
        resetBooking();
        navigate('/home');
    };

    return (
        <AppLayout showBottomNav={false}>
            <Confetti
                width={window.innerWidth}
                height={window.innerHeight}
                recycle={false}
                numberOfPieces={500}
                gravity={0.3}
            />

            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                {/* Success Animation */}
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    className="mb-6"
                >
                    <div className="w-24 h-24 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                        <CheckCircle className="w-16 h-16 text-green-500" />
                    </div>
                </motion.div>

                {/* Success Message */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-center mb-8"
                >
                    <h1 className="text-3xl font-bold mb-2">Pembayaran Berhasil!</h1>
                    <p className="text-muted-foreground">
                        Tiket Anda telah dikonfirmasi dan siap digunakan
                    </p>
                </motion.div>

                {/* Booking Code */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="w-full max-w-md"
                >
                    <Card className="p-6 space-y-4 mb-6">
                        <div className="text-center">
                            <p className="text-sm text-muted-foreground mb-2">Kode Booking</p>
                            <div className="inline-block px-6 py-3 bg-gradient-primary rounded-lg">
                                <p className="font-mono font-bold text-2xl text-white tracking-wider">
                                    {bookingCode}
                                </p>
                            </div>
                        </div>

                        <div className="border-t pt-4 space-y-3">
                            <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Kereta</span>
                                <span className="font-semibold">{selectedSchedule.train.name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Rute</span>
                                <span className="font-semibold">
                                    {selectedSchedule.origin.city} → {selectedSchedule.destination.city}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Tanggal</span>
                                <span className="font-semibold">{formatDate(selectedSchedule.date)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Jam</span>
                                <span className="font-semibold">{selectedSchedule.departureTime}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Kursi</span>
                                <span className="font-semibold">
                                    {selectedSeats.map(s => s.number).join(', ')}
                                </span>
                            </div>
                        </div>
                    </Card>

                    {/* Next Steps */}
                    <Card className="p-5 mb-6 bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
                        <h3 className="font-semibold mb-3 flex items-center gap-2 text-blue-900 dark:text-blue-100">
                            <Ticket className="w-5 h-5" />
                            Langkah Selanjutnya
                        </h3>
                        <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                            <li className="flex items-start gap-2">
                                <span>1.</span>
                                <span>Simpan atau download E-Ticket Anda</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span>2.</span>
                                <span>Tunjukkan QR Code saat check-in di stasiun</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span>3.</span>
                                <span>Datang 30 menit sebelum keberangkatan</span>
                            </li>
                        </ul>
                    </Card>

                    {/* Actions */}
                    <div className="space-y-3">
                        <Button onClick={handleViewTicket} className="w-full" size="lg">
                            <Ticket className="w-4 h-4 mr-2" />
                            Lihat E-Ticket
                        </Button>
                        <Button onClick={handleBackToHome} variant="outline" className="w-full" size="lg">
                            <Home className="w-4 h-4 mr-2" />
                            Kembali ke Beranda
                        </Button>
                    </div>
                </motion.div>
            </div>
        </AppLayout>
    );
}
