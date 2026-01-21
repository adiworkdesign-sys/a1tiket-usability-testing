import { useSearchParams, useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useBooking } from '@/contexts/BookingContext';
import { ArrowLeft, Download, Share2, MapPin, Clock, Train } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatDate } from '@/lib/utils';
import { QRCodeSVG } from 'qrcode.react';

export default function ETicketPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const bookingCode = searchParams.get('code');
    const { selectedSchedule, selectedSeats, passengerDetails, selectedTier } = useBooking();

    if (!selectedSchedule || !bookingCode) {
        navigate('/home');
        return null;
    }

    const handleDownload = () => {
        // Simulate download
        alert('E-Ticket akan didownload sebagai PDF');
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: 'E-Ticket A1 TIKET',
                text: `Kode Booking: ${bookingCode}\n${selectedSchedule.train.name}\n${selectedSchedule.origin.city} → ${selectedSchedule.destination.city}`,
            });
        } else {
            alert('Share tidak didukung di browser ini');
        }
    };

    return (
        <AppLayout showBottomNav={false}>
            <div className="min-h-screen bg-muted/30">
                {/* Header */}
                <div className="sticky top-16 z-40 bg-background border-b p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <button onClick={() => navigate(-1)} className="p-2 hover:bg-muted rounded-lg">
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                            <div>
                                <h1 className="font-bold text-lg">E-Ticket</h1>
                                <p className="text-sm text-muted-foreground">{bookingCode}</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button onClick={handleShare} variant="outline" size="icon">
                                <Share2 className="w-4 h-4" />
                            </Button>
                            <Button onClick={handleDownload} variant="outline" size="icon">
                                <Download className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="p-4 space-y-4">
                    {/* Main Ticket Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <Card className="overflow-hidden">
                            {/* Header Section */}
                            <div className="gradient-primary text-white p-5">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <p className="text-sm opacity-80">Kode Booking</p>
                                        <p className="font-mono font-bold text-xl tracking-wider">{bookingCode}</p>
                                    </div>
                                    <div className="px-3 py-1 bg-white/20 rounded-full text-xs font-semibold">
                                        {selectedTier.name}
                                    </div>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold">{selectedSchedule.train.name}</p>
                                    <p className="text-sm opacity-90">{selectedSchedule.train.class} Class</p>
                                </div>
                            </div>

                            {/* QR Code Section */}
                            <div className="bg-white dark:bg-card p-6 flex flex-col items-center border-b">
                                <div className="mb-3">
                                    <QRCodeSVG value={bookingCode} size={180} level="H" />
                                </div>
                                <p className="text-xs text-muted-foreground text-center">
                                    Tunjukkan QR code ini saat check-in
                                </p>
                            </div>

                            {/* Journey Details */}
                            <div className="p-5 space-y-4">
                                {/* Route */}
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <p className="text-sm text-muted-foreground mb-1">Dari</p>
                                        <p className="font-bold text-lg">{selectedSchedule.origin.name}</p>
                                        <p className="text-sm text-muted-foreground">{selectedSchedule.origin.city}</p>
                                    </div>
                                    <div className="px-4">
                                        <Train className="w-8 h-8 text-primary" />
                                    </div>
                                    <div className="flex-1 text-right">
                                        <p className="text-sm text-muted-foreground mb-1">Ke</p>
                                        <p className="font-bold text-lg">{selectedSchedule.destination.name}</p>
                                        <p className="text-sm text-muted-foreground">{selectedSchedule.destination.city}</p>
                                    </div>
                                </div>

                                {/* Date & Time */}
                                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                                    <div>
                                        <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                                            <MapPin className="w-3 h-3" />
                                            Tanggal
                                        </p>
                                        <p className="font-semibold">{formatDate(selectedSchedule.date)}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            Keberangkatan
                                        </p>
                                        <p className="font-semibold">{selectedSchedule.departureTime}</p>
                                    </div>
                                </div>

                                {/* Duration */}
                                <div className="p-3 bg-muted rounded-lg">
                                    <p className="text-xs text-muted-foreground mb-1">Durasi Perjalanan</p>
                                    <p className="font-semibold">{selectedSchedule.duration}</p>
                                </div>
                            </div>
                        </Card>
                    </motion.div>

                    {/* Passenger List */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <Card className="p-5">
                            <h3 className="font-bold mb-4">Informasi Penumpang</h3>
                            <div className="space-y-4">
                                {passengerDetails.map((passenger, idx) => (
                                    <div key={passenger.id} className="flex items-start justify-between p-3 bg-muted/50 rounded-lg">
                                        <div>
                                            <p className="font-semibold">
                                                {passenger.title}. {passenger.fullName}
                                            </p>
                                            <p className="text-sm text-muted-foreground">{passenger.identityNumber}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-muted-foreground">Kursi</p>
                                            <p className="font-bold text-lg">{selectedSeats[idx]?.number}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </motion.div>

                    {/* Important Notes */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Card className="p-5 bg-yellow-50 dark:bg-yellow-950/30 border-yellow-200 dark:border-yellow-800">
                            <h3 className="font-semibold mb-3 text-yellow-900 dark:text-yellow-100">
                                ⚠️ Perhatian Penting
                            </h3>
                            <ul className="space-y-2 text-sm text-yellow-800 dark:text-yellow-200">
                                <li>• Harap tiba di stasiun minimal 30 menit sebelum keberangkatan</li>
                                <li>• Bawa identitas asli yang terdaftar (KTP/Passport)</li>
                                <li>• E-Ticket ini berlaku untuk 1x perjalanan</li>
                                <li>• Kehilangan barang bawaan bukan tanggung jawab PT KAI</li>
                                <li>• Dilarang membawa barang berbahaya dan terlarang</li>
                            </ul>
                        </Card>
                    </motion.div>

                    {/* Footer Info */}
                    <div className="text-center text-sm text-muted-foreground py-4">
                        <p>E-Ticket ini sah tanpa tanda tangan</p>
                        <p className="mt-1">Terima kasih telah menggunakan A1 TIKET</p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
