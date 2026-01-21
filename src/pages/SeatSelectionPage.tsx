import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useBooking } from '@/contexts/BookingContext';
import { Seat } from '@/types';
import { ArrowLeft, Info, Navigation } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatCurrency } from '@/lib/utils';

export default function SeatSelectionPage() {
    const navigate = useNavigate();
    const { selectedSchedule, passengers, selectedSeats, addSeat, removeSeat } = useBooking();
    const [selectedCar, setSelectedCar] = useState(1);

    if (!selectedSchedule) {
        navigate('/home');
        return null;
    }

    // Generate mock seats untuk sebuah gerbong
    const generateSeats = (carNumber: number): Seat[] => {
        const seats: Seat[] = [];
        const rows = 12;
        const columns = ['A', 'B', 'C', 'D'];

        for (let row = 1; row <= rows; row++) {
            columns.forEach((col, idx) => {
                const seatNumber = `${row}${col}`;
                const isWindow = idx === 0 || idx === 3;
                const confidence = Math.random() > 0.2 ? Math.floor(Math.random() * 60) + 40 : null;
                const isForward = confidence !== null ? Math.random() > 0.4 : null;

                seats.push({
                    id: `${carNumber}-${seatNumber}`,
                    number: seatNumber,
                    car: carNumber,
                    row,
                    position: isWindow ? 'window' : 'aisle',
                    isAvailable: Math.random() > 0.3, // 70% available
                    directionConfidence: confidence,
                    isForward,
                    reportCount: confidence ? Math.floor(Math.random() * 80) + 10 : 0,
                    price: selectedSchedule.price,
                });
            });
        }

        return seats;
    };

    const seats = generateSeats(selectedCar);
    const isSeatSelected = (seatId: string) => selectedSeats.some(s => s.id === seatId);

    const handleSeatClick = (seat: Seat) => {
        if (!seat.isAvailable) return;

        if (isSeatSelected(seat.id)) {
            removeSeat(seat.id);
        } else {
            if (selectedSeats.length < passengers) {
                addSeat(seat);
            }
        }
    };

    const handleContinue = () => {
        if (selectedSeats.length === passengers) {
            navigate('/passenger-details');
        }
    };

    return (
        <AppLayout showBottomNav={false}>
            <div className="space-y-4">
                {/* Header */}
                <div className="sticky top-16 z-40 bg-background border-b p-4">
                    <div className="flex items-center gap-3 mb-3">
                        <button onClick={() => navigate(-1)} className="p-2 hover:bg-muted rounded-lg">
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <div>
                            <h1 className="font-bold text-lg">{selectedSchedule.train.name}</h1>
                            <p className="text-sm text-muted-foreground">
                                {selectedSchedule.origin.city} → {selectedSchedule.destination.city}
                            </p>
                        </div>
                    </div>

                    {/* Car Selector */}
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        {[1, 2, 3, 4].map(car => (
                            <button
                                key={car}
                                onClick={() => setSelectedCar(car)}
                                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition ${selectedCar === car
                                        ? 'bg-primary text-primary-foreground'
                                        : 'bg-muted hover:bg-muted/80'
                                    }`}
                            >
                                Gerbong {car}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="p-4 space-y-4">
                    {/* Legend */}
                    <Card className="p-4">
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                            <Info className="w-4 h-4" />
                            Keterangan
                        </h3>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 border-2 border-green-500 rounded" />
                                <span>Tersedia</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-primary/20 border-2 border-primary rounded" />
                                <span>Dipilih</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-muted border-2 border-border rounded" />
                                <span>Terisi</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Navigation className="w-5 h-5 text-blue-500" />
                                <span>Hadap Depan</span>
                            </div>
                        </div>
                    </Card>

                    {/* Seat Map */}
                    <Card className="p-4">
                        <div className="mb-4 text-center">
                            <div className="inline-block px-4 py-2 bg-muted rounded-lg text-sm font-medium">
                                ⬆️ Arah Depan Kereta
                            </div>
                        </div>

                        <div className="space-y-2">
                            {Array.from({ length: 12 }, (_, rowIdx) => {
                                const row = rowIdx + 1;
                                const rowSeats = seats.filter(s => s.row === row);

                                return (
                                    <div key={row} className="flex items-center gap-2">
                                        {/* Row Number */}
                                        <div className="w-6 text-center text-xs font-medium text-muted-foreground">
                                            {row}
                                        </div>

                                        {/* Seats A & B */}
                                        <div className="flex gap-1">
                                            {rowSeats.slice(0, 2).map(seat => (
                                                <SeatButton
                                                    key={seat.id}
                                                    seat={seat}
                                                    isSelected={isSeatSelected(seat.id)}
                                                    onClick={() => handleSeatClick(seat)}
                                                />
                                            ))}
                                        </div>

                                        {/* Aisle */}
                                        <div className="w-4" />

                                        {/* Seats C & D */}
                                        <div className="flex gap-1">
                                            {rowSeats.slice(2, 4).map(seat => (
                                                <SeatButton
                                                    key={seat.id}
                                                    seat={seat}
                                                    isSelected={isSeatSelected(seat.id)}
                                                    onClick={() => handleSeatClick(seat)}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </Card>
                </div>

                {/* Bottom Action Bar */}
                <div className="sticky bottom-0 bg-background border-t p-4">
                    <div className="flex items-center justify-between mb-3">
                        <div>
                            <p className="text-sm text-muted-foreground">Kursi dipilih</p>
                            <p className="font-bold text-lg">
                                {selectedSeats.length} / {passengers}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-muted-foreground">Total</p>
                            <p className="font-bold text-xl">
                                {formatCurrency(selectedSeats.length * selectedSchedule.price)}
                            </p>
                        </div>
                    </div>
                    <Button
                        onClick={handleContinue}
                        disabled={selectedSeats.length !== passengers}
                        className="w-full"
                        size="lg"
                    >
                        {selectedSeats.length === passengers
                            ? 'Lanjutkan'
                            : `Pilih ${passengers - selectedSeats.length} kursi lagi`}
                    </Button>
                </div>
            </div>
        </AppLayout>
    );
}

// Seat Button Component
function SeatButton({
    seat,
    isSelected,
    onClick,
}: {
    seat: Seat;
    isSelected: boolean;
    onClick: () => void;
}) {
    const getSeatColor = () => {
        if (!seat.isAvailable) return 'bg-muted border-border cursor-not-allowed';
        if (isSelected) return 'bg-primary/20 border-primary cursor-pointer';
        return 'bg-green-100 dark:bg-green-900/30 border-green-500 cursor-pointer hover:scale-110';
    };

    return (
        <motion.button
            onClick={onClick}
            disabled={!seat.isAvailable}
            whileTap={{ scale: 0.9 }}
            className={`relative w-12 h-12 rounded border-2 transition-all ${getSeatColor()}`}
        >
            {/* Seat Number */}
            <div className="text-xs font-semibold">{seat.number}</div>

            {/* Direction Indicator */}
            {seat.directionConfidence !== null && seat.isForward && (
                <Navigation className="absolute -top-1 -right-1 w-3 h-3 text-blue-500" />
            )}

            {/* Confidence Badge */}
            {seat.directionConfidence !== null && seat.directionConfidence >= 70 && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center text-[8px] font-bold">
                    ✓
                </div>
            )}
        </motion.button>
    );
}
